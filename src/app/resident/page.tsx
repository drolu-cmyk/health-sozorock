import { AssuranceBadge } from "@/components/assurance-badge";
import { SectionHeading } from "@/components/section-heading";
import { brand } from "@/lib/brand";
import { residentModules } from "@/lib/mock-data";
import {
  healthAccessDayEvents,
  providerPathwayActions,
  residentAccessActions,
  residentHubExamples,
  voiceAccessPrompts,
} from "@/lib/resident-data";

export default function ResidentPage() {
  return (
    <div className="bg-surface">
      <section className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <SectionHeading
              eyebrow={brand.layers.resident.name}
              title={`${brand.layers.resident.standard}.`}
              description="A resident-facing experience for starting access support with plain language, synthetic information, and clear boundaries."
            />
          </div>
          <div className="rounded-lg border border-access-600/20 bg-white p-5 shadow-sm">
            <AssuranceBadge />
            <p className="mt-4 text-sm font-semibold leading-6 text-foundation-700">
              No live AI, no external integrations, and no protected-data intake in this prototype.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-5 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-lg border border-line bg-white p-6 shadow-sm" id="welcome">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Welcome
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-normal text-foundation-950 md:text-5xl">
            {brand.promise}
          </h1>
          <p className="mt-4 text-lg leading-8 text-foundation-700">
            Health access made easier for underserved communities.
          </p>
          <a
            className="mt-6 inline-flex rounded-lg bg-foundation-950 px-5 py-3 text-sm font-bold text-white hover:bg-foundation-800"
            href="#access-start"
          >
            Get Started
          </a>
          <p className="mt-5 text-sm leading-6 text-foundation-700">
            Data collected: none on this screen.
          </p>
        </article>

        <article className="rounded-lg border border-line bg-white p-6 shadow-sm" id="access-start">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Access Start
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">What do you need today?</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {residentAccessActions.map((action) => (
              <a
                className="rounded-lg border border-line bg-surface px-4 py-4 text-left hover:border-access-600 hover:bg-access-100"
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

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-5 lg:grid-cols-[0.85fr_1.15fr]">
        <article className="rounded-lg border border-line bg-white p-6 shadow-sm" id="voice-access">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-signal-600">
            Voice Access
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">Speak or tap to find local support.</h2>
          <div className="mt-5 space-y-3">
            {voiceAccessPrompts.map((prompt) => (
              <div
                className="rounded-lg bg-signal-100 px-4 py-3 text-sm font-semibold text-foundation-900"
                key={prompt}
              >
                {prompt}
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-lg border border-line bg-surface p-4 text-sm font-semibold leading-6 text-foundation-700">
            Voice Access provides non-clinical support and does not give medical advice.
          </p>
          <p className="mt-4 text-sm leading-6 text-foundation-700">
            This is static prototype copy. It does not connect to live AI.
          </p>
        </article>

        <article className="rounded-lg border border-line bg-white p-6 shadow-sm" id="health-access-day">
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
            {["Register / RSVP", "Find Events Near Me", "Request Reminder", "See What to Expect"].map(
              (item) => (
                <span
                  className="rounded-lg border border-line bg-white px-4 py-3 text-sm font-bold text-foundation-900"
                  key={item}
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </article>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-5 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-lg border border-line bg-white p-6 shadow-sm" id="health-equity-hubs">
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
            Hub listings show non-clinical support availability using synthetic prototype data.
          </p>
        </article>

        <article className="rounded-lg border border-line bg-white p-6 shadow-sm" id="provider-led-pathways">
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
