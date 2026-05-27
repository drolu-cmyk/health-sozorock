import type { AdapterReadiness } from "./adapterReadiness";
import type { AdapterCapability, ConsentGate } from "./consentGates";
import type { HubRecord, ServiceResult } from "./types";

export type AdapterShellResponse<T> = {
  available: false;
  ok: false;
  capability: AdapterCapability;
  readiness: AdapterReadiness;
  consentGate: ConsentGate;
  residentSafeExplanation: string;
  fallbackPath: string;
  noPhiBoundary: "No PHI. Consent-based. Non-clinical.";
  liveRuntimeEnabled: false;
  data: T | null;
};

export type VoiceAccessAdapterShell = {
  capability: "voiceAccess";
  getReadiness(): AdapterReadiness;
  requestVoiceAccess(consentGate: ConsentGate): Promise<AdapterShellResponse<never>>;
};

export type AiGuidanceAdapterShell = {
  capability: "aiGuidance";
  getReadiness(): AdapterReadiness;
  requestGuidance(consentGate: ConsentGate, topic: string): Promise<AdapterShellResponse<never>>;
};

export type MapDiscoveryAdapterShell = {
  capability: "mapDiscovery";
  getReadiness(): AdapterReadiness;
  requestMapDiscovery(consentGate: ConsentGate, searchLabel: string): Promise<AdapterShellResponse<never>>;
};

export type HubDirectoryAdapterShell = {
  capability: "hubDirectory";
  getReadiness(): AdapterReadiness;
  listHubs(consentGate: ConsentGate): Promise<ServiceResult<HubRecord[]>>;
};

export type GeospatialPlanningAdapterShell = {
  capability: "geospatialPlanning";
  getReadiness(): AdapterReadiness;
  requestPlanningView(consentGate: ConsentGate, planningLabel: string): Promise<AdapterShellResponse<never>>;
};

export type AdapterShellRegistry = {
  voiceAccess: VoiceAccessAdapterShell;
  aiGuidance: AiGuidanceAdapterShell;
  mapDiscovery: MapDiscoveryAdapterShell;
  hubDirectory: HubDirectoryAdapterShell;
  geospatialPlanning: GeospatialPlanningAdapterShell;
};

