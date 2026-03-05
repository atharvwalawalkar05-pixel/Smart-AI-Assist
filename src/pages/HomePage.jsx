import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const cards = [
  { title: 'Communication', path: '/communication', description: 'Speech to text and text to speech' },
  { title: 'Navigation', path: '/navigation', description: 'Camera and environment scanning' },
  { title: 'Learning', path: '/learning', description: 'Summarize and simplify text' },
  { title: 'Hearing', path: '/hearing', description: 'Sound intensity alerts and vibration' }
];

export default function HomePage({ todayUsage, mostUsed }) {
  return (
    <motion.main initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 p-4 pb-28">
      <header className="rounded-2xl bg-[var(--card)] p-4 shadow-soft">
        <h1 className="text-2xl font-bold">SmartAssist</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">Today usage: {todayUsage}</p>
        <p className="text-sm text-[var(--muted)]">Most used feature: {mostUsed}</p>
      </header>

      {cards.map((card) => (
        <Link key={card.title} to={card.path} className="block">
          <motion.article whileTap={{ scale: 0.98 }} className="tap-target rounded-2xl bg-[var(--card)] p-5 shadow-soft">
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">{card.description}</p>
          </motion.article>
        </Link>
      ))}

      <Link to="/settings" className="tap-target block rounded-2xl border border-slate-300 bg-[var(--card)] p-4 text-center font-semibold">
        Open Settings
      </Link>
    </motion.main>
  );
}
