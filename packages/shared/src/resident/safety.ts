export const emergencyAndCrisisMessages = [
  "If this is an emergency, call 911.",
  "If you may harm yourself or someone else, call or text 988 in the U.S.",
  "For urgent health concerns, contact emergency services or a licensed medical professional.",
  "SozoRock Health does not provide medical advice, diagnosis, treatment, or prescriptions.",
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
  "Diagnose",
  "Treat",
  "Prescribe",
  "Interpret symptoms as medical advice",
  "Replace a licensed provider",
  "Create a clinical plan",
  "Collect unnecessary private health information",
  "Present confidence as medical certainty",
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
