import { motion } from 'framer-motion';
import SpeechToText from '../components/SpeechToText';
import TextToSpeech from '../components/TextToSpeech';

export default function CommunicationPage({ settings, setSettings, trackUsage }) {
  return (
    <motion.main initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 p-4 pb-28">
      <SpeechToText onUse={trackUsage} />
      <TextToSpeech
        pitch={settings.pitch}
        rate={settings.rate}
        setPitch={(pitch) => setSettings((prev) => ({ ...prev, pitch }))}
        setRate={(rate) => setSettings((prev) => ({ ...prev, rate }))}
        voice={settings.voice}
        onUse={trackUsage}
      />
    </motion.main>
  );
}
