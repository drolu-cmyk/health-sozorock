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
const nextConfig = read("next.config.ts");
const deploymentDoc = read(deploymentDocPath);
const verificationDoc = read(verificationDocPath);
const readme = read("README.md");
const docs = `${deploymentDoc}\n${verificationDoc}`;

test("Amplify dynamic app build spec exists", () => {
  assert.equal(exists(amplifyPath), true);
});

test("Next web build is configured for dynamic app runtime", () => {
  assert.doesNotMatch(nextConfig, /output:\s*"export"/);
});

test("Amplify build spec deploys the dynamic web app while generating resident web export", () => {
  assert.match(amplifyConfig, /^version: 1$/m);
  assert.match(amplifyConfig, /^frontend:$/m);
  assert.match(amplifyConfig, /preBuild:\s*\r?\n\s+commands:\s*\r?\n\s+- npm install/);
  assert.match(amplifyConfig, /build:\s*\r?\n\s+commands:\s*\r?\n\s+- npm run build\s*\r?\n\s+- npm run mobile:export:web/);
  assert.match(amplifyConfig, /baseDirectory: \.next/);
  assert.doesNotMatch(amplifyConfig, /baseDirectory: out/);
  assert.doesNotMatch(amplifyConfig, /baseDirectory: apps\/mobile\/dist/);
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

test("Amplify docs block incorrect deployment artifacts", () => {
  for (const phrase of [
    "does not publish `out`",
    "does not publish `apps/mobile/dist` as the site root artifact",
    "public web app therefore publishes `.next`",
  ]) {
    assert.match(docs, new RegExp(escapeRegExp(phrase), "i"));
  }
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
  const lockedPhrase = "Signal -> Decision -> Action -> Assurance -> Impact";

  assert.match(docs, new RegExp(escapeRegExp(lockedPhrase)));
  assert.doesNotMatch(docs, /Signal -> Decision -> Action -> Assurance -> Impact\./);
});

test("Voice Access is named correctly without assistant shorthand", () => {
  assert.match(docs, /Voice Access/);
  assert.doesNotMatch(docs, /Sozo Assistant|SozoBot|AI doctor|clinical assistant/i);
});

test("Amplify docs document dynamic hosting target, build command, and artifact directory", () => {
  for (const phrase of [
    "AWS Amplify Hosting",
    "npm run build",
    "npm run mobile:export:web",
    ".next",
    "apps/mobile/dist",
    "amplify.yml",
    "dynamic Next.js app",
    "Public web deployment artifact",
  ]) {
    assert.match(docs, new RegExp(escapeRegExp(phrase)));
  }
});

test("Amplify docs preserve existing routes and avoid replacing them with only the resident export", () => {
  for (const phrase of [
    "/resident",
    "/county",
    "/about-model` redirects to `/resident",
    "Publishing only `apps/mobile/dist` would replace those routes.",
    "Publishing `out` would revert the app to a static export",
    "public web app therefore publishes `.next`",
  ]) {
    assert.match(docs, new RegExp(escapeRegExp(phrase)));
  }
});

test("Amplify docs block unsafe runtime expansion", () => {
  for (const phrase of [
    "client-side provider keys",
    "privileged provider SDKs in browser bundles",
    "diagnosis, treatment, prescribing, symptom triage, medication advice, clinical planning, or emergency response",
    "microphone-only flows",
    "location-only flows",
    "formal partnership claims without approved source records",
  ]) {
    assert.match(docs, new RegExp(escapeRegExp(phrase)));
  }
});

test("Amplify verification checklist covers live resident app checks", () => {
  for (const phrase of [
    "Amplify live URL loads",
    "/resident",
    "/county",
    "/about-model` redirects to `/resident",
    "need selection updates guidance",
    "search by ZIP code, city, or county",
    "Voice Access",
    "guided text remains available without microphone access",
    "Health Access Day information is visible",
    "Health Equity Hubs are visible",
    "provider-readiness checklist is interactive",
    "support/contact path is visible",
    "save-next-step action works locally",
    "no console errors",
    "no failed route loads",
    "no request exposes provider credentials",
    "no PHI workflow",
    "no clinical workflow",
    "no county console is exposed in resident navigation",
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

test("Amplify deployment docs do not imply unsafe active services or restricted workflows", () => {
  assert.doesNotMatch(docs, /^-? ?Client-side provider keys are allowed\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Voice Access may return a provider session without consent and readiness\.?$/im);
  assert.doesNotMatch(docs, /^-? ?AI guidance may provide diagnosis, treatment, prescribing, triage, medication advice, clinical planning, or emergency response\.?$/im);
  assert.doesNotMatch(docs, /^-? ?PHI workflow is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Clinical workflow is active\.?$/im);
});

test("README links Amplify dynamic deployment docs", () => {
  assert.match(readme, /AWS Amplify dynamic app deployment/);
  assert.match(readme, /aws-amplify-static-preview-deployment\.md/);
  assert.match(readme, /Amplify dynamic web verification checklist/);
  assert.match(readme, /amplify-live-preview-verification-checklist\.md/);
  assert.match(readme, /publish `\.next`/);
  assert.match(readme, /redirect `\/about-model` back to `\/resident`/);
});
