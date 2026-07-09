import { residentScreenStates, type VoiceTopic } from "@sozorock-health/shared";

export const guidanceProvider = {
  status: "staticFallback",
  getVoiceTopics(): VoiceTopic[] {
    return [
      {
        id: "topic-app-options",
        label: "Understand app options",
        prompt: "What can I do here?",
        response: "You can choose a need, find hubs, review Health Access Day, or prepare for provider-led access.",
      },
      {
        id: "topic-hubs",
        label: "Find nearby hubs",
        prompt: "Find trusted access points.",
        response: "Use ZIP code, city, or county to find listed access points. You can still search without sharing location.",
      },
      {
        id: "topic-day",
        label: "Prepare for Health Access Day",
        prompt: "What should I bring?",
        response: "Bring questions, a device if available, and any provider platform details you already use.",
      },
      {
        id: "topic-privacy",
        label: "Understand privacy",
        prompt: "What do you collect?",
        response: residentScreenStates.safetyBoundary,
      },
    ];
  },
  getUnavailableMessage() {
    return residentScreenStates.serviceUnavailable;
  },
} as const;
