export const brand = {
  programName: "SozoRock® Health",
  publicLockup: "SozoRock® Health",
  foundationName: "The SozoRock Foundation, Inc.",
  homeHref: "/",
  promise: "Care for Every ZIP Code.",
  positioning:
    "SozoRock® Health helps people find a clear next step for health access.",
  operatingLine: "Residents get support. Counties see gaps. Providers keep their platforms.",
  providerPathway: "Providers keep their platforms. We help you get ready.",
  trustBoundary: "Non-clinical support only.",
  legalDisclaimer:
    "Non-clinical support only. We do not diagnose, treat, or give medical advice.",
  contactEmail: "support@sozorockfoundation.org",
  layers: {
    resident: {
      name: "Resident Access Layer",
      standard: "simple, clear, private, human",
    },
    county: {
      name: "County access review",
      standard: "clear, reviewed, accountable, privacy-aware",
    },
  },
  assets: {
    healthLogo: "/brand/sozorock-health-logo.svg",
    foundationLogo: "/brand/sozorock-foundation-logo.svg",
    appIcon: "/brand/app-icon.svg",
    brandMark: "/brand/brand-mark.svg",
  },
} as const;

export const expectedBrandAssetFiles = [
  "public/brand/sozorock-health-logo.svg",
  "public/brand/sozorock-foundation-logo.svg",
  "public/brand/app-icon.svg",
  "public/brand/brand-mark.svg",
] as const;
