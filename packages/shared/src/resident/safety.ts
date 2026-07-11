export const emergencyAndCrisisMessages = [
  "If this is an emergency, call 911.",
  "If you may harm yourself or someone else, call or text 988 in the U.S.",
  "For urgent health concerns, contact emergency services or a licensed medical professional.",
  "SozoRock® Health does not give medical advice or replace licensed care.",
] as const;

export const aiGuidanceCanDo = [
  "Explain app options",
  "Provide non-clinical next-step guidance",
  "Help residents prepare for provider access",
  "Suggest what to bring to an event",
  "Suggest questions to ask a provider",
  "Help find hubs or events after location or ZIP code input",
  "Explain privacy boundaries",
  "Explain accessibility options",
] as const;

export const aiGuidanceMustNotDo = [
  "Give medical advice",
  "Replace a licensed provider",
  "Tell you what your symptoms mean",
  "Tell you what medicine to take",
  "Collect unnecessary private health information",
  "Sound certain when it is not",
  "Pressure residents to share sensitive information",
] as const;

export const aiResponseStyle = [
  "short",
  "plain language",
  "calm",
  "clear",
  "non-clinical",
  "resident-friendly",
  "safety-aware",
] as const;
