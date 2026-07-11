import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const exists = (path) => existsSync(new URL(`../${path}`, import.meta.url));
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const releasePath = "docs/sozorock-health/static-preview-deployment-release.md";
const verificationPath = "docs/sozorock-health/post-deployment-verification-checklist.md";
const oldStakeholderPacketPath = "docs/sozorock-health/static-preview-stakeholder-review-packet.md";
const oldDemoScriptPath = "docs/sozorock-health/static-preview-demo-script.md";
const oldDecisionLogPath = "docs/sozorock-health/static-preview-decision-log-template.md";
const oldStakeholderTestPath = "tests/static-preview-stakeholder-review-packet.test.mjs";

const releaseDoc = read(releasePath);
const verificationDoc = read(verificationPath);
const readme = read("README.md");
const docs = `${releaseDoc}\n${verificationDoc}`;

test("static preview deployment release documents exist", () => {
  assert.equal(exists(releasePath), true);
  assert.equal(exists(verificationPath), true);
});

test("old stakeholder packet, demo script, decision log, and related test are not present", () => {
  assert.equal(exists(oldStakeholderPacketPath), false);
  assert.equal(exists(oldDemoScriptPath), false);
  assert.equal(exists(oldDecisionLogPath), false);
  assert.equal(exists(oldStakeholderTestPath), false);
});

test("deployment release documents preserve required boundary language", () => {
  for (const phrase of [
    "No PHI. Consent-based. Non-clinical.",
    "Care for Every ZIP Code.",
    "Providers keep their platforms. We help you get ready.",
  ]) {
    assert.match(docs, new RegExp(escapeRegExp(phrase)));
  }
});

test("locked operating logic phrase is exact when referenced", () => {
  const lockedPhrase = "Signal \u2192 Decision \u2192 Action \u2192 Assurance \u2192 Impact";

  assert.match(docs, new RegExp(escapeRegExp(lockedPhrase)));
  assert.doesNotMatch(docs, /Signal -> Decision -> Action -> Assurance -> Impact/);
  assert.doesNotMatch(docs, /Signal \u2192 Decision \u2192 Action \u2192 Assurance \u2192 Impact\./);
});

test("Voice Access is named correctly without assistant shorthand", () => {
  assert.match(docs, /Voice Access/);
  assert.doesNotMatch(docs, /Sozo Assistant|SozoBot|AI doctor|clinical assistant/i);
});

test("release document captures existing static hosting pipeline boundary", () => {
  for (const phrase of [
    "Merge to main may trigger the existing static hosting pipeline.",
    "Do not create new infrastructure for this release.",
    "Do not add or expose secrets.",
    "Do not enable backend runtime.",
    "Do not enable live services.",
    "Use only the existing repository/static hosting pipeline already configured for the project.",
  ]) {
    assert.match(releaseDoc, new RegExp(escapeRegExp(phrase)));
  }
});

test("release notes describe included and excluded static preview scope", () => {
  for (const phrase of [
    "resident app shell",
    "resident navigation",
    "static guidance screens",
    "fallback preview cards",
    "Voice Access inactive state",
    "AI guidance static/inactive state",
    "map and location inactive states",
    "static/local-only hub information",
    "privacy and accessibility boundary screens",
    "live AI",
    "live maps",
    "microphone capture",
    "location capture",
    "backend runtime",
    "resident account",
    "forms",
    "PHI collection",
    "clinical workflow",
    "appointment scheduling",
    "insurance workflow",
    "provider messaging",
    "county console",
  ]) {
    assert.match(releaseDoc, new RegExp(escapeRegExp(phrase)));
  }
});

test("post-deployment verification checklist covers required live preview checks", () => {
  for (const phrase of [
    "live URL loads",
    "Home renders",
    "Start renders",
    "Voice Access renders",
    "Health Access Day renders",
    "Hubs renders",
    "Provider-Led Pathway renders",
    "How it works renders",
    "Privacy Boundary renders",
    "Accessibility renders",
    "What we do renders",
    "menu drawer works",
    "bottom navigation works",
    "fallback preview cards render",
    "no console errors",
    "no unexpected network calls",
    "no live AI behavior",
    "no live maps behavior",
    "no microphone capture",
    "no location capture",
    "no resident data capture",
    "no PHI workflow",
    "no clinical workflow",
    "no county console exposure",
  ]) {
    assert.match(verificationDoc, new RegExp(escapeRegExp(phrase), "i"));
  }
});

test("deployment docs do not include secrets, SDK imports, endpoints, cloud creation, or infrastructure mutation instructions", () => {
  assert.doesNotMatch(docs, /API_KEY=|SECRET=|TOKEN=|DATABASE_URL=|BACKEND_URL=|GOOGLE_MAPS_API_KEY=|AWS_ACCESS_KEY_ID=/);
  assert.doesNotMatch(docs, /import .*aws-sdk|import .*@aws-sdk|import .*firebase|import .*@google|import .*googleapis|import .*openai/i);
  assert.doesNotMatch(docs, /https:\/\/api\.|backend endpoint example|endpoint URL|service account/i);
  assert.doesNotMatch(docs, /^-? ?Create cloud resources\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Create AWS resources\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Create Google Cloud resources\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Create Firebase resources\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Configure new CloudFront\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Configure new Route 53\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Configure new ACM\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Configure new OIDC\.?$/im);
  assert.doesNotMatch(docs, /aws cloudformation|aws cloudfront|aws route53|amplify init|amplify publish|amplify push|firebase deploy|gcloud deploy|terraform apply|cdk deploy|eas build|eas submit/i);
});

test("deployment docs do not imply active live services or restricted workflows", () => {
  assert.doesNotMatch(docs, /^-? ?Live AI is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Live maps are active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Microphone capture is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Location capture is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Resident data capture is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?PHI workflow is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Clinical workflow is active\.?$/im);
});

test("README links to deployment release documents", () => {
  assert.match(readme, /Static resident preview deployment release/);
  assert.match(readme, /static-preview-deployment-release\.md/);
  assert.match(readme, /Post-deployment verification checklist/);
  assert.match(readme, /post-deployment-verification-checklist\.md/);
});
