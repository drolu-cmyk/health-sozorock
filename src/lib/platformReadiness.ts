export const targetPlatforms = [
  "iOS",
  "Android",
  "Web mobile",
  "Web tablet",
  "Web desktop",
] as const;

export const platformReadiness = {
  current: "Responsive Next.js web app shell on the active CloudFront preview domain.",
  recommendedNativePath:
    "Add Expo / React Native packaging after the shared product domains, fixtures, and boundaries are stable.",
  packagingStatus: "Not implemented in this issue.",
  nativeStopRule:
    "Do not add native packaging until it can reuse the resident and county product model without adding backend, PHI, clinical workflow, or resident data capture.",
} as const;
