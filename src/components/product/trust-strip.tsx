import { trustBoundary } from "@/lib/productBoundaries";

export function TrustStrip({ dark = false }: { dark?: boolean }) {
  return (
    <aside
      className={
        dark
          ? "rounded-lg border border-white/15 bg-white/8 p-3 text-sm font-bold text-blue-100"
          : "rounded-lg border border-access-600/20 bg-access-100 p-3 text-sm font-bold text-access-700"
      }
    >
      {trustBoundary.primary}
    </aside>
  );
}
