import { brand } from "@/lib/brand";

export function AssuranceBadge() {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-access-600/30 bg-access-100 px-3 py-2 text-sm font-semibold text-access-700">
      <span className="h-2 w-2 rounded-full bg-access-600" aria-hidden="true" />
      {brand.trustBoundary}
    </span>
  );
}
