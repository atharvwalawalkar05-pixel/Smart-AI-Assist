import { NavLink } from 'react-router-dom';

const tabs = [
  { path: '/', label: 'Home' },
  { path: '/communication', label: 'Communication' },
  { path: '/navigation', label: 'Navigation' },
  { path: '/learning', label: 'Learning' }
];

export default function BottomNav() {
  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 border-t border-slate-200 bg-[var(--card)]/95 px-2 py-2 backdrop-blur dark:border-slate-700"
    >
      <ul className="grid grid-cols-4 gap-1">
        {tabs.map((tab) => (
          <li key={tab.path}>
            <NavLink
              to={tab.path}
              className={({ isActive }) =>
                `tap-target flex items-center justify-center rounded-xl px-2 py-3 text-xs font-semibold ${
                  isActive ? 'bg-[var(--accent)] text-white' : 'text-[var(--text)]'
                }`
              }
            >
              {tab.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
