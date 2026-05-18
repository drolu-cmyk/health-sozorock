import { AssuranceBadge } from "@/components/assurance-badge";
import { SectionHeading } from "@/components/section-heading";
import { brand } from "@/lib/brand";
import { hubExamples, residentModules } from "@/lib/mock-data";

const accessActions = ["Find Local Support", "Health Access Day", "Digital Help", "Voice Access"];

export default function ResidentPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <SectionHeading
        eyebrow={brand.layers.resident.name}
        title={`${brand.layers.resident.standard}.`}
        description="A resident-facing shell for starting access support without protected-data intake or clinical workflows."
      />

      <section className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <AssuranceBadge />
          <h1 className="mt-6 text-4xl font-bold tracking-normal text-foundation-950">
            {brand.promise}
          </h1>
          <p className="mt-4 text-lg leading-8 text-foundation-700">
            Health access made easier for underserved communities.
          </p>
          <button className="mt-6 rounded-lg bg-foundation-950 px-5 py-3 text-sm font-bold text-white">
            Get Started
          </button>
        </div>

        <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Access Start
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            What do you need today?
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {accessActions.map((action) => (
              <button
                className="rounded-lg border border-line bg-surface px-4 py-4 text-left text-sm font-bold text-foundation-900 hover:border-access-600 hover:bg-access-100"
                key={action}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-3">
        <article className="rounded-lg border border-line bg-white p-6 shadow-sm lg:col-span-1">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-signal-600">
            Voice Access
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            Speak or tap to find local support.
          </h2>
          <div className="mt-5 space-y-3">
            {[
              "Find support near me.",
              "Show Health Access Day.",
              "Find a Health Equity Hub.",
              "Help me prepare for a virtual visit.",
            ].map((prompt) => (
              <div className="rounded-lg bg-signal-100 px-4 py-3 text-sm font-semibold text-foundation-900" key={prompt}>
                {prompt}
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-lg border border-line bg-surface p-4 text-sm font-semibold leading-6 text-foundation-700">
            Voice Access provides non-clinical support and does not give medical advice.
          </p>
        </article>

        <article className="rounded-lg border border-line bg-white p-6 shadow-sm lg:col-span-2">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Health Equity Hubs
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            Ongoing access points for non-clinical support.
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {hubExamples.map((hub) => (
              <div className="rounded-lg border border-line bg-surface p-4" key={hub.name}>
                <p className="text-sm font-bold text-foundation-950">{hub.name}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-access-700">
                  {hub.type}
                </p>
                <p className="mt-3 text-sm text-foundation-700">{hub.support}</p>
                <p className="mt-3 text-sm font-semibold text-foundation-900">{hub.distance}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-2">
        <article className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Health Access Day
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            A community event for health education, digital readiness, and trusted access support.
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {["Register / RSVP", "Find Events Near Me", "Request Reminder", "See What to Expect"].map((item) => (
              <span className="rounded-lg border border-line bg-surface px-4 py-3 text-sm font-bold text-foundation-900" key={item}>
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-line bg-white p-6 shadow-sm">
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
        </article>
      </section>

      <section className="mt-5 rounded-lg border border-line bg-foundation-950 p-6 text-white shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-100">
          Resident modules
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {residentModules.map((module) => (
            <span className="rounded-lg border border-white/15 bg-white/8 px-4 py-3 text-sm font-bold" key={module}>
              {module}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
