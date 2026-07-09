export type ReviewStageStatus = "complete" | "review" | "ready";

export type ReviewQueueStatus = "Boundary checked" | "Human review" | "Evidence recorded";

export const countyReviewStates = [
  "Draft",
  "Needs Review",
  "Approved",
  "Deferred",
  "Completed",
] as const;

export type CountyReviewState = (typeof countyReviewStates)[number];

export const countyReviewOwners = [
  "Community Operations",
  "Data and Insights",
  "Governance Review",
  "Reporting",
] as const;

export type CountyReviewOwner = (typeof countyReviewOwners)[number];

export type HumanReviewStage = {
  name: string;
  description: string;
  status: ReviewStageStatus;
};

export type HumanReviewQueueItem = {
  source: string;
  signal: string;
  reviewNeed: string;
  status: ReviewQueueStatus;
  reviewer: string;
  evidence: string;
  planningOutput: string;
};

export const humanReviewStages: HumanReviewStage[] = [
  {
    name: "Signal captured",
    description: "Synthetic resident, Voice Access, geospatial, or action queue signal is visible.",
    status: "complete",
  },
  {
    name: "Boundary checked",
    description: "No PHI, non-clinical language, and consent assumptions are reviewed.",
    status: "complete",
  },
  {
    name: "Human review",
    description: "A human reviewer checks the signal before follow-up or operational action.",
    status: "review",
  },
  {
    name: "Action approved",
    description: "Operational action is marked ready only after the review boundary is satisfied.",
    status: "ready",
  },
  {
    name: "Evidence recorded",
    description: "Synthetic evidence source and boundary notes are recorded for accountability.",
    status: "complete",
  },
  {
    name: "Planning output prepared",
    description: "County-facing output is framed as planning support, not automated decision-making.",
    status: "ready",
  },
] as const;

export const humanReviewQueue: HumanReviewQueueItem[] = [
  {
    source: "Voice Access follow-up readiness",
    signal: "Digital readiness support request",
    reviewNeed: "Confirm non-clinical language before any follow-up readiness support.",
    status: "Human review",
    reviewer: "Community Access Team",
    evidence: "Voice Access guided text output",
    planningOutput: "Digital Access Guide readiness note",
  },
  {
    source: "Geospatial recommendation",
    signal: "High access gap in ZIP 27514",
    reviewNeed: "Review hub coverage, travel burden, and Health Access Day readiness.",
    status: "Boundary checked",
    reviewer: "Data and Insights Support",
    evidence: "Synthetic ZIP 27514 access signals",
    planningOutput: "Health Access Day planning support",
  },
  {
    source: "Hub coverage update",
    signal: "Emerging coverage in ZIP 27703",
    reviewNeed: "Check source label and avoid unsupported site or partner claims.",
    status: "Evidence recorded",
    reviewer: "Access Workforce",
    evidence: "Mock hub coverage pattern",
    planningOutput: "Hub coverage update for review",
  },
  {
    source: "Action Queue",
    signal: "Prepare county access report",
    reviewNeed: "Confirm report controls before county-facing output is prepared.",
    status: "Human review",
    reviewer: "Reporting and Evidence Support",
    evidence: "Mock action queue",
    planningOutput: "County access report draft",
  },
] as const;

export const humanReviewBoundaryCopy = {
  required: "Human review required before action.",
  planning: "Planning support, not automated decision-making.",
  trust: "No PHI. Consent-based. Non-clinical.",
} as const;
