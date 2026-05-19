import type { CountyReviewOwner, CountyReviewState } from "@/lib/human-review-data";

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

export const countyDecisionSupport = {
  recommendation: "Schedule Health Access Day in ZIP 27514.",
  reviewControl: "Human review required before action.",
  reviewState: "Needs Review" satisfies CountyReviewState,
  reviewOwner: "Governance Review" satisfies CountyReviewOwner,
  evidenceSource: "Synthetic ZIP 27514 access signals",
  actionGate: "Operational action stays locked until a human reviewer approves it.",
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
    owner: "Community Operations" satisfies CountyReviewOwner,
    dueDate: "2026-07-02",
    reviewState: "Needs Review" satisfies CountyReviewState,
    evidence: "Synthetic ZIP 27514 access signals",
    actionGate: "No scheduling, outreach, or assignment outside this static view.",
  },
  {
    action: "Add Digital Access Guide hours",
    priority: "Medium",
    owner: "Community Operations" satisfies CountyReviewOwner,
    dueDate: "2026-07-09",
    reviewState: "Approved" satisfies CountyReviewState,
    evidence: "Synthetic hub coverage pattern",
    actionGate: "Mock approval only; no staffing workflow is created.",
  },
  {
    action: "Prepare county access report",
    priority: "Medium",
    owner: "Reporting" satisfies CountyReviewOwner,
    dueDate: "2026-07-16",
    reviewState: "Draft" satisfies CountyReviewState,
    evidence: "Mock action queue",
    actionGate: "Report stays internal until assurance review is complete.",
  },
  {
    action: "Review readiness barrier trend",
    priority: "Medium",
    owner: "Data and Insights" satisfies CountyReviewOwner,
    dueDate: "2026-07-18",
    reviewState: "Deferred" satisfies CountyReviewState,
    evidence: "Synthetic digital readiness pattern",
    actionGate: "Deferred until source label and review owner are confirmed.",
  },
  {
    action: "Run assurance boundary check",
    priority: "High",
    owner: "Governance Review" satisfies CountyReviewOwner,
    dueDate: "2026-06-28",
    reviewState: "Completed" satisfies CountyReviewState,
    evidence: "Static assurance checklist",
    actionGate: "Completed mock check confirms the boundary remains local and static.",
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
    check: "Consent and boundary review",
    reviewState: "Completed" satisfies CountyReviewState,
    owner: "Governance Review" satisfies CountyReviewOwner,
    evidenceSource: "Static assurance checklist",
    actionGate: "Keep all county output in planning mode.",
  },
  {
    check: "Recommended action review",
    reviewState: "Needs Review" satisfies CountyReviewState,
    owner: "Community Operations" satisfies CountyReviewOwner,
    evidenceSource: "Synthetic ZIP 27514 access signals",
    actionGate: "No field action until review state changes to Approved.",
  },
  {
    check: "County report preparation",
    reviewState: "Draft" satisfies CountyReviewState,
    owner: "Reporting" satisfies CountyReviewOwner,
    evidenceSource: "Mock action queue and scenario summary",
    actionGate: "Draft remains internal and cannot be treated as a final report.",
  },
] as const;

export const scenarioPlans = [
  {
    title: "Next Health Access Day",
    focus: "ZIP 27514",
    projectedImpact: "Residents reached: 120",
    workforce: "Community Operations plus Digital Access Guides",
    reviewState: "Needs Review" satisfies CountyReviewState,
    sourceLabel: "Source label: synthetic access gap and hub coverage signals",
    actionGate: "Add to Action Queue only after human review.",
  },
  {
    title: "New Health Equity Hub",
    focus: "ZIP 27703",
    projectedImpact: "Hub coverage improvement: medium",
    workforce: "Digital Access Guides",
    reviewState: "Draft" satisfies CountyReviewState,
    sourceLabel: "Source label: mock hub coverage visibility",
    actionGate: "No site action or outreach is created.",
  },
  {
    title: "Digital readiness coverage",
    focus: "ZIP 27516",
    projectedImpact: "Readiness barriers reduced: planning estimate",
    workforce: "Digital Access Guides and Data and Insights",
    reviewState: "Deferred" satisfies CountyReviewState,
    sourceLabel: "Source label: synthetic digital readiness pattern",
    actionGate: "Revisit after evidence source review.",
  },
] as const;
