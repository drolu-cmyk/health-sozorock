import { healthAccessDayEvents } from "@sozorock-health/shared";

export const eventDiscoveryProvider = {
  status: "staticFallback",
  listEvents() {
    return healthAccessDayEvents;
  },
} as const;
