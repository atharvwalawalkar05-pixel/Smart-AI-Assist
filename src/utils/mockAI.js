const SIMPLIFY_MAP = {
  utilize: 'use',
  commence: 'start',
  terminate: 'end',
  facilitate: 'help',
  approximately: 'about',
  demonstrate: 'show',
  obtain: 'get',
  subsequent: 'next'
};

export function simplifyText(input) {
  if (!input.trim()) return 'Please add text to simplify.';
  const base = input
    .split(/\s+/)
    .map((word) => {
      const clean = word.toLowerCase().replace(/[^a-z]/g, '');
      return SIMPLIFY_MAP[clean] ? word.replace(clean, SIMPLIFY_MAP[clean]) : word;
    })
    .join(' ');

  const short = base
    .split('.')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((sentence) => {
      const words = sentence.split(' ');
      if (words.length > 14) {
        return `${words.slice(0, 12).join(' ')}...`;
      }
      return sentence;
    })
    .join('. ');

  return short || base;
}

export function summarizeText(input) {
  if (!input.trim()) return 'Please add text to summarize.';
  const sentences = input.split('.').map((s) => s.trim()).filter(Boolean);
  if (sentences.length <= 2) return input;
  return `${sentences[0]}. ${sentences[Math.floor(sentences.length / 2)]}.`;
}
