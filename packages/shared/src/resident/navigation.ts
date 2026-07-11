import type { ResidentScreenId } from "./types";

export const residentTopBar = {
  title: "SozoRock® Health",
  menuLabel: "Menu",
} as const;

export const residentBottomTabs: Array<{
  id: ResidentScreenId;
  label: string;
  accessibilityLabel: string;
}> = [
  { id: "home", label: "Home", accessibilityLabel: "Open Home" },
  { id: "start", label: "Start", accessibilityLabel: "Start Resident Access" },
  { id: "voice", label: "Voice", accessibilityLabel: "Open Voice Access" },
  { id: "day", label: "Day", accessibilityLabel: "Find Health Access Day" },
  { id: "hubs", label: "Hubs", accessibilityLabel: "Find Hubs" },
];

export const residentMenuItems: Array<{
  id: ResidentScreenId;
  label: string;
  description: string;
}> = [
  {
    id: "providerPathway",
    label: "Provider-Led Pathway",
    description: "Prepare for provider-led care without replacing licensed care.",
  },
  {
    id: "howItWorks",
    label: "How it works",
    description: "See the simple resident path.",
  },
  {
    id: "privacy",
    label: "Privacy Boundary",
    description: "Understand what is and is not collected.",
  },
  {
    id: "accessibility",
    label: "Accessibility",
    description: "Use voice, tap, typing, ZIP code, or low-bandwidth support.",
  },
  {
    id: "about",
    label: "What we do",
    description: "Learn what SozoRock® Health does and does not do.",
  },
];
