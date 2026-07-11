import type { ResidentNeed, ScreenStateName } from "./types";

export const residentPromise = "Care for Every ZIP Code.";

export const residentTrustLine = "No PHI. Consent-based. Non-clinical.";

export const residentProductDefinition =
  "SozoRock® Health helps residents understand what support they may need, find trusted access points, discover Health Access Day information, use guided text, prepare for provider-led care, and see a clear next step.";

export const residentRequiredCopy = {
  noStorage: "Nothing is submitted or stored on this screen.",
  voiceBoundary: "Voice Access provides non-clinical support and does not give medical advice.",
  providerPathway: "Providers keep their platforms. We help you get ready.",
  locationBoundary: "Location needs your permission before it can be used. Search by ZIP code, city, or county.",
  emergency: "If this is an emergency, call 911.",
  crisis: "If you may harm yourself or someone else, call or text 988 in the U.S.",
} as const;

export const residentNeeds: ResidentNeed[] = [
  {
    id: "localSupport",
    title: "Find local support",
    description: "See nearby access points and community support options.",
    guidance: "Start with Hubs to see listed access points and simple next steps.",
    nextScreen: "hubs",
  },
  {
    id: "healthAccessDay",
    title: "Health Access Day",
    description: "Learn what happens at a community access event.",
    guidance: "Review what to expect, what to bring, and what is not collected.",
    nextScreen: "day",
  },
  {
    id: "digitalHelp",
    title: "Digital help",
    description: "Prepare a device, connection, or provider platform.",
    guidance: "Use the provider pathway checklist or ask Voice Access for plain-language help.",
    nextScreen: "providerPathway",
  },
  {
    id: "voiceAccess",
    title: "Voice Access",
    description: "Use guided text for non-clinical access guidance.",
    guidance: "Voice Access is limited access. Guided text support remains available.",
    nextScreen: "voice",
  },
  {
    id: "providerPathway",
    title: "Provider-led pathway",
    description: "Get ready before using a provider's own platform.",
    guidance: "Review what to bring and questions to ask a licensed provider.",
    nextScreen: "providerPathway",
  },
];

export const howItWorksSteps = [
  "Choose a need.",
  "Get non-clinical next-step guidance.",
  "Use guided text, Health Access Day, Hubs, or Provider-Led Pathway.",
  "Share only what is needed and only when you choose.",
] as const;

export const residentScreenStates: Record<ScreenStateName, string> = {
  default: "Ready to help with simple resident access guidance.",
  empty: "No matching items are available yet. You can still browse example guidance.",
  loading: "Checking available guidance.",
  error: "Something did not load. Guided text remains available.",
  offline: "You appear to be offline. Saved guidance and listed cards remain available.",
  permissionDenied: "This option needs your permission before it can be used. You can use ZIP code, city, county, or typing instead.",
  serviceUnavailable: "This option is temporarily unavailable. Guided text remains available.",
  safetyBoundary: "SozoRock® Health does not give medical advice or replace licensed care.",
};

export const accessibilitySupportText = [
  "Large tap targets",
  "Simple language",
  "Guided text instead of live speech",
  "ZIP code, city, or county search instead of location sharing",
  "Screen reader friendly labels",
  "Low-bandwidth guided text",
  "Spanish-ready content structure for later translation",
] as const;
