import { AssuranceBadge } from "@/components/assurance-badge";
import { BrandIdentity } from "@/components/brand-identity";
import { SiteNav } from "@/components/site-nav";

const navItems = [
  { href: "/", label: "Start" },
  { href: "/resident", label: "Open app" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <BrandIdentity />
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <SiteNav navItems={navItems} />
          <AssuranceBadge />
        </div>
      </div>
    </header>
  );
}
