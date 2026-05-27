export type AdapterCapability =
  | "voiceAccess"
  | "aiGuidance"
  | "mapDiscovery"
  | "hubDirectory"
  | "geospatialPlanning";

export type ConsentGateStatus = "notRequested" | "granted" | "denied" | "unavailable" | "reviewRequired";

export type AdapterConsentStorageMode = "none" | "sessionOnly" | "futureApprovedStorage";

export type ConsentGate = {
  capability: AdapterCapability;
  status: ConsentGateStatus;
  required: boolean;
  residentFacingExplanation: string;
  fallback: string;
  storageMode: AdapterConsentStorageMode;
  lastUpdatedLabel: string;
};

const defaultFallbacks: Record<AdapterCapability, string> = {
  voiceAccess: "Voice Access is not active in this version. You can continue with guided text support.",
  aiGuidance: "AI guidance is not active in this version. You can continue with static access guidance.",
  mapDiscovery:
    "Map discovery is not active in this version. You can search by ZIP code, city, county, or use listed hub information when available.",
  hubDirectory: "Live hub directory services are not active. You can use static hub information when available.",
  geospatialPlanning: "Geospatial planning is not active. County planning remains static and review-only.",
};

const defaultExplanations: Record<AdapterCapability, string> = {
  voiceAccess:
    "Voice Access requires a future microphone consent review. The current shell does not capture audio.",
  aiGuidance:
    "AI guidance requires future consent, safety review, and server-side adapter approval. Static guidance remains available.",
  mapDiscovery:
    "Map discovery requires future location consent and server-side adapter approval. ZIP, city, and county alternatives remain available.",
  hubDirectory:
    "Hub directory service access must remain non-clinical and must not imply formal partnership without review.",
  geospatialPlanning:
    "Geospatial planning is for aggregate planning support only and must not expose resident identity.",
};

export function createConsentGate(input: {
  capability: AdapterCapability;
  status?: ConsentGateStatus;
  required?: boolean;
  residentFacingExplanation?: string;
  fallback?: string;
  storageMode?: AdapterConsentStorageMode;
  lastUpdatedLabel?: string;
}): ConsentGate {
  return {
    capability: input.capability,
    status: input.status ?? "notRequested",
    required: input.required ?? true,
    residentFacingExplanation: input.residentFacingExplanation ?? defaultExplanations[input.capability],
    fallback: input.fallback ?? defaultFallbacks[input.capability],
    storageMode: input.storageMode ?? "none",
    lastUpdatedLabel: input.lastUpdatedLabel ?? "Issue 038 adapter shell",
  };
}

export function isCapabilityAllowed(gate: ConsentGate): boolean {
  return gate.required ? gate.status === "granted" : gate.status !== "denied" && gate.status !== "unavailable";
}

export function requireConsentForCapability(capability: AdapterCapability): boolean {
  return (
    capability === "voiceAccess" ||
    capability === "aiGuidance" ||
    capability === "mapDiscovery" ||
    capability === "geospatialPlanning"
  );
}

export function getCapabilityFallback(capability: AdapterCapability): string {
  return defaultFallbacks[capability];
}

export const defaultConsentGates: Record<AdapterCapability, ConsentGate> = {
  voiceAccess: createConsentGate({ capability: "voiceAccess", required: true, status: "unavailable" }),
  aiGuidance: createConsentGate({ capability: "aiGuidance", required: true, status: "unavailable" }),
  mapDiscovery: createConsentGate({ capability: "mapDiscovery", required: true, status: "unavailable" }),
  hubDirectory: createConsentGate({ capability: "hubDirectory", required: false, status: "reviewRequired" }),
  geospatialPlanning: createConsentGate({ capability: "geospatialPlanning", required: true, status: "reviewRequired" }),
};
