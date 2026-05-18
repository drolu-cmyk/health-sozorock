import { AssuranceBadge } from "@/components/assurance-badge";
import { OperatingSequence } from "@/components/operating-sequence";
import { SectionHeading } from "@/components/section-heading";

const modelBoundaries = [
  "Mock or synthetic data only in the prototype.",
  "Human review before operational action.",
  "No live AWS, Google, or OpenAI keys required for the first build.",
  "Providers keep their platforms. We help you get ready.",
];

export default function AboutModelPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <SectionHeading
        eyebrow="About the model"
        title="A non-clinical access operating layer for underserved communities."
        description="SozoRock Health connects resident access surfaces with county-ready intelligence while preserving the trust boundary."
      />

      <section className="mt-10 grid gap-5 lg:grid-cols-2">
        <article className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Resident Access Layer
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            Residents get access.
          </h2>
          <p className="mt-4 leading-7 text-foundation-700">
            The resident layer helps people understand where to start, use Voice Access,
            find Health Access Day information, locate Health Equity Hubs, and prepare
            for provider-led services.
          </p>
        </article>

        <article className="rounded-lg border border-line bg-foundation-950 p-6 text-white shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-100">
            County Operating Intelligence Layer
          </p>
          <h2 className="mt-3 text-2xl font-bold">
            Counties get intelligence.
          </h2>
          <p className="mt-4 leading-7 text-blue-100">
            The county layer converts local access signals into decision-ready,
            action-ready, assurance-controlled intelligence for planning and review.
          </p>
        </article>
      </section>

      <section className="mt-5 rounded-lg border border-line bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
              Locked operating logic
            </p>
            <h2 className="mt-3 text-2xl font-bold text-foundation-950">
              Signal → Decision → Action → Assurance → Impact.
            </h2>
          </div>
          <AssuranceBadge />
        </div>
        <div className="mt-6">
          <OperatingSequence />
        </div>
      </section>

      <section className="mt-5 rounded-lg border border-line bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
          Prototype boundaries
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {modelBoundaries.map((boundary) => (
            <div className="rounded-lg border border-line bg-surface p-4 text-sm font-bold text-foundation-900" key={boundary}>
              {boundary}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
