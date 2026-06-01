import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const mobileApp = read("apps/mobile/App.tsx");
const aiProvider = read("apps/mobile/src/services/aiGuidanceProvider.ts");
const voiceProvider = read("apps/mobile/src/services/voiceInputProvider.ts");
const locationProvider = read("apps/mobile/src/services/locationProvider.ts");
const mapProvider = read("apps/mobile/src/services/mapProvider.ts");
const hubProvider = read("apps/mobile/src/services/hubDiscoveryProvider.ts");
const eventProvider = read("apps/mobile/src/services/eventDiscoveryProvider.ts");
const residentContent = read("packages/shared/src/resident/content.ts");
const residentConsent = read("packages/shared/src/resident/consent.ts");
const residentEvents = read("packages/shared/src/resident/events.ts");
const residentHubs = read("packages/shared/src/resident/hubs.ts");
const residentNavigation = read("packages/shared/src/resident/navigation.ts");
const residentPathways = read("packages/shared/src/resident/pathways.ts");
const residentPrivacy = read("packages/shared/src/resident/privacy.ts");
const residentSafety = read("packages/shared/src/resident/safety.ts");
const auditDoc = read("docs/sozorock-health/resident-content-accessibility-audit.md");
const fallbackPreviewDoc = read("docs/sozorock-health/resident-fallback-preview-quality.md");
const fallbackStatesDoc = read("docs/sozorock-health/resident-adapter-fallback-states.md");
const adapterShellDoc = read("docs/sozorock-health/consent-gated-adapter-shells.md");
const readme = read("README.md");

const residentSharedSources = [
  residentContent,
  residentConsent,
  residentEvents,
  residentHubs,
  residentNavigation,
  residentPathways,
  residentPrivacy,
  residentSafety,
].join("\n");

const mobileSources = [
  mobileApp,
  aiProvider,
  voiceProvider,
  locationProvider,
  mapProvider,
  hubProvider,
  eventProvider,
].join("\n");

const residentDocs = [auditDoc, fallbackPreviewDoc, fallbackStatesDoc, adapterShellDoc].join("\n");

test("resident content preserves locked boundary and operating logic language", () => {
  assert.match(residentSharedSources, /Care for Every ZIP Code\./);
  assert.match(residentSharedSources, /No PHI\. Consent-based\. Non-clinical\./);
  assert.match(residentPathways, /Providers keep their platforms\. We help you get ready\./);
  assert.match(auditDoc, /Signal → Decision → Action → Assurance → Impact/);
  assert.doesNotMatch(residentDocs, /Signal -> Decision -> Action -> Assurance -> Impact/);
  assert.doesNotMatch(auditDoc, /Signal → Decision → Action → Assurance → Impact\./);
});

test("Voice Access is named correctly and not used as a live speech assistant", () => {
  assert.match(residentSharedSources, /Voice Access/);
  assert.match(residentConsent, /Voice Access is not active in this version/);
  assert.match(residentContent, /Use guided text for non-clinical access guidance/);
  assert.match(mobileApp, /accessibilityLabel="Use guided text support\. Voice Access is inactive\."/);
  assert.match(mobileApp, /accessibilityLabel="Choose a static Voice Access topic"/);
  assert.doesNotMatch(`${mobileSources}\n${residentSharedSources}`, /label="Speak"|Speak or type|speak to a live|live voice assistant/i);
  assert.doesNotMatch(`${mobileSources}\n${residentSharedSources}`, /Sozo Assistant|SozoBot|AI doctor|clinical assistant/i);
});

test("resident accessibility labels describe static actions without misleading live capability", () => {
  for (const phrase of [
    "Open resident menu",
    "Open Voice Access guided text support",
    "Continue to the selected resident support option",
    "Search by ZIP code, city, or county",
    "Open static guidance topic",
  ]) {
    assert.match(mobileApp, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.doesNotMatch(mobileApp, /accessibilityLabel="Use location once"|accessibilityLabel="Start microphone"|accessibilityLabel="Open live map"/);
});

test("resident navigation remains resident-only", () => {
  for (const label of [
    "Home",
    "Start",
    "Voice",
    "Day",
    "Hubs",
    "Provider-Led Pathway",
    "How SozoRock Health Works",
    "Privacy Boundary",
    "Accessibility",
    "About SozoRock Health",
  ]) {
    assert.match(residentNavigation, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  for (const forbidden of [
    "County console",
    "County Operating Intelligence",
    "geospatial dashboard",
    "administrator console",
    "provider dashboard",
    "backend dashboard",
    "AI console",
    "analytics console",
    "PHI dashboard",
    "appointment workflow",
    "insurance workflow",
    "payments workflow",
  ]) {
    assert.doesNotMatch(`${residentNavigation}\n${mobileApp}`, new RegExp(forbidden, "i"));
  }
});

test("Voice Access, AI guidance, maps, and location remain inactive/static", () => {
  assert.match(voiceProvider, /microphoneEnabled: false/);
  assert.match(voiceProvider, /rawAudioStored: false/);
  assert.match(voiceProvider, /transcriptStored: false/);
  assert.match(aiProvider, /staticFallback/);
  assert.match(mapProvider, /mapReadyPlaceholder/);
  assert.match(locationProvider, /backgroundTracking: false/);
  assert.match(locationProvider, /locationHistory: false/);
  assert.match(residentConsent, /No microphone capture is active/);
  assert.match(residentConsent, /No location permission prompt starts here/);
  assert.match(residentHubs, /Location inactive in this version/);
  assert.doesNotMatch(mobileApp, /setMicrophonePermission\("granted"\)|setLocationPermission\("granted"\)/);
});

test("Health Access Day copy remains non-clinical and does not imply scheduling or PHI collection", () => {
  assert.match(residentEvents, /It is not a clinical visit and does not replace licensed care/);
  assert.match(residentEvents, /Browsing does not require registration/);
  assert.match(residentEvents, /No sign-up is required for basic browsing/);
  assert.doesNotMatch(residentEvents, /appointment scheduling|book an appointment|clinical screening|emergency care|provider-patient/i);
  assert.doesNotMatch(residentEvents, /firstName|lastName|emailAddress|phoneNumber|residentId|medicalRecord/i);
});

test("resident runtime sources introduce no live services, SDK imports, endpoints, secrets, or storage", () => {
  assert.doesNotMatch(mobileSources, /fetch\(|XMLHttpRequest|WebSocket|https?:\/\//);
  assert.doesNotMatch(mobileSources, /aws-sdk|@aws-sdk|firebase|@google|googleapis|react-native-maps|vertex|gemini|openai/i);
  assert.doesNotMatch(mobileSources, /apiKey|secret|password|serviceAccount|DATABASE_URL|BACKEND_URL|GOOGLE_MAPS|VERTEX|GEMINI|OPENAI|AWS_/i);
  assert.doesNotMatch(mobileSources, /localStorage|sessionStorage|indexedDB|document\.cookie/i);
});

test("resident runtime sources do not introduce identity, PHI, clinical, insurance, payment, or EHR workflow fields", () => {
  for (const forbidden of [
    "firstName",
    "lastName",
    "emailAddress",
    "phoneNumber",
    "residentId",
    "dateOfBirth",
    "medicalRecord",
    "memberIdentifier",
    "subscriberIdentifier",
    "insurancePlan",
    "claimNumber",
    "paymentMethod",
    "ehrRecord",
    "providerMessageDraft",
    "appointmentBooking",
    "rawAudioFile",
    "transcriptText",
    "preciseLocationAllowed",
    "locationHistorySnapshot",
  ]) {
    assert.doesNotMatch(mobileApp, new RegExp(forbidden, "i"));
  }
});

test("resident content accessibility audit documentation captures scope and stop rules", () => {
  for (const phrase of [
    "Issue 041 audits the resident app's static content",
    "No PHI. Consent-based. Non-clinical.",
    "Care for Every ZIP Code.",
    "Providers keep their platforms. We help you get ready.",
    "Signal → Decision → Action → Assurance → Impact",
    "Accessibility Label Rules",
    "Inactive Services Confirmed",
    "Issue 042 - Static preview deployment readiness checklist",
  ]) {
    assert.match(auditDoc, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("README links the resident content accessibility audit", () => {
  assert.match(readme, /Resident content accessibility audit/);
  assert.match(readme, /resident-content-accessibility-audit\.md/);
});
