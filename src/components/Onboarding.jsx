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
    <div className="flex min-h-screen flex-col bg-[var(--bg)] p-6 text-[var(--text)] items-center justify-center relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--accent)]/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--accent)]/10 blur-[100px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md panel p-8 shadow-xl relative z-10"
      >
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[var(--accent)] to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <h1 className="text-3xl font-extrabold tracking-tight mb-4">Welcome to <span className="text-[var(--accent)]">SmartAssist</span></h1>
            <p className="text-lg text-[var(--muted)] mb-10 leading-relaxed">Your personal AI companion for communication, navigation, and learning.</p>
            <button 
              onClick={next} 
              className="btn-primary w-full py-4 text-lg shadow-blue-500/25"
            >
              Start Experience
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-bold mb-2">Support Profile</h2>
            <p className="text-[var(--muted)] mb-8">Choose your primary need so we can tailor the interface for you.</p>
            
            <div className="grid gap-4 mb-10">
              {supportChoices.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setChoice(item.key)}
                  className={`tap-target flex items-center justify-between rounded-2xl border-2 p-5 transition-all duration-300 ${
                    choice === item.key 
                      ? 'border-[var(--accent)] bg-[var(--accent)]/5 ring-4 ring-[var(--accent)]/10' 
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className={`text-lg font-semibold ${choice === item.key ? 'text-[var(--accent)]' : ''}`}>
                    {item.label}
                  </span>
                  {choice === item.key && (
                    <div className="w-6 h-6 bg-[var(--accent)] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            <button 
              onClick={next} 
              className="btn-primary w-full py-4 text-lg shadow-blue-500/25"
            >
              Confirm Profile
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">You're all set!</h2>
            <p className="text-[var(--muted)] mb-10 leading-relaxed">
              We've optimized the contrast, fonts, and voice hints based on your selection.
            </p>
            <button 
              onClick={finish} 
              className="btn-primary w-full py-4 text-lg shadow-blue-500/25"
            >
              Enter Dashboard
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
