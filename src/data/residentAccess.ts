import { productRoutes } from "@/lib/routes";

export const residentNeeds = [
  {
    id: "local-support",
    title: "Find local support",
    description: "See nearby access options and trusted community support paths.",
    nextStep: "Review hub options and choose a non-clinical access path.",
    route: productRoutes.resident.hubs,
  },
  {
    id: "health-access-day",
    title: "Health Access Day",
    description: "Read event guidance for education and digital readiness.",
    nextStep: "Check what to expect before visiting a community access event.",
    route: productRoutes.resident.accessDay,
  },
  {
    id: "digital-help",
    title: "Digital help",
    description: "Prepare a device, internet connection, or provider platform.",
    nextStep: "Use provider-led pathway guidance before visiting a provider platform.",
    route: productRoutes.resident.providerPathway,
  },
  {
    id: "voice-access",
    title: "Voice Access",
    description: "Use a static voice-style surface for non-clinical support.",
    nextStep: "Review prewritten support prompts. Nothing is recorded.",
    route: productRoutes.resident.voiceAccess,
  },
] as const;

export const residentNextSteps = [
  "Choose a non-clinical support category.",
  "Review local options without submitting personal information.",
  "Ask a human reviewer or local support partner before action.",
] as const;

export const healthAccessDayGuidance = [
  "Free community access support.",
  "Talk to a real person.",
  "Get help with your needs.",
  "No personal details needed for this preview guidance.",
  "No sign-up in prototype.",
] as const;

export const providerPathwaySteps = [
  "Your provider remains in charge of care.",
  "We help you access what you need.",
  "Stronger access. Stronger community.",
] as const;
