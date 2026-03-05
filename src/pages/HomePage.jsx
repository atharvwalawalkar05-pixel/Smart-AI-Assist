import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const cards = [
  { title: 'Communication', path: '/communication', icon: MicrophoneIcon, hint: 'Speech and voice' },
  { title: 'Navigation', path: '/navigation', icon: CompassIcon, hint: 'Scan environment' },
  { title: 'Learning', path: '/learning', icon: BookIcon, hint: 'Summarize & simplify' },
  { title: 'Hearing', path: '/hearing', icon: EarIcon, hint: 'Sound alerts' }
];

export default function HomePage({ todayUsage, mostUsed }) {
  return (
    <motion.main initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 p-4 pb-28">
      <header className="panel shadow-soft p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">SmartAssist</h1>
          <div className="rounded-xl bg-slate-900/90 px-3 py-2 text-right text-white">
            <p className="text-[10px] uppercase tracking-wide opacity-70">Today usage</p>
            <p className="text-lg font-extrabold">{todayUsage}</p>
            <div
              aria-hidden
              className="mt-1 h-8 w-28 rounded-md"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.18), transparent), repeating-linear-gradient(90deg, #60a5fa 0 6px, #1e293b 6px 12px)'
              }}
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-[var(--muted)]">Most used: {mostUsed}</p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {cards.map(({ title, path, icon: Icon, hint }) => (
          <Link key={title} to={path} className="block">
            <motion.article whileTap={{ scale: 0.98 }} className="panel shadow-soft p-4">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900/90 text-white">
                  <Icon />
                </span>
                <div>
                  <h2 className="text-base font-semibold">{title}</h2>
                  <p className="text-xs text-[var(--muted)]">{hint}</p>
                </div>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>

      <Link to="/settings" className="tap-target block rounded-2xl btn-primary text-center font-semibold shadow-soft px-4 py-4">
        Open Settings
      </Link>
    </motion.main>
  );
}

function MicrophoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="9" y="3" width="6" height="12" rx="3" fill="currentColor" />
      <path d="M5 12a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 19v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="m14.5 9.5-4 1.8-1.8 4 4-1.8 1.8-4Z" fill="currentColor" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 5a3 3 0 0 1 3-3h11v18H7a3 3 0 0 0-3 3V5Z" stroke="currentColor" strokeWidth="2" />
      <path d="M7 2v15" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function EarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14 14c0 3-2 4-3 4s-2-1-2-2 1-2 1-3M7 9a5 5 0 1 1 10 0c0 3-1 4-3 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
