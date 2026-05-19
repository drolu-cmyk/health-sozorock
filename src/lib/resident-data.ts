export const residentAccessActions = [
  {
    title: "Find Local Support",
    description: "See nearby access options and trusted community support paths.",
    href: "#health-equity-hubs",
  },
  {
    title: "Health Access Day",
    description: "Find a 2026 community event for education and digital readiness.",
    href: "#health-access-day",
  },
  {
    title: "Digital Help",
    description: "Get ready to use a device, internet connection, or provider platform.",
    href: "#provider-led-pathways",
  },
  {
    title: "Voice Access",
    description: "Speak or tap to find non-clinical local support.",
    href: "#voice-access",
  },
] as const;

export const voiceAccessPrompts = [
  "Find support near me.",
  "Show Health Access Day.",
  "Find a Health Equity Hub.",
  "Help me prepare for a virtual visit.",
] as const;

export const healthAccessDayEvents = [
  {
    title: "Community Health Access Day",
    date: "June 18, 2026",
    time: "10:00 AM",
    location: "Northside Community Access Point",
    support: "Health education, digital readiness, and access support.",
  },
  {
    title: "Digital Readiness Access Day",
    date: "July 09, 2026",
    time: "1:00 PM",
    location: "East Branch Access Desk",
    support: "Device setup help and provider-platform preparation.",
  },
] as const;

export const residentHubExamples = [
  {
    name: "East Branch Access Desk",
    type: "Library-based",
    hours: "Weekdays, 9:00 AM to 4:00 PM",
    distance: "3.1 miles",
    support: "Voice Access orientation and hub details.",
  },
  {
    name: "Northside Community Access Point",
    type: "Community-based",
    hours: "Tuesdays and Thursdays, 11:00 AM to 5:00 PM",
    distance: "2.4 miles",
    support: "Digital readiness and event information.",
  },
  {
    name: "Home Support Readiness Route",
    type: "Home-based",
    hours: "Scheduled after consent-based review",
    distance: "By request",
    support: "Preparation support for qualifying residents.",
  },
] as const;

export const providerPathwayActions = [
  "Learn More",
  "Prepare for a Visit",
  "Find Available Support",
] as const;
