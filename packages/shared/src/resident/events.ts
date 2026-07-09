import type { HealthAccessDayEvent } from "./types";

export const healthAccessDayDefinition =
  "A Health Access Day is a community-facing access event where residents can learn, prepare, receive non-clinical support, and understand available pathways. It is not a clinical visit and does not replace licensed care.";

export const healthAccessDayEvents: HealthAccessDayEvent[] = [
  {
    id: "eastview-access-day",
    eventName: "Eastview Health Access Day",
    date: "2026-06-20",
    time: "10:00 AM-2:00 PM",
    venue: "Eastview Community Center",
    address: "123 Main Street",
    city: "Eastview",
    county: "Eastview County",
    zipCode: "75001",
    whatToExpect: [
      "Plain-language access guidance",
      "Digital readiness help",
      "Provider pathway preparation",
      "Community resource information",
    ],
    whatToBring: ["A charged phone if available", "Questions you want help preparing", "Provider portal details if you already use one"],
    whatIsNotCollected: ["Diagnosis", "Medication list", "Insurance data", "Medical records"],
    whoItIsFor: "Residents who want help understanding access options and next steps.",
    accessibilityNotes: "Accessible entrance, seating, and quiet help area planned.",
    registrationStatus: "Browsing does not require registration.",
    contactOrNextStep: "Review what to expect or use guided text for preparation.",
    eventStatus: "Example event",
    lastUpdated: "2026-06-01",
    latitude: 32.776,
    longitude: -96.798,
  },
  {
    id: "lakeside-access-day",
    eventName: "Lakeside Access Readiness Day",
    date: "2026-07-18",
    time: "11:00 AM-3:00 PM",
    venue: "Lakeside Community Room",
    address: "410 Lake Road",
    city: "Lakeside",
    county: "Eastview County",
    zipCode: "7890",
    whatToExpect: ["Digital help", "Hub information", "Provider-led readiness guidance"],
    whatToBring: ["Device if available", "Provider questions", "A ZIP code or city name for local search"],
    whatIsNotCollected: ["Symptoms", "Clinical notes", "Payment details", "Health record information"],
    whoItIsFor: "Residents who need help preparing for access and community support.",
    accessibilityNotes: "Low-bandwidth help and large-print guidance planned.",
    registrationStatus: "No sign-up is required for basic browsing.",
    contactOrNextStep: "Check event details closer to the date.",
    eventStatus: "Example event",
    lastUpdated: "2026-06-01",
    latitude: 32.802,
    longitude: -96.824,
  },
];

export const healthAccessDayFallbacks = {
  empty: "No Health Access Day events match this search yet. You can still read what to expect.",
  offline: "Event search is offline. Listed event information remains available.",
  serviceUnavailable: "This option is temporarily unavailable. Listed event cards remain available.",
} as const;
