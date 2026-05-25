import Link from "next/link";
import type { ReactNode } from "react";
import { brand } from "@/lib/brand";
import { trustBoundary } from "@/lib/productBoundaries";
import { countyRouteItems } from "@/lib/routes";
import { accessSignals, countyMetricCards, countySummary } from "@/data/countySignals";
import { operatingActions } from "@/data/actionQueue";
import { assuranceChecklist, assuranceEntries } from "@/data/assuranceLog";
import { scenarioCatalog } from "@/data/scenarios";
import { humanReviewQueue, humanReviewStages } from "@/lib/human-review-data";

export type CountySection = "overview" | "operating-picture" | "action-queue" | "assurance-log" | "scenario-planning";

const statusClass: Record<string, string> = {
  Draft: "bg-signal-100 text-signal-600",
  "Needs Review": "bg-warning-100 text-warning-600",
  Approved: "bg-access-100 text-access-700",
  Deferred: "bg-white/10 text-blue-100",
  Completed: "bg-assurance-100 text-assurance-600",
};

export function CountyConsole({ section = "overview" }: { section?: CountySection }) {
  const showAll = section === "overview";

  return (
    <div className="bg-[#061521] text-white">
      <section className="mx-auto max-w-[1480px] px-3 py-4 sm:px-5">
        <div className="rounded-lg border border-white/15 bg-[#071727] shadow-2xl">
          <header className="flex flex-col gap-4 border-b border-white/10 px-4 py-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-2 md:flex-row md:items-end">
              <h1 className="text-2xl font-bold tracking-normal text-white md:text-3xl">
                County Operating Intelligence Layer
              </h1>
              <p className="text-sm font-semibold text-blue-100">
                Real-time view of access gaps, hubs, barriers, and activity.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.12em] text-access-100">
              {countySummary.operatingModel.split(" → ").map((step, index) => (
                <span key={step}>{step}{index < 4 ? " →" : ""}</span>
              ))}
            </div>
          </header>

          <div className="grid min-w-0 lg:grid-cols-[220px_1fr]">
            <aside className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r" aria-label="County module navigation">
              <p className="text-sm font-bold text-access-100">{brand.programName}</p>
              <nav className="mt-4 grid gap-2" aria-label="County module navigation">
                {countyRouteItems.map((item) => (
                  <Link
                    className="rounded-lg px-3 py-3 text-sm font-bold text-blue-100 hover:bg-access-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-access-100"
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 rounded-lg border border-access-600/30 bg-access-100 p-3 text-sm font-bold leading-6 text-access-700">
                {trustBoundary.primary}
              </div>
            </aside>

            <main className="grid min-w-0 gap-4 p-4">
              {(showAll || section === "operating-picture") && <OperatingPicture />}
              {showAll && <DecisionSupport />}
              {(showAll || section === "action-queue") && <ActionQueue />}
              {(showAll || section === "assurance-log") && <AssuranceLog />}
              {(showAll || section === "scenario-planning") && <ScenarioPlanning />}
              {showAll && <HumanReview />}
            </main>
          </div>

          <footer className="grid gap-3 border-t border-white/10 bg-[#061521] px-4 py-4 text-sm md:grid-cols-[1fr_auto_1fr] md:items-center">
            <p className="font-bold text-blue-100">Data Sources: Access Signals, Health Equity Hubs, Community Input, Public Data, Geospatial Data</p>
            <p className="font-bold text-access-100">System Status: {countySummary.status}</p>
            <p className="font-bold text-blue-100 md:text-right">County: {countySummary.county}, {countySummary.state}</p>
          </footer>
        </div>
      </section>
    </div>
  );
}

function Panel({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <section className="min-w-0 rounded-lg border border-white/15 bg-white/5 p-4 shadow-sm" id={id}>
      {children}
    </section>
  );
}

function Badge({ state }: { state: string }) {
  return (
    <span className={`inline-flex w-fit rounded-md px-2 py-1 text-xs font-bold ${statusClass[state] ?? "bg-white/10 text-blue-100"}`}>
      {state}
    </span>
  );
}

function DecisionSupport() {
  const nextAction = operatingActions[0];

  return (
    <Panel id="ai-decision-support">
      <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr] xl:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">
            AI Decision Support
          </p>
          <h2 className="mt-2 text-xl font-bold text-white">Recommended Next Action</h2>
          <p className="mt-4 text-lg font-bold leading-7 text-access-100">
            {nextAction.action}
          </p>
          <p className="mt-4 rounded-lg border border-warning-600/40 bg-warning-100 px-4 py-3 text-sm font-bold text-warning-600">
            {trustBoundary.humanReview}
          </p>
          <p className="mt-3 text-sm leading-6 text-blue-100">{trustBoundary.planning}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-[#071727] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-100">
              Review state
            </p>
            <div className="mt-3">
              <Badge state={nextAction.reviewState} />
            </div>
            <p className="mt-3 text-sm text-blue-100">Owner: {nextAction.owner}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-[#071727] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-100">
              Evidence source
            </p>
            <p className="mt-3 text-sm font-bold leading-6 text-white">{nextAction.evidenceSource}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-[#071727] p-4 md:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-100">
              Action gate
            </p>
            <p className="mt-3 text-sm font-bold leading-6 text-access-100">{nextAction.actionGate}</p>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function OperatingPicture() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <Panel id="operating-picture">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">Geospatial Access Operating Picture</p>
            <h2 className="mt-2 text-xl font-bold text-white">Map-first view of synthetic access gaps.</h2>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            {["Access Gaps", "Hub Coverage", "Travel Time", "Digital Readiness", "Provider Pathways"].map((tab) => (
              <span className="rounded-md border border-white/15 bg-white/8 px-3 py-2 text-blue-100" key={tab}>{tab}</span>
            ))}
          </div>
        </div>
        <div className="map-grid-dark relative mt-4 min-h-[360px] overflow-hidden rounded-lg border border-white/15 bg-[#0b2136]">
          <div className="absolute left-[8%] top-[18%] rounded-lg bg-[#112f47] px-3 py-2 text-sm font-bold text-white">Northview</div>
          <div className="absolute left-[42%] top-[42%] rounded-lg bg-[#dc3f2d] px-4 py-3 text-base font-bold text-white shadow-xl">Eastview</div>
          <div className="absolute bottom-[16%] left-[18%] rounded-lg bg-[#174363] px-3 py-2 text-sm font-bold text-white">Southfield</div>
          <div className="absolute bottom-[10%] right-[14%] rounded-lg bg-[#047857] px-3 py-2 text-sm font-bold text-white">Pinecrest</div>
          <div className="absolute bottom-4 left-4 rounded-lg border border-white/15 bg-[#071727]/90 p-3 text-xs text-blue-100">
            <p className="font-bold text-white">Access Gap Index</p>
            {["Very High", "High", "Moderate", "Low"].map((item) => <p className="mt-2" key={item}>■ {item}</p>)}
          </div>
        </div>
      </Panel>

      <Panel>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">Map Insight</p>
        <h2 className="mt-2 text-xl font-bold text-white">Eastview has highest access burden.</h2>
        <div className="mt-4 grid gap-3">
          {accessSignals.map((signal) => (
            <div className="rounded-lg border border-white/10 bg-[#071727] p-3" key={signal.zip}>
              <div className="flex items-start justify-between gap-3">
                <p className="font-bold text-white">{signal.label} ZIP {signal.zip}</p>
                <Badge state={signal.reviewState} />
              </div>
              <p className="mt-2 text-sm text-blue-100">Travel: {signal.travelTime}. Digital readiness: {signal.digitalReadiness}.</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {countyMetricCards.map((metric) => (
            <div className="rounded-lg border border-white/10 bg-white/8 p-3" key={metric.label}>
              <p className="text-xs font-bold uppercase text-blue-100">{metric.label}</p>
              <p className="mt-1 text-2xl font-bold text-access-100">{metric.value}</p>
              <p className="text-xs text-blue-100">{metric.detail}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function ActionQueue() {
  return (
    <Panel id="action-queue">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">Action Queue</p>
      <h2 className="mt-2 text-xl font-bold text-white">Compact operational table with review gates.</h2>
      <div className="mt-4 grid gap-3 md:hidden">
        {operatingActions.map((item, index) => (
          <article className="rounded-lg border border-white/10 bg-[#071727] p-4" key={item.action}>
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-bold text-white">0{index + 1} {item.action}</p>
              <div className="text-right">
                <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-blue-100">
                  Review state
                </p>
                <Badge state={item.reviewState} />
              </div>
            </div>
            <p className="mt-3 text-sm text-blue-100">Owner: {item.owner}</p>
            <p className="mt-1 text-sm text-blue-100">Evidence source: {item.evidenceSource}</p>
            <p className="mt-1 text-sm text-access-100">Action gate: {item.actionGate}</p>
          </article>
        ))}
      </div>
      <div className="mt-4 hidden overflow-x-auto rounded-lg border border-white/10 md:block">
        <table className="w-full min-w-[780px] border-collapse text-left text-sm">
          <thead className="bg-white/8 text-xs uppercase tracking-[0.12em] text-blue-100">
            <tr>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3">Review state</th>
              <th className="px-4 py-3">Action gate</th>
            </tr>
          </thead>
          <tbody>
            {operatingActions.map((item, index) => (
              <tr className="border-t border-white/10" key={item.action}>
                <td className="px-4 py-3 font-bold text-white">{index + 1}. {item.action}</td>
                <td className="px-4 py-3 text-blue-100">{item.owner}</td>
                <td className="px-4 py-3 text-blue-100">{item.priority}</td>
                <td className="px-4 py-3 text-blue-100">{item.dueDate}</td>
                <td className="px-4 py-3"><Badge state={item.reviewState} /></td>
                <td className="px-4 py-3 text-blue-100">{item.actionGate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function AssuranceLog() {
  return (
    <Panel id="assurance-log">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">Assurance Log</p>
      <h2 className="mt-2 text-xl font-bold text-white">Controls before county action.</h2>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {assuranceChecklist.map((item) => (
          <span className="rounded-lg border border-white/10 bg-white/8 px-3 py-3 text-sm font-bold text-blue-100" key={item}>✓ {item}</span>
        ))}
      </div>
      <div className="mt-4 grid gap-2">
        {assuranceEntries.map((entry) => (
          <div className="grid gap-2 rounded-lg border border-white/10 bg-[#071727] p-3 text-sm md:grid-cols-[1fr_auto_auto]" key={entry.control}>
            <p className="font-bold text-white">{entry.control}</p>
            <span className="text-blue-100">{entry.status}</span>
            <Badge state={entry.reviewState} />
          </div>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-warning-100 p-3 text-sm font-bold text-warning-600">{trustBoundary.humanReview}</p>
    </Panel>
  );
}

function ScenarioPlanning() {
  return (
    <Panel id="scenario-planning">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">Scenario Planning</p>
      <h2 className="mt-2 text-xl font-bold text-white">Where should we focus next?</h2>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {scenarioCatalog.map((scenario) => (
          <article className="rounded-lg border border-white/10 bg-[#071727] p-4" key={scenario.title}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h3 className="font-bold text-white">{scenario.title}</h3>
              <Badge state={scenario.reviewState} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
              <p><span className="block text-blue-100">Residents</span><b>{scenario.residentsReached}</b></p>
              <p><span className="block text-blue-100">Access gap</span><b>{scenario.accessGapReduction}</b></p>
              <p><span className="block text-blue-100">Readiness</span><b>{scenario.digitalReadinessLift}</b></p>
            </div>
            <p className="mt-4 text-sm text-blue-100">Evidence source: {scenario.evidenceSource}</p>
            <p className="mt-2 text-sm font-bold text-access-100">Action gate: {scenario.actionGate}</p>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function HumanReview() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Panel id="human-review-workflow">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-warning-100">Human Review Workflow</p>
        <h2 className="mt-2 text-xl font-bold text-white">{trustBoundary.humanReview}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {humanReviewStages.map((stage) => (
            <div className="rounded-lg border border-white/10 bg-white/8 p-3" key={stage.name}>
              <p className="font-bold text-white">{stage.name}</p>
              <p className="mt-2 text-sm leading-6 text-blue-100">{stage.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-lg bg-signal-100 p-3 text-sm font-bold text-signal-600">{trustBoundary.planning}</p>
      </Panel>
      <Panel id="review-queue">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">Review Queue</p>
        <h2 className="mt-2 text-xl font-bold text-white">Static review examples before action.</h2>
        <div className="mt-4 grid gap-3">
          {humanReviewQueue.map((item) => (
            <article className="rounded-lg border border-white/10 bg-[#071727] p-3" key={item.source}>
              <p className="font-bold text-white">{item.source}</p>
              <p className="mt-2 text-sm text-blue-100">{item.reviewNeed}</p>
              <p className="mt-2 text-sm font-bold text-access-100">{item.status}</p>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}
