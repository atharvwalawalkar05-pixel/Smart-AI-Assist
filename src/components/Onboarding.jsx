import { useState } from 'react';
import { motion } from 'framer-motion';
import { supportChoices, supportProfiles } from '../utils/accessibilityProfiles';

export default function Onboarding({ onComplete, applyProfile }) {
  const [step, setStep] = useState(1);
  const [choice, setChoice] = useState('visual');

  const next = () => setStep((s) => Math.min(3, s + 1));

  const finish = () => {
    applyProfile(supportProfiles[choice]);
    onComplete(choice);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] p-5 text-[var(--text)]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mt-8 w-full max-w-md rounded-3xl bg-[var(--card)] p-6 shadow-soft"
      >
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold">Welcome to SmartAssist</h1>
            <p className="mt-3 text-sm text-[var(--muted)]">A mobile-first assistive app built to adapt to your needs.</p>
            <button onClick={next} className="tap-target mt-8 w-full rounded-2xl bg-[var(--accent)] px-4 py-3 text-base font-semibold text-white">
              Start Setup
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-bold">Primary support need</h2>
            <div className="mt-4 grid gap-3">
              {supportChoices.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setChoice(item.key)}
                  className={`tap-target rounded-2xl border p-4 text-left ${
                    choice === item.key ? 'border-[var(--accent)] bg-blue-50 text-slate-900' : 'border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button onClick={next} className="tap-target mt-6 w-full rounded-2xl bg-[var(--accent)] px-4 py-3 font-semibold text-white">
              Continue
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl font-bold">Profile ready</h2>
            <p className="mt-3 text-sm text-[var(--muted)]">We configured contrast, voice hints, and font defaults for your selected support profile.</p>
            <button onClick={finish} className="tap-target mt-8 w-full rounded-2xl bg-[var(--accent)] px-4 py-3 font-semibold text-white">
              Enter SmartAssist
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
