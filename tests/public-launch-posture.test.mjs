import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const publicResidentSources = [
  read("src/app/page.tsx"),
  read("src/app/resident/page.tsx"),
  read("src/app/about-model/page.tsx"),
  read("src/app/county/page.tsx"),
  read("src/lib/resident-data.ts"),
  read("src/lib/voice-access-data.ts"),
  read("apps/mobile/App.tsx"),
  read("apps/mobile/src/services/aiGuidanceProvider.ts"),
  read("packages/shared/src/resident/content.ts"),
  read("packages/shared/src/resident/consent.ts"),
  read("packages/shared/src/backend/unavailableAdapters.ts"),
  read("packages/shared/src/backend/consentGates.ts"),
].join("\n");

const launchGovernance = read("src/lib/launch-governance.ts");

const bannedCustomerFacingTerms = [
  "advisory",
  "demo",
  "preview",
  "scaffold",
  "prototype",
  "roadmap",
  "not implemented",
  "coming from backend",
  "static",
  "test mode",
  "future feature",
  "MVP",
  "fallback preview",
  "live services disabled",
  "inactive",
  "in this version",
  "preview details",
  "credentials not configured",
  "server-side adapter required",
  "static simulation",
  "synthetic prototype",
];

test("resident-facing launch surfaces do not expose internal build language", () => {
  for (const term of bannedCustomerFacingTerms) {
    assert.doesNotMatch(publicResidentSources, new RegExp(`\\b${term}\\b`, "i"), `${term} should not appear in resident-facing copy`);
  }
});

test("feature-state matrix declares public labels, state, consent, support, fallback, and readiness", () => {
  for (const field of [
    "featureKey",
    "label",
    "state",
    "enabled",
    "consentRequirement",
    "geographyRequirement",
    "supportPath",
    "fallbackPath",
    "publicExplanation",
    "internalReadinessNote",
  ]) {
    assert.match(launchGovernance, new RegExp(field));
  }

  for (const state of [
    "Enabled",
    "Limited access",
    "Requires your permission",
    "Request access",
    "Available soon",
    "Join the waitlist",
    "Not available in your area yet",
    "Temporarily unavailable",
  ]) {
    assert.match(launchGovernance, new RegExp(state.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("consent matrix covers voice, AI, location, directory, support, denial, deletion, and audit paths", () => {
  for (const phrase of [
    "Voice Access",
    "AI guidance",
    "Location and maps",
    "Hubs and Health Access Day",
    "Support/contact",
    "ifDenied",
    "deletionPath",
    "auditPath",
    "thirdPartyProviderInvolvement",
  ]) {
    assert.match(launchGovernance, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("non-clinical boundary, typing alternative, and ZIP city county search remain visible", () => {
  for (const phrase of [
    "SozoRock Health does not diagnose, treat, write prescriptions, or replace licensed care.",
    "Voice Access provides non-clinical support and does not give medical advice.",
    "Type instead",
    "ZIP code, city, or county",
    "Search by ZIP code",
    "The app works without microphone or location access.",
  ]) {
    assert.match(publicResidentSources, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("launch audit register blocks go-live until required controls are closed", () => {
  for (const audit of [
    "Customer-facing internal language",
    "Feature-state matrix",
    "Consent and privacy matrix",
    "AI-provider safety audit",
    "Secrets and environment separation proof",
    "Incident response and rollback",
    "Content trust for hubs and events",
    "Accessibility",
    "Native release package",
  ]) {
    assert.match(launchGovernance, new RegExp(audit.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(launchGovernance, /severity: "launch blocker"/);
  assert.match(launchGovernance, /goLiveDecision/);
});
