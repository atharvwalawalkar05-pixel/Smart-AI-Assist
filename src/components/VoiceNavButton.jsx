export default function VoiceNavButton() {
  const navigateVoice = () => {
    const message = new SpeechSynthesisUtterance('Voice navigation enabled. Say Home, Communication, Navigation, or Learning.');
    speechSynthesis.cancel();
    speechSynthesis.speak(message);
  };

  return (
    <button
      onClick={navigateVoice}
      className="tap-target fixed bottom-24 right-4 z-40 rounded-full bg-[var(--accent)] px-4 py-3 text-xs font-bold text-white shadow-soft"
      aria-label="Enable voice navigation guidance"
    >
      Voice Nav
    </button>
  );
}
