import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const exists = (path) => existsSync(new URL(`../${path}`, import.meta.url));
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const readinessPath = "docs/sozorock-health/static-preview-deployment-readiness.md";
const manualQaPath = "docs/sozorock-health/manual-preview-qa-checklist.md";

const readinessDoc = read(readinessPath);
const manualQaDoc = read(manualQaPath);
const readme = read("README.md");
const docs = `${readinessDoc}\n${manualQaDoc}`;

test("static preview readiness documents exist", () => {
  assert.equal(exists(readinessPath), true);
  assert.equal(exists(manualQaPath), true);
});

test("preview documents preserve required resident boundary language", () => {
  for (const phrase of [
    "No PHI. Consent-based. Non-clinical.",
    "Care for Every ZIP Code.",
    "Providers keep their platforms. We help you get ready.",
  ]) {
    assert.match(docs, new RegExp(escapeRegExp(phrase)));
  }
});

test("locked operating logic phrase is exact when referenced", () => {
  const lockedPhrase = "Signal → Decision → Action → Assurance → Impact";

  assert.match(docs, new RegExp(escapeRegExp(lockedPhrase)));
  assert.doesNotMatch(docs, /Signal -> Decision -> Action -> Assurance -> Impact/);
  assert.doesNotMatch(docs, /Signal → Decision → Action → Assurance → Impact\./);
});

test("Voice Access is named correctly without assistant shorthand", () => {
  assert.match(docs, /Voice Access/);
  assert.doesNotMatch(docs, /Sozo Assistant|SozoBot|AI doctor|clinical assistant/i);
});

test("preview docs preserve static and inactive service posture", () => {
  for (const phrase of [
    "This is a static resident app preview.",
    "Live services are disabled.",
    "No PHI is collected.",
    "The app demonstrates resident-facing access guidance and fallback behavior only.",
    "Voice Access is inactive",
    "AI guidance is static/inactive",
    "Map discovery is inactive",
    "Location is inactive",
    "Hub information is static/local-only",
    "No county operating console is visible in resident navigation.",
  ]) {
    assert.match(docs, new RegExp(escapeRegExp(phrase)));
  }
});

test("preview docs do not imply live AI, maps, microphone, location, backend, PHI, or clinical workflow", () => {
  assert.doesNotMatch(docs, /^-? ?Live services are enabled\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Live services are active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Live AI is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Live maps are active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Location capture is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Backend runtime is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Resident data is collected\.?$/im);
  assert.doesNotMatch(docs, /^-? ?PHI is collected\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Clinical workflow is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?This preview is a clinical tool\.?$/im);
});

test("preview docs do not include secrets, env examples, SDK imports, cloud setup, or deployment commands", () => {
  assert.doesNotMatch(docs, /API_KEY=|SECRET=|TOKEN=|DATABASE_URL=|BACKEND_URL=|GOOGLE_MAPS_API_KEY=|AWS_ACCESS_KEY_ID=/);
  assert.doesNotMatch(docs, /import .*aws-sdk|import .*@aws-sdk|import .*firebase|import .*@google|import .*googleapis|import .*openai/i);
  assert.doesNotMatch(docs, /npm install .*aws|npm install .*firebase|npm install .*google|npm install .*openai/i);
  assert.doesNotMatch(docs, /aws cloudformation|aws cloudfront|aws route53|amplify publish|amplify push|firebase deploy|gcloud deploy|eas build|eas submit/i);
});

test("static preview readiness document includes required checklist sections", () => {
  for (const phrase of [
    "Relation To Issue 041",
    "Ready For Static Preview",
    "Required Pre-Preview Checks",
    "Resident App Checklist",
    "Content Checklist",
    "Accessibility Checklist",
    "No-PHI Checklist",
    "Non-Clinical Checklist",
    "Inactive Service Checklist",
    "Browser QA Checklist",
    "Rollback And Checkpoint Notes",
    "Stakeholder Preview Notes",
    "Stop Rules",
    "Issue 043 - Static preview stakeholder review packet",
  ]) {
    assert.match(readinessDoc, new RegExp(escapeRegExp(phrase)));
  }
});

test("manual preview QA checklist covers resident screens and preview surfaces", () => {
  for (const phrase of [
    "Home",
    "Start",
    "Voice Access",
    "Health Access Day",
    "Hubs",
    "Provider-Led Pathway",
    "How SozoRock Health Works",
    "Privacy Boundary",
    "Accessibility",
    "About SozoRock Health",
    "Menu Drawer",
    "Bottom Navigation",
    "Fallback Preview Cards",
    "Mobile Viewport",
    "Desktop Browser Preview",
    "Console And Network",
  ]) {
    assert.match(manualQaDoc, new RegExp(escapeRegExp(phrase)));
  }
});

test("manual QA checklist blocks county console exposure and live service behavior", () => {
  for (const phrase of [
    "no county operating console appears in resident navigation",
    "no live service behavior appears",
    "No microphone capture starts.",
    "No geolocation prompt appears.",
    "No backend request is made for hub information.",
    "No unexpected external requests appear.",
  ]) {
    assert.match(manualQaDoc, new RegExp(escapeRegExp(phrase), "i"));
  }
});

test("README links the static preview readiness docs", () => {
  assert.match(readme, /Static preview deployment readiness/);
  assert.match(readme, /static-preview-deployment-readiness\.md/);
  assert.match(readme, /Manual preview QA checklist/);
  assert.match(readme, /manual-preview-qa-checklist\.md/);
});
