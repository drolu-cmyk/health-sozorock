import type {
  AuditEvent,
  ConsentCapability,
  ConsentState,
  ContentConfig,
  HealthAccessDayEvent,
  HubRecord,
  LocalResidentInteractionState,
  ServiceAvailability,
  ServiceResult,
} from "./types";

export interface ContentConfigService {
  listContentConfigs(): Promise<ServiceResult<ContentConfig[]>>;
  getContentConfig(id: string): Promise<ServiceResult<ContentConfig>>;
}

export interface HubDirectoryService {
  listHubs(): Promise<ServiceResult<HubRecord[]>>;
  findHubsByCounty(county: string): Promise<ServiceResult<HubRecord[]>>;
}

export interface HealthAccessDayService {
  listEvents(): Promise<ServiceResult<HealthAccessDayEvent[]>>;
  findEventsByCounty(county: string): Promise<ServiceResult<HealthAccessDayEvent[]>>;
}

export interface AuditEventService {
  planAuditEvent(event: AuditEvent): Promise<ServiceResult<AuditEvent>>;
}

export interface ConsentStateService {
  getConsentState(capability: ConsentCapability): Promise<ServiceResult<ConsentState>>;
}

export interface VoiceProvider {
  getAvailability(): ServiceAvailability;
  requestVoiceAccess(): Promise<ServiceResult<never>>;
}

export interface GuidanceProvider {
  getAvailability(): ServiceAvailability;
  getGuidance(state: LocalResidentInteractionState): Promise<ServiceResult<never>>;
}

export interface MapProvider {
  getAvailability(): ServiceAvailability;
  findNearbyAccessPoints(): Promise<ServiceResult<never>>;
}

export interface ConfigProvider {
  getServiceAvailability(): Promise<ServiceResult<ServiceAvailability[]>>;
}

