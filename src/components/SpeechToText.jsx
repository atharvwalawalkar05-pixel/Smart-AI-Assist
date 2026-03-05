import { useEffect, useMemo, useState } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export default function SpeechToText({ onUse }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognition = useMemo(() => {
    if (!SpeechRecognition) return null;
    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-US';
    return rec;
  }, []);

  useEffect(() => {
    if (!recognition) return;
    recognition.onresult = (e) => {
      const text = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join(' ');
      setTranscript(text);
    };
    recognition.onend = () => setListening(false);
  }, [recognition]);

  const start = () => {
    if (!recognition) return;
    onUse('communication');
    setListening(true);
    recognition.start();
  };

  const stop = () => {
    recognition?.stop();
    setListening(false);
  };

  return (
    <section className="rounded-2xl bg-[var(--card)] p-4 shadow-soft" aria-label="Speech to text panel">
      <h3 className="text-lg font-semibold">Speech to Text</h3>
      <button
        onMouseDown={start}
        onMouseUp={stop}
        onTouchStart={start}
        onTouchEnd={stop}
        onKeyDown={(e) => e.key === ' ' && start()}
        onKeyUp={(e) => e.key === ' ' && stop()}
        className={`tap-target mt-3 w-full rounded-2xl px-4 py-3 font-semibold ${
          listening ? 'bg-red-600 text-white' : 'bg-[var(--accent)] text-white'
        }`}
        aria-pressed={listening}
      >
        Hold to Speak
      </button>
      <div className="mt-3 min-h-24 rounded-xl border border-slate-200 p-3 text-sm" aria-live="polite">
        {transcript || 'Live transcription appears here.'}
      </div>
      {!SpeechRecognition && <p className="mt-2 text-xs text-red-500">Speech recognition is not supported in this browser.</p>}
    </section>
  );
}
