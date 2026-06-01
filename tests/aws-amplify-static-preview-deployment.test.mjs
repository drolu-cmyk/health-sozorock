import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const exists = (path) => existsSync(new URL(`../${path}`, import.meta.url));
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const amplifyPath = "amplify.yml";
const deploymentDocPath = "docs/sozorock-health/aws-amplify-static-preview-deployment.md";
const verificationDocPath = "docs/sozorock-health/amplify-live-preview-verification-checklist.md";

const amplifyConfig = read(amplifyPath);
const deploymentDoc = read(deploymentDocPath);
const verificationDoc = read(verificationDocPath);
const readme = read("README.md");
const docs = `${deploymentDoc}\n${verificationDoc}`;

test("Amplify static hosting build spec exists", () => {
  assert.equal(exists(amplifyPath), true);
});

test("Amplify build spec runs static resident web export and publishes apps/mobile/dist", () => {
  assert.match(amplifyConfig, /^version: 1$/m);
  assert.match(amplifyConfig, /^frontend:$/m);
  assert.match(amplifyConfig, /preBuild:\s*\r?\n\s+commands:\s*\r?\n\s+- npm install/);
  assert.match(amplifyConfig, /build:\s*\r?\n\s+commands:\s*\r?\n\s+- npm run mobile:export:web/);
  assert.match(amplifyConfig, /baseDirectory: apps\/mobile\/dist/);
  assert.match(amplifyConfig, /files:\s*\r?\n\s+- "\*\*\/\*"/);
});

test("Amplify build spec caches workspace node_modules only", () => {
  for (const cachePath of [
    "node_modules/**/*",
    "apps/mobile/node_modules/**/*",
    "packages/shared/node_modules/**/*",
  ]) {
    assert.match(amplifyConfig, new RegExp(escapeRegExp(cachePath)));
  }
});

test("Amplify build spec has no backend phases, secrets, API keys, or runtime provider config", () => {
  assert.doesNotMatch(amplifyConfig, /^backend:/m);
  assert.doesNotMatch(amplifyConfig, /amplifyPush|amplify push|amplify env|amplify add|amplify pull/i);
  assert.doesNotMatch(amplifyConfig, /API_KEY|SECRET|TOKEN|DATABASE_URL|BACKEND_URL|GOOGLE_MAPS|VERTEX|GEMINI|OPENAI|AWS_ACCESS_KEY_ID/i);
  assert.doesNotMatch(amplifyConfig, /firebase|googleapis|openai|vertex|gemini|lambda|dynamodb|cognito|appsync/i);
});

test("Amplify deployment docs exist", () => {
  assert.equal(exists(deploymentDocPath), true);
  assert.equal(exists(verificationDocPath), true);
});

test("Amplify deployment docs preserve required boundary language", () => {
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

test("Amplify docs document static hosting target, build command, and artifact directory", () => {
  for (const phrase of [
    "AWS Amplify Hosting",
    "npm run mobile:export:web",
    "apps/mobile/dist",
    "amplify.yml",
    "frontend build configuration",
    "static artifact publication",
  ]) {
    assert.match(docs, new RegExp(escapeRegExp(phrase)));
  }
});

test("Amplify docs block backend categories and cloud/runtime expansion", () => {
  for (const phrase of [
    "Amplify backend categories",
    "Amplify Auth",
    "Amplify Data",
    "Amplify Storage",
    "Amplify Functions",
    "GraphQL API",
    "REST API",
    "Lambda",
    "DynamoDB",
    "Cognito",
    "CloudFront configuration changes",
    "DNS changes",
    "Route 53 changes",
    "ACM changes",
    "OIDC changes",
    "Google Cloud resources",
    "Firebase resources",
    "runtime service adapters",
  ]) {
    assert.match(docs, new RegExp(escapeRegExp(phrase)));
  }
});

test("Amplify verification checklist covers live resident preview checks", () => {
  for (const phrase of [
    "Amplify live URL loads",
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

test("Amplify deployment docs do not include secrets, env examples, SDK imports, backend endpoint examples, or deployment mutations", () => {
  assert.doesNotMatch(docs, /API_KEY=|SECRET=|TOKEN=|DATABASE_URL=|BACKEND_URL=|GOOGLE_MAPS_API_KEY=|AWS_ACCESS_KEY_ID=/);
  assert.doesNotMatch(docs, /import .*aws-sdk|import .*@aws-sdk|import .*firebase|import .*@google|import .*googleapis|import .*openai/i);
  assert.doesNotMatch(docs, /https:\/\/api\.|backend endpoint example|endpoint URL|service account/i);
  assert.doesNotMatch(docs, /^-? ?Create CloudFront configuration\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Change DNS\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Change Route 53\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Change ACM\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Change OIDC\.?$/im);
  assert.doesNotMatch(docs, /terraform apply|cdk deploy|amplify add|amplify push|firebase deploy|gcloud deploy/i);
});

test("Amplify deployment docs do not imply active live services or restricted workflows", () => {
  assert.doesNotMatch(docs, /^-? ?Live AI is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Live maps are active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Microphone capture is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Location capture is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Resident data capture is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?PHI workflow is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Clinical workflow is active\.?$/im);
});

test("README links Amplify static deployment docs", () => {
  assert.match(readme, /AWS Amplify static preview deployment/);
  assert.match(readme, /aws-amplify-static-preview-deployment\.md/);
  assert.match(readme, /Amplify live preview verification checklist/);
  assert.match(readme, /amplify-live-preview-verification-checklist\.md/);
});
