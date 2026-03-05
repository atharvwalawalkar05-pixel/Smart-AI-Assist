export const supportProfiles = {
  visual: {
    fontScale: 1.2,
    highContrast: true,
    voiceHints: true
  },
  hearing: {
    fontScale: 1,
    highContrast: false,
    voiceHints: false
  },
  speech: {
    fontScale: 1.1,
    highContrast: false,
    voiceHints: true
  },
  cognitive: {
    fontScale: 1.15,
    highContrast: true,
    voiceHints: true
  }
};

export const supportChoices = [
  { key: 'visual', label: 'Visual impairment' },
  { key: 'hearing', label: 'Hearing impairment' },
  { key: 'speech', label: 'Speech disability' },
  { key: 'cognitive', label: 'Cognitive support' }
];
