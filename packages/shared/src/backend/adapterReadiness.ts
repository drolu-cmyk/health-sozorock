import type { AdapterCapability } from "./consentGates";

export type AdapterReadinessStatus =
  | "unavailable"
  | "documentationOnly"
  | "mockOnly"
  | "consentRequired"
  | "credentialsRequired"
  | "legalReviewRequired"
  | "readyForInternalTesting"
  | "disabled";

export type AdapterReadiness = {
  service: AdapterCapability;
  status: AdapterReadinessStatus;
  reason: string;
  fallback: string;
  liveRuntimeEnabled: false;
  requiresConsent: boolean;
  requiresServerSideAdapter: boolean;
  requiresCredentials: boolean;
  lastUpdatedLabel: string;
};

const readinessFallbacks: Record<AdapterCapability, string> = {
  voiceAccess: "Use guided text support while Voice Access is unavailable.",
  aiGuidance: "Use static access guidance while AI guidance is unavailable.",
  mapDiscovery: "Use ZIP code, city, county, or listed hub information while map discovery is unavailable.",
  hubDirectory: "Use static hub information while live hub directory services are unavailable.",
  geospatialPlanning: "Use static planning panels while geospatial planning services are unavailable.",
};

export function createUnavailableReadiness(
  service: AdapterCapability,
  reason = "Live runtime is disabled for Issue 038.",
): AdapterReadiness {
  return {
    service,
    status: "unavailable",
    reason,
    fallback: readinessFallbacks[service],
    liveRuntimeEnabled: false,
    requiresConsent: service !== "hubDirectory",
    requiresServerSideAdapter: true,
    requiresCredentials: true,
    lastUpdatedLabel: "Issue 038 adapter shell",
  };
}

export function createDocumentationOnlyReadiness(service: AdapterCapability, reason: string): AdapterReadiness {
  return {
    ...createUnavailableReadiness(service, reason),
    status: "documentationOnly",
    requiresCredentials: false,
  };
}

export function isLiveRuntimeEnabled(readiness: AdapterReadiness): false {
  return readiness.liveRuntimeEnabled;
}

export const defaultAdapterReadiness: Record<AdapterCapability, AdapterReadiness> = {
  voiceAccess: createUnavailableReadiness("voiceAccess", "Voice Access needs consent, safety, and microphone review."),
  aiGuidance: createUnavailableReadiness("aiGuidance", "AI guidance needs consent, safety, and model review."),
  mapDiscovery: createUnavailableReadiness("mapDiscovery", "Map discovery needs location consent and map provider review."),
  hubDirectory: createDocumentationOnlyReadiness("hubDirectory", "Live hub directory service is not connected."),
  geospatialPlanning: createUnavailableReadiness(
    "geospatialPlanning",
    "Geospatial planning needs aggregate-data and server-side adapter review.",
  ),
};

