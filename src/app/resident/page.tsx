import { AssuranceBadge } from "@/components/assurance-badge";
import { SectionHeading } from "@/components/section-heading";
import { brand } from "@/lib/brand";
import { humanReviewBoundaryCopy } from "@/lib/human-review-data";
import { consentByFeatureMatrix, launchFeatureStates } from "@/lib/launch-governance";
import { residentModules } from "@/lib/mock-data";
import {
  healthAccessDayEvents,
  healthAccessDayInfoActions,
  providerPathwayActions,
  residentAccessActions,
  residentHubExamples,
} from "@/lib/resident-data";
import { voiceAccessSafetyCopy, voiceAccessSimulationItems } from "@/lib/voice-access-data";

export default function ResidentPage() {
  return (
    <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f7fafc_52%,#eef4f8_100%)]">
      <section className="mx-auto max-w-7xl px-5 py-8 md:py-12">
        <div className="grid min-w-0 gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div className="min-w-0">
            <SectionHeading
              eyebrow={brand.layers.resident.name}
              title={`${brand.layers.resident.standard}.`}
              description="A resident-facing experience for starting access support with plain language, clear service states, and non-clinical boundaries."
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
              Enabled paths are available now. Limited paths stay visible with a clear text alternative, support path, and permission boundary.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl min-w-0 gap-5 px-5 pb-5 lg:grid-cols-[0.88fr_1.12fr]">
        <article className="min-w-0 overflow-hidden rounded-[1.75rem] border border-foundation-950/10 bg-foundation-950 p-3 shadow-xl" id="welcome">
          <div className="rounded-[1.35rem] bg-white p-5">
            <div className="mb-5 flex items-center justify-between text-xs font-bold text-foundation-950">
              <span>9:41</span>
              <span>Access</span>
            </div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Welcome
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-normal text-foundation-950 break-words sm:text-4xl md:text-5xl">
            {brand.promise}
          </h1>
          <p className="mt-4 text-base leading-7 text-foundation-700 break-words sm:text-lg sm:leading-8">
            Health access made easier for underserved communities.
          </p>
          <a
            className="mt-6 inline-flex min-w-36 items-center justify-center rounded-lg bg-access-700 px-5 py-3 text-sm font-bold text-white hover:bg-access-600"
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

        <article className="min-w-0 rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6" id="access-start">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Access Start
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">What do you need today?</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {residentAccessActions.map((action) => (
              <a
                className="rounded-lg border border-line bg-white px-4 py-4 text-left shadow-sm hover:border-access-600 hover:bg-access-100"
                href={action.href}
                key={action.title}
              >
                <span className="block text-sm font-bold text-foundation-950">{action.title}</span>
                <span className="mt-2 block text-sm leading-6 text-foundation-700">
                  {action.description}
                </span>
              </a>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-foundation-700">
            This start point helps residents choose a non-clinical support path.
          </p>
        </article>
      </section>

      <section className="mx-auto grid max-w-7xl min-w-0 gap-5 px-5 py-5 lg:grid-cols-[0.85fr_1.15fr]">
        <article className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6" id="voice-access">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-signal-600">
            Voice Access
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            Speak or tap to find local support.
          </h2>
          <p className="mt-4 text-sm leading-6 text-foundation-700">
            SozoRock Health Voice Access is visible for controlled launch readiness. Guided text is available now and the app works without microphone access.
          </p>
          <div className="mt-5 grid gap-3">
            {voiceAccessSimulationItems.map((item) => (
              <div className="rounded-lg border border-line bg-surface p-4" key={item.prompt}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <p className="text-base font-bold text-foundation-950">{item.prompt}</p>
                  <span className="w-fit rounded-lg bg-signal-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-signal-600">
                    {item.category}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-foundation-700">{item.response}</p>
                <p className="mt-3 rounded-lg border border-line bg-white px-4 py-3 text-sm font-semibold leading-6 text-foundation-800">
                  {item.nextStep}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-lg border border-line bg-surface p-4 text-sm font-semibold leading-6 text-foundation-700">
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
            {voiceAccessSafetyCopy.serviceState}
          </p>
        </article>

        <article className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6" id="health-access-day">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Health Access Day
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            A community event for health education, digital readiness, and trusted access support.
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {healthAccessDayEvents.map((event) => (
              <div className="rounded-lg border border-line bg-surface p-4" key={event.title}>
                <p className="text-sm font-bold text-foundation-950">{event.title}</p>
                <p className="mt-2 text-sm font-semibold text-access-700">
                  {event.date} at {event.time}
                </p>
                <p className="mt-3 text-sm font-semibold text-foundation-900">{event.location}</p>
                <p className="mt-2 text-sm leading-6 text-foundation-700">{event.support}</p>
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
                <p className="mt-3 text-sm font-semibold text-foundation-900">{hub.distance}</p>
                <p className="mt-2 text-sm text-foundation-700">{hub.hours}</p>
                <p className="mt-3 text-sm leading-6 text-foundation-700">{hub.support}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-foundation-700">
            Hub listings show non-clinical support availability only where records are reviewed for controlled launch.
          </p>
        </article>

        <article className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6" id="provider-led-pathways">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Provider-Led Pathways
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            {brand.providerPathway}
          </h2>
          <p className="mt-4 leading-7 text-foundation-700">
            Licensed providers use their own approved platforms, records, and clinical systems.
            SozoRock Health supports access readiness.
          </p>
          <div className="mt-5 grid gap-3">
            {providerPathwayActions.map((action) => (
              <span
                className="rounded-lg border border-line bg-surface px-4 py-3 text-sm font-bold text-foundation-900"
                key={action}
              >
                {action}
              </span>
            ))}
          </div>
          <p className="mt-5 rounded-lg border border-line bg-access-100 p-4 text-sm font-semibold leading-6 text-access-700">
            SozoRock Health supports access readiness while providers keep responsibility for
            their own platforms and services.
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-5 pb-12">
        <article className="mb-5 rounded-lg border border-line bg-white p-6 shadow-sm" id="feature-states">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Service states
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">What is available now?</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {launchFeatureStates.slice(0, 8).map((feature) => (
              <div className="rounded-lg border border-line bg-surface p-4" key={feature.featureKey}>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-bold text-foundation-950">{feature.label}</p>
                  <span className="w-fit rounded-lg bg-white px-3 py-1 text-xs font-bold text-access-700">
                    {feature.state}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-foundation-700">{feature.publicExplanation}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.1em] text-foundation-700">
                  {feature.fallbackPath}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="mb-5 rounded-lg border border-line bg-white p-6 shadow-sm" id="privacy-consent">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Privacy and consent
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">The app works without microphone or location access.</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {consentByFeatureMatrix.slice(0, 5).map((item) => (
              <div className="rounded-lg border border-line bg-surface p-4" key={item.feature}>
                <p className="text-sm font-bold text-foundation-950">{item.feature}</p>
                <p className="mt-2 text-sm leading-6 text-foundation-700">{item.dataUsed}</p>
                <p className="mt-2 text-sm font-semibold text-access-700">If declined: {item.ifDenied}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-line bg-foundation-950 p-6 text-white shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-100">
                Resident modules
              </p>
              <h2 className="mt-3 text-2xl font-bold">A simple six-screen resident path.</h2>
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
