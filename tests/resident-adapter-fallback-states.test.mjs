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
const adapterReadiness = read("packages/shared/src/backend/adapterReadiness.ts");
const consentGates = read("packages/shared/src/backend/consentGates.ts");
const residentFallbackDocs = read("docs/sozorock-health/resident-adapter-fallback-states.md");

const mobileSources = [
  mobileApp,
  aiProvider,
  voiceProvider,
  locationProvider,
  mapProvider,
  hubProvider,
  eventProvider,
].join("\n");

const fallbackSources = [mobileApp, unavailableAdapters, adapterReadiness, consentGates].join("\n");

test("resident app references shared fallback and unavailable adapter states", () => {
  assert.match(mobileApp, /backend/);
  assert.match(mobileApp, /adapterFallbackStates/);
  assert.match(mobileApp, /createUnavailableAdapterResponse/);
  assert.match(mobileApp, /AdapterFallbackCard/);
  assert.match(mobileApp, /Voice Access status/);
  assert.match(mobileApp, /AI guidance status/);
  assert.match(mobileApp, /Map discovery status/);
  assert.match(mobileApp, /Hub directory status/);
});

test("Voice Access screen shows unavailable fallback without microphone activation", () => {
  assert.match(fallbackSources, /Voice Access is not active in this version/);
  assert.match(fallbackSources, /continue with guided text support|guided text support/i);
  assert.match(mobileApp, /No microphone capture/);
  assert.match(mobileApp, /No audio storage/);
  assert.match(mobileApp, /No transcript storage/);
  assert.doesNotMatch(mobileApp, /setMicrophonePermission\("granted"\)/);
  assert.doesNotMatch(mobileSources, /MediaRecorder|getUserMedia|navigator\.mediaDevices|audioBlob/i);
  assert.match(voiceProvider, /microphoneEnabled: false/);
  assert.match(voiceProvider, /rawAudioStored: false/);
  assert.match(voiceProvider, /transcriptStored: false/);
});

test("AI guidance fallback is visible and live AI remains inactive", () => {
  assert.match(fallbackSources, /AI guidance is not active in this version/);
  assert.match(fallbackSources, /static access guidance/);
  assert.match(aiProvider, /staticFallback/);
  assert.doesNotMatch(mobileSources, /Gemini|Vertex|OpenAI|generateContent|completion|chat\.completions/i);
});

test("map and location fallbacks are visible without maps or geolocation activation", () => {
  assert.match(fallbackSources, /Map discovery is not active in this version/);
  assert.match(fallbackSources, /ZIP code, city, county, or use listed hub information/);
  assert.match(mobileApp, /Planning tools are not active in the resident app/);
  assert.doesNotMatch(mobileApp, /setLocationPermission\("granted"\)/);
  assert.match(mobileApp, /type PermissionState = "notAsked" \| "granted" \| "denied" \| "unavailable"/);
  assert.match(mobileApp, /showLocationUnavailable/);
  assert.match(mobileApp, /setLocationPermission\("unavailable"\)/);
  assert.match(mobileApp, /onPrimary=\{showLocationUnavailable\}/);
  assert.match(mobileApp, /Location is not active in this version\. You can search by ZIP code, city, or county\./);
  assert.doesNotMatch(mobileSources, /navigator\.geolocation|getCurrentPosition|watchPosition|react-native-maps/i);
  assert.match(locationProvider, /backgroundTracking: false/);
  assert.match(locationProvider, /locationHistory: false/);
});

test("location unavailable state is neutral and does not imply resident denial", () => {
  const unavailableStateStart = mobileApp.indexOf('title="Location unavailable state"');
  const unavailableStateEnd = mobileApp.indexOf(") : null}", unavailableStateStart);
  const unavailableState = mobileApp.slice(unavailableStateStart, unavailableStateEnd);

  assert.match(unavailableState, /Location is not active in this version/);
  assert.match(unavailableState, /ZIP code, city, or county/);
  assert.doesNotMatch(unavailableState, /Permission was not granted|denied/i);
});

test("credential readiness copy follows requiresCredentials", () => {
  assert.match(mobileApp, /fallback\.readiness\.requiresCredentials/);
  assert.match(mobileApp, /Credentials not configured\. Live runtime disabled\./);
  assert.match(mobileApp, /No credentials required for this fallback state\. Live runtime disabled\./);
  assert.match(mobileApp, /credentialStatusCopy/);
});

test("Hub directory fallback does not display inaccurate credential-required copy", () => {
  assert.match(adapterReadiness, /hubDirectory: createDocumentationOnlyReadiness/);
  assert.match(adapterReadiness, /requiresCredentials: false/);
  assert.match(mobileApp, /Hub directory status/);
  assert.doesNotMatch(mobileApp, /Hub directory status[\s\S]{0,240}Credentials not configured/);
});

test("hub directory fallback stays local and does not call backend or network services", () => {
  assert.match(fallbackSources, /Live hub directory services are not active/);
  assert.match(hubProvider, /staticFallback/);
  assert.doesNotMatch(hubProvider, /fetch\(|XMLHttpRequest|WebSocket|https?:\/\//);
  assert.doesNotMatch(mobileSources, /BACKEND_URL|API_URL|DATABASE_URL|\/api\//i);
});

test("resident app sources introduce no SDK imports, secrets, API keys, or runtime endpoints", () => {
  assert.doesNotMatch(mobileSources, /aws-sdk|@aws-sdk|firebase|@google|googleapis|vertex|gemini|openai/i);
  assert.doesNotMatch(mobileSources, /apiKey|secret|password|serviceAccount|GOOGLE_MAPS|VERTEX|GEMINI|OPENAI|AWS_/i);
  assert.doesNotMatch(mobileSources, /fetch\(|XMLHttpRequest|WebSocket|https?:\/\//);
  assert.doesNotMatch(mobileSources, /localStorage|sessionStorage|indexedDB|document\.cookie/i);
});

test("resident app sources avoid resident identity and restricted data fields", () => {
  for (const forbidden of [
    "firstName",
    "lastName",
    "emailAddress",
    "phoneNumber",
    "residentId",
    "dateOfBirth",
    "medicalRecord",
    "insurance",
    "payment",
    "providerMessage",
    "preciseLocation",
    "locationHistorySnapshot",
    "backgroundTrackingEnabled",
  ]) {
    assert.doesNotMatch(mobileApp, new RegExp(forbidden, "i"));
  }
});

test("resident navigation does not expose county operating console labels", () => {
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

test("resident fallback documentation captures scope and stop rules", () => {
  for (const phrase of [
    "Issue 039 connects the resident app",
    "No PHI. Consent-based. Non-clinical.",
    "Care for Every ZIP Code.",
    "Providers keep their platforms. We help you get ready.",
    "What Remains Inactive",
    "Issue 040",
  ]) {
    assert.match(residentFallbackDocs, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
