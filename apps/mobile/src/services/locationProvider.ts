export const locationProvider = {
  status: "permissionRequired",
  backgroundTracking: false,
  locationHistory: false,
  movementTracking: false,
  fallbackOptions: ["ZIP code", "city", "county"],
} as const;
