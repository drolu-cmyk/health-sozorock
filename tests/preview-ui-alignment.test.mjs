import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const residentPage = read("src/app/resident/page.tsx");
const residentStartPage = read("src/app/resident/start/page.tsx");
const residentVoicePage = read("src/app/resident/voice-access/page.tsx");
const residentAccessDayPage = read("src/app/resident/access-day/page.tsx");
const residentHubsPage = read("src/app/resident/hubs/page.tsx");
const residentProviderPage = read("src/app/resident/provider-pathway/page.tsx");
const residentComponent = read("src/components/resident/resident-access-app.tsx");
const residentFixtures = read("src/data/residentAccess.ts");
const hubFixtures = read("src/data/hubs.ts");
const residentData = read("src/lib/resident-data.ts");
const countyPage = read("src/app/county/page.tsx");
const countyOperatingPicturePage = read("src/app/county/operating-picture/page.tsx");
const countyActionQueuePage = read("src/app/county/action-queue/page.tsx");
const countyAssuranceLogPage = read("src/app/county/assurance-log/page.tsx");
const countyScenarioPlanningPage = read("src/app/county/scenario-planning/page.tsx");
const countyComponent = read("src/components/county/county-console.tsx");
const countySignalFixtures = read("src/data/countySignals.ts");
const actionQueueFixtures = read("src/data/actionQueue.ts");
const assuranceFixtures = read("src/data/assuranceLog.ts");
const scenarioFixtures = read("src/data/scenarios.ts");
const countyData = read("src/lib/county-data.ts");
const geospatialProvider = read("src/lib/geospatial/mock-provider.ts");
const layout = read("src/app/layout.tsx");
const aboutModelPage = read("src/app/about-model/page.tsx");
const productEntry = read("src/components/product/product-entry.tsx");
const productBoundaries = read("src/lib/productBoundaries.ts");
const platformDoc = read("docs/sozorock-health/multi-platform-product-architecture.md");

const residentSurface = [
  residentPage,
  residentStartPage,
  residentVoicePage,
  residentAccessDayPage,
  residentHubsPage,
  residentProviderPage,
  residentComponent,
  residentFixtures,
  hubFixtures,
].join("\n");

const countySurface = [
  countyPage,
  countyOperatingPicturePage,
  countyActionQueuePage,
  countyAssuranceLogPage,
  countyScenarioPlanningPage,
  countyComponent,
  countySignalFixtures,
  actionQueueFixtures,
  assuranceFixtures,
  scenarioFixtures,
].join("\n");

test("resident page keeps the locked trust boundary visible", () => {
  assert.match(residentSurface, /trustBoundary\.primary/);
});

test("resident page keeps Voice Access safe and non-clinical", () => {
  assert.match(residentSurface, /trustBoundary\.voice/);
  assert.match(residentSurface, /voiceAccessSafetyCopy\.staticMode/);
});

test("resident event labels avoid active signup and reminder language", () => {
  assert.doesNotMatch(
    `${residentData}\n${residentSurface}`,
    /Register\s*\/\s*RSVP|Request Reminder|registration|notification|Messages|My info/i,
  );
  assert.match(residentSurface, /No sign-up in this step/);
});

test("resident provider pathway keeps approved platform readiness language", () => {
  assert.match(residentSurface, /trustBoundary\.provider/);
  assert.match(residentSurface, /provider platform/);
});

test("resident routes are real app screens", () => {
  for (const screen of ["start", "voice-access", "access-day", "hubs", "provider-pathway"]) {
    assert.match(residentSurface, new RegExp(`screen="${screen}"`));
  }
  assert.match(residentSurface, /Resident app navigation/);
  assert.match(residentSurface, /Voice Access or Tap Access/);
  assert.match(residentSurface, /Next-step guidance/);
});

test("county page keeps the locked operating logic visible", () => {
  for (const stage of ["Signal", "Decision", "Action", "Assurance", "Impact"]) {
    assert.match(countySurface, new RegExp(stage));
  }
});

test("county page uses a dark operating console shell", () => {
  assert.match(countySurface, /bg-\[#061521\]/);
  assert.match(countySurface, /County Operating Intelligence Layer/);
});

test("county console exposes the operating journey", () => {
  for (const step of [
    "Operating Picture",
    "Access Signals",
    "Recommended Action",
    "Action Queue",
    "Assurance Log",
    "Scenario Planning",
    "Human Review",
  ]) {
    assert.match(countySurface, new RegExp(step));
  }
});

test("county desktop has module navigation for operating sections", () => {
  assert.match(countySurface, /County module navigation/);
  assert.match(countySurface, /Operating Picture/);
  assert.match(countySurface, /Action Queue/);
  assert.match(countySurface, /Assurance Log/);
});

test("county geospatial panel keeps marker details readable on mobile", () => {
  assert.match(countySurface, /map-grid-dark/);
  assert.match(countySurface, /Access Gap Index/);
  assert.match(countySurface, /accessSignals\.map/);
});

test("county geospatial provider remains mock and external requests disabled", () => {
  assert.match(geospatialProvider, /mode: "mock"/);
  assert.match(geospatialProvider, /externalRequestsEnabled: false/);
});

test("county review states, evidence sources, and action gates remain visible", () => {
  assert.match(countySurface, /Review state/);
  assert.match(countySurface, /Evidence source/);
  assert.match(countySurface, /Action gate/);
  assert.match(`${countyData}\n${countySurface}`, /Needs Review/);
  assert.match(`${countyData}\n${countySurface}`, /Completed/);
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
    assert.match(
      `${countyData}\n${assuranceFixtures}`,
      new RegExp(control.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }
});

test("product entry exposes app entry actions and trust boundary", () => {
  assert.match(productEntry, /Start Resident Access/);
  assert.match(productEntry, /Open County Operating Layer/);
  assert.match(productEntry, /Review Model/);
  assert.match(productEntry, /trustBoundary\.primary/);
});

test("visible product components avoid mockup framing", () => {
  assert.doesNotMatch(
    `${residentComponent}\n${productEntry}\n${countyComponent}\n${aboutModelPage}\n${residentFixtures}\n${countySignalFixtures}\n${actionQueueFixtures}`,
    /\b(static|mock|prototype|simulation|marketing hero|dashboard feel)\b/i,
  );
});

test("platform architecture records native packaging path without implementation", () => {
  assert.match(platformDoc, /Expo \/ React Native/);
  assert.match(platformDoc, /iOS/);
  assert.match(platformDoc, /Android/);
  assert.match(platformDoc, /not implemented in this issue/i);
});

test("shared product boundary forbids persistence in current shell", () => {
  assert.match(productBoundaries, /Local\/session-only state/);
  assert.match(productBoundaries, /No resident data capture/);
  assert.match(productBoundaries, /No backend/);
});

test("preview metadata continues to discourage indexing", () => {
  assert.match(layout, /index: false/);
  assert.match(layout, /follow: false/);
  assert.match(layout, /noimageindex: true/);
});
