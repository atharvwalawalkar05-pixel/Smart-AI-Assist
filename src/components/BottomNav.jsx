import { NavLink } from 'react-router-dom';

const tabs = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/communication', label: 'Comm', icon: MicIcon },
  { path: '/navigation', label: 'Nav', icon: NavIcon },
  { path: '/learning', label: 'Learn', icon: LearnIcon }
];

export default function BottomNav() {
  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 glass px-3 py-2"
    >
      <ul className="grid grid-cols-4 gap-2">
        {tabs.map(({ path, label, icon: Icon }) => (
          <li key={path}>
            <NavLink to={path}>
              {({ isActive }) => (
                <span
                  className={`tap-target flex flex-col items-center justify-center rounded-xl px-2 py-2 text-[11px] font-semibold ${
                    isActive ? 'text-white btn-primary ring-accent' : 'text-[var(--text)] panel'
                  }`}
                >
                  <Icon />
                  <span className="mt-1">{label}</span>
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function MicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="9" y="3" width="6" height="12" rx="3" fill="currentColor" />
      <path d="M5 12a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function NavIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="m14.5 9.5-4 1.8-1.8 4 4-1.8 1.8-4Z" fill="currentColor" />
    </svg>
  );
}
function LearnIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 5a3 3 0 0 1 3-3h11v18H7a3 3 0 0 0-3 3V5Z" stroke="currentColor" strokeWidth="2" />
      <path d="M7 2v15" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
