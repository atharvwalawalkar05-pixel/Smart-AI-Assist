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
    <section className="panel shadow-soft p-4" aria-label="Speech to text panel">
      <h3 className="text-lg font-semibold">Speech to Text</h3>
      <div className="mt-4 flex items-center justify-center">
        <button
          onMouseDown={start}
          onMouseUp={stop}
          onTouchStart={start}
          onTouchEnd={stop}
          onKeyDown={(e) => e.key === ' ' && start()}
          onKeyUp={(e) => e.key === ' ' && stop()}
          aria-pressed={listening}
          className={`relative grid h-28 w-28 place-items-center rounded-full text-white shadow-soft ${
            listening ? 'ring-accent btn-primary' : 'btn-primary'
          }`}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <rect x="9" y="3" width="6" height="12" rx="3" />
            <path d="M5 12a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 19v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="absolute -bottom-8 rounded-full bg-slate-900/90 px-3 py-1 text-xs font-bold">Hold to Speak</span>
        </button>
      </div>
      <div className="mt-10 min-h-24 rounded-xl border border-slate-200 p-3 text-sm" aria-live="polite">
        {transcript || 'Live transcription appears here.'}
      </div>
      {!SpeechRecognition && <p className="mt-2 text-xs text-red-500">Speech recognition is not supported in this browser.</p>}
    </section>
  );
}
