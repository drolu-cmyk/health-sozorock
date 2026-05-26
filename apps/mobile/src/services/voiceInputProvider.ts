export const voiceInputProvider = {
  status: "serviceUnavailable",
  microphoneEnabled: false,
  rawAudioStored: false,
  transcriptStored: false,
  boundary:
    "Microphone support is designed as an explicit-permission capability. This foundation does not record or store raw audio.",
} as const;
