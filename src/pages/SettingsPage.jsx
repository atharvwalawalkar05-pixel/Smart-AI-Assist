import { motion } from 'framer-motion';
import Settings from '../components/Settings';

export default function SettingsPage({ settings, setSettings, resetOnboarding }) {
  return (
    <motion.main initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-4 pb-28">
      <Settings settings={settings} setSettings={setSettings} resetOnboarding={resetOnboarding} />
    </motion.main>
  );
}
