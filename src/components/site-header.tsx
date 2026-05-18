import Link from "next/link";
import { AssuranceBadge } from "@/components/assurance-badge";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/resident", label: "Resident Layer" },
  { href: "/county", label: "County Layer" },
  { href: "/about-model", label: "Model" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link className="flex items-center gap-3" href="/" aria-label="SozoRock Health home">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-foundation-950 text-sm font-bold text-white">
            SH
          </span>
          <span>
            <span className="block text-base font-bold tracking-normal text-foundation-950">
              SozoRock Health
            </span>
            <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-access-700">
              Care for Every ZIP Code.
            </span>
          </span>
        </Link>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <nav className="flex flex-wrap gap-2" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                className="rounded-lg px-3 py-2 text-sm font-semibold text-foundation-700 hover:bg-surface hover:text-foundation-950"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <AssuranceBadge />
        </div>
      </div>
    </header>
  );
}
