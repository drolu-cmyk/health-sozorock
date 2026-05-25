"use client";

import Link from "next/link";
import { useState } from "react";
import { brand } from "@/lib/brand";
import { residentBoundaryStatements, trustBoundary } from "@/lib/productBoundaries";
import { residentRouteItems } from "@/lib/routes";
import {
  healthAccessDayGuidance,
  providerPathwaySteps,
  residentNeeds,
  residentNextSteps,
} from "@/data/residentAccess";
import { supportHubs } from "@/data/hubs";
import { voiceAccessSafetyCopy, voiceAccessSimulationItems } from "@/lib/voice-access-data";

export type ResidentScreen =
  | "welcome"
  | "start"
  | "voice-access"
  | "access-day"
  | "hubs"
  | "provider-pathway";

const screenTitle: Record<ResidentScreen, string> = {
  welcome: "Welcome",
  start: "Access Start",
  "voice-access": "Voice Access",
  "access-day": "Health Access Day",
  hubs: "Health Equity Hubs",
  "provider-pathway": "Provider-Led Pathways",
};

export function ResidentAccessApp({ screen = "welcome" }: { screen?: ResidentScreen }) {
  const [selectedNeed, setSelectedNeed] = useState<(typeof residentNeeds)[number] | null>(null);

  return (
    <div className="bg-[#f4f8fb]">
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[340px_1fr] lg:items-start lg:px-5 lg:py-10">
        <div className="mx-auto w-full max-w-[390px] rounded-[2rem] border-[10px] border-[#101820] bg-[#101820] shadow-2xl">
          <div className="min-h-[720px] overflow-hidden rounded-[1.35rem] bg-white">
            <div className="flex items-center justify-between border-b border-line px-5 py-4 text-sm font-bold text-foundation-950">
              <span>9:41</span>
              <span>{brand.programName}</span>
              <span aria-label="Static app menu">Menu</span>
            </div>
            <div className="min-h-[585px] px-5 py-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-700">
                {screenTitle[screen]}
              </p>
              <ResidentScreenContent
                screen={screen}
                selectedNeed={selectedNeed}
                onSelectNeed={setSelectedNeed}
              />
            </div>
            <nav
              aria-label="Resident app navigation"
              className="grid grid-cols-4 gap-1 border-t border-line bg-white px-3 py-3 text-center text-[0.68rem] font-bold text-foundation-700"
            >
              {residentRouteItems.slice(0, 4).map((item) => (
                <Link
                  className="rounded-lg px-2 py-3 hover:bg-access-100 focus:outline-none focus:ring-2 focus:ring-access-600"
                  href={item.href}
                  key={item.href}
                >
                  {item.shortLabel}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="grid min-w-0 gap-5">
          <div className="rounded-lg border border-line bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
                  Resident Access product
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-normal text-foundation-950 md:text-5xl">
                  {brand.promise}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-foundation-700">
                  A mobile-first, private access flow for local support, Voice Access, hubs,
                  Health Access Day guidance, and provider-led readiness.
                </p>
              </div>
              <div className="rounded-lg border border-access-600/20 bg-access-100 p-4 text-sm font-bold leading-6 text-access-700">
                {trustBoundary.primary}
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {residentRouteItems.map((item) => (
              <Link
                className="rounded-lg border border-line bg-white p-4 text-sm font-bold text-foundation-900 shadow-sm hover:border-access-600 focus:outline-none focus:ring-2 focus:ring-access-600"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-foundation-700">
              Local/session-only boundary
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {residentBoundaryStatements.slice(0, 3).map((item) => (
                <span className="rounded-lg bg-surface px-4 py-3 text-sm font-bold text-foundation-900" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ResidentScreenContent({
  screen,
  selectedNeed,
  onSelectNeed,
}: {
  screen: ResidentScreen;
  selectedNeed: (typeof residentNeeds)[number] | null;
  onSelectNeed: (need: (typeof residentNeeds)[number]) => void;
}) {
  if (screen === "start") {
    return (
      <div>
        <h2 className="mt-4 text-2xl font-bold text-foundation-950">What do you need today?</h2>
        <p className="mt-2 text-sm leading-6 text-foundation-700">Choose a topic. Nothing is submitted or stored.</p>
        <div className="mt-5 grid gap-3">
          {residentNeeds.map((need) => (
            <button
              aria-label={`Select ${need.title}`}
              className="min-h-16 rounded-lg border border-line bg-white p-4 text-left shadow-sm hover:border-access-600 focus:outline-none focus:ring-2 focus:ring-access-600"
              key={need.id}
              onClick={() => onSelectNeed(need)}
              type="button"
            >
              <span className="block text-sm font-bold text-foundation-950">{need.title}</span>
              <span className="mt-1 block text-sm leading-5 text-foundation-700">{need.description}</span>
            </button>
          ))}
        </div>
        <div className="mt-5 rounded-lg border border-access-600/20 bg-access-100 p-4 text-sm leading-6 text-access-700">
          <p className="font-bold">Non-clinical next step</p>
          <p className="mt-1">{selectedNeed?.nextStep ?? residentNextSteps[0]}</p>
        </div>
      </div>
    );
  }

  if (screen === "voice-access") {
    return (
      <div>
        <h2 className="mt-4 text-2xl font-bold text-foundation-950">Speak or tap to find local support.</h2>
        <div className="mx-auto mt-8 flex h-36 w-36 items-center justify-center rounded-full bg-access-100">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-access-700 text-xl font-bold text-white" aria-hidden="true">
            Voice
          </div>
        </div>
        <p className="mt-4 text-center text-sm font-bold text-foundation-700">Static listening preview</p>
        <div className="mt-5 grid gap-2">
          {voiceAccessSimulationItems.map((item) => (
            <span className="rounded-lg border border-line bg-surface px-3 py-3 text-sm font-bold text-foundation-900" key={item.prompt}>
              {item.prompt}
            </span>
          ))}
        </div>
        <p className="mt-5 rounded-lg bg-warning-100 p-4 text-sm font-bold leading-6 text-warning-600">
          {trustBoundary.voice}
        </p>
        <p className="mt-3 text-sm leading-6 text-foundation-700">{voiceAccessSafetyCopy.staticMode}</p>
      </div>
    );
  }

  if (screen === "access-day") {
    return (
      <div>
        <h2 className="mt-4 text-2xl font-bold text-foundation-950">Health Access Day</h2>
        <p className="mt-2 text-sm leading-6 text-foundation-700">Free community access support.</p>
        <div className="mt-5 rounded-lg border border-line bg-surface p-4">
          <p className="text-sm font-bold text-foundation-950">Saturday, June 20, 2026</p>
          <p className="mt-2 text-sm text-foundation-700">10:00 AM – 2:00 PM</p>
          <p className="mt-3 text-sm font-bold text-foundation-950">Eastview Community Center</p>
          <p className="text-sm text-foundation-700">123 Main Street</p>
        </div>
        <div className="mt-5 grid gap-2">
          {healthAccessDayGuidance.map((item) => (
            <span className="text-sm font-semibold text-foundation-800" key={item}>{item}</span>
          ))}
        </div>
      </div>
    );
  }

  if (screen === "hubs") {
    return (
      <div>
        <h2 className="mt-4 text-2xl font-bold text-foundation-950">Find trusted access points near you.</h2>
        <p className="mt-2 text-sm leading-6 text-foundation-700">These places can help.</p>
        <div className="mt-5 grid gap-4">
          {supportHubs.map((hub) => (
            <article className="border-b border-line pb-4 last:border-0" key={hub.name}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-foundation-950">{hub.name}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-access-700">{hub.type}</p>
                  <p className="mt-2 text-sm text-foundation-700">{hub.address}</p>
                </div>
                <span className="text-sm font-bold text-foundation-950">{hub.distance}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (screen === "provider-pathway") {
    return (
      <div>
        <h2 className="mt-4 text-2xl font-bold text-foundation-950">Providers keep their platforms.</h2>
        <p className="mt-2 text-base font-bold text-access-700">We help you get ready.</p>
        <div className="mt-8 grid gap-5">
          {providerPathwaySteps.map((step) => (
            <div className="rounded-lg border border-line bg-surface p-4 text-sm font-bold leading-6 text-foundation-900" key={step}>
              {step}
            </div>
          ))}
        </div>
        <p className="mt-5 rounded-lg bg-access-100 p-4 text-sm font-bold leading-6 text-access-700">
          {trustBoundary.provider}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mt-6 text-4xl font-bold leading-tight text-foundation-950">{brand.promise}</h2>
      <p className="mt-4 text-base leading-7 text-foundation-700">
        Local support. Real people. Stronger communities.
      </p>
      <div className="mt-8 min-h-52 rounded-lg bg-[linear-gradient(180deg,#d1fae5,#f7fafc)] p-5">
        <div className="flex h-full min-h-40 items-end justify-center rounded-lg border border-access-600/20 bg-white/55 text-center text-sm font-bold text-access-700">
          Resident access path
        </div>
      </div>
      <Link
        className="mt-6 flex min-h-12 items-center justify-center rounded-lg bg-access-700 px-5 text-sm font-bold text-white"
        href="/resident/start"
      >
        Get Started
      </Link>
    </div>
  );
}
