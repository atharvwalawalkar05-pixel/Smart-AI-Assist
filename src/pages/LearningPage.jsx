import { motion } from 'framer-motion';
import Simplifier from '../components/Simplifier';

export default function LearningPage({ trackUsage }) {
  return (
    <motion.main initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-4 pb-28">
      <Simplifier onUse={trackUsage} />
    </motion.main>
  );
}
