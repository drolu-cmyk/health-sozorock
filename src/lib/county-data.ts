export const countyAccessSignals = [
  {
    zip: "27514",
    priority: "High",
    accessGap: "High",
    hubCoverage: "Limited",
    travelBurden: "Elevated",
    digitalReadiness: "Device setup support",
    engagement: "Strong event interest",
    nextAction: "Schedule Health Access Day",
    mapPosition: "left-[14%] top-[22%]",
  },
  {
    zip: "27516",
    priority: "Medium",
    accessGap: "Medium",
    hubCoverage: "Moderate",
    travelBurden: "Moderate",
    digitalReadiness: "Voice Access orientation",
    engagement: "Hub awareness rising",
    nextAction: "Add Digital Access Guide hours",
    mapPosition: "left-[46%] top-[46%]",
  },
  {
    zip: "27703",
    priority: "Medium",
    accessGap: "Medium",
    hubCoverage: "Emerging",
    travelBurden: "Low",
    digitalReadiness: "Local support awareness",
    engagement: "Community input received",
    nextAction: "Update access point information",
    mapPosition: "left-[72%] top-[30%]",
  },
] as const;

export const countyDecisionSupport = {
  recommendation: "Schedule Health Access Day in ZIP 27514.",
  reviewControl: "Human review required before action.",
  rationale: [
    "High access gap signal",
    "Limited hub coverage",
    "Elevated travel burden",
    "Digital readiness barriers",
    "Strong event interest",
  ],
} as const;

export const countyActionQueue = [
  {
    action: "Schedule Health Access Day",
    priority: "High",
    owner: "Access Workforce",
    dueDate: "2026-07-02",
    status: "Human review",
    evidence: "Synthetic ZIP 27514 access signals",
  },
  {
    action: "Add Digital Access Guide hours",
    priority: "Medium",
    owner: "Community Access Team",
    dueDate: "2026-07-09",
    status: "Ready",
    evidence: "Synthetic hub coverage pattern",
  },
  {
    action: "Prepare county access report",
    priority: "Medium",
    owner: "Data and Insights Support",
    dueDate: "2026-07-16",
    status: "Draft",
    evidence: "Mock action queue",
  },
] as const;

export const countyAssuranceControls = [
  "No PHI",
  "Consent-based",
  "Non-clinical",
  "Human review",
  "Provider responsibility",
  "Synthetic data only",
] as const;

export const scenarioPlans = [
  {
    title: "Next Health Access Day",
    focus: "ZIP 27514",
    projectedImpact: "Residents reached: 120",
    workforce: "Access Workforce plus Community Access Team",
  },
  {
    title: "New Health Equity Hub",
    focus: "ZIP 27703",
    projectedImpact: "Hub coverage improvement: medium",
    workforce: "Digital Access Guides",
  },
  {
    title: "Digital readiness coverage",
    focus: "ZIP 27516",
    projectedImpact: "Readiness barriers reduced: planning estimate",
    workforce: "Digital Access Guides and data support",
  },
] as const;
