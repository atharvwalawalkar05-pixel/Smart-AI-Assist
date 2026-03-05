import { motion } from 'framer-motion';
import CameraView from '../components/CameraView';

export default function NavigationPage({ trackUsage }) {
  return (
    <motion.main initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-4 pb-28">
      <CameraView onUse={trackUsage} />
    </motion.main>
  );
}
