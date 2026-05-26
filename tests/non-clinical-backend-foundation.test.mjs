import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const backendIndex = read("packages/shared/src/backend/index.ts");
const sharedIndex = read("packages/shared/src/index.ts");
const backendTypes = read("packages/shared/src/backend/types.ts");
const serviceContracts = read("packages/shared/src/backend/serviceContracts.ts");
const mockServices = read("packages/shared/src/backend/mockServices.ts");
const foundationDoc = read("docs/sozorock-health/non-clinical-backend-foundation.md");
const boundaryDoc = read("docs/sozorock-health/backend-data-boundaries.md");
const mobileConfig = read("apps/mobile/app.json");
const rootPackage = read("package.json");

const runtimeSources = [backendTypes, serviceContracts, mockServices, mobileConfig, rootPackage].join("\n");

test("backend foundation exports exist", () => {
  for (const exportPath of ["./types", "./noPhiRules", "./serviceContracts", "./mockServices"]) {
    assert.match(backendIndex, new RegExp(exportPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(sharedIndex, /export \* as backend from "\.\/backend"/);
});

test("safe backend model definitions are present", () => {
  for (const model of [
    "ContentConfig",
    "HubRecord",
    "HealthAccessDayEvent",
    "AuditEvent",
    "ConsentState",
    "ServiceAvailability",
    "LocalResidentInteractionState",
  ]) {
    assert.match(backendTypes, new RegExp(`type ${model}`));
  }

  assert.match(backendTypes, /containsRestrictedData: false/);
});

test("provider-neutral service contracts are present without cloud SDK imports", () => {
  for (const contract of [
    "ContentConfigService",
    "HubDirectoryService",
    "HealthAccessDayService",
    "AuditEventService",
    "ConsentStateService",
    "VoiceProvider",
    "GuidanceProvider",
    "MapProvider",
    "ConfigProvider",
  ]) {
    assert.match(serviceContracts, new RegExp(`interface ${contract}`));
  }

  assert.doesNotMatch(serviceContracts, /aws-sdk|@aws-sdk|firebase|@google|googleapis|maps\/api|vertex|gemini/i);
});

test("no-PHI utility detects restricted field names", async () => {
  const rules = await importNoPhiRules();

  for (const fieldName of [
    "lab",
    "labs",
    "diagnosis",
    "diagnosisNotes",
    "insurance",
    "insurancePlan",
    "dateOfBirth",
    "providerMessage",
    "providerMessageDraft",
    "memberId",
    "memberIdentifier",
    "subscriberId",
    "subscriberIdentifier",
    "policyNumber",
    "rawAudio",
    "rawAudioFile",
    "transcript",
    "transcriptText",
    "preciseLocation",
    "preciseLocationAllowed",
    "locationHistory",
    "locationHistorySnapshot",
    "backgroundTracking",
    "backgroundTrackingEnabled",
    "dob",
  ]) {
    assert.equal(rules.isRestrictedFieldName(fieldName), true);
  }

  for (const fieldName of [
    "dateLabel",
    "lastCheckedLabel",
    "availabilityLabel",
    "accessibilityNotes",
    "privacyNotes",
  ]) {
    assert.equal(rules.isRestrictedFieldName(fieldName), false);
  }

  assert.equal(rules.isRestrictedFieldName("diagnosis"), true);
  assert.equal(rules.isRestrictedFieldName("memberId"), true);
  assert.equal(rules.isRestrictedFieldName("preciseLocation"), true);
  assert.equal(rules.isRestrictedFieldName("accessibilityNotes"), false);

  const matches = rules.listRestrictedFieldMatches({
    safe: {
      hubName: "Access point",
      rawAudio: false,
    },
    nested: [{ policyNumber: "blocked" }],
  });

  assert.deepEqual(matches, ["nested.0.policyNumber", "safe.rawAudio"]);
  assert.throws(() => rules.assertNoRestrictedFields({ appointment: "blocked" }), /Restricted backend field names/);
});

test("safe backend mock services do not throw on label field names", async () => {
  const services = await importMockServices();

  await assert.doesNotReject(() => services.healthAccessDayService.listEvents());
  await assert.doesNotReject(() => services.configProvider.getServiceAvailability());

  const events = await services.healthAccessDayService.listEvents();
  assert.equal(events.ok, true);
  assert.equal(events.data[0].dateLabel, "June 20, 2026");

  const availability = await services.configProvider.getServiceAvailability();
  assert.equal(availability.ok, true);
  assert.equal(availability.data[0].lastCheckedLabel, "Issue 037 local foundation");
});

test("safe model examples do not contain restricted fields", () => {
  const sourceWithoutRules = [backendTypes, serviceContracts, mockServices].join("\n");
  const restrictedTerms = [
    "memberId",
    "subscriberId",
    "policyNumber",
    "ssn",
    "dateOfBirth",
    "medicalRecord",
    "providerMessage",
    "rawAudio",
    "transcript",
    "preciseLocation",
    "locationHistory",
    "backgroundTracking",
  ];

  for (const term of restrictedTerms) {
    assert.doesNotMatch(sourceWithoutRules, new RegExp(term, "i"));
  }
});

test("mock and no-op services do not include network calls, secrets, or persistence", () => {
  assert.doesNotMatch(mockServices, /fetch\(|XMLHttpRequest|WebSocket|https?:\/\//);
  assert.doesNotMatch(mockServices, /localStorage|sessionStorage|indexedDB|cookie/i);
  assert.doesNotMatch(mockServices, /apiKey|secret|token|password|credential|serviceAccount/i);
  assert.doesNotMatch(mockServices, /aws-sdk|@aws-sdk|firebase|@google|googleapis|vertex|gemini/i);
});

test("voice, guidance, and map providers remain unavailable no-op providers", () => {
  for (const provider of ["voiceProvider", "guidanceProvider", "mapProvider"]) {
    assert.match(mockServices, new RegExp(`export const ${provider}`));
  }

  assert.match(mockServices, /Voice Access capture is not active in Issue 037/);
  assert.match(mockServices, /Live guidance is not active in Issue 037/);
  assert.match(mockServices, /Map and geospatial discovery are not active in Issue 037/);
});

test("no backend endpoint or cloud resource config is introduced", () => {
  assert.doesNotMatch(runtimeSources, /NEXT_PUBLIC_|EXPO_PUBLIC_|DATABASE_URL|API_URL|BACKEND_URL|FIREBASE|GOOGLE_MAPS|VERTEX|GEMINI|AWS_ACCESS_KEY/i);
  assert.doesNotMatch(runtimeSources, /https?:\/\//);
  assert.doesNotMatch(runtimeSources, /CloudFormation|AWS::|amplify\/backend|firebaseConfig|google-services\.json/i);
});

test("resident identity fields and PHI-like fields are absent from runtime foundation", () => {
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
  ]) {
    assert.doesNotMatch(runtimeSources, new RegExp(forbidden, "i"));
  }
});

test("documentation captures backend foundation scope and stop rules", () => {
  for (const phrase of [
    "ADR-035 recommends a hybrid future architecture",
    "This is a boundary and contract layer only",
    "No backend runtime",
    "server-side adapters",
    "Issue 038",
  ]) {
    assert.match(foundationDoc, new RegExp(phrase));
  }

  for (const phrase of [
    "Data Classes",
    "Restricted Fields",
    "Resident Data Exclusion Rules",
    "County Workspace Separation Rules",
    "Stop Rules",
  ]) {
    assert.match(boundaryDoc, new RegExp(phrase));
  }
});

async function importNoPhiRules() {
  const source = read("packages/shared/src/backend/noPhiRules.ts");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const encoded = Buffer.from(outputText, "utf8").toString("base64");
  return import(`data:text/javascript;base64,${encoded}`);
}

async function importMockServices() {
  const source = [
    read("packages/shared/src/backend/noPhiRules.ts"),
    read("packages/shared/src/backend/mockServices.ts")
      .replace(/import \{ assertNoRestrictedFields \} from "\.\/noPhiRules";\r?\n/, "")
      .replace(/import type \{[\s\S]*?\} from "\.\/types";\r?\n/, "")
      .replace(/import type \{[\s\S]*?\} from "\.\/serviceContracts";\r?\n/, ""),
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
