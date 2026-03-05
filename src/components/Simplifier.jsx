import { useState } from 'react';
import { simplifyText, summarizeText } from '../utils/mockAI';

export default function Simplifier({ onUse }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('Your processed text appears here.');
  const [focusMode, setFocusMode] = useState(false);

  return (
    <section className="panel shadow-soft p-4" aria-label="Cognitive support panel">
      <h3 className="text-lg font-semibold">Learning and Cognitive Support</h3>
      <textarea
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mt-3 w-full rounded-xl border border-slate-300 p-3"
        placeholder="Paste text to simplify or summarize"
        aria-label="Learning text input"
      />
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            setOutput(summarizeText(input));
            onUse('learning');
          }}
          className="tap-target rounded-2xl btn-primary py-3 font-semibold text-white"
        >
          Summarize
        </button>
        <button
          onClick={() => {
            setOutput(simplifyText(input));
            onUse('learning');
          }}
          className="tap-target rounded-2xl btn-secondary py-3 font-semibold"
        >
          Simplify (ELI5)
        </button>
      </div>
      <button
        onClick={() => setFocusMode((v) => !v)}
        className="tap-target mt-3 w-full rounded-2xl btn-secondary py-3 text-sm font-semibold"
      >
        {focusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
      </button>
      <div className={`${focusMode ? 'mt-4 rounded-xl border-2 border-[var(--accent)] bg-black p-4 text-lg text-white' : 'mt-4 rounded-xl border border-slate-200 p-4 text-sm'}`}>
        {output}
      </div>
    </section>
  );
}
