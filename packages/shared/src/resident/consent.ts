import type { ConsentCapability } from "./types";

export const microphoneConsent = {
  capability: "microphone" satisfies ConsentCapability,
  title: "Before using microphone",
  bullets: [
    "Voice Access is optional.",
    "You can type instead.",
    "Voice Access is non-clinical.",
    "The app does not provide medical advice.",
    "Raw audio should not be stored by default.",
    "Do not share private health information unless a future consent model clearly allows it.",
  ],
  acceptLabel: "I understand",
  declineLabel: "Type instead",
} as const;

export const locationConsent = {
  capability: "location" satisfies ConsentCapability,
  title: "Before using location",
  bullets: [
    "Location is optional.",
    "ZIP code search is available.",
    "City or county search is available.",
    "Location is used to show nearby hubs or events.",
    "No background tracking.",
    "No location history.",
    "No resident movement tracking.",
  ],
  acceptLabel: "Use location once",
  declineLabel: "Search instead",
} as const;

export const aiGuidanceConsent = {
  capability: "aiGuidance" satisfies ConsentCapability,
  title: "Before AI-assisted guidance",
  bullets: [
    "AI guidance is non-clinical.",
    "It can explain options and next steps.",
    "It does not replace licensed care.",
    "It should not receive private health information in this foundation.",
  ],
  acceptLabel: "Use guidance",
  declineLabel: "Read static guidance",
} as const;
