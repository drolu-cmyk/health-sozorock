import { AssuranceBadge } from "@/components/assurance-badge";
import { SectionHeading } from "@/components/section-heading";
import {
  actionQueue,
  assuranceChecks,
  countyModules,
  syntheticAccessSignals,
} from "@/lib/mock-data";

export default function CountyPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <SectionHeading
        eyebrow="County Operating Intelligence Layer"
        title="Geospatial, decision-driven, action-oriented, assurance-controlled."
        description="A synthetic operating view for turning access signals into decisions, actions, assurance, and measurable impact."
      />

      <section className="mt-10 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
                Geospatial Access Operating Picture
              </p>
              <h2 className="mt-3 text-2xl font-bold text-foundation-950">
                Priority ZIP-code detection with synthetic access signals.
              </h2>
            </div>
            <AssuranceBadge />
          </div>
          <div className="map-grid mt-6 grid min-h-[360px] gap-4 rounded-lg border border-line bg-surface p-4 lg:grid-cols-3">
            {syntheticAccessSignals.map((signal) => (
              <div className="self-end rounded-lg border border-line bg-white p-4 shadow-sm" key={signal.zip}>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-700">
                  ZIP {signal.zip}
                </p>
                <p className="mt-3 text-2xl font-bold text-foundation-950">{signal.accessGap}</p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-foundation-700">Hub coverage</dt>
                    <dd className="font-semibold text-foundation-950">{signal.hubCoverage}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-foundation-700">Travel burden</dt>
                    <dd className="font-semibold text-foundation-950">{signal.travelBurden}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-foundation-700">Readiness</dt>
                    <dd className="text-right font-semibold text-foundation-950">{signal.readiness}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-line bg-foundation-950 p-6 text-white shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-100">
            AI Decision Support
          </p>
          <h2 className="mt-3 text-2xl font-bold">
            Recommended Action
          </h2>
          <p className="mt-4 text-lg font-semibold text-white">
            Schedule Health Access Day in ZIP 27514.
          </p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-blue-100">
            <li>High access gap</li>
            <li>Limited hub coverage</li>
            <li>Elevated travel burden</li>
            <li>Digital readiness barriers</li>
            <li>Recent engagement signals</li>
          </ul>
          <p className="mt-6 rounded-lg border border-white/15 bg-white/8 p-4 text-sm font-bold">
            Human review required before action.
          </p>
        </article>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1fr_0.85fr]">
        <article className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Action Queue
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-[0.12em] text-foundation-700">
                  <th className="py-3 pr-4">Action</th>
                  <th className="py-3 pr-4">Owner</th>
                  <th className="py-3 pr-4">Due date</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3">Evidence source</th>
                </tr>
              </thead>
              <tbody>
                {actionQueue.map((item) => (
                  <tr className="border-b border-line last:border-0" key={item.action}>
                    <td className="py-4 pr-4 font-bold text-foundation-950">{item.action}</td>
                    <td className="py-4 pr-4 text-foundation-700">{item.owner}</td>
                    <td className="py-4 pr-4 text-foundation-700">{item.due}</td>
                    <td className="py-4 pr-4">
                      <span className="rounded-lg bg-warning-100 px-3 py-1 text-xs font-bold text-warning-600">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-foundation-700">{item.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-assurance-600">
            Assurance Log
          </p>
          <div className="mt-4">
            <AssuranceBadge />
          </div>
          <ul className="mt-5 space-y-3">
            {assuranceChecks.map((check) => (
              <li className="flex gap-3 rounded-lg border border-line bg-surface p-3 text-sm font-semibold text-foundation-800" key={check}>
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-assurance-600" aria-hidden="true" />
                {check}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-2">
        <article className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Scenario Planning
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            Where should we focus next?
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "Next Health Access Day",
              "New Health Equity Hub",
              "Digital guide coverage",
              "County access report",
            ].map((scenario) => (
              <span className="rounded-lg border border-line bg-surface px-4 py-3 text-sm font-bold text-foundation-900" key={scenario}>
                {scenario}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-foundation-700">
            Projections are planning support, not guaranteed outcomes.
          </p>
        </article>

        <article className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            County modules
          </p>
          <div className="mt-5 grid gap-3">
            {countyModules.map((module) => (
              <span className="rounded-lg border border-line bg-surface px-4 py-3 text-sm font-bold text-foundation-900" key={module}>
                {module}
              </span>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
