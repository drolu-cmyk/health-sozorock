export const brand = {
  programName: "SozoRock Health",
  foundationName: "The SozoRock Foundation, Inc.",
  homeHref: "/",
  promise: "Care for Every ZIP Code.",
  positioning:
    "SozoRock Health turns hidden access barriers into visible action for underserved communities.",
  operatingLine: "Residents get access. Counties get intelligence. Providers keep their platforms.",
  providerPathway: "Providers keep their platforms. We help you get ready.",
  trustBoundary: "No PHI. Consent-based. Non-clinical.",
  layers: {
    resident: {
      name: "Resident Access Layer",
      standard: "simple, clear, private, human",
    },
    county: {
      name: "County Operating Intelligence Layer",
      standard: "geospatial, decision-driven, action-oriented, assurance-controlled",
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
