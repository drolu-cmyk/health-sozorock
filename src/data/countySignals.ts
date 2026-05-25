import type { CountyReviewOwner, CountyReviewState } from "@/lib/human-review-data";

export const countySummary = {
  county: "Eastview County",
  state: "TX",
  status: "All systems operational",
  accessGapIndex: "0.68",
  zipsNeedingAttention: "18",
  healthAccessDays: "7",
  residentsReached: "12,450",
  operatingModel: "Signal → Decision → Action → Assurance → Impact",
} as const;

export const accessSignals = [
  {
    label: "Eastview",
    zip: "12345",
    severity: "Very High",
    hubCoverage: "Low",
    travelTime: "26 min",
    digitalReadiness: "Low",
    reviewState: "Needs Review" satisfies CountyReviewState,
    owner: "Data and Insights" satisfies CountyReviewOwner,
  },
  {
    label: "Lakeside",
    zip: "7890",
    severity: "High",
    hubCoverage: "Moderate",
    travelTime: "18 min",
    digitalReadiness: "Medium",
    reviewState: "Draft" satisfies CountyReviewState,
    owner: "Community Operations" satisfies CountyReviewOwner,
  },
  {
    label: "Pinecrest",
    zip: "13579",
    severity: "Low",
    hubCoverage: "Good",
    travelTime: "12 min",
    digitalReadiness: "High",
    reviewState: "Approved" satisfies CountyReviewState,
    owner: "Governance Review" satisfies CountyReviewOwner,
  },
] as const;

export const countyMetricCards = [
  { label: "Hub coverage", value: "64%", detail: "Mock county coverage" },
  { label: "Travel burden", value: "26 min", detail: "Highest synthetic gap" },
  { label: "Digital readiness", value: "71%", detail: "Preview readiness index" },
  { label: "Provider pathways", value: "12", detail: "Readiness partners, mock" },
] as const;
