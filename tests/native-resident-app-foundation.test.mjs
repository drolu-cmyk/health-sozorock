import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const mobileApp = read("apps/mobile/App.tsx");
const mobilePackage = read("apps/mobile/package.json");
const mobileConfig = read("apps/mobile/app.json");
const mobileMetro = read("apps/mobile/metro.config.js");
const aiProvider = read("apps/mobile/src/services/aiGuidanceProvider.ts");
const voiceProvider = read("apps/mobile/src/services/voiceInputProvider.ts");
const locationProvider = read("apps/mobile/src/services/locationProvider.ts");
const mapProvider = read("apps/mobile/src/services/mapProvider.ts");
const hubProvider = read("apps/mobile/src/services/hubDiscoveryProvider.ts");
const eventProvider = read("apps/mobile/src/services/eventDiscoveryProvider.ts");
const sharedIndex = read("packages/shared/src/index.ts");
const navigation = read("packages/shared/src/resident/navigation.ts");
const content = read("packages/shared/src/resident/content.ts");
const hubs = read("packages/shared/src/resident/hubs.ts");
const events = read("packages/shared/src/resident/events.ts");
const pathways = read("packages/shared/src/resident/pathways.ts");
const privacy = read("packages/shared/src/resident/privacy.ts");
const safety = read("packages/shared/src/resident/safety.ts");
const consent = read("packages/shared/src/resident/consent.ts");
const types = read("packages/shared/src/resident/types.ts");
const nativePlan = read("docs/sozorock-health/native-app-product-plan.md");
const rootPackage = read("package.json");

test("Expo mobile workspace is isolated from the Next.js web app", () => {
  assert.match(rootPackage, /"apps\/mobile"/);
  assert.match(rootPackage, /"packages\/shared"/);
  assert.match(mobilePackage, /"expo": "56\.0\.4"/);
  assert.match(mobilePackage, /"react-native": "0\.85\.3"/);
  assert.match(mobileMetro, /packages\/shared/);
});

test("resident app exposes required bottom tabs and menu drawer items", () => {
  for (const label of ["Home", "Start", "Voice", "Day", "Hubs"]) {
    assert.match(navigation, new RegExp(`label: "${label}"`));
  }

  for (const label of [
    "Provider-Led Pathway",
    "How SozoRock Health Works",
    "Privacy Boundary",
    "Accessibility",
    "About SozoRock Health",
  ]) {
    assert.match(navigation, new RegExp(`label: "${label}"`));
  }
});

test("resident app navigation excludes internal county and infrastructure labels", () => {
  const residentNavigation = `${navigation}\n${mobileApp}`;
  for (const forbidden of [
    "County Operating Intelligence",
    "Action Queue",
    "Assurance Log",
    "Scenario Planning",
    "Administrative controls",
    "System configuration",
    "Backend architecture",
    "CloudFront",
  ]) {
    assert.doesNotMatch(residentNavigation, new RegExp(forbidden));
  }
});

test("resident screens required by the app foundation are present", () => {
  for (const component of [
    "HomeScreen",
    "StartScreen",
    "VoiceScreen",
    "HealthAccessDayScreen",
    "HubsScreen",
    "ProviderPathwayScreen",
    "PrivacyBoundaryScreen",
    "HowItWorksScreen",
    "AccessibilityScreen",
    "AboutScreen",
  ]) {
    assert.match(mobileApp, new RegExp(`function ${component}`));
  }
});

test("required resident trust and emergency copy is shared and rendered", () => {
  for (const phrase of [
    "Care for Every ZIP Code.",
    "No PHI. Consent-based. Non-clinical.",
    "Nothing is submitted or stored unless you choose to continue.",
    "Voice Access provides non-clinical support and does not give medical advice.",
    "Providers keep their platforms. We help you get ready.",
    "Location is used only with your permission.",
    "If this is an emergency, call 911.",
    "If you may harm yourself or someone else, call or text 988 in the U.S.",
  ]) {
    assert.match(`${content}\n${safety}\n${pathways}\n${mobileApp}`, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("Voice Access has consent, type fallback, topic fallback, and no raw audio storage", () => {
  assert.match(consent, /Voice Access is optional/);
  assert.match(consent, /You can type instead/);
  assert.match(mobileApp, /Type instead/);
  assert.match(mobileApp, /Choose topic/);
  assert.match(voiceProvider, /rawAudioStored: false/);
  assert.match(voiceProvider, /transcriptStored: false/);
});

test("location and map boundaries support permission refusal and static fallback", () => {
  assert.match(consent, /No background tracking/);
  assert.match(locationProvider, /backgroundTracking: false/);
  assert.match(locationProvider, /locationHistory: false/);
  assert.match(locationProvider, /movementTracking: false/);
  assert.match(mapProvider, /mapReadyPlaceholder/);
  assert.match(mobileApp, /ZIP code, city, or county/);
});

test("hub cards include map-ready fields and neutral partner wording", () => {
  for (const field of [
    "hubType",
    "address",
    "distanceLabel",
    "hours",
    "accessSupport",
    "accessibilityNotes",
    "directionsLabel",
    "verificationStatus",
    "lastUpdated",
    "privacyNote",
    "partnerStatus",
    "latitude",
    "longitude",
  ]) {
    assert.match(`${types}\n${hubs}`, new RegExp(field));
  }
  assert.match(hubs, /Formal partnership is not implied/);
  assert.match(hubProvider, /staticFallback/);
});

test("Health Access Day event cards include required event model fields", () => {
  for (const field of [
    "eventName",
    "date",
    "time",
    "venue",
    "whatToExpect",
    "whatToBring",
    "whatIsNotCollected",
    "whoItIsFor",
    "accessibilityNotes",
    "registrationStatus",
    "eventStatus",
    "lastUpdated",
    "latitude",
    "longitude",
  ]) {
    assert.match(`${types}\n${events}`, new RegExp(field));
  }
  assert.match(eventProvider, /staticFallback/);
});

test("privacy boundary includes data classification without activating storage", () => {
  for (const category of [
    "No data collected",
    "Session-only app state",
    "Optional contact data",
    "Location data",
    "ZIP code search",
    "Voice input",
    "AI transcript",
    "Event interest",
    "Hub search",
    "Future account data",
  ]) {
    assert.match(privacy, new RegExp(category));
  }
  assert.match(privacy, /No persistent storage in V0/);
});

test("service adapters are placeholders and do not activate live external services", () => {
  for (const source of [aiProvider, voiceProvider, locationProvider, mapProvider, hubProvider, eventProvider]) {
    assert.doesNotMatch(source, /fetch\(|XMLHttpRequest|https?:\/\//);
  }
  assert.match(aiProvider, /staticFallback/);
  assert.match(mapProvider, /Google Maps/);
});

test("native product plan covers roadmap, app store readiness, and stop rules", () => {
  for (const phrase of [
    "V0 - App Foundation",
    "V1 - Live Resident Services",
    "V2 - Operational Readiness",
    "App Store Readiness Checklist",
    "Stop Rules",
    "Web Mirroring Strategy",
    "Future Backend Boundary",
  ]) {
    assert.match(nativePlan, new RegExp(phrase));
  }
});

test("shared package exports all resident product domains", () => {
  for (const exportPath of [
    "./resident/navigation",
    "./resident/content",
    "./resident/hubs",
    "./resident/events",
    "./resident/pathways",
    "./resident/privacy",
    "./resident/safety",
    "./resident/consent",
    "./resident/types",
  ]) {
    assert.match(sharedIndex, new RegExp(exportPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("Expo config does not require developer store credentials", () => {
  assert.match(mobileConfig, /org\.sozorockfoundation\.health\.resident/);
  assert.doesNotMatch(mobileConfig, /appleTeamId|ascAppId|googleServiceFile|apiKey|secret/i);
});
