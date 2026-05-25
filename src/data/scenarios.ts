import type { CountyReviewOwner, CountyReviewState } from "@/lib/human-review-data";

export const scenarioCatalog = [
  {
    title: "Best Next Location: Eastview (ZIP 12345)",
    residentsReached: "2,100-2,600",
    accessGapReduction: "-18% to -24%",
    digitalReadinessLift: "+15% to +22%",
    reviewState: "Needs Review" satisfies CountyReviewState,
    owner: "Data and Insights" satisfies CountyReviewOwner,
    evidenceSource: "Access gap and hub coverage signals",
    actionGate: "Compare scenarios only. No county action is automated.",
  },
  {
    title: "Mobile Digital Readiness Desk",
    residentsReached: "800-1,100",
    accessGapReduction: "-8% to -12%",
    digitalReadinessLift: "+20% to +28%",
    reviewState: "Draft" satisfies CountyReviewState,
    owner: "Community Operations" satisfies CountyReviewOwner,
    evidenceSource: "Readiness barrier signals",
    actionGate: "Human review required before action.",
  },
] as const;
