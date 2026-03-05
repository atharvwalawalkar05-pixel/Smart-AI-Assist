import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import BottomNav from './components/BottomNav';
import Onboarding from './components/Onboarding';
import VoiceNavButton from './components/VoiceNavButton';
import CommunicationPage from './pages/CommunicationPage';
import HearingPage from './pages/HearingPage';
import HomePage from './pages/HomePage';
import LearningPage from './pages/LearningPage';
import NavigationPage from './pages/NavigationPage';
import SettingsPage from './pages/SettingsPage';
import { AppStateProvider, useAppState } from './hooks/useSmartAssistState';

function AppContent() {
  const location = useLocation();
  const { settings, setSettings, onboarding, setOnboarding, trackUsage, todayUsage, mostUsed } = useAppState();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    document.documentElement.classList.toggle('high-contrast', settings.highContrast);
    document.documentElement.style.fontSize = `${16 * settings.fontScale}px`;
  }, [settings]);

  const applyProfile = (profile) => {
    setSettings((prev) => ({
      ...prev,
      fontScale: profile.fontScale,
      highContrast: profile.highContrast
    }));
  };

  if (!onboarding.complete) {
    return (
      <Onboarding
        applyProfile={applyProfile}
        onComplete={(supportNeed) =>
          setOnboarding({
            complete: true,
            supportNeed
          })
        }
      />
    );
  }

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage todayUsage={todayUsage} mostUsed={mostUsed} />} />
          <Route path="/communication" element={<CommunicationPage settings={settings} setSettings={setSettings} trackUsage={trackUsage} />} />
          <Route path="/navigation" element={<NavigationPage trackUsage={trackUsage} />} />
          <Route path="/learning" element={<LearningPage trackUsage={trackUsage} />} />
          <Route path="/hearing" element={<HearingPage trackUsage={trackUsage} />} />
          <Route
            path="/settings"
            element={
              <SettingsPage
                settings={settings}
                setSettings={setSettings}
                resetOnboarding={() => setOnboarding({ complete: false, supportNeed: '' })}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <VoiceNavButton />
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  );
}
