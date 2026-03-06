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
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-[var(--muted)] mt-1">Customize your SmartAssist experience</p>
      </header>

      <section className="panel p-6 shadow-lg" aria-label="Appearance settings">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.172-1.172a4 4 0 115.656 5.656L17 13" />
          </svg>
          Appearance
        </h2>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">Font size</span>
              <span className="text-[var(--accent)] font-bold">{settings.fontScale.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.9"
              max="1.5"
              step="0.1"
              value={settings.fontScale}
              onChange={(e) => update({ fontScale: Number(e.target.value) })}
              className="w-full accent-[var(--accent)]"
            />
          </div>

          <div className="grid gap-4">
            <label className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-semibold">High Contrast</span>
              </div>
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={(e) => update({ highContrast: e.target.checked })}
                className="w-6 h-6 rounded-lg accent-[var(--accent)] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <span className="font-semibold">Dark Mode</span>
              </div>
              <input
                type="checkbox"
                checked={settings.theme === 'dark'}
                onChange={(e) => update({ theme: e.target.checked ? 'dark' : 'light' })}
                className="w-6 h-6 rounded-lg accent-[var(--accent)] cursor-pointer"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="panel p-6 shadow-lg" aria-label="Voice settings">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          Voice Assistant
        </h2>
        
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)] mb-2 block">Voice selection</span>
            <select
              value={settings.voice}
              onChange={(e) => update({ voice: e.target.value })}
              className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 font-medium focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all appearance-none"
            >
              <option value="">Default System Voice</option>
              {voices.map((voice) => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="pt-4">
        <button
          onClick={resetOnboarding}
          className="w-full py-4 rounded-2xl border-2 border-red-500/20 text-red-500 font-bold hover:bg-red-500/5 transition-colors flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset Onboarding
        </button>
      </section>
    </div>
  );
}
