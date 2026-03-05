import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function HearingPage({ trackUsage }) {
  const [level, setLevel] = useState(0);
  const [alert, setAlert] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    let stream;
    let audioContext;
    let analyser;
    let dataArray;

    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        const tick = () => {
          analyser.getByteFrequencyData(dataArray);
          const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          setLevel(Math.round(avg));
          const isLoud = avg > 90;
          setAlert(isLoud);
          if (isLoud && 'vibrate' in navigator) navigator.vibrate(200);
          rafRef.current = requestAnimationFrame(tick);
        };

        tick();
        trackUsage('hearing');
      } catch {
        setAlert(true);
      }
    };

    start();
    return () => {
      cancelAnimationFrame(rafRef.current);
      stream?.getTracks().forEach((t) => t.stop());
      audioContext?.close();
    };
  }, [trackUsage]);

  return (
    <motion.main initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 p-4 pb-28">
      <section className="rounded-2xl bg-[var(--card)] p-4 shadow-soft">
        <h2 className="text-xl font-bold">Hearing Assistance</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">Sound intensity meter</p>
        <div className="mt-4 h-5 rounded-full bg-slate-200">
          <div className="h-5 rounded-full bg-[var(--accent)] transition-all" style={{ width: `${Math.min(level, 100)}%` }} />
        </div>
        <p className="mt-3 text-sm">Current level: {level}</p>
        {alert && <p className="mt-2 rounded-xl bg-red-600 p-3 text-sm font-semibold text-white">Loud sound detected</p>}
      </section>
    </motion.main>
  );
}
