import Link from "next/link";
import { brand } from "@/lib/brand";
import { targetPlatforms } from "@/lib/platformReadiness";
import { trustBoundary } from "@/lib/productBoundaries";
import { productRoutes } from "@/lib/routes";

const entryActions = [
  {
    href: productRoutes.resident.home,
    label: "Start Resident Access",
    description: "Open the mobile-first resident access flow.",
  },
  {
    href: productRoutes.county.home,
    label: "Open County Operating Layer",
    description: "View the dark operating console for county teams.",
  },
  {
    href: productRoutes.model,
    label: "Review Model",
    description: "Read the non-clinical model boundary.",
  },
] as const;

export function ProductEntry() {
  return (
    <div className="bg-[#f3f7fb]">
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:px-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-stretch lg:py-14">
        <div className="rounded-lg border border-line bg-white p-5 shadow-sm md:p-7">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            Multi-platform product foundation
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-normal text-foundation-950 md:text-6xl">
            {brand.promise}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-foundation-700">
            SozoRock Health is a non-clinical health access product with a resident
            access app and a county operating intelligence console.
          </p>
          <div className="mt-6 rounded-lg bg-access-100 p-4 text-sm font-bold leading-6 text-access-700">
            {trustBoundary.primary}
          </div>
          <div className="mt-6 grid gap-3">
            {entryActions.map((action) => (
              <Link
                className="min-h-14 rounded-lg border border-line bg-white px-4 py-4 text-left shadow-sm hover:border-access-600 focus:outline-none focus:ring-2 focus:ring-access-600"
                href={action.href}
                key={action.href}
              >
                <span className="block text-base font-bold text-foundation-950">{action.label}</span>
                <span className="mt-1 block text-sm leading-6 text-foundation-700">
                  {action.description}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <section className="rounded-lg border border-[#15334c] bg-[#061521] p-4 text-white shadow-xl md:p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-access-100">
                  County operating console
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  Signal → Decision → Action → Assurance → Impact
                </h2>
              </div>
              <span className="w-fit rounded-lg bg-access-100 px-3 py-2 text-sm font-bold text-access-700">
                Planning support
              </span>
            </div>
            <div className="mt-5 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="map-grid-dark min-h-72 rounded-lg border border-white/15 bg-[#0b2136] p-4">
                <div className="grid h-full min-h-64 place-items-center rounded-lg border border-white/10 bg-white/5 text-center">
                  <div>
                    <p className="text-sm font-bold text-access-100">
                      Geospatial Access Operating Picture
                    </p>
                    <p className="mt-2 text-4xl font-bold">0.68</p>
                    <p className="mt-1 text-sm text-blue-100">Synthetic access gap index</p>
                  </div>
                </div>
              </div>
              <div className="grid gap-3">
                {["Action Queue", "Assurance Log", "Scenario Planning"].map((item) => (
                  <div className="rounded-lg border border-white/12 bg-white/8 p-4" key={item}>
                    <p className="text-sm font-bold text-white">{item}</p>
                    <p className="mt-2 text-sm text-blue-100">{trustBoundary.humanReview}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-foundation-700">
              Platform readiness
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {targetPlatforms.map((platform) => (
                <span
                  className="rounded-lg bg-surface px-3 py-3 text-center text-sm font-bold text-foundation-900"
                  key={platform}
                >
                  {platform}
                </span>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
