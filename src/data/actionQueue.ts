import type { CountyReviewOwner, CountyReviewState } from "@/lib/human-review-data";

export const operatingActions = [
  {
    action: "Schedule Health Access Day Eastview (ZIP 12345)",
    owner: "Community Operations" satisfies CountyReviewOwner,
    priority: "High",
    dueDate: "2026-06-05",
    reviewState: "Needs Review" satisfies CountyReviewState,
    evidenceSource: "Synthetic access gap signal",
    actionGate: "Human review required before action.",
  },
  {
    action: "Expand Digital Access Help Lakeside (ZIP 67890)",
    owner: "Data and Insights" satisfies CountyReviewOwner,
    priority: "High",
    dueDate: "2026-06-06",
    reviewState: "Draft" satisfies CountyReviewState,
    evidenceSource: "Mock digital readiness signal",
    actionGate: "Planning support, not automated decision-making.",
  },
  {
    action: "Activate library hub Northview (ZIP 24680)",
    owner: "Community Operations" satisfies CountyReviewOwner,
    priority: "Medium",
    dueDate: "2026-06-10",
    reviewState: "Approved" satisfies CountyReviewState,
    evidenceSource: "Static hub coverage fixture",
    actionGate: "No notifications or scheduling are created.",
  },
  {
    action: "Partner outreach Pinecrest (ZIP 13579)",
    owner: "Governance Review" satisfies CountyReviewOwner,
    priority: "Low",
    dueDate: "2026-06-12",
    reviewState: "Deferred" satisfies CountyReviewState,
    evidenceSource: "Mock provider pathway readiness",
    actionGate: "No unsupported partnership claim may be made.",
  },
] as const;
