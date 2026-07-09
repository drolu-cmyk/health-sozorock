export type VoiceAccessCategory =
  | "local support"
  | "access event"
  | "hub lookup"
  | "digital readiness"
  | "provider-led readiness";

export type VoiceAccessSimulationItem = {
  prompt: string;
  category: VoiceAccessCategory;
  response: string;
  nextStep: string;
};

export const voiceAccessSafetyCopy = {
  boundary: "Voice Access provides non-clinical support and does not give medical advice.",
  review: "Human review is required before follow-up or operational action.",
  serviceState:
    "Voice Access is limited access. You can continue with guided text, and no microphone is required.",
} as const;

export const voiceAccessSimulationItems: VoiceAccessSimulationItem[] = [
  {
    prompt: "Find support near me.",
    category: "local support",
    response:
      "Voice Access can help residents understand nearby community access options when the approved provider path is ready.",
    nextStep: "Review Health Equity Hubs or speak with a Digital Access Guide.",
  },
  {
    prompt: "Show Health Access Day.",
    category: "access event",
    response:
      "Voice Access can explain upcoming Health Access Day options for education, digital readiness, and access support.",
    nextStep: "Check the event details and what to expect before attending.",
  },
  {
    prompt: "Find a Health Equity Hub.",
    category: "hub lookup",
    response:
      "Voice Access can summarize listed library-based, community-based, and home-based support options.",
    nextStep: "Compare hub type, distance, hours, and available non-clinical support.",
  },
  {
    prompt: "Help me prepare for a virtual visit.",
    category: "digital readiness",
    response:
      "Voice Access can help residents prepare a device, connection, and provider platform checklist.",
    nextStep: "Use provider-led readiness steps while providers keep their own platforms.",
  },
  {
    prompt: "How do provider-led pathways work?",
    category: "provider-led readiness",
    response:
      "Voice Access can explain that SozoRock Health supports access readiness while providers remain responsible for their own services.",
    nextStep: "Review provider-led pathway information before using a provider platform.",
  },
] as const;
