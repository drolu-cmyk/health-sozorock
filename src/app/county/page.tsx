import Link from "next/link";
import { Footer } from "@/components/footer";
import { brand } from "@/lib/brand";
import {
  countyActionQueue,
  countyAssuranceControls,
  countyAssuranceReviewLog,
  countyDecisionSupport,
  scenarioPlans,
} from "@/lib/county-data";
import { getCountyGeospatialProvider } from "@/lib/geospatial";
import { humanReviewBoundaryCopy, humanReviewQueue } from "@/lib/human-review-data";
import { countyModules } from "@/lib/mock-data";

const statusClass = {
  Draft: "border-line bg-surface text-foundation-800",
  "Needs Review": "border-warning-600/40 bg-warning-100 text-warning-600",
  Approved: "border-access-600/40 bg-access-100 text-access-700",
  Deferred: "border-line bg-white text-foundation-700",
  Completed: "border-access-600/40 bg-access-100 text-access-700",
} as const;

const moduleNavItems = [
  { label: "Sample view", href: "#sample-view" },
  { label: "Access gaps", href: "#access-gaps" },
  { label: "Action review", href: "#action-review" },
  { label: "Assurance", href: "#assurance" },
  { label: "Full access", href: "#request-access" },
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
    <span className={`w-fit rounded-lg border px-3 py-1 text-xs font-bold ${className}`}>
      {children}
    </span>
  );
}

function Panel({
  children,
  className = "",
  id,
  surface = "white",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  surface?: "transparent" | "white";
}) {
  const surfaceClass = surface === "white" ? "bg-white" : "";

  return (
    <section className={`rounded-lg border border-line p-5 shadow-sm sm:p-6 ${surfaceClass} ${className}`} id={id}>
      {children}
    </section>
  );
}

function PlainCta({
  children,
  href,
  tone = "primary",
}: {
  children: React.ReactNode;
  href: string;
  tone?: "primary" | "secondary";
}) {
  const className =
    tone === "primary"
      ? "bg-teal-900 text-white hover:bg-teal-800"
      : "border border-line bg-white text-foundation-950 hover:bg-surface";

  return (
    <Link
      className={`inline-flex min-h-12 items-center justify-center rounded-lg px-5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2 ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
}

export default function CountyPage() {
  return (
    <main className="min-h-screen bg-surface text-foundation-950">
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <p className="text-sm font-bold text-access-700">{brand.publicLockup}</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight tracking-normal md:text-6xl">
              CB-CAP sample view
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-foundation-700">
              A county can see where access may be breaking down, what needs review,
              and what action is ready for a human decision.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <PlainCta href="mailto:support@sozorockfoundation.org?subject=CB-CAP%20access%20request">
                Request access
              </PlainCta>
              <PlainCta href="/resident" tone="secondary">
                Open resident app
              </PlainCta>
            </div>
          </div>
          <aside className="rounded-lg border border-warning-600/30 bg-warm-100 p-5">
            <p className="text-sm font-bold text-warning-600">Illustrative data</p>
            <p className="mt-2 text-sm leading-6 text-foundation-800">
              This is a sample view. It is not a live county report. Full access
              requires approval, data review, and operator training.
            </p>
          </aside>
        </div>
      </section>

      <nav className="border-b border-line bg-white" aria-label="CB-CAP sections">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3">
          {moduleNavItems.map((item) => (
            <a
              className="shrink-0 rounded-lg px-3 py-2 text-sm font-bold text-foundation-800 hover:bg-surface focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-8">
        <Panel id="sample-view" surface="transparent" className="border-teal-900 bg-teal-900 text-white">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-start">
            <div>
              <p className="text-sm font-bold text-warm-200">County-Based Community Access Platform</p>
              <h2 className="mt-3 text-3xl font-bold">From need to action</h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white">
                CB-CAP helps approved counties and partners review access gaps,
                plan support, and keep decisions accountable.
              </p>
            </div>
            <div className="rounded-lg border border-white/20 bg-teal-800 p-4">
              <p className="font-bold">{brand.legalDisclaimer}</p>
              <p className="mt-3 text-sm leading-6 text-white">
                Providers keep their platforms. SozoRock® Health helps residents
                get ready and helps approved operators see access barriers.
              </p>
            </div>
          </div>
        </Panel>

        <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <Panel id="access-gaps">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-bold text-access-700">Access gaps</p>
                <h2 className="mt-2 text-2xl font-bold">What needs attention?</h2>
              </div>
              <StatusBadge className="border-warning-600/40 bg-warning-100 text-warning-600">
                Sample view
              </StatusBadge>
            </div>
            <p className="mt-3 text-sm leading-6 text-foundation-700">
              The table gives the same information as the map-style view. It is
              easier to read with a keyboard or screen reader.
            </p>
            <div className="mt-5 overflow-x-auto rounded-lg border border-line">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Illustrative county access gaps by ZIP code.
                </caption>
                <thead className="bg-surface">
                  <tr>
                    <th className="px-4 py-3">ZIP</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3">Access gap</th>
                    <th className="px-4 py-3">Hub coverage</th>
                    <th className="px-4 py-3">Travel burden</th>
                    <th className="px-4 py-3">Suggested review</th>
                  </tr>
                </thead>
                <tbody>
                  {countyOperatingPicture.accessSignals.map((signal) => (
                    <tr className="border-t border-line" key={signal.zip}>
                      <td className="px-4 py-3 font-bold">{signal.zip}</td>
                      <td className="px-4 py-3">{signal.priority}</td>
                      <td className="px-4 py-3">{signal.accessGap}</td>
                      <td className="px-4 py-3">{signal.hubCoverage}</td>
                      <td className="px-4 py-3">{signal.travelBurden}</td>
                      <td className="px-4 py-3">{signal.recommendedAction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel>
            <p className="text-sm font-bold text-access-700">Decision support</p>
            <h2 className="mt-2 text-2xl font-bold">Recommended review</h2>
            <p className="mt-4 text-lg font-bold leading-7 text-foundation-950">
              {countyDecisionSupport.recommendation}
            </p>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-foundation-700">
              {countyDecisionSupport.rationale.map((reason) => (
                <li className="flex gap-2" key={reason}>
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-access-600" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-lg border border-warning-600/40 bg-warning-100 p-4 text-sm font-bold text-warning-600">
              {countyDecisionSupport.reviewControl}
            </p>
          </Panel>
        </section>

        <Panel id="action-review">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold text-access-700">Action review</p>
              <h2 className="mt-2 text-2xl font-bold">Work does not move until reviewed.</h2>
            </div>
            <StatusBadge className="border-access-600/40 bg-access-100 text-access-700">
              Human review
            </StatusBadge>
          </div>
          <div className="mt-5 grid gap-3 md:hidden">
            {countyActionQueue.map((item) => (
              <article className="rounded-lg border border-line bg-white p-4" key={item.action}>
                <p className="font-bold">{item.action}</p>
                <p className="mt-2 text-sm text-foundation-700">Owner: {item.owner}</p>
                <p className="mt-1 text-sm text-foundation-700">Due: {item.dueDate}</p>
                <StatusBadge className={`mt-3 ${statusClass[item.reviewState]}`}>
                  {item.reviewState}
                </StatusBadge>
                <p className="mt-3 text-sm leading-6 text-foundation-700">{item.actionGate}</p>
              </article>
            ))}
          </div>
          <div className="mt-5 hidden overflow-x-auto rounded-lg border border-line md:block">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Illustrative action review queue with owner, priority, due date, review state, and action gate.
              </caption>
              <thead className="bg-surface">
                <tr>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Owner</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Due</th>
                  <th className="px-4 py-3">Review state</th>
                  <th className="px-4 py-3">Action gate</th>
                </tr>
              </thead>
              <tbody>
                {countyActionQueue.map((item) => (
                  <tr className="border-t border-line" key={item.action}>
                    <td className="px-4 py-3 font-bold">{item.action}</td>
                    <td className="px-4 py-3">{item.owner}</td>
                    <td className="px-4 py-3">{item.priority}</td>
                    <td className="px-4 py-3">{item.dueDate}</td>
                    <td className="px-4 py-3">
                      <StatusBadge className={statusClass[item.reviewState]}>
                        {item.reviewState}
                      </StatusBadge>
                    </td>
                    <td className="px-4 py-3">{item.actionGate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <section className="grid gap-5 lg:grid-cols-2">
          <Panel id="assurance">
            <p className="text-sm font-bold text-access-700">Assurance</p>
            <h2 className="mt-2 text-2xl font-bold">Controls before action</h2>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {countyAssuranceControls.map((control) => (
                <div className="rounded-lg border border-line bg-surface p-3 text-sm font-bold" key={control}>
                  {control}
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3">
              {countyAssuranceReviewLog.map((entry) => (
                <article className="rounded-lg border border-line p-4" key={entry.check}>
                  <p className="font-bold">{entry.check}</p>
                  <p className="mt-2 text-sm text-foundation-700">Evidence source: {entry.evidenceSource}</p>
                  <p className="mt-1 text-sm text-foundation-700">Action gate: {entry.actionGate}</p>
                  <StatusBadge className={`mt-3 ${statusClass[entry.reviewState]}`}>
                    {entry.reviewState}
                  </StatusBadge>
                </article>
              ))}
            </div>
          </Panel>

          <Panel>
            <p className="text-sm font-bold text-access-700">Human review</p>
            <h2 className="mt-2 text-2xl font-bold">Sample review queue</h2>
            <p className="mt-3 text-sm leading-6 text-foundation-700">
              {humanReviewBoundaryCopy.required} {humanReviewBoundaryCopy.planning}
            </p>
            <div className="mt-5 grid gap-3">
              {humanReviewQueue.slice(0, 3).map((item) => (
                <article className="rounded-lg border border-line p-4" key={item.source}>
                  <p className="font-bold">{item.source}</p>
                  <p className="mt-2 text-sm leading-6 text-foundation-700">{item.reviewNeed}</p>
                  <p className="mt-2 text-sm font-bold text-access-700">{item.status}</p>
                </article>
              ))}
            </div>
          </Panel>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <Panel>
            <p className="text-sm font-bold text-access-700">Planning examples</p>
            <h2 className="mt-2 text-2xl font-bold">Where could support focus next?</h2>
            <div className="mt-5 grid gap-3">
              {scenarioPlans.map((scenario) => (
                <article className="rounded-lg border border-line p-4" key={scenario.title}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <p className="font-bold">{scenario.title}</p>
                    <StatusBadge className={statusClass[scenario.reviewState]}>
                      {scenario.reviewState}
                    </StatusBadge>
                  </div>
                  <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="font-bold">Focus</dt>
                      <dd>{scenario.focus}</dd>
                    </div>
                    <div>
                      <dt className="font-bold">Estimated reach</dt>
                      <dd>{scenario.projectedImpact}</dd>
                    </div>
                    <div>
                      <dt className="font-bold">Workforce</dt>
                      <dd>{scenario.workforce}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-sm text-foundation-700">{scenario.actionGate}</p>
                </article>
              ))}
            </div>
          </Panel>

          <Panel id="request-access" className="bg-warm-100">
            <p className="text-sm font-bold text-access-700">Full access</p>
            <h2 className="mt-2 text-2xl font-bold">Ready to review your county?</h2>
            <p className="mt-3 text-sm leading-6 text-foundation-700">
              Approved partners can request a full CB-CAP review. We will confirm
              geography, data sources, privacy rules, and the right owner before access opens.
            </p>
            <div className="mt-5 grid gap-3">
              <PlainCta href="mailto:support@sozorockfoundation.org?subject=CB-CAP%20partnership%20request">
                Partner with us
              </PlainCta>
              <PlainCta href="/resident" tone="secondary">
                View resident path
              </PlainCta>
            </div>
            <div className="mt-5 grid gap-2">
              {countyModules.map((module) => (
                <span className="rounded-lg border border-line bg-white px-4 py-3 text-sm font-bold" key={module}>
                  {module}
                </span>
              ))}
            </div>
          </Panel>
        </section>
      </div>

      <Footer />
    </main>
  );
}
