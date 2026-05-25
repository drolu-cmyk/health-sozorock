import type { CountyReviewOwner, CountyReviewState } from "@/lib/human-review-data";

export const assuranceEntries = [
  {
    control: "No Protected Health Information Collected",
    status: "Compliant",
    reviewState: "Completed" satisfies CountyReviewState,
    owner: "Governance Review" satisfies CountyReviewOwner,
    lastCheck: "2026-05-29 8:30 AM",
  },
  {
    control: "Consent Captured for Interactions",
    status: "Compliant",
    reviewState: "Completed" satisfies CountyReviewState,
    owner: "Governance Review" satisfies CountyReviewOwner,
    lastCheck: "2026-05-29 8:28 AM",
  },
  {
    control: "Non-Clinical Boundary Review",
    status: "Compliant",
    reviewState: "Completed" satisfies CountyReviewState,
    owner: "Reporting" satisfies CountyReviewOwner,
    lastCheck: "2026-05-29 8:25 AM",
  },
  {
    control: "Provider Platforms Remain Responsible for Clinical Care",
    status: "Compliant",
    reviewState: "Approved" satisfies CountyReviewState,
    owner: "Governance Review" satisfies CountyReviewOwner,
    lastCheck: "2026-05-29 8:24 AM",
  },
  {
    control: "Data Access: Role-Based",
    status: "Compliant",
    reviewState: "Draft" satisfies CountyReviewState,
    owner: "Data and Insights" satisfies CountyReviewOwner,
    lastCheck: "2026-05-29 8:22 AM",
  },
  {
    control: "Audit Logging: All Actions",
    status: "Compliant",
    reviewState: "Needs Review" satisfies CountyReviewState,
    owner: "Reporting" satisfies CountyReviewOwner,
    lastCheck: "2026-05-29 8:21 AM",
  },
] as const;

export const assuranceChecklist = [
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
