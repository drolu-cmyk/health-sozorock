import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const backendIndex = read("packages/shared/src/backend/index.ts");
const consentGates = read("packages/shared/src/backend/consentGates.ts");
const adapterReadiness = read("packages/shared/src/backend/adapterReadiness.ts");
const adapterShells = read("packages/shared/src/backend/adapterShells.ts");
const unavailableAdapters = read("packages/shared/src/backend/unavailableAdapters.ts");
const mockServices = read("packages/shared/src/backend/mockServices.ts");
const types = read("packages/shared/src/backend/types.ts");
const noPhiRules = read("packages/shared/src/backend/noPhiRules.ts");
const docs = [
  read("docs/sozorock-health/consent-gated-adapter-shells.md"),
  read("docs/sozorock-health/service-adapter-readiness.md"),
].join("\n");

const adapterSources = [consentGates, adapterReadiness, adapterShells, unavailableAdapters].join("\n");
const runtimeSources = [adapterSources, mockServices, types].join("\n");

test("consent gate exports exist", () => {
  for (const exportPath of ["./consentGates", "./adapterReadiness", "./adapterShells", "./unavailableAdapters"]) {
    assert.match(backendIndex, new RegExp(exportPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  for (const name of [
    "createConsentGate",
    "isCapabilityAllowed",
    "requireConsentForCapability",
    "getCapabilityFallback",
    "defaultConsentGates",
  ]) {
    assert.match(consentGates, new RegExp(`export (function|const) ${name}`));
  }
});

test("adapter readiness exports exist and live runtime is always false", () => {
  for (const name of [
    "createUnavailableReadiness",
    "createDocumentationOnlyReadiness",
    "defaultAdapterReadiness",
  ]) {
    assert.match(adapterReadiness, new RegExp(`export (function|const) ${name}`));
  }

  assert.match(adapterReadiness, /liveRuntimeEnabled: false/);
  assert.doesNotMatch(adapterReadiness, /liveRuntimeEnabled: true/);
});

test("adapter shell exports exist", () => {
  for (const name of [
    "VoiceAccessAdapterShell",
    "AiGuidanceAdapterShell",
    "MapDiscoveryAdapterShell",
    "HubDirectoryAdapterShell",
    "GeospatialPlanningAdapterShell",
    "AdapterShellRegistry",
  ]) {
    assert.match(adapterShells, new RegExp(`type ${name}`));
  }
});

test("consent helper matches default consent gate policy", async () => {
  const adapterModule = await importAdapterShellModule();
  const capabilities = [
    "voiceAccess",
    "aiGuidance",
    "mapDiscovery",
    "hubDirectory",
    "geospatialPlanning",
  ];

  assert.equal(adapterModule.requireConsentForCapability("voiceAccess"), true);
  assert.equal(adapterModule.requireConsentForCapability("aiGuidance"), true);
  assert.equal(adapterModule.requireConsentForCapability("mapDiscovery"), true);
  assert.equal(adapterModule.requireConsentForCapability("geospatialPlanning"), true);

  for (const capability of capabilities) {
    assert.equal(
      adapterModule.requireConsentForCapability(capability),
      adapterModule.defaultConsentGates[capability].required,
      `${capability} consent helper must match default gate required policy`,
    );
  }
});

test("unavailable adapters return unavailable fallback states", async () => {
  const adapterModule = await importAdapterShellModule();
  const consentGate = adapterModule.createConsentGate({ capability: "voiceAccess", status: "unavailable" });

  const voice = await adapterModule.unavailableVoiceAccessAdapter.requestVoiceAccess(consentGate);
  assert.equal(voice.available, false);
  assert.equal(voice.ok, false);
  assert.equal(voice.liveRuntimeEnabled, false);
  assert.match(voice.residentSafeExplanation, /Voice Access is not active/);
  assert.equal(voice.noPhiBoundary, "No PHI. Consent-based. Non-clinical.");

  const guidance = await adapterModule.unavailableAiGuidanceAdapter.requestGuidance(
    adapterModule.createConsentGate({ capability: "aiGuidance", status: "unavailable" }),
    "static support",
  );
  assert.equal(guidance.available, false);
  assert.equal(guidance.liveRuntimeEnabled, false);

  const map = await adapterModule.unavailableMapDiscoveryAdapter.requestMapDiscovery(
    adapterModule.createConsentGate({ capability: "mapDiscovery", status: "unavailable" }),
    "ZIP code",
  );
  assert.equal(map.available, false);
  assert.match(map.residentSafeExplanation, /Map discovery is not active/);

  const planning = await adapterModule.unavailableGeospatialPlanningAdapter.requestPlanningView(
    adapterModule.createConsentGate({ capability: "geospatialPlanning", status: "reviewRequired" }),
    "county panel",
  );
  assert.equal(planning.available, false);
  assert.equal(planning.liveRuntimeEnabled, false);
});

test("hub adapter shell uses local mock fallback without throwing", async () => {
  const adapterModule = await importAdapterShellModule();
  const hubs = await adapterModule.unavailableHubDirectoryAdapter.listHubs(
    adapterModule.createConsentGate({ capability: "hubDirectory", status: "reviewRequired", required: false }),
  );

  assert.equal(hubs.ok, true);
  assert.equal(hubs.data.length > 0, true);
  assert.equal(adapterModule.unavailableHubDirectoryAdapter.getReadiness().liveRuntimeEnabled, false);
});

test("Voice Access unavailable adapter does not capture microphone data", () => {
  assert.doesNotMatch(unavailableAdapters, /MediaRecorder|getUserMedia|navigator\.mediaDevices|audioBlob|\brawAudio\b|\btranscript\b/i);
});

test("AI guidance unavailable adapter does not call live models", () => {
  assert.doesNotMatch(unavailableAdapters, /Gemini|Vertex|OpenAI|model|completion|generateContent|chat/i);
});

test("map and geospatial shells do not call maps, geolocation, or cloud resources", () => {
  assert.doesNotMatch(unavailableAdapters, /Google Maps|geolocation|getCurrentPosition|watchPosition|Directions|Places|Cloud/i);
});

test("adapter shell sources introduce no network calls, SDK imports, secrets, or endpoints", () => {
  assert.doesNotMatch(runtimeSources, /fetch\(|XMLHttpRequest|WebSocket|https?:\/\//);
  assert.doesNotMatch(runtimeSources, /aws-sdk|@aws-sdk|firebase|@google|googleapis|react-native-maps|vertex|gemini|openai/i);
  assert.doesNotMatch(runtimeSources, /apiKey|secret|password|serviceAccount|DATABASE_URL|BACKEND_URL|GOOGLE_MAPS|VERTEX|GEMINI|OPENAI|AWS_/i);
  assert.doesNotMatch(runtimeSources, /localStorage|sessionStorage|indexedDB|cookie/i);
});

test("adapter shell sources avoid PHI-like and resident identity fields", () => {
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
    "diagnosis",
    "symptoms",
    "providerMessage",
    "preciseLocation",
    "locationHistory",
    "backgroundTracking",
  ]) {
    assert.doesNotMatch(runtimeSources, new RegExp(forbidden, "i"));
  }
});

test("all readiness objects keep liveRuntimeEnabled false", async () => {
  const adapterModule = await importAdapterShellModule();
  for (const readiness of Object.values(adapterModule.defaultAdapterReadiness)) {
    assert.equal(readiness.liveRuntimeEnabled, false);
  }
});

test("existing safe mock services still do not throw", async () => {
  const adapterModule = await importAdapterShellModule();
  await assert.doesNotReject(() => adapterModule.healthAccessDayService.listEvents());
  await assert.doesNotReject(() => adapterModule.configProvider.getServiceAvailability());
});

test("adapter shell documentation captures readiness and stop rules", () => {
  for (const phrase of [
    "Issue 038 adds consent-gated adapter shells",
    "No PHI. Consent-based. Non-clinical.",
    "server-side adapters",
    "No Client-Side Secrets Rule",
    "Issue 039",
  ]) {
    assert.match(docs, new RegExp(phrase));
  }
});

async function importAdapterShellModule() {
  const source = [
    noPhiRules,
    types,
    stripImports(read("packages/shared/src/backend/mockServices.ts")),
    stripImports(consentGates),
    stripImports(adapterReadiness),
    stripImports(adapterShells),
    stripImports(unavailableAdapters),
  ].join("\n");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const encoded = Buffer.from(outputText, "utf8").toString("base64");
  return import(`data:text/javascript;base64,${encoded}`);
}

function stripImports(source) {
  return source.replace(/^import(?:.|\r?\n)*?;\r?\n/gm, "");
}
