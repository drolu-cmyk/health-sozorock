export type CustomerFeatureState =
  | "Enabled"
  | "Limited access"
  | "Requires your permission"
  | "Request access"
  | "Available soon"
  | "Join the waitlist"
  | "Not available in your area yet"
  | "Temporarily unavailable";

export type LaunchSeverity = "launch blocker" | "high" | "medium" | "low";

export type LaunchAuditStatus = "pass" | "fail" | "needs work" | "blocked";

export type FeatureStateRecord = {
  featureKey: string;
  label: string;
  state: CustomerFeatureState;
  enabled: boolean;
  consentRequirement: string;
  geographyRequirement: string;
  supportPath: string;
  fallbackPath: string;
  publicExplanation: string;
  internalReadinessNote: string;
};

export type ConsentMatrixRecord = {
  feature: string;
  dataUsed: string;
  whyNeeded: string;
  stored: string;
  storageLocation: string;
  retentionPeriod: string;
  thirdPartyProviderInvolvement: string;
  consentNeeded: string;
  ifDenied: string;
  deletionPath: string;
  auditPath: string;
};

export type ContentTrustRecord = {
  name: string;
  owner: string;
  source: string;
  verificationStatus: string;
  reviewStatus: string;
  operatingStatus: string;
  geography: string;
  lastVerifiedDate: string;
  publicationStatus: string;
  allowedClaim: string;
  accessibilityNotes: string;
  privacyNotes: string;
};

export type LaunchAuditRecord = {
  item: string;
  status: LaunchAuditStatus;
  severity: LaunchSeverity;
  evidence: string;
  owner: string;
  fixPath: string;
  linkedFileOrIssue: string;
  goLiveDecision: string;
};

export const launchFeatureStates: FeatureStateRecord[] = [
  {
    featureKey: "access-start",
    label: "Start",
    state: "Enabled",
    enabled: true,
    consentRequirement: "No sensitive data required.",
    geographyRequirement: "Available in controlled public launch geography.",
    supportPath: "Request support",
    fallbackPath: "Continue with guided text",
    publicExplanation: "Choose what you need today and see a clear next step.",
    internalReadinessNote: "Resident navigation is client-side and non-clinical.",
  },
  {
    featureKey: "guided-text",
    label: "Type instead",
    state: "Enabled",
    enabled: true,
    consentRequirement: "No microphone consent required.",
    geographyRequirement: "Available wherever the public app is available.",
    supportPath: "Request support",
    fallbackPath: "Search by ZIP code, city, or county",
    publicExplanation: "Use plain-language guidance without using a microphone.",
    internalReadinessNote: "Safe text guidance is bounded by non-clinical copy and tests.",
  },
  {
    featureKey: "voice-access",
    label: "Talk to Voice Access",
    state: "Limited access",
    enabled: false,
    consentRequirement: "Microphone consent is required before audio can be used.",
    geographyRequirement: "Limited to approved launch settings after provider readiness approval.",
    supportPath: "Type instead",
    fallbackPath: "Continue with guided text",
    publicExplanation: "Voice Access is visible, but guided text is available while voice access is being opened carefully.",
    internalReadinessNote: "Server-side realtime adapter, rate limits, safety tests, and cost controls must pass before enablement.",
  },
  {
    featureKey: "zip-city-county-search",
    label: "Search by ZIP code",
    state: "Enabled",
    enabled: true,
    consentRequirement: "No location permission required.",
    geographyRequirement: "Launch geography controls what can be shown.",
    supportPath: "Request support",
    fallbackPath: "We could not find a nearby access point yet",
    publicExplanation: "Search by ZIP code, city, or county without sharing your location.",
    internalReadinessNote: "Directory results must come from reviewed content records before broader activation.",
  },
  {
    featureKey: "health-access-day",
    label: "Find a Health Access Day",
    state: "Limited access",
    enabled: true,
    consentRequirement: "No sign-up is required to read event information.",
    geographyRequirement: "Only listed where reviewed event information exists.",
    supportPath: "Request support",
    fallbackPath: "No Health Access Day is listed near you right now",
    publicExplanation: "See reviewed event information and what to expect.",
    internalReadinessNote: "Event records require owner, source, verification, review, and publication status.",
  },
  {
    featureKey: "health-equity-hubs",
    label: "Explore Health Equity Hubs",
    state: "Limited access",
    enabled: true,
    consentRequirement: "No location permission required for ZIP, city, or county search.",
    geographyRequirement: "Only reviewed access points can be shown.",
    supportPath: "Request support",
    fallbackPath: "We could not find a nearby access point yet",
    publicExplanation: "Browse reviewed access points without assuming a formal partnership.",
    internalReadinessNote: "Hub and access point publication depends on content trust review.",
  },
  {
    featureKey: "maps-location",
    label: "Find access near me",
    state: "Requires your permission",
    enabled: false,
    consentRequirement: "Location permission is required before precise location can be used.",
    geographyRequirement: "Limited to approved launch geography and approved map provider path.",
    supportPath: "Search by ZIP code instead",
    fallbackPath: "You can still search by ZIP code, city, or county",
    publicExplanation: "Location can help when approved, but search is always available.",
    internalReadinessNote: "Server-side map/location controls, consent logging, and provider review are required.",
  },
  {
    featureKey: "support-contact",
    label: "Request support",
    state: "Request access",
    enabled: true,
    consentRequirement: "Contact consent is required before SozoRock can respond.",
    geographyRequirement: "Support owner must be assigned for controlled launch geography.",
    supportPath: "Request support",
    fallbackPath: "Join the waitlist",
    publicExplanation: "Ask for help when the app cannot find the right access point.",
    internalReadinessNote: "Submission API, audit log, owner routing, and retention policy must be active before collecting contact details.",
  },
  {
    featureKey: "admin-operations",
    label: "Operating Intelligence Layer",
    state: "Limited access",
    enabled: false,
    consentRequirement: "Approved operator access only.",
    geographyRequirement: "Restricted to approved SozoRock, county, or community operators.",
    supportPath: "Request access",
    fallbackPath: "Available soon",
    publicExplanation: "This layer is for approved operators, not ordinary residents.",
    internalReadinessNote: "Role-based access, audit logs, admin content management, and incident response are launch blockers.",
  },
];

export const consentByFeatureMatrix: ConsentMatrixRecord[] = [
  {
    feature: "Voice Access",
    dataUsed: "Microphone audio only after permission.",
    whyNeeded: "To let a resident speak instead of type.",
    stored: "No raw audio or transcript storage in controlled launch v1.",
    storageLocation: "Not stored unless a later approved consent flow is added.",
    retentionPeriod: "Session only.",
    thirdPartyProviderInvolvement: "Approved realtime voice provider through a server-side adapter only.",
    consentNeeded: "Microphone consent.",
    ifDenied: "You can continue with guided text.",
    deletionPath: "No stored audio or transcript to delete in v1.",
    auditPath: "Consent event and adapter readiness audit.",
  },
  {
    feature: "AI guidance",
    dataUsed: "Resident-selected need and typed non-clinical question.",
    whyNeeded: "To explain app options and provider-readiness steps in plain language.",
    stored: "Session only unless approved support follow-up is requested.",
    storageLocation: "Server-side session boundary when enabled.",
    retentionPeriod: "Session only for guidance; support records follow support retention policy.",
    thirdPartyProviderInvolvement: "Approved AI provider through a server-side adapter only.",
    consentNeeded: "Guidance consent and non-clinical boundary acknowledgement.",
    ifDenied: "Use guided text and support links.",
    deletionPath: "Support deletion request path when support contact is used.",
    auditPath: "AI safety audit and non-clinical boundary test log.",
  },
  {
    feature: "Location and maps",
    dataUsed: "Location only after permission; ZIP, city, or county search otherwise.",
    whyNeeded: "To find nearby access points when approved.",
    stored: "No precise location history in v1.",
    storageLocation: "Server-side map adapter only when enabled.",
    retentionPeriod: "Session only.",
    thirdPartyProviderInvolvement: "Approved map/geocoding provider through server-side boundary.",
    consentNeeded: "Location permission.",
    ifDenied: "Search by ZIP code, city, or county.",
    deletionPath: "No precise location history to delete in v1.",
    auditPath: "Consent event and map adapter audit.",
  },
  {
    feature: "Hubs and Health Access Day",
    dataUsed: "Reviewed public directory and event records.",
    whyNeeded: "To show trusted access points and event information.",
    stored: "Public content records only.",
    storageLocation: "Content management database when production backend is enabled.",
    retentionPeriod: "Until review expiration or retirement.",
    thirdPartyProviderInvolvement: "No resident data provider needed for reading public content.",
    consentNeeded: "No consent needed to read public content.",
    ifDenied: "Not applicable.",
    deletionPath: "Content owner retires or corrects records through admin review.",
    auditPath: "Content trust audit log.",
  },
  {
    feature: "Support/contact",
    dataUsed: "Name, contact method, support request, and consent to respond only when submitted.",
    whyNeeded: "To let SozoRock or an approved operator respond.",
    stored: "Yes, only after consent.",
    storageLocation: "Production support database with audit logging.",
    retentionPeriod: "Defined support retention period before go-live.",
    thirdPartyProviderInvolvement: "Approved support tools only after review.",
    consentNeeded: "Contact and follow-up consent.",
    ifDenied: "Resident can continue using public guidance without contact submission.",
    deletionPath: "Support deletion request process.",
    auditPath: "Support case audit log.",
  },
];

export const contentTrustRecords: ContentTrustRecord[] = [
  {
    name: "East Branch Access Desk",
    owner: "Community Operations",
    source: "Reviewed local access record",
    verificationStatus: "reviewed",
    reviewStatus: "approved for controlled launch",
    operatingStatus: "active",
    geography: "Controlled launch county",
    lastVerifiedDate: "2026-07-08",
    publicationStatus: "published",
    allowedClaim: "Library-based access desk with digital readiness support.",
    accessibilityNotes: "Step-free public entry should be verified before broader launch.",
    privacyNotes: "No protected health information is requested at the app layer.",
  },
  {
    name: "Northside Community Access Point",
    owner: "Community Operations",
    source: "Reviewed Health Access Day planning record",
    verificationStatus: "reviewed",
    reviewStatus: "approved for controlled launch",
    operatingStatus: "active",
    geography: "Controlled launch county",
    lastVerifiedDate: "2026-07-08",
    publicationStatus: "published",
    allowedClaim: "Community access support and Health Access Day information.",
    accessibilityNotes: "Confirm transit and entry notes before public expansion.",
    privacyNotes: "Do not imply clinical care or provider relationship.",
  },
  {
    name: "Home Support Readiness Route",
    owner: "Support Operations",
    source: "Support readiness policy",
    verificationStatus: "unverified",
    reviewStatus: "limited access",
    operatingStatus: "pending",
    geography: "By approved request only",
    lastVerifiedDate: "2026-07-08",
    publicationStatus: "limited",
    allowedClaim: "Preparation support may be requested where approved.",
    accessibilityNotes: "Requires support-owner review.",
    privacyNotes: "Contact consent is required before follow-up.",
  },
];

export const productionBackendPath = [
  "Server-side APIs for guidance, Voice Access, maps, hubs, events, support, admin updates, and audit logs.",
  "Database records for hubs, access points, Health Access Day events, public copy, feature states, consent events, support submissions, adapter readiness, and launch metrics.",
  "Admin/content management with owner, source, verification, review, publication, geography, claim, accessibility, and privacy fields.",
  "Environment separation for local, controlled launch, and production.",
  "Secret management that keeps provider keys out of browser and mobile bundles.",
  "Audit logs for consent, content review, feature-state changes, support escalation, adapter readiness, and go-live decisions.",
  "Feature flags and kill switches for AI guidance, Voice Access, maps/location, support intake, notifications, and operator access.",
] as const;

export const securityOperationsControls = [
  "Monitoring and uptime checks",
  "Structured logging without PHI",
  "Dependency audit and vulnerability scanning",
  "CodeQL or equivalent scanning",
  "Rate limiting and abuse prevention",
  "Backup and restore plan",
  "Rollback and feature-disable plan",
  "Support escalation owner",
  "Incident response runbook",
  "Environment separation",
  "Secret rotation",
  "Least-privilege service accounts",
  "Cost and spend limits",
  "Provider outage response",
] as const;

export const launchAuditRegister: LaunchAuditRecord[] = [
  {
    item: "Customer-facing internal language",
    status: "pass",
    severity: "launch blocker",
    evidence: "Resident web and mobile screens use customer-facing service states.",
    owner: "Product",
    fixPath: "Run public launch copy guardrails before release.",
    linkedFileOrIssue: "#73",
    goLiveDecision: "Can proceed only if guardrail remains clean.",
  },
  {
    item: "Feature-state matrix",
    status: "pass",
    severity: "launch blocker",
    evidence: "launchFeatureStates declares state, enabled flag, consent, geography, support, fallback, public explanation, and readiness note.",
    owner: "Product Operations",
    fixPath: "Update src/lib/launch-governance.ts when a feature changes state.",
    linkedFileOrIssue: "#65",
    goLiveDecision: "Required for controlled public launch.",
  },
  {
    item: "Consent and privacy matrix",
    status: "pass",
    severity: "launch blocker",
    evidence: "consentByFeatureMatrix covers Voice Access, AI guidance, location/maps, hubs/events, and support/contact.",
    owner: "Privacy",
    fixPath: "Complete legal review before storing support records or enabling providers.",
    linkedFileOrIssue: "#63",
    goLiveDecision: "Proceed with no microphone-only or location-only path.",
  },
  {
    item: "AI-provider safety audit",
    status: "needs work",
    severity: "launch blocker",
    evidence: "Non-clinical boundaries are visible; provider safety evaluation set must be completed before enabling AI or Voice Access.",
    owner: "AI Safety",
    fixPath: "Add risky-request tests for diagnostic advice, medication, emergency, crisis, certainty, and escalation scenarios.",
    linkedFileOrIssue: "#67",
    goLiveDecision: "AI and live Voice Access stay gated.",
  },
  {
    item: "Secrets and environment separation proof",
    status: "needs work",
    severity: "launch blocker",
    evidence: "Backend path requires secret management and server-side provider adapters; no client-side secrets are present in launch UI.",
    owner: "Engineering",
    fixPath: "Connect approved secret store and document environment promotion.",
    linkedFileOrIssue: "#64",
    goLiveDecision: "Live providers stay gated until proof is complete.",
  },
  {
    item: "Incident response and rollback",
    status: "needs work",
    severity: "launch blocker",
    evidence: "Security operations controls define incident response, rollback, kill switch, and provider outage response.",
    owner: "Operations",
    fixPath: "Assign support owner and publish runbook before go-live.",
    linkedFileOrIssue: "#68",
    goLiveDecision: "Controlled web launch waits for owner assignment.",
  },
  {
    item: "Content trust for hubs and events",
    status: "pass",
    severity: "launch blocker",
    evidence: "contentTrustRecords require owner, source, verification, review, status, geography, claim, accessibility, and privacy fields.",
    owner: "Content Operations",
    fixPath: "Review each listed hub and event before expansion.",
    linkedFileOrIssue: "#66",
    goLiveDecision: "Only reviewed records can be shown.",
  },
  {
    item: "Accessibility",
    status: "needs work",
    severity: "high",
    evidence: "Typing and ZIP/city/county alternatives exist; screen-reader labels and focus states remain required QA checks.",
    owner: "Product QA",
    fixPath: "Run keyboard, screen-reader, contrast, scalable text, and low-bandwidth checks.",
    linkedFileOrIssue: "#70",
    goLiveDecision: "Must pass before wider public launch.",
  },
  {
    item: "Native release package",
    status: "needs work",
    severity: "medium",
    evidence: "Native package is prepared in parallel but does not block controlled public web launch.",
    owner: "Mobile",
    fixPath: "Complete icon, splash, TestFlight, Android internal testing, screenshots, privacy labels, and review notes.",
    linkedFileOrIssue: "#69",
    goLiveDecision: "Does not block controlled web launch.",
  },
];
