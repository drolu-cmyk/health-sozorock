import Link from "next/link";
import { AssuranceBadge } from "@/components/assurance-badge";
import { LayerCard } from "@/components/layer-card";
import { OperatingSequence } from "@/components/operating-sequence";
import { SectionHeading } from "@/components/section-heading";
import { brand } from "@/lib/brand";
import { countyModules, residentModules, syntheticAccessSignals } from "@/lib/mock-data";

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
                Synthetic access signal
              </p>
              <p className="mt-2 text-3xl font-bold text-foundation-950">27514</p>
              <p className="mt-1 text-sm text-foundation-700">High access gap</p>
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-foundation-950 p-5 text-white shadow-sm">
              <p className="text-sm font-bold text-access-100">
                Signal → Decision → Action → Assurance → Impact.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {syntheticAccessSignals.map((signal) => (
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
            description="The first prototype presents the locked architecture without live data, resident records, cloud keys, or clinical workflows."
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
          description="Every surface keeps human review visible and uses mock data for planning support only."
        />
        <div className="mt-8">
          <OperatingSequence />
        </div>
      </section>
    </>
  );
}
