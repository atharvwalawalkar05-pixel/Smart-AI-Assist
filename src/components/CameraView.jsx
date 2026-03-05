import { useEffect, useRef, useState } from 'react';
import { detectObjectsFromVideo, verbalize } from '../utils/detector';

const detections = ['Chair on your left', 'Door ahead', 'Table to your right'];

export default function CameraView({ onUse }) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState('Camera is off');
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    return () => {
      const stream = videoRef.current?.srcObject;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setStatus('Camera active');
      onUse('navigation');
    } catch {
      setStatus('Camera access denied or unavailable');
    }
  };

  const scan = async () => {
    onUse('navigation');
    try {
      if (!videoRef.current) return;
      setStatus('Scanning environment…');
      const preds = await detectObjectsFromVideo(videoRef.current);
      const lines = verbalize(preds, videoRef.current.videoWidth || 640);
      setObjects(lines);
      if ('vibrate' in navigator) navigator.vibrate([120, 80, 120]);
      lines.forEach((msg, i) => {
        const utterance = new SpeechSynthesisUtterance(msg);
        utterance.rate = 1;
        setTimeout(() => speechSynthesis.speak(utterance), i * 500);
      });
      setStatus('Scan complete');
    } catch (e) {
      setStatus('Scan failed');
    }
  };

  return (
    <section className="panel shadow-soft p-4" aria-label="Navigation camera panel">
      <h3 className="text-lg font-semibold">Navigation Assistance</h3>
      <p className="mt-1 flex items-center gap-2 text-xs text-[var(--muted)]">
        <span className={`inline-block h-2 w-2 rounded-full ${status.includes('active') ? 'bg-green-500' : 'bg-slate-400'}`} />
        {status}
      </p>
      <video ref={videoRef} autoPlay playsInline className="mt-3 h-56 w-full rounded-xl bg-slate-900 object-cover" aria-label="Live camera feed" />
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button onClick={startCamera} className="tap-target rounded-2xl btn-secondary px-3 py-3 font-semibold">
          Start Camera
        </button>
        <button onClick={scan} className="tap-target rounded-2xl btn-primary px-3 py-3 font-semibold text-white">
          Scan Environment
        </button>
      </div>
      <ul className="mt-3 space-y-2" aria-live="polite">
        {objects.map((obj) => (
          <li key={obj} className="rounded-xl border border-slate-200 p-3 text-sm">
            {obj}
          </li>
        ))}
      </ul>
    </section>
  );
}
