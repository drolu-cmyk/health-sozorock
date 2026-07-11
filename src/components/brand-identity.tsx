import Link from "next/link";
import { brand } from "@/lib/brand";

type BrandIdentityProps = {
  className?: string;
  showPromise?: boolean;
};

export function BrandIdentity({ className = "", showPromise = true }: BrandIdentityProps) {
  return (
    <Link
      className={`inline-flex min-h-11 items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2 ${className}`}
      href={brand.homeHref}
      aria-label={`${brand.programName} home`}
    >
      <span>
        <span className="block text-base font-bold tracking-normal text-foundation-950">
          {brand.publicLockup}
        </span>
        {showPromise ? (
          <span className="block text-xs font-semibold uppercase tracking-normal text-access-700">
            {brand.promise}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
