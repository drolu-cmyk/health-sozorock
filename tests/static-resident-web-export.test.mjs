import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const exists = (path) => existsSync(new URL(`../${path}`, import.meta.url));
const readJson = (path) => JSON.parse(read(path));
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const rootPackage = readJson("package.json");
const mobilePackage = readJson("apps/mobile/package.json");
const exportDocPath = "docs/sozorock-health/static-resident-web-export.md";
const checklistPath = "docs/sozorock-health/static-export-artifact-checklist.md";
const exportDoc = read(exportDocPath);
const checklistDoc = read(checklistPath);
const readme = read("README.md");
const docs = `${exportDoc}\n${checklistDoc}`;

test("root and mobile package scripts expose static resident web export", () => {
  assert.equal(rootPackage.scripts["mobile:export:web"], "npm run export:web -w @sozorock-health/mobile");
  assert.equal(mobilePackage.scripts["export:web"], "expo export --platform web");
});

test("static resident web export docs exist", () => {
  assert.equal(exists(exportDocPath), true);
  assert.equal(exists(checklistPath), true);
});

test("static export docs preserve required boundary language", () => {
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

test("static export docs capture command and artifact directory", () => {
  for (const phrase of [
    "npm run mobile:export:web",
    "npm run export:web -w @sozorock-health/mobile",
    "expo export --platform web",
    "apps/mobile/dist",
    "apps/mobile/dist/index.html",
    "Issue 045 - Deploy static resident app preview to selected hosting target",
  ]) {
    assert.match(docs, new RegExp(escapeRegExp(phrase)));
  }
});

test("static export docs describe included and inactive resident preview scope", () => {
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
    "live services remain disabled",
    "no resident data capture exists",
    "no PHI workflow exists",
    "no clinical workflow exists",
  ]) {
    assert.match(docs, new RegExp(escapeRegExp(phrase)));
  }
});

test("static export docs do not include secrets, SDK imports, endpoints, or infrastructure instructions", () => {
  assert.doesNotMatch(docs, /API_KEY=|SECRET=|TOKEN=|DATABASE_URL=|BACKEND_URL=|GOOGLE_MAPS_API_KEY=|AWS_ACCESS_KEY_ID=/);
  assert.doesNotMatch(docs, /import .*aws-sdk|import .*@aws-sdk|import .*firebase|import .*@google|import .*googleapis|import .*openai/i);
  assert.doesNotMatch(docs, /https:\/\/api\.|backend endpoint example|endpoint URL|service account/i);
  assert.doesNotMatch(docs, /cloud resource creation|create cloud resource|DNS changes|CloudFront changes|Route 53 changes|ACM changes|OIDC changes|infrastructure-as-code/i);
  assert.doesNotMatch(docs, /amplify init|amplify publish|amplify push|firebase deploy|gcloud deploy|terraform apply|cdk deploy|eas build|eas submit/i);
});

test("static export docs do not imply active live services or restricted workflows", () => {
  assert.doesNotMatch(docs, /^-? ?Live AI is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Live maps are active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Microphone capture is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Location capture is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Resident data capture is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?PHI workflow is active\.?$/im);
  assert.doesNotMatch(docs, /^-? ?Clinical workflow is active\.?$/im);
});

test("README links to static resident web export docs", () => {
  assert.match(readme, /Static resident web export/);
  assert.match(readme, /static-resident-web-export\.md/);
  assert.match(readme, /Static export artifact checklist/);
  assert.match(readme, /static-export-artifact-checklist\.md/);
  assert.match(readme, /npm run mobile:export:web/);
});
