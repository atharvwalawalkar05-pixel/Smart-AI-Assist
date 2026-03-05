import { useEffect, useState } from 'react';

export default function Settings({ settings, setSettings, resetOnboarding }) {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const update = (changes) => setSettings((prev) => ({ ...prev, ...changes }));

  return (
    <section className="rounded-2xl bg-[var(--card)] p-4 shadow-soft" aria-label="Settings controls">
      <h2 className="text-xl font-bold">Settings</h2>
      <div className="mt-4 space-y-4">
        <label className="block text-sm font-medium">
          Font size: {settings.fontScale.toFixed(1)}x
          <input
            type="range"
            min="0.9"
            max="1.5"
            step="0.1"
            value={settings.fontScale}
            onChange={(e) => update({ fontScale: Number(e.target.value) })}
            className="w-full"
          />
        </label>

        <label className="flex items-center justify-between rounded-xl border border-slate-300 p-3">
          <span>High Contrast</span>
          <input
            type="checkbox"
            checked={settings.highContrast}
            onChange={(e) => update({ highContrast: e.target.checked })}
            aria-label="Toggle high contrast mode"
          />
        </label>

        <label className="flex items-center justify-between rounded-xl border border-slate-300 p-3">
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={settings.theme === 'dark'}
            onChange={(e) => update({ theme: e.target.checked ? 'dark' : 'light' })}
            aria-label="Toggle dark mode"
          />
        </label>

        <label className="block text-sm font-medium">
          Voice selection
          <select
            value={settings.voice}
            onChange={(e) => update({ voice: e.target.value })}
            className="mt-2 w-full rounded-xl border border-slate-300 p-3"
            aria-label="Voice selection"
          >
            <option value="">Default voice</option>
            {voices.map((voice) => (
              <option key={voice.voiceURI} value={voice.voiceURI}>
                {voice.name}
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={resetOnboarding}
          className="tap-target w-full rounded-2xl border border-red-400 px-3 py-3 font-semibold text-red-600"
        >
          Reset Onboarding
        </button>
      </div>
    </section>
  );
}
