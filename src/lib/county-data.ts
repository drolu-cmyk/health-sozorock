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
  },
] as const;

export const humanReviewStates = [
  "Draft",
  "Needs Review",
  "Approved",
  "Deferred",
  "Completed",
] as const;

export type HumanReviewState = (typeof humanReviewStates)[number];

export const humanReviewOwners = [
  "Community Operations",
  "Data and Insights",
  "Governance Review",
  "Reporting",
] as const;

export type HumanReviewOwner = (typeof humanReviewOwners)[number];

export const countyDecisionSupport = {
  recommendation: "Schedule Health Access Day in ZIP 27514.",
  reviewControl: "Human review required before action.",
  reviewState: "Needs Review" satisfies HumanReviewState,
  reviewOwner: "Governance Review" satisfies HumanReviewOwner,
  evidenceSource: "Mock evidence: synthetic ZIP 27514 access signals",
  rationale: [
    "High access gap signal",
    "Limited hub coverage",
    "Elevated travel burden",
    "Digital readiness barriers",
    "Strong event interest",
  ],
  actionGate:
    "This recommendation cannot become assigned work until a human reviewer marks the review state Approved.",
} as const;

export const countyActionQueue = [
  {
    action: "Schedule Health Access Day",
    priority: "High",
    owner: "Community Operations" satisfies HumanReviewOwner,
    dueDate: "2026-07-02",
    reviewState: "Needs Review" satisfies HumanReviewState,
    evidence: "Mock evidence: synthetic ZIP 27514 access signals",
    reviewNote: "AI-recommended action. No outreach, scheduling, or resident contact is triggered.",
  },
  {
    action: "Add Digital Access Guide hours",
    priority: "Medium",
    owner: "Community Operations" satisfies HumanReviewOwner,
    dueDate: "2026-07-09",
    reviewState: "Approved" satisfies HumanReviewState,
    evidence: "Mock evidence: synthetic hub coverage pattern",
    reviewNote: "Mock approval recorded for demonstration only. Local UI state only.",
  },
  {
    action: "Prepare county access report",
    priority: "Medium",
    owner: "Reporting" satisfies HumanReviewOwner,
    dueDate: "2026-07-16",
    reviewState: "Draft" satisfies HumanReviewState,
    evidence: "Mock evidence: action queue and scenario planning summary",
    reviewNote: "Draft report work stays internal until review is complete.",
  },
  {
    action: "Review readiness barrier trend",
    priority: "Medium",
    owner: "Data and Insights" satisfies HumanReviewOwner,
    dueDate: "2026-07-18",
    reviewState: "Deferred" satisfies HumanReviewState,
    evidence: "Mock evidence: synthetic readiness pattern",
    reviewNote: "Deferred until the source label and boundary check are reviewed.",
  },
  {
    action: "Run assurance boundary check",
    priority: "High",
    owner: "Governance Review" satisfies HumanReviewOwner,
    dueDate: "2026-06-28",
    reviewState: "Completed" satisfies HumanReviewState,
    evidence: "Mock evidence: content guardrail checklist",
    reviewNote: "Completed review confirms the prototype remains local, mock, and non-clinical.",
  },
] as const;

export const countyAssuranceControls = [
  "Consent captured.",
  "No protected health information collected.",
  "Non-clinical boundary reviewed.",
  "Data source verified.",
  "Human review completed.",
  "Provider responsibility confirmed.",
  "Report generated with controls.",
  "Action evidence recorded.",
  "County-facing output marked as planning support.",
] as const;

export const countyAssuranceReviewLog = [
  {
    action: "Schedule Health Access Day",
    reviewState: "Needs Review" satisfies HumanReviewState,
    owner: "Governance Review" satisfies HumanReviewOwner,
    entry: "Human review is pending; no action is sent, scheduled, or assigned outside this prototype.",
  },
  {
    action: "Add Digital Access Guide hours",
    reviewState: "Approved" satisfies HumanReviewState,
    owner: "Community Operations" satisfies HumanReviewOwner,
    entry: "Mock approval is visible in the local UI and does not create outreach or staffing workflow.",
  },
  {
    action: "Run assurance boundary check",
    reviewState: "Completed" satisfies HumanReviewState,
    owner: "Governance Review" satisfies HumanReviewOwner,
    entry: "Boundary review confirms no PHI, no clinical workflow, and synthetic data only.",
  },
] as const;

export const scenarioPlans = [
  {
    title: "Next Health Access Day",
    focus: "ZIP 27514",
    projectedImpact: "Residents reached: 120",
    workforce: "Community Operations plus Digital Access Guides",
    reviewState: "Needs Review" satisfies HumanReviewState,
    sourceLabel: "Mock scenario: ZIP access gap and hub coverage",
    actionGate: "Planning support only. Add to Action Queue after human review.",
  },
  {
    title: "New Health Equity Hub",
    focus: "ZIP 27703",
    projectedImpact: "Hub coverage improvement: medium",
    workforce: "Digital Access Guides",
    reviewState: "Draft" satisfies HumanReviewState,
    sourceLabel: "Mock scenario: hub coverage visibility",
    actionGate: "Draft scenario. No site action or outreach is created.",
  },
  {
    title: "Digital readiness coverage",
    focus: "ZIP 27516",
    projectedImpact: "Readiness barriers reduced: planning estimate",
    workforce: "Digital Access Guides and Data and Insights",
    reviewState: "Deferred" satisfies HumanReviewState,
    sourceLabel: "Mock scenario: digital readiness pattern",
    actionGate: "Deferred until evidence source and review owner are confirmed.",
  },
] as const;
