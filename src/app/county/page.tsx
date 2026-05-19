import { AssuranceBadge } from "@/components/assurance-badge";
import { OperatingSequence } from "@/components/operating-sequence";
import { SectionHeading } from "@/components/section-heading";
import { brand } from "@/lib/brand";
import {
  countyActionQueue,
  countyAssuranceControls,
  countyDecisionSupport,
  scenarioPlans,
} from "@/lib/county-data";
import { getCountyGeospatialProvider } from "@/lib/geospatial";
import {
  humanReviewBoundaryCopy,
  humanReviewQueue,
  humanReviewStages,
} from "@/lib/human-review-data";
import { countyModules } from "@/lib/mock-data";

const statusClass = {
  Draft: "bg-signal-100 text-signal-600",
  Ready: "bg-access-100 text-access-700",
  "Human review": "bg-warning-100 text-warning-600",
} as const;

const reviewStageClass = {
  complete: "border-assurance-600/30 bg-assurance-100 text-assurance-600",
  review: "border-warning-600/30 bg-warning-100 text-warning-600",
  ready: "border-access-600/30 bg-access-100 text-access-700",
} as const;

const reviewQueueClass = {
  "Boundary checked": "bg-assurance-100 text-assurance-600",
  "Human review": "bg-warning-100 text-warning-600",
  "Evidence recorded": "bg-access-100 text-access-700",
} as const;

const geospatialProvider = getCountyGeospatialProvider();
const countyOperatingPicture = geospatialProvider.getOperatingPicture();

export default function CountyPage() {
  return (
    <div className="bg-surface">
      <section className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr] xl:items-end">
          <SectionHeading
            eyebrow={brand.layers.county.name}
            title={`${brand.layers.county.standard}.`}
            description="A static operating view for turning synthetic access signals into decisions, actions, assurance, and measurable impact."
          />
          <div className="rounded-lg border border-foundation-800/15 bg-white p-5 shadow-sm">
            <AssuranceBadge />
            <p className="mt-4 text-sm font-semibold leading-6 text-foundation-700">
              Signal → Decision → Action → Assurance → Impact.
            </p>
            <p className="mt-2 text-sm leading-6 text-foundation-700">
              This prototype uses synthetic data only and does not connect to live maps,
              live AI, external services, or backend workflows.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <OperatingSequence />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-5 xl:grid-cols-[1.18fr_0.82fr]">
        <article
          className="rounded-lg border border-line bg-white p-6 shadow-sm"
          id="geospatial-access-operating-picture"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
                Geospatial Access Operating Picture
              </p>
              <h2 className="mt-3 text-2xl font-bold text-foundation-950">
                Priority ZIPs, hub coverage, travel burden, and readiness signals.
              </h2>
            </div>
            <span className="rounded-lg bg-surface px-4 py-3 text-sm font-bold text-foundation-700">
              Mock map-style view
            </span>
          </div>

          <div className="map-grid relative mt-6 min-h-[380px] overflow-hidden rounded-lg border border-line bg-surface p-4">
            <div className="absolute inset-4 rounded-lg border border-line/70" aria-hidden="true" />
            {countyOperatingPicture.accessSignals.map((signal) => (
              <div
                className="absolute w-44 rounded-lg border border-line bg-white p-4 shadow-sm"
                key={signal.zip}
                style={{
                  left: `${signal.marker.position.xPercent}%`,
                  top: `${signal.marker.position.yPercent}%`,
                }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-700">
                  ZIP {signal.zip}
                </p>
                <p className="mt-2 text-2xl font-bold text-foundation-950">
                  {signal.priority}
                </p>
                <p className="mt-1 text-sm text-foundation-700">
                  {signal.recommendedAction}
                </p>
                {signal.marker.positionStatus === "fallback" ? (
                  <p className="mt-2 text-xs font-semibold text-warning-600">
                    {signal.marker.positionNote}
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            {countyOperatingPicture.accessSignals.map((signal) => (
              <div className="rounded-lg border border-line bg-surface p-4" key={signal.zip}>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-700">
                  Priority ZIP {signal.zip}
                </p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-foundation-700">Access gap</dt>
                    <dd className="font-bold text-foundation-950">{signal.accessGap}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-foundation-700">Hub coverage</dt>
                    <dd className="font-bold text-foundation-950">{signal.hubCoverage}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-foundation-700">Travel burden</dt>
                    <dd className="font-bold text-foundation-950">{signal.travelBurden}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-foundation-700">Digital readiness</dt>
                    <dd className="text-right font-bold text-foundation-950">
                      {signal.digitalReadiness}
                    </dd>
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
          <h2 className="mt-3 text-2xl font-bold">Recommended Action</h2>
          <p className="mt-4 text-lg font-semibold text-white">
            {countyDecisionSupport.recommendation}
          </p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-blue-100">
            {countyDecisionSupport.rationale.map((reason) => (
              <li className="flex gap-3" key={reason}>
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-access-100" />
                {reason}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-lg border border-white/15 bg-white/8 p-4 text-sm font-bold">
            {countyDecisionSupport.reviewControl}
          </p>
          <p className="mt-4 text-sm leading-6 text-blue-100">
            Recommendations are planning support for human decision-making, not automated
            action.
          </p>
        </article>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-5 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Action Queue
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            Assigned work from synthetic access signals.
          </h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-[0.12em] text-foundation-700">
                  <th className="py-3 pr-4">Action</th>
                  <th className="py-3 pr-4">Priority</th>
                  <th className="py-3 pr-4">Owner</th>
                  <th className="py-3 pr-4">Due date</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3">Evidence source</th>
                </tr>
              </thead>
              <tbody>
                {countyActionQueue.map((item) => (
                  <tr className="border-b border-line last:border-0" key={item.action}>
                    <td className="py-4 pr-4 font-bold text-foundation-950">{item.action}</td>
                    <td className="py-4 pr-4 text-foundation-700">{item.priority}</td>
                    <td className="py-4 pr-4 text-foundation-700">{item.owner}</td>
                    <td className="py-4 pr-4 text-foundation-700">{item.dueDate}</td>
                    <td className="py-4 pr-4">
                      <span
                        className={`rounded-lg px-3 py-1 text-xs font-bold ${
                          statusClass[item.status]
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-foundation-700">{item.evidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-assurance-600">
                Assurance Log
              </p>
              <h2 className="mt-3 text-2xl font-bold text-foundation-950">
                Controls before county action.
              </h2>
            </div>
            <AssuranceBadge />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {countyAssuranceControls.map((control) => (
              <div
                className="flex gap-3 rounded-lg border border-line bg-surface p-4 text-sm font-bold text-foundation-800"
                key={control}
              >
                <span
                  className="mt-1 h-2 w-2 shrink-0 rounded-full bg-assurance-600"
                  aria-hidden="true"
                />
                {control}
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-lg border border-line bg-access-100 p-4 text-sm font-semibold leading-6 text-access-700">
            Human review required before action.
          </p>
        </article>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-5 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-warning-600">
            Human Review Workflow
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            Signal to review to evidence.
          </h2>
          <p className="mt-4 text-sm leading-6 text-foundation-700">
            Resident signals, Voice Access outputs, geospatial recommendations, and action
            queue items stay static until human review is complete.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {humanReviewStages.map((stage) => (
              <div
                className="rounded-lg border border-line bg-surface p-4"
                key={stage.name}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <p className="text-sm font-bold text-foundation-950">{stage.name}</p>
                  <span
                    className={`w-fit rounded-lg border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
                      reviewStageClass[stage.status]
                    }`}
                  >
                    {stage.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-foundation-700">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <span className="rounded-lg bg-warning-100 px-4 py-3 text-sm font-bold text-warning-600">
              {humanReviewBoundaryCopy.required}
            </span>
            <span className="rounded-lg bg-signal-100 px-4 py-3 text-sm font-bold text-signal-600">
              {humanReviewBoundaryCopy.planning}
            </span>
            <span className="rounded-lg bg-access-100 px-4 py-3 text-sm font-bold text-access-700">
              {humanReviewBoundaryCopy.trust}
            </span>
          </div>
        </article>

        <article className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Review Queue
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            Static review examples before action.
          </h2>
          <div className="mt-5 grid gap-3">
            {humanReviewQueue.map((item) => (
              <div className="rounded-lg border border-line bg-surface p-4" key={item.source}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-foundation-950">{item.source}</p>
                    <p className="mt-1 text-sm leading-6 text-foundation-700">
                      {item.signal}
                    </p>
                  </div>
                  <span
                    className={`w-fit rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
                      reviewQueueClass[item.status]
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <dt className="font-bold text-foundation-950">Review need</dt>
                    <dd className="mt-1 leading-6 text-foundation-700">{item.reviewNeed}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-foundation-950">Reviewer</dt>
                    <dd className="mt-1 leading-6 text-foundation-700">{item.reviewer}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-foundation-950">Evidence recorded</dt>
                    <dd className="mt-1 leading-6 text-foundation-700">{item.evidence}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-foundation-950">Planning output</dt>
                    <dd className="mt-1 leading-6 text-foundation-700">
                      {item.planningOutput}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-5 pb-12 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Scenario Planning
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foundation-950">
            Where should we focus next?
          </h2>
          <div className="mt-5 grid gap-3">
            {scenarioPlans.map((scenario) => (
              <div className="rounded-lg border border-line bg-surface p-4" key={scenario.title}>
                <p className="text-sm font-bold text-foundation-950">{scenario.title}</p>
                <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                  <div>
                    <dt className="text-foundation-700">Focus</dt>
                    <dd className="mt-1 font-bold text-foundation-950">{scenario.focus}</dd>
                  </div>
                  <div>
                    <dt className="text-foundation-700">Projected impact</dt>
                    <dd className="mt-1 font-bold text-foundation-950">
                      {scenario.projectedImpact}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-foundation-700">Workforce</dt>
                    <dd className="mt-1 font-bold text-foundation-950">{scenario.workforce}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-foundation-700">
            Scenario outputs are planning support, not guaranteed outcomes.
          </p>
        </article>

        <article className="rounded-lg border border-line bg-foundation-950 p-6 text-white shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-100">
            County modules
          </p>
          <h2 className="mt-3 text-2xl font-bold">
            County-Based Community Access Platform
          </h2>
          <p className="mt-4 text-sm leading-6 text-blue-100">
            Residents get access. Counties get intelligence. Providers keep their platforms.
          </p>
          <div className="mt-5 grid gap-3">
            {countyModules.map((module) => (
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
