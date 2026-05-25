"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { supportHubs } from "@/data/hubs";
import {
  healthAccessDayGuidance,
  providerPathwaySteps,
  residentNeeds,
  residentNextSteps,
} from "@/data/residentAccess";
import { brand } from "@/lib/brand";
import { residentBoundaryStatements, trustBoundary } from "@/lib/productBoundaries";
import { productRoutes, residentRouteItems } from "@/lib/routes";
import { voiceAccessSafetyCopy, voiceAccessSimulationItems } from "@/lib/voice-access-data";

export type ResidentScreen =
  | "welcome"
  | "start"
  | "voice-access"
  | "access-day"
  | "hubs"
  | "provider-pathway";

const journeySteps: Array<{ screen: ResidentScreen; label: string; href: string }> = [
  { screen: "welcome", label: "Welcome", href: productRoutes.resident.home },
  { screen: "start", label: "Access Start", href: productRoutes.resident.start },
  { screen: "voice-access", label: "Voice Access", href: productRoutes.resident.voiceAccess },
  { screen: "access-day", label: "Access Day", href: productRoutes.resident.accessDay },
  { screen: "hubs", label: "Hubs", href: productRoutes.resident.hubs },
  { screen: "provider-pathway", label: "Provider Pathway", href: productRoutes.resident.providerPathway },
];

const nextRouteByScreen: Record<ResidentScreen, string> = {
  welcome: productRoutes.resident.start,
  start: productRoutes.resident.voiceAccess,
  "voice-access": productRoutes.resident.accessDay,
  "access-day": productRoutes.resident.hubs,
  hubs: productRoutes.resident.providerPathway,
  "provider-pathway": productRoutes.resident.start,
};

export function ResidentAccessApp({ screen = "welcome" }: { screen?: ResidentScreen }) {
  const [selectedNeed, setSelectedNeed] = useState<(typeof residentNeeds)[number] | null>(null);
  const currentIndex = journeySteps.findIndex((item) => item.screen === screen);
  const progressWidth = `${((currentIndex + 1) / journeySteps.length) * 100}%`;
  const selectedNextRoute = selectedNeed?.route ?? productRoutes.resident.hubs;

  const nextLabel = useMemo(() => {
    if (screen === "welcome") return "Start Resident Access";
    if (screen === "start") return selectedNeed ? "Continue with guidance" : "Continue to Voice Access";
    if (screen === "provider-pathway") return "Start another access path";
    return "Next step";
  }, [screen, selectedNeed]);

  return (
    <div className="min-h-screen bg-[#edf5f7] px-3 py-4 text-foundation-950 sm:px-5 md:py-8">
      <section className="mx-auto flex w-full max-w-[430px] flex-col overflow-hidden rounded-[2rem] border-[10px] border-[#101820] bg-white shadow-2xl">
        <header className="border-b border-line bg-white px-5 py-4">
          <div className="flex items-center justify-between text-sm font-bold">
            <span>9:41</span>
            <span>{brand.programName}</span>
            <span aria-label="Resident app menu">Menu</span>
          </div>
          <div className="mt-4">
            <div className="h-2 rounded-full bg-surface">
              <div className="h-2 rounded-full bg-access-700" style={{ width: progressWidth }} />
            </div>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-access-700">
              Step {currentIndex + 1} of {journeySteps.length}: {journeySteps[currentIndex]?.label}
            </p>
          </div>
        </header>

        <main className="min-h-[590px] flex-1 px-5 py-5">
          <ResidentScreenContent
            onSelectNeed={setSelectedNeed}
            screen={screen}
            selectedNeed={selectedNeed}
            selectedNextRoute={selectedNextRoute}
          />
        </main>

        <div className="border-t border-line bg-white px-4 pb-4 pt-3">
          <Link
            className="flex min-h-12 items-center justify-center rounded-lg bg-access-700 px-5 text-center text-sm font-bold text-white hover:bg-access-600 focus:outline-none focus:ring-2 focus:ring-access-600"
            href={screen === "start" && selectedNeed ? selectedNextRoute : nextRouteByScreen[screen]}
          >
            {nextLabel}
          </Link>
          <nav
            aria-label="Resident app navigation"
            className="mt-3 grid grid-cols-4 gap-1 text-center text-[0.72rem] font-bold text-foundation-700"
          >
            {residentRouteItems.slice(0, 4).map((item) => (
              <Link
                className="min-h-11 rounded-lg px-2 py-3 hover:bg-access-100 focus:outline-none focus:ring-2 focus:ring-access-600"
                href={item.href}
                key={item.href}
              >
                {item.shortLabel}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
}

function ResidentScreenContent({
  onSelectNeed,
  screen,
  selectedNeed,
  selectedNextRoute,
}: {
  onSelectNeed: (need: (typeof residentNeeds)[number]) => void;
  screen: ResidentScreen;
  selectedNeed: (typeof residentNeeds)[number] | null;
  selectedNextRoute: string;
}) {
  if (screen === "start") {
    return (
      <section>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-700">Access Start</p>
        <h1 className="mt-4 text-3xl font-bold leading-tight">What do you need today?</h1>
        <p className="mt-3 text-base leading-7 text-foundation-700">
          Choose a need. Nothing is submitted or stored.
        </p>
        <div className="mt-5 grid gap-3">
          {residentNeeds.map((need) => (
            <button
              aria-label={`Select ${need.title}`}
              aria-pressed={selectedNeed?.id === need.id}
              className={`min-h-20 rounded-xl border p-4 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-access-600 ${
                selectedNeed?.id === need.id
                  ? "border-access-700 bg-access-100"
                  : "border-line bg-white hover:border-access-600"
              }`}
              key={need.id}
              onClick={() => onSelectNeed(need)}
              type="button"
            >
              <span className="block text-base font-bold">{need.title}</span>
              <span className="mt-1 block text-sm leading-6 text-foundation-700">{need.description}</span>
            </button>
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-access-600/20 bg-access-100 p-4">
          <p className="text-sm font-bold text-access-700">Next-step guidance</p>
          <p className="mt-2 text-sm leading-6 text-foundation-800">
            {selectedNeed?.nextStep ?? residentNextSteps[0]}
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Link
              className="min-h-11 rounded-lg bg-foundation-950 px-4 py-3 text-center text-sm font-bold text-white"
              href={productRoutes.resident.voiceAccess}
            >
              Voice Access
            </Link>
            <Link
              className="min-h-11 rounded-lg border border-access-700 px-4 py-3 text-center text-sm font-bold text-access-700"
              href={selectedNextRoute}
            >
              Tap Access
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (screen === "voice-access") {
    return (
      <section>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-700">Voice Access</p>
        <h1 className="mt-4 text-3xl font-bold leading-tight">Speak or tap to find local support.</h1>
        <div className="mx-auto mt-8 flex h-36 w-36 items-center justify-center rounded-full bg-access-100">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-access-700 text-lg font-bold text-white">
            Voice
          </div>
        </div>
        <p className="mt-4 text-center text-sm font-bold text-foundation-700">Ready when you are.</p>
        <div className="mt-5 grid gap-2">
          {voiceAccessSimulationItems.slice(0, 4).map((item) => (
            <Link
              className="min-h-12 rounded-xl border border-line bg-surface px-4 py-3 text-sm font-bold text-foundation-900 focus:outline-none focus:ring-2 focus:ring-access-600"
              href={item.prompt.includes("Hub") ? productRoutes.resident.hubs : productRoutes.resident.accessDay}
              key={item.prompt}
            >
              {item.prompt}
            </Link>
          ))}
        </div>
        <p className="mt-5 rounded-xl bg-warning-100 p-4 text-sm font-bold leading-6 text-warning-600">
          {trustBoundary.voice}
        </p>
        <p className="mt-3 text-sm leading-6 text-foundation-700">{voiceAccessSafetyCopy.staticMode}</p>
      </section>
    );
  }

  if (screen === "access-day") {
    return (
      <section>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-700">Health Access Day</p>
        <h1 className="mt-4 text-3xl font-bold leading-tight">Health Access Day</h1>
        <p className="mt-3 text-base font-bold leading-7 text-access-700">Free community access support.</p>
        <div className="mt-5 rounded-xl border border-line bg-surface p-4">
          <p className="text-sm font-bold">Saturday, June 20, 2026</p>
          <p className="mt-2 text-sm text-foundation-700">10:00 AM - 2:00 PM</p>
          <p className="mt-3 text-sm font-bold">Eastview Community Center</p>
          <p className="text-sm text-foundation-700">123 Main Street</p>
        </div>
        <div className="mt-5 grid gap-2">
          {healthAccessDayGuidance.map((item) => (
            <span className="rounded-lg bg-white px-3 py-3 text-sm font-semibold text-foundation-800 shadow-sm" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>
    );
  }

  if (screen === "hubs") {
    return (
      <section>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-700">Health Equity Hubs</p>
        <h1 className="mt-4 text-3xl font-bold leading-tight">Find trusted access points near you.</h1>
        <p className="mt-3 text-base leading-7 text-foundation-700">These places can help.</p>
        <div className="mt-5 grid gap-4">
          {supportHubs.map((hub) => (
            <article className="rounded-xl border border-line bg-white p-4 shadow-sm" key={hub.name}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold">{hub.name}</h2>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-access-700">{hub.type}</p>
                  <p className="mt-2 text-sm text-foundation-700">{hub.address}</p>
                </div>
                <span className="text-sm font-bold">{hub.distance}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-foundation-700">{hub.support}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (screen === "provider-pathway") {
    return (
      <section>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-700">Provider-Led Pathways</p>
        <h1 className="mt-4 text-3xl font-bold leading-tight">Providers keep their platforms.</h1>
        <p className="mt-3 text-lg font-bold text-access-700">We help you get ready.</p>
        <div className="mt-7 grid gap-4">
          {providerPathwaySteps.map((step) => (
            <div className="rounded-xl border border-line bg-surface p-4 text-sm font-bold leading-6" key={step}>
              {step}
            </div>
          ))}
        </div>
        <p className="mt-5 rounded-xl bg-access-100 p-4 text-sm font-bold leading-6 text-access-700">
          {trustBoundary.provider}
        </p>
      </section>
    );
  }

  return (
    <section>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-700">Welcome</p>
      <h1 className="mt-6 text-4xl font-bold leading-tight">{brand.promise}</h1>
      <p className="mt-4 text-base leading-7 text-foundation-700">
        Local support. Real people. Stronger communities.
      </p>
      <div className="mt-7 rounded-2xl bg-[linear-gradient(180deg,#d1fae5,#f7fafc)] p-5">
        <div className="rounded-xl border border-access-600/20 bg-white/70 p-4">
          <p className="text-sm font-bold text-access-700">Your access path</p>
          <ol className="mt-3 grid gap-2 text-sm font-semibold text-foundation-800">
            <li>Welcome</li>
            <li>Access Start</li>
            <li>Voice Access or Tap Access</li>
            <li>Health Access Day, Hubs, Digital Help, or Provider Pathway</li>
            <li>Next-step guidance</li>
          </ol>
        </div>
      </div>
      <div className="mt-5 grid gap-2">
        {residentBoundaryStatements.slice(0, 3).map((statement) => (
          <p className="rounded-lg bg-surface px-3 py-3 text-sm font-bold" key={statement}>
            {statement}
          </p>
        ))}
      </div>
      <p className="mt-5 rounded-xl bg-access-100 p-4 text-sm font-bold leading-6 text-access-700">
        {trustBoundary.primary}
      </p>
    </section>
  );
}
