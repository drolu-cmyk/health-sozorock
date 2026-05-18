import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";

type BrandIdentityProps = {
  className?: string;
  showPromise?: boolean;
};

function hasOfficialAsset(publicPath: string) {
  return existsSync(path.join(process.cwd(), "public", publicPath.replace(/^\//, "")));
}

export function BrandIdentity({ className = "", showPromise = true }: BrandIdentityProps) {
  const hasHealthLogo = hasOfficialAsset(brand.assets.healthLogo);

  return (
    <Link
      className={`flex items-center gap-3 ${className}`}
      href={brand.homeHref}
      aria-label={`${brand.programName} home`}
    >
      {hasHealthLogo ? (
        <Image
          alt={brand.programName}
          className="h-10 w-auto"
          height={40}
          src={brand.assets.healthLogo}
          width={220}
        />
      ) : (
        <span>
          <span className="block text-base font-bold tracking-normal text-foundation-950">
            {brand.programName}
          </span>
          {showPromise ? (
            <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-access-700">
              {brand.promise}
            </span>
          ) : null}
        </span>
      )}
    </Link>
  );
}
