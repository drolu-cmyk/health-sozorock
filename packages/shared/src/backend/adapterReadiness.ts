import type { AdapterCapability } from "./consentGates";

export type AdapterReadinessStatus =
  | "unavailable"
  | "sourceOfTruthOnly"
  | "limitedAccess"
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
  voiceAccess: "Use guided text support while Voice Access is limited access.",
  aiGuidance: "Use guided text while AI guidance is limited access.",
  mapDiscovery: "Use ZIP code, city, county, or listed hub information while map discovery is unavailable.",
  hubDirectory: "Use reviewed hub information while expanded hub directory services are unavailable.",
  geospatialPlanning: "Use reviewed planning panels while geospatial planning services are unavailable.",
};

export function createUnavailableReadiness(
  service: AdapterCapability,
  reason = "This option is temporarily unavailable for controlled public launch.",
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
    lastUpdatedLabel: "Controlled public launch adapter shell",
  };
}

export function createSourceOfTruthReadiness(service: AdapterCapability, reason: string): AdapterReadiness {
  return {
    ...createUnavailableReadiness(service, reason),
    status: "sourceOfTruthOnly",
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
  hubDirectory: createSourceOfTruthReadiness("hubDirectory", "Expanded hub directory service is available soon."),
  geospatialPlanning: createUnavailableReadiness(
    "geospatialPlanning",
    "Geospatial planning needs aggregate-data and server-side adapter review.",
  ),
};

