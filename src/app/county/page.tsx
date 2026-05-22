import { AssuranceBadge } from "@/components/assurance-badge";
import { brand } from "@/lib/brand";
import {
  countyActionQueue,
  countyAssuranceControls,
  countyAssuranceReviewLog,
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
  Draft: "border border-signal-600/40 bg-signal-100 text-signal-600",
  "Needs Review": "border border-warning-600/40 bg-warning-100 text-warning-600",
  Approved: "border border-access-600/40 bg-access-100 text-access-700",
  Deferred: "border border-white/15 bg-white/10 text-blue-100",
  Completed: "border border-assurance-600/40 bg-assurance-100 text-assurance-600",
} as const;

const reviewStageClass = {
  complete: "border-assurance-600/40 bg-assurance-100 text-assurance-600",
  review: "border-warning-600/40 bg-warning-100 text-warning-600",
  ready: "border-access-600/40 bg-access-100 text-access-700",
} as const;

const reviewQueueClass = {
  "Boundary checked": "bg-assurance-100 text-assurance-600",
  "Human review": "bg-warning-100 text-warning-600",
  "Evidence recorded": "bg-access-100 text-access-700",
} as const;

const moduleNavItems = [
  { label: "Operating Picture", href: "#geospatial-access-operating-picture" },
  { label: "Action Queue", href: "#action-queue" },
  { label: "AI Decision Support", href: "#ai-decision-support" },
  { label: "Assurance Log", href: "#assurance-log" },
  { label: "Human Review", href: "#human-review-workflow" },
  { label: "Review Queue", href: "#review-queue" },
  { label: "Scenario Planning", href: "#scenario-planning" },
] as const;

const dataSourceLabels = [
  "Access Signals (synthetic)",
  "Health Equity Hubs (mock)",
  "Community Input (sample)",
  "Geospatial Data (provider-neutral)",
] as const;

const geospatialProvider = getCountyGeospatialProvider();
const countyOperatingPicture = geospatialProvider.getOperatingPicture();

function StatusBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`w-fit rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${className}`}
    >
      {children}
    </span>
  );
}

function ConsolePanel({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <article
      className={`min-w-0 rounded-lg border border-white/12 bg-white/[0.055] p-4 shadow-sm shadow-black/20 backdrop-blur sm:p-5 ${className}`}
      id={id}
    >
      {children}
    </article>
  );
}

export default function CountyPage() {
  return (
    <div className="bg-[#061521] text-white">
      <section className="border-b border-white/10 bg-[#071727]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">
              {brand.layers.county.name}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal text-white md:text-5xl">
              County Operating Intelligence Layer
            </h1>
            <p className="mt-3 max-w-4xl text-sm font-semibold leading-6 text-blue-100 md:text-base">
              Signal → Decision → Action → Assurance → Impact
            </p>
          </div>
          <div className="rounded-lg border border-access-600/30 bg-access-100 px-4 py-3 text-sm font-bold text-access-700">
            {brand.trustBoundary}
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1440px] gap-5 px-5 py-5 xl:grid-cols-[220px_1fr]">
        <aside className="hidden rounded-lg border border-white/12 bg-[#092033] p-4 xl:block">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">
            SozoRock Health
          </p>
          <nav className="mt-5 grid gap-2" aria-label="County module navigation">
            {moduleNavItems.map((item, index) => (
              <a
                className={`rounded-lg px-3 py-2 text-sm font-bold ${
                  index === 0
                    ? "bg-access-600 text-white"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-8 rounded-lg border border-access-600/30 bg-access-100 p-4 text-access-700">
            <p className="text-sm font-bold">{brand.trustBoundary}</p>
            <p className="mt-3 text-xs font-semibold leading-5">
              Static preview. Synthetic data only.
            </p>
          </div>
        </aside>

        <main className="grid min-w-0 gap-5">
          <section className="grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
            <ConsolePanel id="geospatial-access-operating-picture" className="bg-[#0a2235]">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">
                    Geospatial Access Operating Picture
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-white">
                    Access gaps, hub coverage, travel burden, and readiness signals.
                  </h2>
                </div>
                <StatusBadge className="border border-access-600/30 bg-access-100 text-access-700">
                  Mock provider-neutral view
                </StatusBadge>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_220px]">
                <div className="map-grid-dark relative min-h-[330px] overflow-hidden rounded-lg border border-white/12 bg-[#10283a]">
                  <div className="absolute inset-4 rounded-lg border border-white/10" aria-hidden="true" />
                  <span className="absolute left-[14%] top-[22%] h-5 w-5 rounded-full border-4 border-white bg-warning-600 shadow-lg" />
                  <span className="absolute left-[46%] top-[46%] h-5 w-5 rounded-full border-4 border-white bg-access-600 shadow-lg" />
                  <span className="absolute left-[72%] top-[30%] h-5 w-5 rounded-full border-4 border-white bg-signal-600 shadow-lg" />
                  {countyOperatingPicture.accessSignals.map((signal) => (
                    <div
                      className="absolute hidden w-44 rounded-lg border border-white/15 bg-[#071727]/95 p-4 shadow-lg md:block"
                      key={signal.zip}
                      style={{
                        left: `${Math.min(signal.marker.position.xPercent, 62)}%`,
                        top: `${signal.marker.position.yPercent}%`,
                      }}
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">
                        ZIP {signal.zip}
                      </p>
                      <p className="mt-2 text-2xl font-bold text-white">{signal.priority}</p>
                      <p className="mt-1 text-sm leading-5 text-blue-100">
                        {signal.recommendedAction}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border border-white/12 bg-[#071727] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">
                    Map insight
                  </p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-blue-100">
                    ZIP 27514 shows high access gap, limited hub coverage, and elevated
                    travel burden.
                  </p>
                  <dl className="mt-4 grid gap-3 text-sm">
                    <div>
                      <dt className="text-blue-100">Access Gap Index</dt>
                      <dd className="text-3xl font-bold text-access-100">0.68</dd>
                    </div>
                    <div>
                      <dt className="text-blue-100">ZIPs needing attention</dt>
                      <dd className="text-3xl font-bold text-access-100">18</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {countyOperatingPicture.accessSignals.map((signal) => (
                  <div className="rounded-lg border border-white/12 bg-white/8 p-4" key={signal.zip}>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">
                      Priority ZIP {signal.zip}
                    </p>
                    <dl className="mt-4 grid gap-2 text-sm text-blue-100">
                      <div className="flex justify-between gap-4">
                        <dt>Access gap</dt>
                        <dd className="font-bold text-white">{signal.accessGap}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt>Hub coverage</dt>
                        <dd className="font-bold text-white">{signal.hubCoverage}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt>Travel burden</dt>
                        <dd className="font-bold text-white">{signal.travelBurden}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt>Readiness</dt>
                        <dd className="text-right font-bold text-white">{signal.digitalReadiness}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </ConsolePanel>

            <ConsolePanel id="ai-decision-support" className="bg-[#092033]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">
                    AI Decision Support
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-white">Recommended Next Action</h2>
                </div>
                <span className="text-xl text-access-100" aria-hidden="true">☆</span>
              </div>
              <p className="mt-4 text-lg font-bold leading-7 text-access-100">
                {countyDecisionSupport.recommendation}
              </p>
              <p className="mt-5 text-sm font-bold text-white">Why this action?</p>
              <ul className="mt-3 grid gap-2 text-sm leading-5 text-blue-100">
                {countyDecisionSupport.rationale.map((reason) => (
                  <li className="flex gap-2" key={reason}>
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-access-600" />
                    {reason}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-lg border border-warning-600/40 bg-warning-100 px-4 py-3 text-sm font-bold text-warning-600">
                {countyDecisionSupport.reviewControl}
              </p>
              <div className="mt-4 grid gap-3 rounded-lg border border-white/12 bg-white/8 p-4 text-sm text-blue-100">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-bold text-white">Review state</span>
                  <StatusBadge className={statusClass[countyDecisionSupport.reviewState]}>
                    {countyDecisionSupport.reviewState}
                  </StatusBadge>
                </div>
                <p><span className="font-bold text-white">Owner:</span> {countyDecisionSupport.reviewOwner}</p>
                <p><span className="font-bold text-white">Evidence source:</span> {countyDecisionSupport.evidenceSource}</p>
                <p><span className="font-bold text-white">Action gate:</span> {countyDecisionSupport.actionGate}</p>
              </div>
              <p className="mt-4 text-sm leading-6 text-blue-100">{humanReviewBoundaryCopy.planning}</p>
            </ConsolePanel>
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <ConsolePanel id="action-queue">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">
                Action Queue
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">
                Assigned work from synthetic access signals.
              </h2>
              <div className="mt-5 grid gap-3 md:hidden">
                {countyActionQueue.map((item, index) => (
                  <div className="rounded-lg border border-white/12 bg-[#071727] p-4" key={item.action}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-blue-100">0{index + 1}</p>
                        <p className="mt-1 text-sm font-bold text-white">{item.action}</p>
                      </div>
                      <StatusBadge className={statusClass[item.reviewState]}>{item.reviewState}</StatusBadge>
                    </div>
                    <dl className="mt-4 grid gap-2 text-sm text-blue-100">
                      <div className="flex justify-between gap-3">
                        <dt>Owner</dt>
                        <dd className="text-right font-bold text-white">{item.owner}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt>Priority</dt>
                        <dd className="font-bold text-white">{item.priority}</dd>
                      </div>
                      <div>
                        <dt className="font-bold text-white">Evidence source</dt>
                        <dd className="mt-1">{item.evidence}</dd>
                      </div>
                      <div>
                        <dt className="font-bold text-white">Action gate</dt>
                        <dd className="mt-1">{item.actionGate}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
              <div className="mt-5 hidden max-w-full overflow-x-auto rounded-lg border border-white/12 md:block">
                <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/12 bg-white/8 text-xs uppercase tracking-[0.12em] text-blue-100">
                      <th className="px-4 py-3">Action</th>
                      <th className="px-4 py-3">Owner</th>
                      <th className="px-4 py-3">Priority</th>
                      <th className="px-4 py-3">Due Date</th>
                      <th className="px-4 py-3">Review state</th>
                      <th className="px-4 py-3">Action gate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countyActionQueue.map((item, index) => (
                      <tr className="border-b border-white/10 last:border-0" key={item.action}>
                        <td className="px-4 py-3 font-bold text-white">
                          <span className="mr-3 text-blue-100">0{index + 1}</span>
                          {item.action}
                        </td>
                        <td className="px-4 py-3 text-blue-100">{item.owner}</td>
                        <td className="px-4 py-3 text-blue-100">{item.priority}</td>
                        <td className="px-4 py-3 text-blue-100">{item.dueDate}</td>
                        <td className="px-4 py-3">
                          <StatusBadge className={statusClass[item.reviewState]}>
                            {item.reviewState}
                          </StatusBadge>
                        </td>
                        <td className="px-4 py-3 text-blue-100">{item.actionGate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ConsolePanel>

            <ConsolePanel id="assurance-log">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">
                    Assurance Log
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-white">
                    Controls before county action.
                  </h2>
                </div>
                <AssuranceBadge />
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {countyAssuranceControls.map((control) => (
                  <div className="flex gap-3 rounded-lg border border-white/12 bg-white/8 p-3 text-sm font-bold text-blue-100" key={control}>
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-access-600" />
                    {control}
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-lg border border-access-600/30 bg-access-100 p-3 text-sm font-bold text-access-700">
                Human review required before action.
              </p>
              <div className="mt-4 grid gap-3">
                {countyAssuranceReviewLog.map((entry) => (
                  <div className="rounded-lg border border-white/12 bg-[#071727] p-4" key={entry.check}>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-bold text-white">{entry.check}</p>
                        <p className="mt-2 text-sm text-blue-100">
                          Evidence source: {entry.evidenceSource}
                        </p>
                        <p className="mt-1 text-sm text-blue-100">
                          Action gate: {entry.actionGate}
                        </p>
                      </div>
                      <StatusBadge className={statusClass[entry.reviewState]}>
                        {entry.reviewState}
                      </StatusBadge>
                    </div>
                  </div>
                ))}
              </div>
            </ConsolePanel>
          </section>

          <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
            <ConsolePanel id="human-review-workflow">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-warning-100">
                Human Review Workflow
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">Signal to review to evidence.</h2>
              <p className="mt-4 text-sm leading-6 text-blue-100">
                Resident signals, Voice Access outputs, geospatial recommendations, and action queue
                items stay static until human review is complete.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {humanReviewStages.map((stage) => (
                  <div className="rounded-lg border border-white/12 bg-white/8 p-4" key={stage.name}>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <p className="text-sm font-bold text-white">{stage.name}</p>
                      <StatusBadge className={`border ${reviewStageClass[stage.status]}`}>
                        {stage.status}
                      </StatusBadge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-blue-100">{stage.description}</p>
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
            </ConsolePanel>

            <ConsolePanel id="review-queue">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">
                Review Queue
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">
                Static review examples before action.
              </h2>
              <div className="mt-5 grid gap-3">
                {humanReviewQueue.map((item) => (
                  <div className="rounded-lg border border-white/12 bg-[#071727] p-4" key={item.source}>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-bold text-white">{item.source}</p>
                        <p className="mt-1 text-sm leading-6 text-blue-100">{item.signal}</p>
                      </div>
                      <StatusBadge className={reviewQueueClass[item.status]}>{item.status}</StatusBadge>
                    </div>
                    <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                      <div>
                        <dt className="font-bold text-white">Review need</dt>
                        <dd className="mt-1 leading-6 text-blue-100">{item.reviewNeed}</dd>
                      </div>
                      <div>
                        <dt className="font-bold text-white">Reviewer</dt>
                        <dd className="mt-1 leading-6 text-blue-100">{item.reviewer}</dd>
                      </div>
                      <div>
                        <dt className="font-bold text-white">Evidence recorded</dt>
                        <dd className="mt-1 leading-6 text-blue-100">{item.evidence}</dd>
                      </div>
                      <div>
                        <dt className="font-bold text-white">Planning output</dt>
                        <dd className="mt-1 leading-6 text-blue-100">{item.planningOutput}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </ConsolePanel>
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            <ConsolePanel id="scenario-planning">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">
                Scenario Planning
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">Where should we focus next?</h2>
              <div className="mt-5 grid gap-3">
                {scenarioPlans.map((scenario) => (
                  <div className="rounded-lg border border-white/12 bg-white/8 p-4" key={scenario.title}>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <p className="text-sm font-bold text-white">{scenario.title}</p>
                      <StatusBadge className={statusClass[scenario.reviewState]}>
                        {scenario.reviewState}
                      </StatusBadge>
                    </div>
                    <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                      <div>
                        <dt className="text-blue-100">Focus</dt>
                        <dd className="mt-1 font-bold text-white">{scenario.focus}</dd>
                      </div>
                      <div>
                        <dt className="text-blue-100">Projected impact</dt>
                        <dd className="mt-1 font-bold text-white">{scenario.projectedImpact}</dd>
                      </div>
                      <div>
                        <dt className="text-blue-100">Workforce</dt>
                        <dd className="mt-1 font-bold text-white">{scenario.workforce}</dd>
                      </div>
                    </dl>
                    <p className="mt-4 text-sm font-semibold text-access-100">
                      {scenario.sourceLabel}
                    </p>
                    <p className="mt-2 rounded-lg border border-white/12 bg-[#071727] px-4 py-3 text-sm font-semibold leading-6 text-blue-100">
                      {scenario.actionGate}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-blue-100">
                Scenario outputs are planning support, not guaranteed outcomes.
              </p>
            </ConsolePanel>

            <ConsolePanel>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">
                County modules
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">
                County-Based Community Access Platform
              </h2>
              <p className="mt-4 text-sm leading-6 text-blue-100">
                Residents get access. Counties get intelligence. Providers keep their platforms.
              </p>
              <div className="mt-5 grid gap-3">
                {countyModules.map((module) => (
                  <span
                    className="rounded-lg border border-white/15 bg-white/8 px-4 py-3 text-sm font-bold text-blue-100"
                    key={module}
                  >
                    {module}
                  </span>
                ))}
              </div>
            </ConsolePanel>
          </section>
        </main>
      </div>

      <section className="border-t border-white/10 bg-[#071727]">
        <div className="mx-auto grid max-w-[1440px] gap-4 px-5 py-4 text-sm md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="flex flex-wrap gap-3">
            {dataSourceLabels.map((label) => (
              <span className="rounded-lg border border-white/12 bg-white/8 px-3 py-2 font-semibold text-blue-100" key={label}>
                {label}
              </span>
            ))}
          </div>
          <p className="font-bold text-access-100">System status: static prototype only</p>
          <p className="text-left font-bold text-blue-100 md:text-right">
            County context: synthetic preview county
          </p>
        </div>
      </section>
    </div>
  );
}
