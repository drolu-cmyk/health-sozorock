import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const residentApp = read("src/app/resident/resident-access-app.tsx");
const accessApi = read("src/app/api/access/search/route.ts");
const guidanceApi = read("src/app/api/ai/guidance/route.ts");
const supportApi = read("src/app/api/support/route.ts");
const voiceApi = read("src/app/api/voice/session/route.ts");
const accountApi = read("src/app/api/account/session/route.ts");
const residentSession = read("src/lib/resident-session.ts");
const accessDirectory = read("src/lib/access-directory.ts");

const runtimeSources = [
  residentApp,
  accessApi,
  guidanceApi,
  supportApi,
  voiceApi,
  accountApi,
  residentSession,
  accessDirectory,
].join("\n");

test("resident app uses dynamic runtime APIs for core journey actions", () => {
  for (const route of [
    "/api/access/search",
    "/api/ai/guidance",
    "/api/support",
    "/api/voice/session",
    "/api/account/session",
  ]) {
    assert.match(residentApp, new RegExp(route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("resident app exposes a complete account flow", () => {
  for (const phrase of [
    "Sign up",
    "Log in",
    "Sign out",
    "Create account",
    "Welcome",
  ]) {
    assert.match(residentApp, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(accountApi, /residentSessionCookie/);
  assert.match(residentSession, /createHmac/);
  assert.match(residentSession, /httpOnly: true/);
  assert.match(residentSession, /sameSite: "lax"/);
});

test("resident app exposes talk, type, and support paths", () => {
  for (const phrase of [
    "Start talking",
    "Type instead",
    "Request support",
    "Prepare support request",
    "Save my next step",
  ]) {
    assert.match(residentApp, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("dynamic APIs keep provider secrets server-side", () => {
  assert.match(guidanceApi, /process\.env\.OPENAI_API_KEY/);
  assert.match(voiceApi, /process\.env\.OPENAI_API_KEY/);
  assert.doesNotMatch(residentApp, /OPENAI_API_KEY|sk-|Bearer|Authorization/);
});

test("dynamic APIs preserve non-clinical and consent boundaries", () => {
  assert.match(guidanceApi, /Stay access-only/);
  assert.match(guidanceApi, /clinical determinations/);
  assert.match(guidanceApi, /clinicalRiskPattern/);
  assert.match(supportApi, /This option needs your permission/);
  assert.match(voiceApi, /This option needs your permission/);
  assert.match(voiceApi, /Voice Access is limited access/);
});

test("access search has reviewed records and customer-facing empty state", () => {
  assert.match(accessDirectory, /East Branch Access Desk/);
  assert.match(accessDirectory, /Northside Community Access Point/);
  assert.match(accessApi, /We could not find a nearby access point yet/);
});

test("dynamic runtime sources avoid client-side provider SDK imports and clinical workflow claims", () => {
  assert.doesNotMatch(runtimeSources, /import .*openai/i);
  assert.doesNotMatch(runtimeSources, /treatment recommendation|prescription workflow|clinical triage/i);
});
