import { hubCards } from "@sozorock-health/shared";

export const hubDiscoveryProvider = {
  status: "staticFallback",
  search(query: string) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return hubCards;
    }

    return hubCards.filter((hub) =>
      [hub.name, hub.city, hub.county, hub.zipCode, hub.hubType]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  },
} as const;
