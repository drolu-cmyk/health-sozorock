import { assertNoRestrictedFields } from "./noPhiRules";
import type {
  AuditEvent,
  ConsentCapability,
  ConsentState,
  ContentConfig,
  HealthAccessDayEvent,
  HubRecord,
  ServiceAvailability,
  ServiceResult,
} from "./types";
import type {
  AuditEventService,
  ConfigProvider,
  ConsentStateService,
  ContentConfigService,
  GuidanceProvider,
  HealthAccessDayService,
  HubDirectoryService,
  MapProvider,
  VoiceProvider,
} from "./serviceContracts";

const lastCheckedLabel = "Issue 037 local foundation";

export const serviceUnavailableFallback =
  "Static resident guidance remains available. Live services are not active in this foundation.";

export const mockContentConfigs: ContentConfig[] = [
  {
    id: "resident-boundary",
    title: "Resident trust boundary",
    body: "No PHI. Consent-based. Non-clinical.",
    audience: "resident",
    status: "active",
    lastUpdated: "May 26, 2026",
    reviewStatus: "approved",
    sourceType: "static-local",
  },
  {
    id: "provider-pathway",
    title: "Provider-led pathway readiness",
    body: "Providers keep their platforms. We help you get ready.",
    audience: "resident",
    status: "active",
    lastUpdated: "May 26, 2026",
    reviewStatus: "approved",
    sourceType: "static-local",
  },
];

export const mockHubRecords: HubRecord[] = [
  {
    id: "hub-eastview-library",
    name: "Eastview Public Library Access Point",
    category: "library",
    county: "Eastview County",
    city: "Eastview",
    state: "TX",
    zip: "75001",
    accessibilityNotes: "Step-free entrance and public computer access.",
    verificationStatus: "reviewed",
    partnerStatus: "formal-partner-not-implied",
    lastUpdated: "May 26, 2026",
    privacyNotes: "Browsing this listing does not create a profile or submit private information.",
  },
];

export const mockHealthAccessDayEvents: HealthAccessDayEvent[] = [
  {
    id: "had-eastview-2026-06",
    title: "Health Access Day Readiness Session",
    county: "Eastview County",
    city: "Eastview",
    state: "TX",
    dateLabel: "June 20, 2026",
    status: "planned",
    venueType: "community-center",
    accessibilityNotes: "Accessible entrance and seating expected.",
    privacyNotes: "No private health information is needed for basic event information.",
    partnerStatus: "formal-partner-not-implied",
    verificationStatus: "reviewed",
    lastUpdated: "May 26, 2026",
  },
];

export const mockServiceAvailability: ServiceAvailability[] = [
  makeAvailability("content-config", "available", "Static content configuration is available locally."),
  makeAvailability("hub-directory", "available", "Static hub examples are available locally."),
  makeAvailability("health-access-day", "available", "Static event examples are available locally."),
  makeAvailability("audit-event", "planned", "Audit event persistence is not active."),
  makeAvailability("consent-state", "planned", "Consent state is planning-only in Issue 037."),
  makeAvailability("voice", "unavailable", serviceUnavailableFallback),
  makeAvailability("guidance", "unavailable", serviceUnavailableFallback),
  makeAvailability("map", "unavailable", serviceUnavailableFallback),
  makeAvailability("configuration", "available", "Local configuration defaults are available."),
];

export const contentConfigService: ContentConfigService = {
  async listContentConfigs() {
    return ok(mockContentConfigs, "content-config");
  },
  async getContentConfig(id: string) {
    const config = mockContentConfigs.find((item) => item.id === id);
    return config ? ok(config, "content-config") : unavailable("content-config", "Content configuration was not found.");
  },
};

export const hubDirectoryService: HubDirectoryService = {
  async listHubs() {
    return ok(mockHubRecords, "hub-directory");
  },
  async findHubsByCounty(county: string) {
    return ok(
      mockHubRecords.filter((hub) => hub.county.toLowerCase() === county.toLowerCase()),
      "hub-directory",
    );
  },
};

export const healthAccessDayService: HealthAccessDayService = {
  async listEvents() {
    return ok(mockHealthAccessDayEvents, "health-access-day");
  },
  async findEventsByCounty(county: string) {
    return ok(
      mockHealthAccessDayEvents.filter((event) => event.county.toLowerCase() === county.toLowerCase()),
      "health-access-day",
    );
  },
};

export const auditEventService: AuditEventService = {
  async planAuditEvent(event: AuditEvent) {
    assertNoRestrictedFields(event);
    return ok(event, "audit-event");
  },
};

export const consentStateService: ConsentStateService = {
  async getConsentState(capability: ConsentCapability) {
    const state: ConsentState = {
      capability,
      status: "planned-only",
      lastUpdated: "May 26, 2026",
      storageMode: "none",
      residentFacingExplanation: "This capability is not active. The app remains usable with static guidance.",
    };

    return ok(state, "consent-state");
  },
};

export const voiceProvider: VoiceProvider = {
  getAvailability() {
    return makeAvailability("voice", "unavailable", serviceUnavailableFallback);
  },
  async requestVoiceAccess() {
    return unavailable("voice", "Voice Access capture is not active in Issue 037.");
  },
};

export const guidanceProvider: GuidanceProvider = {
  getAvailability() {
    return makeAvailability("guidance", "unavailable", serviceUnavailableFallback);
  },
  async getGuidance() {
    return unavailable("guidance", "Live guidance is not active in Issue 037.");
  },
};

export const mapProvider: MapProvider = {
  getAvailability() {
    return makeAvailability("map", "unavailable", serviceUnavailableFallback);
  },
  async findNearbyAccessPoints() {
    return unavailable("map", "Map and geospatial discovery are not active in Issue 037.");
  },
};

export const configProvider: ConfigProvider = {
  async getServiceAvailability() {
    return ok(mockServiceAvailability, "configuration");
  },
};

function ok<T>(data: T, service: ServiceAvailability["service"]): ServiceResult<T> {
  assertNoRestrictedFields(data);

  return {
    ok: true,
    data,
    availability: makeAvailability(service, "available", "Local static fallback is available."),
  };
}

function unavailable<T>(service: ServiceAvailability["service"], reason: string): ServiceResult<T> {
  return {
    ok: false,
    data: null,
    availability: makeAvailability(service, "unavailable", serviceUnavailableFallback),
    reason,
  };
}

function makeAvailability(
  service: ServiceAvailability["service"],
  status: ServiceAvailability["status"],
  fallback: string,
): ServiceAvailability {
  return {
    service,
    status,
    fallback,
    lastCheckedLabel,
  };
}

