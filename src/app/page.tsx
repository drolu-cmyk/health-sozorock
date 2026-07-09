import Link from "next/link";
import { AssuranceBadge } from "@/components/assurance-badge";
import { LayerCard } from "@/components/layer-card";
import { OperatingSequence } from "@/components/operating-sequence";
import { SectionHeading } from "@/components/section-heading";
import { brand } from "@/lib/brand";
import { launchAuditRegister, launchFeatureStates, productionBackendPath } from "@/lib/launch-governance";
import { countyModules, publicAccessSignals, residentModules } from "@/lib/mock-data";

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-20">
        <div>
          <AssuranceBadge />
          <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-normal text-foundation-950 md:text-7xl">
            {brand.promise}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-foundation-700">
            {brand.positioning}
          </p>
          <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-foundation-900">
            {brand.operatingLine}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="rounded-lg bg-foundation-950 px-5 py-3 text-center text-sm font-bold text-white hover:bg-foundation-800"
              href="/resident"
            >
              View Resident Layer
            </Link>
            <Link
              className="rounded-lg border border-foundation-800 px-5 py-3 text-center text-sm font-bold text-foundation-950 hover:bg-white"
              href="/county"
            >
              View County Layer
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <div className="map-grid relative min-h-[420px] overflow-hidden rounded-lg border border-line bg-surface">
            <div className="absolute left-5 top-5 rounded-lg bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-700">
                Access signal
              </p>
              <p className="mt-2 text-3xl font-bold text-foundation-950">27514</p>
              <p className="mt-1 text-sm text-foundation-700">High access gap</p>
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-foundation-950 p-5 text-white shadow-sm">
              <p className="text-sm font-bold text-access-100">
                Signal → Decision → Action → Assurance → Impact.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {publicAccessSignals.map((signal) => (
                  <div className="rounded-lg bg-white/10 p-3" key={signal.zip}>
                    <p className="text-xs font-bold text-blue-100">ZIP {signal.zip}</p>
                    <p className="mt-1 text-sm font-semibold">{signal.nextAction}</p>
                  </div>
                ))}
              </div>
            </div>
            <span className="absolute right-16 top-24 h-5 w-5 rounded-full border-4 border-white bg-access-600 shadow-lg" />
            <span className="absolute right-32 top-48 h-5 w-5 rounded-full border-4 border-white bg-signal-600 shadow-lg" />
            <span className="absolute right-52 top-32 h-5 w-5 rounded-full border-4 border-white bg-warning-600 shadow-lg" />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <SectionHeading
            eyebrow="Two-layer architecture"
            title="Resident access and county intelligence in one operating shell."
            description="SozoRock Health shows the full product promise while enabling only the paths that have launch-ready consent, support, and operating controls."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <LayerCard
              title={`${brand.layers.resident.standard}.`}
              subtitle="Residents see the fastest non-clinical path to local support, access events, hubs, and provider-led readiness."
              items={residentModules}
              tone="resident"
            />
            <LayerCard
              title={`${brand.layers.county.standard}.`}
              subtitle="County teams see synthetic signals, recommended operational actions, assurance controls, and impact planning."
              items={countyModules}
              tone="county"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <SectionHeading
          eyebrow="Operating logic"
          title="Signal → Decision → Action → Assurance → Impact."
          description="Every surface keeps human review visible, stays non-clinical, and makes each feature state clear before public launch."
        />
        <div className="mt-8">
          <OperatingSequence />
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <SectionHeading
            eyebrow="Controlled public launch"
            title="Visible promise. Careful enablement."
            description="Only ready features are enabled. Everything else has a clear resident-facing state, fallback path, and support path."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {launchFeatureStates.slice(0, 9).map((feature) => (
              <article className="rounded-lg border border-line bg-surface p-4" key={feature.featureKey}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold text-foundation-950">{feature.label}</h3>
                  <span className="rounded-lg bg-white px-3 py-1 text-xs font-bold text-access-700">
                    {feature.state}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-foundation-700">{feature.publicExplanation}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.1em] text-foundation-700">
                  Fallback: {feature.fallbackPath}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-14 lg:grid-cols-2">
        <article className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <SectionHeading
            eyebrow="Production backend path"
            title="Server-side boundaries first."
            description="Provider keys, guidance adapters, maps, notifications, content updates, support records, and audit logs stay behind server-side controls."
          />
          <div className="mt-6 grid gap-3">
            {productionBackendPath.map((item) => (
              <p className="rounded-lg border border-line bg-surface p-4 text-sm font-semibold leading-6 text-foundation-800" key={item}>
                {item}
              </p>
            ))}
          </div>
        </article>
        <article className="rounded-lg border border-line bg-foundation-950 p-6 text-white shadow-sm">
          <SectionHeading
            eyebrow="Launch audit"
            title="No public launch until blockers are closed."
            description="The audit register tracks blocker severity, owner, evidence, fix path, and go-live decision."
          />
          <div className="mt-6 grid gap-3">
            {launchAuditRegister.slice(0, 6).map((audit) => (
              <div className="rounded-lg border border-white/15 bg-white/8 p-4" key={audit.item}>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold">{audit.item}</h3>
                  <span className="rounded-lg bg-white/10 px-2 py-1 text-xs font-bold text-access-100">
                    {audit.status}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-blue-100">{audit.goLiveDecision}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
