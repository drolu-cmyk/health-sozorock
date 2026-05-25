import { brand } from "@/lib/brand";

export const trustBoundary = {
  primary: brand.trustBoundary,
  voice: "Voice Access provides non-clinical support and does not give medical advice.",
  humanReview: "Human review required before action.",
  planning: "Planning support, not automated decision-making.",
  operatingModel: "Signal → Decision → Action → Assurance → Impact",
  provider: brand.providerPathway,
} as const;

export const residentBoundaryStatements = [
  "Nothing is submitted.",
  "Nothing is stored.",
  "No resident profile is created.",
  "No clinical details are requested.",
  "No benefits or payment details are requested.",
] as const;

export const staticProductBoundary = [
  "Local/session-only state",
  "No resident data capture",
  "No backend",
  "No live AI",
  "No live maps",
  "No clinical workflow",
] as const;
