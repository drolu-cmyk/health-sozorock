"use client";

import { FormEvent, useEffect, useState } from "react";
import { AssuranceBadge } from "@/components/assurance-badge";
import { SectionHeading } from "@/components/section-heading";
import type { AccessRecord } from "@/lib/access-directory";
import { brand } from "@/lib/brand";
import { humanReviewBoundaryCopy } from "@/lib/human-review-data";
import {
  consentByFeatureMatrix,
  launchFeatureStates,
} from "@/lib/launch-governance";
import { residentModules } from "@/lib/mock-data";
import {
  healthAccessDayEvents,
  healthAccessDayInfoActions,
  providerPathwayActions,
  residentHubExamples,
} from "@/lib/resident-data";
import {
  voiceAccessSafetyCopy,
  voiceAccessSimulationItems,
} from "@/lib/voice-access-data";

type NeedKey =
  | "local-support"
  | "health-access-day"
  | "digital-readiness"
  | "voice-access"
  | "provider-readiness";

type StepStatus = AccessRecord["status"];

const needs: Array<{
  description: string;
  key: NeedKey;
  label: string;
  nextStep: string;
}> = [
  {
    description: "Find reviewed hubs, events, and access support near a ZIP code, city, or county.",
    key: "local-support",
    label: "Find access near me",
    nextStep: "Search by ZIP code, city, or county.",
  },
  {
    description: "See Health Access Day information and what to expect before attending.",
    key: "health-access-day",
    label: "Find a Health Access Day",
    nextStep: "Review listed event information.",
  },
  {
    description: "Prepare a device, connection, documents, and questions for provider-led care.",
    key: "digital-readiness",
    label: "Prepare for your visit",
    nextStep: "Use the provider-readiness checklist.",
  },
  {
    description: "Use guided text now while voice stays gated by consent, safety, and server readiness.",
    key: "voice-access",
    label: "Talk to Voice Access",
    nextStep: "Type instead until Voice Access is approved.",
  },
  {
    description: "Understand what SozoRock Health does and what licensed providers keep responsible for.",
    key: "provider-readiness",
    label: "Provider-led pathway",
    nextStep: "Review readiness steps and boundaries.",
  },
];

const readinessChecklist = [
  "Write down your main question for the provider.",
  "Bring insurance or payment information if the provider asks for it.",
  "Bring current medication information for the licensed provider to review.",
  "Check your device, internet, email, and provider platform access.",
  "Ask what happens next before you leave or end the provider visit.",
];

const aiGuidanceByNeed: Record<NeedKey, string> = {
  "digital-readiness":
    "Start with your provider-readiness checklist. SozoRock Health can help you organize what to bring and what to ask, but the provider makes clinical decisions.",
  "health-access-day":
    "Review the listed Health Access Day details, check the location and time, and use support if no event is listed near you right now.",
  "local-support":
    "Search by ZIP code, city, or county. If a nearby access point is not listed, use the support path so an approved operator can review the gap.",
  "provider-readiness":
    "Providers keep their platforms. SozoRock Health helps you get ready, understand the path, and ask clearer questions before provider-led care.",
  "voice-access":
    "Voice Access is visible, but guided text is available now. The app works without microphone access.",
};

const statusLabel: Record<StepStatus, string> = {
  limited: "Limited access",
  permission: "Requires your permission",
  ready: "Enabled",
};

const statusClass: Record<StepStatus, string> = {
  limited: "border-warning-600/40 bg-warning-100 text-warning-600",
  permission: "border-signal-600/40 bg-signal-100 text-signal-600",
  ready: "border-access-600/40 bg-access-100 text-access-700",
};

export function ResidentAccessApp() {
  const [selectedNeed, setSelectedNeed] = useState<NeedKey>("local-support");
  const [query, setQuery] = useState("27514");
  const [results, setResults] = useState<AccessRecord[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [voiceConsent, setVoiceConsent] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState(
    "Voice Access is limited access. You can continue with guided text.",
  );
  const [supportConsent, setSupportConsent] = useState(false);
  const [savedStep, setSavedStep] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [supportStatus, setSupportStatus] = useState("");
  const [guidance, setGuidance] = useState(aiGuidanceByNeed["local-support"]);
  const [isGuidanceLoading, setIsGuidanceLoading] = useState(false);
  const [completedItems, setCompletedItems] = useState<string[]>([
    readinessChecklist[0],
  ]);

  const selectedNeedConfig = needs.find((need) => need.key === selectedNeed);
  const nextStep =
    selectedNeedConfig?.nextStep ?? "Search by ZIP code, city, or county.";

  useEffect(() => {
    const controller = new AbortController();

    async function runSearch() {
      setIsSearching(true);
      try {
        const response = await fetch(
          `/api/access/search?q=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        );
        const data = (await response.json().catch(() => null)) as
          | { results?: AccessRecord[] }
          | null;
        setResults(data?.results ?? []);
      } catch {
        if (!controller.signal.aborted) {
          setResults([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    }

    const timeout = window.setTimeout(runSearch, 180);
    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();

    async function requestGuidance() {
      setIsGuidanceLoading(true);
      try {
        const response = await fetch("/api/ai/guidance", {
          body: JSON.stringify({
            need: selectedNeed,
            prompt: selectedNeedConfig?.description ?? "",
            query,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          signal: controller.signal,
        });
        const data = (await response.json().catch(() => null)) as
          | { answer?: string }
          | null;
        setGuidance(data?.answer ?? aiGuidanceByNeed[selectedNeed]);
      } catch {
        if (!controller.signal.aborted) {
          setGuidance(aiGuidanceByNeed[selectedNeed]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsGuidanceLoading(false);
        }
      }
    }

    void requestGuidance();
    return () => controller.abort();
  }, [query, selectedNeed, selectedNeedConfig?.description]);

  function toggleChecklist(item: string) {
    setCompletedItems((current) =>
      current.includes(item)
        ? current.filter((existing) => existing !== item)
        : [...current, item],
    );
  }

  function saveNextStep() {
    const value = `${selectedNeedConfig?.label}: ${nextStep}`;
    window.localStorage.setItem("sozorock-health-next-step", value);
    setSavedStep(value);
  }

  async function requestVoiceAccess() {
    setVoiceMessage("Checking Voice Access readiness...");
    try {
      const response = await fetch("/api/voice/session", {
        body: JSON.stringify({
          consent: voiceConsent,
          language: "en-US",
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const data = (await response.json().catch(() => null)) as
        | { error?: string; state?: string }
        | null;
      setVoiceMessage(
        data?.error ??
          (data?.state === "Enabled"
            ? "Voice Access session is ready."
            : "Voice Access is limited access. You can continue with guided text."),
      );
    } catch {
      setVoiceMessage(
        "Voice Access is temporarily unavailable. You can continue with guided text.",
      );
    }
  }

  async function submitSupport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSupportStatus("Preparing support request...");

    try {
      const response = await fetch("/api/support", {
        body: JSON.stringify({
          consent: supportConsent,
          message: supportMessage,
          need: selectedNeed,
          query,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const data = (await response.json().catch(() => null)) as
        | { caseId?: string; error?: string; message?: string }
        | null;

      if (!response.ok) {
        setSupportStatus(
          data?.error ?? "This option is temporarily unavailable.",
        );
        return;
      }

      setSupportStatus(
        data?.caseId
          ? `${data.message} Case ${data.caseId}.`
          : "Support request prepared.",
      );
    } catch {
      setSupportStatus("This option is temporarily unavailable.");
    }
  }

  return (
    <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f7fafc_52%,#eef4f8_100%)]">
      <section className="mx-auto max-w-7xl px-5 py-8 md:py-12">
        <div className="grid min-w-0 gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div className="min-w-0">
            <SectionHeading
              eyebrow={brand.layers.resident.name}
              title={`${brand.layers.resident.standard}.`}
              description="A resident-facing app for choosing an access need, searching by ZIP code, using guided text, preparing for provider-led care, and requesting support."
            />
          </div>
          <div className="min-w-0 rounded-lg border border-access-600/20 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <AssuranceBadge />
              <span className="rounded-lg bg-surface px-3 py-2 text-sm font-bold text-foundation-700">
                Controlled public launch
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold leading-6 text-foundation-700">
              Enabled paths work now. Limited paths stay visible with guided text,
              support, and clear permission boundaries.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl min-w-0 gap-5 px-5 pb-5 lg:grid-cols-[0.78fr_1.22fr]">
        <article
          className="min-w-0 rounded-[1.5rem] border border-foundation-950/10 bg-foundation-950 p-3 shadow-xl"
          id="welcome"
        >
          <div className="rounded-[1.05rem] bg-white p-5">
            <div className="mb-5 flex items-center justify-between text-xs font-bold text-foundation-950">
              <span>9:41</span>
              <span>Access</span>
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
              Welcome
            </p>
            <h1 className="mt-4 break-words text-3xl font-bold tracking-normal text-foundation-950 sm:text-4xl md:text-5xl">
              {brand.promise}
            </h1>
            <p className="mt-4 break-words text-base leading-7 text-foundation-700 sm:text-lg sm:leading-8">
              SozoRock Health helps residents understand support options, find
              reviewed access points, prepare for provider-led care, and move to
              a clear next step.
            </p>
            <a
              className="mt-6 inline-flex min-h-11 min-w-36 items-center justify-center rounded-lg bg-access-700 px-5 py-3 text-sm font-bold text-white hover:bg-access-600 focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2"
              href="#access-start"
            >
              Start
            </a>
            <p className="mt-5 text-sm leading-6 text-foundation-700">
              Data collected: none on this screen.
            </p>
            <div className="mt-8 grid grid-cols-4 gap-2 border-t border-line pt-4 text-center text-[0.68rem] font-bold text-foundation-700">
              {["Home", "Guide", "Support", "More"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </article>

        <article
          className="min-w-0 rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6"
          id="access-start"
        >
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Access Start
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            What do you need today?
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {needs.map((need) => (
              <button
                aria-pressed={selectedNeed === need.key}
                className={
                  selectedNeed === need.key
                    ? "rounded-lg border border-access-600 bg-access-100 px-4 py-4 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2"
                    : "rounded-lg border border-line bg-white px-4 py-4 text-left shadow-sm hover:border-access-600 hover:bg-access-100 focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2"
                }
                key={need.key}
                onClick={() => setSelectedNeed(need.key)}
                type="button"
              >
                <span className="block text-sm font-bold text-foundation-950">
                  {need.label}
                </span>
                <span className="mt-2 block text-sm leading-6 text-foundation-700">
                  {need.description}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-lg border border-line bg-surface p-4">
            <p className="text-sm font-bold text-foundation-950">
              Guided next step
            </p>
            <p className="mt-2 text-sm leading-6 text-foundation-700" aria-live="polite">
              {isGuidanceLoading ? "Building guidance..." : guidance}
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-foundation-950 px-4 text-sm font-bold text-white hover:bg-foundation-800 focus:outline-none focus:ring-2 focus:ring-foundation-950 focus:ring-offset-2"
                onClick={saveNextStep}
                type="button"
              >
                Save my next step
              </button>
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-foundation-800 px-4 text-sm font-bold text-foundation-950 hover:bg-white focus:outline-none focus:ring-2 focus:ring-foundation-950 focus:ring-offset-2"
                href="#support"
              >
                Request support
              </a>
            </div>
            {savedStep ? (
              <p className="mt-3 text-sm font-semibold text-access-700" role="status">
                Your next step is saved: {savedStep}
              </p>
            ) : null}
          </div>
        </article>
      </section>

      <section className="mx-auto grid max-w-7xl min-w-0 gap-5 px-5 py-5 lg:grid-cols-[0.86fr_1.14fr]">
        <article
          className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6"
          id="search"
        >
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Search
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            Search by ZIP code, city, or county.
          </h2>
          <label className="mt-5 grid gap-2 text-sm font-bold text-foundation-950">
            ZIP code, city, or county
            <input
              className="min-h-12 rounded-lg border border-line bg-white px-4 text-base font-normal outline-none focus:border-access-600 focus:ring-2 focus:ring-access-600/25"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ZIP code, city, or county"
              type="search"
              value={query}
            />
          </label>
          <p className="mt-3 text-sm leading-6 text-foundation-700">
            You can still search by ZIP code, city, or county without location
            permission.
          </p>
          <div className="mt-5 grid gap-3">
            {isSearching ? (
              <div className="rounded-lg border border-line bg-surface p-4">
                <p className="text-sm font-bold text-foundation-950">
                  Searching reviewed access records...
                </p>
              </div>
            ) : results.length > 0 ? (
              results.map((record) => (
                <article
                  className="rounded-lg border border-line bg-surface p-4"
                  key={record.label}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-base font-bold text-foundation-950">
                        {record.label}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-foundation-700">
                        {record.city}, {record.county} | ZIP {record.zip}
                      </p>
                    </div>
                    <span
                      className={`w-fit rounded-lg border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${statusClass[record.status]}`}
                    >
                      {statusLabel[record.status]}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-foundation-700">
                    {record.message}
                  </p>
                </article>
              ))
            ) : (
              <div className="rounded-lg border border-line bg-surface p-4">
                <p className="text-sm font-bold text-foundation-950">
                  We could not find a nearby access point yet.
                </p>
                <p className="mt-2 text-sm leading-6 text-foundation-700">
                  You can continue with guided text or request support.
                </p>
              </div>
            )}
          </div>
        </article>

        <article
          className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6"
          id="voice-access"
        >
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-signal-600">
            Voice Access
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            SozoRock Health Voice Access.
          </h2>
          <p className="mt-4 text-sm leading-6 text-foundation-700">
            SozoRock Health Voice Access is visible for controlled launch
            readiness. Guided text is available now and the app works without
            microphone access.
          </p>
          <div className="mt-5 rounded-lg border border-warning-600/40 bg-warning-100 p-4">
            <p className="text-sm font-bold text-warning-600">
              Limited access
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-warning-600">
              This option needs microphone permission, server-side voice
              readiness, rate limits, privacy rules, and support escalation before
              it can be used.
            </p>
          </div>
          <label className="mt-4 flex min-h-12 items-center gap-3 rounded-lg border border-line bg-surface px-4 text-sm font-bold text-foundation-950">
            <input
              checked={voiceConsent}
              className="size-4 accent-access-700"
              onChange={(event) => setVoiceConsent(event.target.checked)}
              type="checkbox"
            />
            This option needs your permission before it can be used.
          </label>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-line bg-white px-4 text-sm font-bold text-foundation-700 hover:bg-surface focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2"
              onClick={requestVoiceAccess}
              type="button"
            >
              Talk to Voice Access
            </button>
            <button
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-access-700 px-4 text-sm font-bold text-white hover:bg-access-600 focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2"
              onClick={() => setSelectedNeed("voice-access")}
              type="button"
            >
              Type instead
            </button>
          </div>
          <p className="mt-4 rounded-lg border border-line bg-surface p-4 text-sm font-semibold leading-6 text-foundation-700">
            {voiceAccessSafetyCopy.boundary}
          </p>
          <p className="mt-4 rounded-lg border border-line bg-warning-100 p-4 text-sm font-semibold leading-6 text-warning-600">
            {voiceAccessSafetyCopy.review}
          </p>
          <p className="mt-4 rounded-lg border border-line bg-signal-100 p-4 text-sm font-semibold leading-6 text-signal-600">
            {humanReviewBoundaryCopy.planning}
          </p>
          <p className="mt-4 rounded-lg border border-line bg-access-100 p-4 text-sm font-semibold leading-6 text-access-700">
            {brand.trustBoundary}
          </p>
          <p className="mt-4 rounded-lg border border-line bg-surface p-4 text-sm font-semibold leading-6 text-foundation-700">
            SozoRock Health does not diagnose, treat, write prescriptions, or replace licensed care.
          </p>
          <p className="mt-4 text-sm leading-6 text-foundation-700">
            {voiceMessage}
          </p>
          <div className="mt-5 grid gap-3">
            {voiceAccessSimulationItems.slice(0, 3).map((item) => (
              <div className="rounded-lg border border-line bg-surface p-4" key={item.prompt}>
                <p className="text-base font-bold text-foundation-950">
                  {item.prompt}
                </p>
                <p className="mt-3 text-sm leading-6 text-foundation-700">
                  {item.nextStep}
                </p>
              </div>
            ))}
          </div>
          {voiceConsent ? (
            <p className="mt-3 text-sm font-semibold text-access-700" role="status">
              Permission preference noted. Voice remains gated until the approved
              server-side path is ready.
            </p>
          ) : null}
        </article>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-5 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6" id="health-access-day">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Health Access Day
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            Community access information and digital readiness support.
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {healthAccessDayEvents.map((event) => (
              <div className="rounded-lg border border-line bg-surface p-4" key={event.title}>
                <p className="text-sm font-bold text-foundation-950">{event.title}</p>
                <p className="mt-2 text-sm font-semibold text-access-700">
                  {event.date} at {event.time}
                </p>
                <p className="mt-3 text-sm font-semibold text-foundation-900">
                  {event.location}
                </p>
                <p className="mt-2 text-sm leading-6 text-foundation-700">
                  {event.support}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {healthAccessDayInfoActions.map((item) => (
              <span
                className="rounded-lg border border-line bg-white px-4 py-3 text-sm font-bold text-foundation-900"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6" id="provider-led-pathways">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Provider-readiness checklist
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            {brand.providerPathway}
          </h2>
          <p className="mt-4 leading-7 text-foundation-700">
            Licensed providers use their own approved platforms, records, and
            clinical systems. SozoRock Health supports access readiness.
          </p>
          <div className="mt-5 grid gap-3">
            {readinessChecklist.map((item) => (
              <label
                className="flex min-h-12 items-start gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-sm font-bold text-foundation-900"
                key={item}
              >
                <input
                  checked={completedItems.includes(item)}
                  className="mt-1 size-4 accent-access-700"
                  onChange={() => toggleChecklist(item)}
                  type="checkbox"
                />
                {item}
              </label>
            ))}
          </div>
          <p className="mt-5 rounded-lg border border-line bg-access-100 p-4 text-sm font-semibold leading-6 text-access-700">
            {completedItems.length} of {readinessChecklist.length} readiness
            steps selected.
          </p>
          <div className="mt-5 grid gap-3">
            {providerPathwayActions.map((action) => (
              <span
                className="rounded-lg border border-line bg-white px-4 py-3 text-sm font-bold text-foundation-900"
                key={action}
              >
                {action}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-5 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6" id="health-equity-hubs">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Health Equity Hubs
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            Ongoing access points beyond one event.
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {residentHubExamples.map((hub) => (
              <div className="rounded-lg border border-line bg-surface p-4" key={hub.name}>
                <p className="text-sm font-bold text-foundation-950">{hub.name}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-access-700">
                  {hub.type}
                </p>
                <p className="mt-3 text-sm font-semibold text-foundation-900">
                  {hub.distance}
                </p>
                <p className="mt-2 text-sm text-foundation-700">{hub.hours}</p>
                <p className="mt-3 text-sm leading-6 text-foundation-700">
                  {hub.support}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-foundation-700">
            Hub listings show non-clinical support availability only where records
            are reviewed for controlled launch.
          </p>
        </article>

        <article className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6" id="privacy-consent">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Privacy and consent
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            The app works without microphone or location access.
          </h2>
          <div className="mt-5 grid gap-3">
            {consentByFeatureMatrix.slice(0, 4).map((item) => (
              <div className="rounded-lg border border-line bg-surface p-4" key={item.feature}>
                <p className="text-sm font-bold text-foundation-950">{item.feature}</p>
                <p className="mt-2 text-sm leading-6 text-foundation-700">
                  {item.dataUsed}
                </p>
                <p className="mt-2 text-sm font-semibold text-access-700">
                  If declined: {item.ifDenied}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-5 pb-12">
        <article className="mb-5 rounded-lg border border-line bg-white p-6 shadow-sm" id="feature-states">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Service states
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            What is available now?
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {launchFeatureStates.slice(0, 8).map((feature) => (
              <div className="rounded-lg border border-line bg-surface p-4" key={feature.featureKey}>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-bold text-foundation-950">
                    {feature.label}
                  </p>
                  <span className="w-fit rounded-lg bg-white px-3 py-1 text-xs font-bold text-access-700">
                    {feature.state}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-foundation-700">
                  {feature.publicExplanation}
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.1em] text-foundation-700">
                  {feature.fallbackPath}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="mb-5 rounded-lg border border-line bg-white p-6 shadow-sm" id="support">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Request support
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            Ask for help when the app cannot find the right access point.
          </h2>
          <form className="mt-5 grid gap-4" onSubmit={submitSupport}>
            <label className="grid gap-2 text-sm font-bold text-foundation-950">
              What should support understand?
              <textarea
                className="min-h-28 rounded-lg border border-line bg-white px-4 py-3 text-base font-normal leading-7 outline-none focus:border-access-600 focus:ring-2 focus:ring-access-600/25"
                onChange={(event) => setSupportMessage(event.target.value)}
                placeholder="Tell us the access need, ZIP code, city, or county."
                value={supportMessage}
              />
            </label>
            <label className="flex min-h-12 items-start gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-sm font-bold text-foundation-900">
              <input
                checked={supportConsent}
                className="mt-1 size-4 accent-access-700"
                onChange={(event) => setSupportConsent(event.target.checked)}
                type="checkbox"
              />
              I give permission for SozoRock Health support to respond to this
              request.
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-foundation-950 px-4 text-sm font-bold text-white hover:bg-foundation-800 focus:outline-none focus:ring-2 focus:ring-foundation-950 focus:ring-offset-2"
                type="submit"
              >
                Prepare support request
              </button>
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-foundation-800 px-4 text-sm font-bold text-foundation-950 hover:bg-white focus:outline-none focus:ring-2 focus:ring-foundation-950 focus:ring-offset-2"
                href={`mailto:support@sozorockfoundation.org?subject=SozoRock%20Health%20support%20request&body=${encodeURIComponent(
                  supportMessage || "I need help with an access next step.",
                )}`}
              >
                Email support
              </a>
            </div>
            {supportStatus ? (
              <p className="text-sm font-semibold text-access-700" role="status">
                {supportStatus}
              </p>
            ) : null}
          </form>
        </article>

        <article className="rounded-lg border border-line bg-foundation-950 p-6 text-white shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-100">
                Resident modules
              </p>
              <h2 className="mt-3 text-2xl font-bold">
                A simple resident path.
              </h2>
            </div>
            <span className="rounded-lg bg-white/10 px-4 py-3 text-sm font-bold text-access-100">
              {brand.trustBoundary}
            </span>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {residentModules.map((module) => (
              <span
                className="rounded-lg border border-white/15 bg-white/8 px-4 py-3 text-sm font-bold"
                key={module}
              >
                {module}
              </span>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
