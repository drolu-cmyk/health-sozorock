export type DataClass =
  | "public-content"
  | "operational-content"
  | "local-resident-interaction-state"
  | "restricted-data";

export type Audience = "resident" | "county" | "shared";

export type LifecycleStatus = "draft" | "active" | "retired";

export type ReviewStatus = "not-reviewed" | "in-review" | "approved" | "changes-needed";

export type SourceType = "static-local" | "admin-managed-future" | "system-generated-future";

export type VerificationStatus = "unverified" | "reviewed" | "verified";

export type PartnerStatus = "listed-access-point" | "community-location" | "formal-partner-not-implied";

export type ServiceStatus = "available" | "unavailable" | "planned";

export type ConsentCapability =
  | "microphone"
  | "location"
  | "ai-guidance"
  | "maps-geospatial"
  | "follow-up"
  | "saved-preferences";

export type ConsentStatus = "not-requested" | "granted" | "denied" | "planned-only";

export type ConsentStorageMode = "none" | "session-only" | "future-approved-storage";

export type ContentConfig = {
  id: string;
  title: string;
  body: string;
  audience: Audience;
  status: LifecycleStatus;
  lastUpdated: string;
  reviewStatus: ReviewStatus;
  sourceType: SourceType;
};

export type HubRecord = {
  id: string;
  name: string;
  category: "library" | "community" | "mobile" | "digital-access";
  county: string;
  city: string;
  state: string;
  zip: string;
  accessibilityNotes: string;
  verificationStatus: VerificationStatus;
  partnerStatus: PartnerStatus;
  lastUpdated: string;
  privacyNotes: string;
};

export type HealthAccessDayEvent = {
  id: string;
  title: string;
  county: string;
  city: string;
  state: string;
  dateLabel: string;
  status: "planned" | "scheduled" | "completed" | "paused";
  venueType: "library" | "community-center" | "faith-community" | "school" | "mobile";
  accessibilityNotes: string;
  privacyNotes: string;
  partnerStatus: PartnerStatus;
  verificationStatus: VerificationStatus;
  lastUpdated: string;
};

export type AuditEvent = {
  id: string;
  eventType: "content-reviewed" | "boundary-checked" | "service-unavailable" | "future-consent-planned";
  actorType: "system" | "admin" | "reviewer";
  targetType: "content-config" | "hub-record" | "health-access-day-event" | "service-contract";
  occurredAt: string;
  summary: string;
  dataClass: Exclude<DataClass, "restricted-data">;
  containsRestrictedData: false;
};

export type ConsentState = {
  capability: ConsentCapability;
  status: ConsentStatus;
  lastUpdated: string;
  storageMode: ConsentStorageMode;
  residentFacingExplanation: string;
};

export type ServiceAvailability = {
  service:
    | "content-config"
    | "hub-directory"
    | "health-access-day"
    | "audit-event"
    | "consent-state"
    | "voice"
    | "guidance"
    | "map"
    | "configuration";
  status: ServiceStatus;
  fallback: string;
  lastCheckedLabel: string;
};

export type LocalResidentInteractionState = {
  selectedAppPath?: "start" | "voice" | "day" | "hubs" | "provider-pathway";
  localNeedChoice?: "local-support" | "health-access-day" | "digital-help" | "voice-access" | "provider-pathway";
  permissionState?: "not-requested" | "granted" | "denied";
  sessionOnlyGuidanceState?: "not-started" | "showing-static-guidance" | "complete";
};

export type ServiceResult<T> =
  | {
      ok: true;
      data: T;
      availability: ServiceAvailability;
    }
  | {
      ok: false;
      data: null;
      availability: ServiceAvailability;
      reason: string;
    };

