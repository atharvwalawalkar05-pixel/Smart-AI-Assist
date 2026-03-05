import { useState } from 'react';

export default function TextToSpeech({ pitch, rate, setPitch, setRate, voice, onUse }) {
  const [text, setText] = useState('');

  const speak = () => {
    if (!text.trim()) return;
    onUse('communication');
    const utterance = new SpeechSynthesisUtterance(text);
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    let dynamicPitch = clamp(pitch, 0.8, 1.2);
    let dynamicRate = clamp(rate, 0.85, 1.15);

    const lower = text.toLowerCase();
    if (lower.includes('happy')) dynamicPitch = clamp(dynamicPitch + 0.08, 0.8, 1.2);
    if (lower.includes('sad')) dynamicRate = clamp(dynamicRate - 0.08, 0.85, 1.15);
    if (lower.includes('urgent')) dynamicRate = clamp(dynamicRate + 0.08, 0.85, 1.15);

    utterance.pitch = dynamicPitch;
    utterance.rate = dynamicRate;
    utterance.volume = 0.9;
    utterance.lang = 'en-US';
    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find((v) => v.voiceURI === voice);
    const fallbackVoice = voices.find((v) => v.lang?.toLowerCase().startsWith('en') && !v.name.toLowerCase().includes('espeak'));
    utterance.voice = selectedVoice || fallbackVoice || null;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  return (
    <section className="panel shadow-soft p-4" aria-label="Text to speech panel">
      <h3 className="text-lg font-semibold">Text to Speech</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="mt-3 w-full rounded-xl border border-slate-300 p-3"
        placeholder="Type message to speak..."
        aria-label="Text input for speech output"
      />
      <div className="mt-3 grid gap-3">
        <div className="rounded-xl border border-slate-300 p-3">
          <label className="block text-xs font-semibold uppercase text-[var(--muted)]">Pitch</label>
          <input
            type="range"
            min="0.8"
            max="1.2"
            step="0.05"
            value={pitch}
            onChange={(e) => setPitch(Number(e.target.value))}
            className="mt-2 w-full"
          />
          <div className="mt-1 text-right text-xs">{pitch.toFixed(1)}</div>
        </div>
        <div className="rounded-xl border border-slate-300 p-3">
          <label className="block text-xs font-semibold uppercase text-[var(--muted)]">Speed</label>
          <input
            type="range"
            min="0.85"
            max="1.15"
            step="0.05"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-2 w-full"
          />
          <div className="mt-1 text-right text-xs">{rate.toFixed(1)}</div>
        </div>
      </div>
      <button onClick={speak} className="tap-target mt-4 w-full rounded-2xl btn-primary px-4 py-3 font-semibold text-white">
        Speak
      </button>
    </section>
  );
}
