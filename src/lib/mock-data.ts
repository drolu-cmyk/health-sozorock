export const residentModules = [
  "Welcome",
  "Access Start",
  "Voice Access",
  "Health Access Day",
  "Health Equity Hubs",
  "Provider-Led Pathways",
];

export const countyModules = [
  "Geospatial Access Operating Picture",
  "AI Decision Support",
  "Action Queue",
  "Assurance Log",
  "Scenario Planning",
];

export const syntheticAccessSignals = [
  {
    zip: "27514",
    accessGap: "High",
    hubCoverage: "Limited",
    travelBurden: "Elevated",
    readiness: "Digital setup support",
    nextAction: "Schedule Health Access Day",
  },
  {
    zip: "27516",
    accessGap: "Medium",
    hubCoverage: "Moderate",
    travelBurden: "Moderate",
    readiness: "Voice Access orientation",
    nextAction: "Add Digital Access Guide hours",
  },
  {
    zip: "27703",
    accessGap: "Medium",
    hubCoverage: "Emerging",
    travelBurden: "Low",
    readiness: "Hub awareness",
    nextAction: "Update community access point information",
  },
];

export const actionQueue = [
  {
    action: "Prepare county access report",
    owner: "Data and Insights Support",
    due: "2026-06-18",
    status: "Human review",
    source: "Synthetic ZIP access signals",
  },
  {
    action: "Run assurance review",
    owner: "Community Access Team",
    due: "2026-06-20",
    status: "Ready",
    source: "Mock action queue",
  },
  {
    action: "Schedule Health Access Day",
    owner: "Access Workforce",
    due: "2026-07-02",
    status: "Draft",
    source: "Synthetic readiness trend",
  },
];

export const assuranceChecks = [
  "Consent captured.",
  "No protected health information collected.",
  "Non-clinical boundary reviewed.",
  "Provider responsibility confirmed.",
  "Human review completed.",
  "Data source verified.",
  "Report generated with controls.",
];

export const hubExamples = [
  {
    name: "Northside Community Access Point",
    type: "Community-based",
    distance: "2.4 miles",
    support: "Digital readiness and event information",
  },
  {
    name: "East Branch Access Desk",
    type: "Library-based",
    distance: "3.1 miles",
    support: "Voice Access orientation and hub details",
  },
  {
    name: "Home Support Readiness Route",
    type: "Home-based",
    distance: "By request",
    support: "Eligibility and scheduling preparation",
  },
];
