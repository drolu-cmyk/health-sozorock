export const providerPathwayRequiredCopy = "Providers keep their platforms. We help you get ready.";

export const providerPathwayOptions = [
  {
    id: "already-provider",
    title: "I already have a provider",
    guidance: "Use your provider's own platform. SozoRock Health can help you prepare questions and digital access steps.",
  },
  {
    id: "prepare-access",
    title: "I need help preparing for provider access",
    guidance: "Review what to bring, what questions to ask, and how to get ready for a provider-led path.",
  },
  {
    id: "community-support",
    title: "I need community support before I can connect",
    guidance: "Start with a hub or Health Access Day to get non-clinical support and digital readiness help.",
  },
] as const;

export const preparationChecklist = [
  "Write down what you want to ask.",
  "Bring your device if you use one.",
  "Bring provider portal information if you already have it.",
  "Ask the provider how they want you to use their platform.",
  "Do not share private health information in SozoRock Health unless a future consent model clearly asks for it.",
] as const;

export const providerQuestions = [
  "What platform should I use?",
  "What should I prepare before my visit?",
  "Who should I contact if I cannot log in?",
  "What information should I bring directly to the provider?",
] as const;

export const providerBoundaryItems = [
  "SozoRock Health does not create provider-patient messaging.",
  "SozoRock Health does not schedule clinical care.",
  "Licensed providers remain responsible for their own care, systems, records, and judgment.",
] as const;
