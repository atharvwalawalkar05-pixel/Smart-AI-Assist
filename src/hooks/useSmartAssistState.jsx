import { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

const AppStateContext = createContext(null);

const defaultSettings = {
  theme: 'light',
  highContrast: false,
  fontScale: 1,
  voice: '',
  pitch: 1,
  rate: 1
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const sanitizeSettings = (settings) => ({
  ...settings,
  pitch: clamp(Number(settings.pitch) || 1, 0.8, 1.2),
  rate: clamp(Number(settings.rate) || 1, 0.85, 1.15)
});

export function AppStateProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('smartassist_settings', defaultSettings);
  const [onboarding, setOnboarding] = useLocalStorage('smartassist_onboarding', {
    complete: false,
    supportNeed: ''
  });
  const [usage, setUsage] = useLocalStorage('smartassist_usage', {
    date: new Date().toDateString(),
    byFeature: {}
  });

  useEffect(() => {
    const sanitized = sanitizeSettings(settings);
    if (sanitized.pitch !== settings.pitch || sanitized.rate !== settings.rate) {
      setSettings((prev) => sanitizeSettings(prev));
    }
  }, [settings, setSettings]);

  const trackUsage = (feature) => {
    const today = new Date().toDateString();
    setUsage((prev) => {
      const base = prev.date === today ? prev.byFeature : {};
      return {
        date: today,
        byFeature: {
          ...base,
          [feature]: (base[feature] || 0) + 1
        }
      };
    });
  };

  const todayUsage = Object.values(usage.byFeature).reduce((a, b) => a + b, 0);
  const mostUsed = Object.entries(usage.byFeature).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

  const value = useMemo(
    () => ({
      settings,
      setSettings,
      onboarding,
      setOnboarding,
      usage,
      trackUsage,
      todayUsage,
      mostUsed
    }),
    [settings, onboarding, usage, todayUsage, mostUsed]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used inside AppStateProvider');
  return context;
}
