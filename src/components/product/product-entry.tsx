import Link from "next/link";
import { brand } from "@/lib/brand";
import { trustBoundary } from "@/lib/productBoundaries";
import { productRoutes } from "@/lib/routes";

const entryActions = [
  {
    href: productRoutes.resident.home,
    label: "Start Resident Access",
    description: "Begin the guided resident app journey.",
  },
  {
    href: productRoutes.county.home,
    label: "Open County Operating Layer",
    description: "Enter the county operating intelligence console.",
  },
  {
    href: productRoutes.model,
    label: "Review Model",
    description: "Check the non-clinical trust and data boundary.",
  },
] as const;

export function ProductEntry() {
  return (
    <div className="min-h-screen bg-[#edf5f7] px-4 py-6 md:px-5 md:py-10">
      <section className="mx-auto grid max-w-4xl gap-5">
        <div className="rounded-2xl border border-line bg-white p-5 shadow-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
            SozoRock Health
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-normal text-foundation-950 md:text-6xl">
            {brand.promise}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-foundation-700">
            Choose the resident access journey, the county operating layer, or the model
            boundary.
          </p>
          <div className="mt-6 rounded-xl bg-access-100 p-4 text-sm font-bold leading-6 text-access-700">
            {trustBoundary.primary}
          </div>
        </div>

        <div className="grid gap-3">
          {entryActions.map((action) => (
            <Link
              className="min-h-20 rounded-2xl border border-line bg-white p-5 shadow-sm hover:border-access-600 focus:outline-none focus:ring-2 focus:ring-access-600"
              href={action.href}
              key={action.href}
            >
              <span className="block text-xl font-bold text-foundation-950">{action.label}</span>
              <span className="mt-2 block text-base leading-7 text-foundation-700">
                {action.description}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
