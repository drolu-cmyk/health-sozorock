import Link from "next/link";
import { AssuranceBadge } from "@/components/assurance-badge";
import { BrandIdentity } from "@/components/brand-identity";

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
        <BrandIdentity />
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
