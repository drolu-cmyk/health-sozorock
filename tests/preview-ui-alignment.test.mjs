import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const residentPage = [
  read("src/app/resident/page.tsx"),
  read("src/app/resident/resident-access-app.tsx"),
].join("\n");
const residentData = read("src/lib/resident-data.ts");
const countyPage = read("src/app/county/page.tsx");
const countyData = read("src/lib/county-data.ts");
const geospatialProvider = read("src/lib/geospatial/mock-provider.ts");
const layout = read("src/app/layout.tsx");

test("resident page keeps the locked trust boundary visible", () => {
  assert.match(residentPage, /brand\.trustBoundary/);
});

test("resident page keeps Voice Access server-gated and non-clinical", () => {
  assert.match(residentPage, /voiceAccessSafetyCopy\.boundary/);
  assert.match(residentPage, /\/api\/voice\/session/);
  assert.match(residentPage, /guided text/);
});

test("resident event labels avoid active signup and reminder language", () => {
  assert.doesNotMatch(
    `${residentData}\n${residentPage}`,
    /Register\s*\/\s*RSVP|Request Reminder|registration|notification|Messages|My info/i,
  );
  assert.match(residentData, /No sign-up required to read/);
});

test("resident provider pathway keeps approved platform readiness language", () => {
  assert.match(residentPage, /brand\.providerPathway/);
  assert.match(residentData, /Prepare for a provider platform/);
});

test("county page keeps CB-CAP purpose and sample framing visible", () => {
  for (const phrase of [
    "CB-CAP sample view",
    "Illustrative data",
    "From need to action",
    "Full access",
  ]) {
    assert.match(countyPage, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("county page uses a warm accessible CB-CAP shell", () => {
  assert.match(countyPage, /bg-surface/);
  assert.match(countyPage, /bg-white/);
  assert.match(countyPage, /bg-warm-100/);
  assert.doesNotMatch(countyPage, /bg-\[#061521\]/);
});

test("county desktop has module navigation for operating sections", () => {
  assert.match(countyPage, /CB-CAP sections/);
  assert.match(countyPage, /Sample view/);
  assert.match(countyPage, /Access gaps/);
  assert.match(countyPage, /Action review/);
  assert.match(countyPage, /Assurance/);
});

test("county access gaps use accessible tables and mobile cards", () => {
  assert.match(countyPage, /Illustrative county access gaps by ZIP code/);
  assert.match(countyPage, /overflow-x-auto/);
  assert.match(countyPage, /md:hidden/);
  assert.match(countyPage, /countyOperatingPicture\.accessSignals\.map/);
});

test("county geospatial provider remains mock and external requests disabled", () => {
  assert.match(geospatialProvider, /mode: "mock"/);
  assert.match(geospatialProvider, /externalRequestsEnabled: false/);
});

test("county review states, evidence sources, and action gates remain visible", () => {
  assert.match(countyPage, /Review state/);
  assert.match(countyPage, /Evidence source/);
  assert.match(countyPage, /Action gate/);
  assert.match(countyData, /Needs Review/);
  assert.match(countyData, /Completed/);
});

test("county assurance checklist remains complete", () => {
  const expectedControls = [
    "Consent captured.",
    "No protected health information collected.",
    "Non-clinical boundary reviewed.",
    "Data source verified.",
    "Human review completed.",
    "Provider responsibility confirmed.",
    "Report generated with controls.",
    "Action evidence recorded.",
    "County-facing output marked as planning support.",
  ];

  for (const control of expectedControls) {
    assert.match(countyData, new RegExp(control.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("preview metadata continues to discourage indexing", () => {
  assert.match(layout, /index: false/);
  assert.match(layout, /follow: false/);
  assert.match(layout, /noimageindex: true/);
});
