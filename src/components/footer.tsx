import Link from "next/link";
import { AssuranceBadge } from "@/components/assurance-badge";
import { BrandIdentity } from "@/components/brand-identity";
import { brand } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <BrandIdentity showPromise={false} />
          <p className="text-sm font-semibold text-foundation-950">
            {brand.programName} is a program of {brand.foundationName}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-foundation-700">
            {brand.providerPathway}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <AssuranceBadge />
          <Link
            className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-foundation-700 hover:bg-surface hover:text-foundation-950 focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2"
            href="/about-model"
          >
            About the model
          </Link>
        </div>
      </div>
    </footer>
  );
}
