import { createUnavailableReadiness, defaultAdapterReadiness } from "./adapterReadiness";
import type { AdapterReadiness } from "./adapterReadiness";
import { createConsentGate, defaultConsentGates } from "./consentGates";
import type { AdapterCapability, ConsentGate } from "./consentGates";
import { hubDirectoryService } from "./mockServices";
import type {
  AdapterShellRegistry,
  AdapterShellResponse,
  AiGuidanceAdapterShell,
  GeospatialPlanningAdapterShell,
  HubDirectoryAdapterShell,
  MapDiscoveryAdapterShell,
  VoiceAccessAdapterShell,
} from "./adapterShells";
import type { HubRecord, ServiceResult } from "./types";

const adapterNoPhiBoundary = "No PHI. Consent-based. Non-clinical." as const;

const residentSafeExplanations: Record<AdapterCapability, string> = {
  voiceAccess: "Voice Access is limited access. You can continue with guided text support.",
  aiGuidance: "AI guidance is limited access. You can continue with guided text.",
  mapDiscovery:
    "Map discovery requires your permission before it can be used. You can search by ZIP code, city, county, or use listed hub information when available.",
  hubDirectory: "Expanded hub directory services are limited access. Reviewed hub information may be shown when available.",
  geospatialPlanning: "Geospatial planning is limited access for approved operators. Planning remains review-only.",
};

export function createUnavailableAdapterResponse(
  capability: AdapterCapability,
  consentGate: ConsentGate = defaultConsentGates[capability],
  readiness: AdapterReadiness = createUnavailableReadiness(capability),
): AdapterShellResponse<never> {
  return {
    available: false,
    ok: false,
    capability,
    readiness,
    consentGate,
    residentSafeExplanation: residentSafeExplanations[capability],
    fallbackPath: consentGate.fallback,
    noPhiBoundary: adapterNoPhiBoundary,
    liveRuntimeEnabled: false,
    data: null,
  };
}

export const unavailableVoiceAccessAdapter: VoiceAccessAdapterShell = {
  capability: "voiceAccess",
  getReadiness() {
    return defaultAdapterReadiness.voiceAccess;
  },
  async requestVoiceAccess(consentGate: ConsentGate) {
    return createUnavailableAdapterResponse("voiceAccess", consentGate, defaultAdapterReadiness.voiceAccess);
  },
};

export const unavailableAiGuidanceAdapter: AiGuidanceAdapterShell = {
  capability: "aiGuidance",
  getReadiness() {
    return defaultAdapterReadiness.aiGuidance;
  },
  async requestGuidance(consentGate: ConsentGate) {
    return createUnavailableAdapterResponse("aiGuidance", consentGate, defaultAdapterReadiness.aiGuidance);
  },
};

export const unavailableMapDiscoveryAdapter: MapDiscoveryAdapterShell = {
  capability: "mapDiscovery",
  getReadiness() {
    return defaultAdapterReadiness.mapDiscovery;
  },
  async requestMapDiscovery(consentGate: ConsentGate) {
    return createUnavailableAdapterResponse("mapDiscovery", consentGate, defaultAdapterReadiness.mapDiscovery);
  },
};

export const unavailableHubDirectoryAdapter: HubDirectoryAdapterShell = {
  capability: "hubDirectory",
  getReadiness() {
    return defaultAdapterReadiness.hubDirectory;
  },
  async listHubs(): Promise<ServiceResult<HubRecord[]>> {
    return hubDirectoryService.listHubs();
  },
};

export const unavailableGeospatialPlanningAdapter: GeospatialPlanningAdapterShell = {
  capability: "geospatialPlanning",
  getReadiness() {
    return defaultAdapterReadiness.geospatialPlanning;
  },
  async requestPlanningView(consentGate: ConsentGate) {
    return createUnavailableAdapterResponse(
      "geospatialPlanning",
      consentGate,
      defaultAdapterReadiness.geospatialPlanning,
    );
  },
};

export function createUnavailableAdapterShells(): AdapterShellRegistry {
  return {
    voiceAccess: unavailableVoiceAccessAdapter,
    aiGuidance: unavailableAiGuidanceAdapter,
    mapDiscovery: unavailableMapDiscoveryAdapter,
    hubDirectory: unavailableHubDirectoryAdapter,
    geospatialPlanning: unavailableGeospatialPlanningAdapter,
  };
}

export const unavailableAdapterShells = createUnavailableAdapterShells();

export function createDefaultConsentGate(capability: AdapterCapability): ConsentGate {
  return createConsentGate({
    capability,
    status: "unavailable",
    required: capability !== "hubDirectory",
  });
}
