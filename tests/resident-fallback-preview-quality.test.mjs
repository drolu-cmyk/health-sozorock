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
const unavailableAdapters = read("packages/shared/src/backend/unavailableAdapters.ts");
const residentConsent = read("packages/shared/src/resident/consent.ts");
const previewQualityDocs = read("docs/sozorock-health/resident-fallback-preview-quality.md");
const readme = read("README.md");

const mobileSources = [
  mobileApp,
  aiProvider,
  voiceProvider,
  locationProvider,
  mapProvider,
  hubProvider,
  eventProvider,
].join("\n");
const fallbackSources = [mobileApp, unavailableAdapters].join("\n");

test("limited access cards put resident guidance before service state details", () => {
  const actionIndex = mobileApp.indexOf("What you can do now");
  const detailsIndex = mobileApp.indexOf("Service state");

  assert.match(mobileApp, /Limited access/);
  assert.match(mobileApp, /Guided text available/);
  assert.match(mobileApp, /fallback\.noPhiBoundary/);
  assert.match(unavailableAdapters, /No PHI\. Consent-based\. Non-clinical\./);
  assert.ok(actionIndex > -1, "resident action label should be present");
  assert.ok(detailsIndex > -1, "service state label should be present");
  assert.ok(actionIndex < detailsIndex, "resident action copy should come before service state details");
});

test("Voice Access uses guided text and keeps capture gated", () => {
  assert.match(residentConsent, /Voice Access readiness/);
  assert.match(mobileApp, /Use guided text/);
  assert.match(mobileApp, /Voice Access limited access/);
  assert.match(mobileApp, /guided text support/);
  assert.match(mobileApp, /No microphone capture/);
  assert.match(mobileApp, /No audio storage/);
  assert.match(mobileApp, /No transcript storage/);
  assert.doesNotMatch(mobileApp, /label="Speak"/);
  assert.doesNotMatch(mobileApp, /setMicrophonePermission\("granted"\)/);
  assert.match(voiceProvider, /microphoneEnabled: false/);
  assert.match(voiceProvider, /rawAudioStored: false/);
  assert.match(voiceProvider, /transcriptStored: false/);
});

test("AI, map, and hub fallbacks stay gated for launch", () => {
  assert.match(mobileApp, /title="AI guidance"/);
  assert.match(mobileApp, /title="Map discovery"/);
  assert.match(mobileApp, /title="Hub directory"/);
  assert.match(fallbackSources, /guided text/);
  assert.match(fallbackSources, /ZIP code, city, county/);
  assert.match(fallbackSources, /Expanded hub directory services are limited access/);
  assert.match(aiProvider, /staticFallback/);
  assert.match(mapProvider, /status: "requiresPermission"/);
  assert.match(mapProvider, /You can still use list-first access cards/);
  assert.match(hubProvider, /staticFallback/);
});

test("location fallback is neutral unavailable copy and not permission denial", () => {
  assert.match(mobileApp, /showLocationUnavailable/);
  assert.match(mobileApp, /onPrimary=\{showLocationUnavailable\}/);
  assert.match(mobileApp, /onSecondary=\{showLocationUnavailable\}/);
  assert.match(mobileApp, /This option needs your permission before it can be used\. You can search by ZIP code, city, or county\./);
  assert.doesNotMatch(mobileApp, /setLocationPermission\("granted"\)/);
  assert.doesNotMatch(mobileApp, /setLocationPermission\("denied"\)/);
  assert.doesNotMatch(mobileSources, /navigator\.geolocation|getCurrentPosition|watchPosition|react-native-maps/i);
  assert.match(locationProvider, /backgroundTracking: false/);
  assert.match(locationProvider, /locationHistory: false/);
});

test("resident app preview sources introduce no live services or sensitive configuration", () => {
  assert.doesNotMatch(mobileSources, /aws-sdk|@aws-sdk|firebase|@google|googleapis|vertex|gemini|openai/i);
  assert.doesNotMatch(mobileSources, /apiKey|secret|password|serviceAccount|GOOGLE_MAPS|VERTEX|GEMINI|OPENAI|AWS_/i);
  assert.doesNotMatch(mobileSources, /fetch\(|XMLHttpRequest|WebSocket|https?:\/\//);
  assert.doesNotMatch(mobileSources, /BACKEND_URL|API_URL|DATABASE_URL|\/api\//i);
  assert.doesNotMatch(mobileSources, /localStorage|sessionStorage|indexedDB|document\.cookie/i);
});

test("resident app preview sources avoid PHI-like, resident identity, and clinical workflow fields", () => {
  for (const forbidden of [
    "firstName",
    "lastName",
    "emailAddress",
    "phoneNumber",
    "residentId",
    "dateOfBirth",
    "medicalRecord",
    "providerMessage",
    "appointmentBooking",
    "insurancePlan",
    "paymentMethod",
    "rawAudioFile",
    "transcriptText",
    "preciseLocationAllowed",
    "locationHistorySnapshot",
  ]) {
    assert.doesNotMatch(mobileApp, new RegExp(forbidden, "i"));
  }
});

test("resident navigation still excludes county operating console language", () => {
  const residentNavigationSlice = mobileApp.slice(
    mobileApp.indexOf("residentBottomTabs"),
    mobileApp.indexOf("function HomeScreen"),
  );

  for (const forbidden of [
    "County Operating Intelligence",
    "Action Queue",
    "Assurance Log",
    "Scenario Planning",
    "County Layer",
    "AI Decision Support",
    "Synthetic Signals",
    "Backend architecture",
  ]) {
    assert.doesNotMatch(residentNavigationSlice, new RegExp(forbidden));
  }
});

test("resident fallback preview quality documentation records scope and next issue", () => {
  for (const phrase of [
    "Issue 040 reviews the resident app fallback experience",
    "No PHI. Consent-based. Non-clinical.",
    "Care for Every ZIP Code.",
    "Providers keep their platforms. We help you get ready.",
    "Signal → Decision → Action → Assurance → Impact",
    "What Remains Inactive",
    "Issue 041 - Static resident content readiness and accessibility audit",
  ]) {
    assert.match(previewQualityDocs, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("README links the resident fallback preview quality documentation", () => {
  assert.match(readme, /Resident fallback preview quality/);
  assert.match(readme, /resident-fallback-preview-quality\.md/);
});
