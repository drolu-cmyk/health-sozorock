import type { ConsentCapability } from "./types";

export const microphoneConsent = {
  capability: "microphone" satisfies ConsentCapability,
  title: "Voice Access readiness",
  bullets: [
    "Voice Access is limited access.",
    "You can use guided text instead.",
    "Voice Access is non-clinical.",
    "The app does not provide medical advice.",
    "No microphone capture is active.",
    "Raw audio is not stored.",
    "Transcripts are not stored.",
  ],
  acceptLabel: "Use guided text",
  declineLabel: "Choose topic",
} as const;

export const locationConsent = {
  capability: "location" satisfies ConsentCapability,
  title: "Location readiness",
  bullets: [
    "Location needs your permission before it can be used.",
    "ZIP code search is available.",
    "City or county search is available.",
    "No location permission prompt starts here.",
    "No background tracking.",
    "No location history.",
    "No resident movement tracking.",
  ],
  acceptLabel: "Search by ZIP, city, or county",
  declineLabel: "Use listed hubs",
} as const;

export const aiGuidanceConsent = {
  capability: "aiGuidance" satisfies ConsentCapability,
  title: "AI guidance readiness",
  bullets: [
    "AI guidance is limited access.",
    "AI guidance is non-clinical.",
    "Guided text remains available.",
    "It does not replace licensed care.",
    "Do not enter private health information.",
  ],
  acceptLabel: "Read guided text",
  declineLabel: "Read guided text",
} as const;
