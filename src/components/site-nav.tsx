"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
};

export function SiteNav({ navItems }: { navItems: NavItem[] }) {
  const pathname = usePathname();
  const isResidentSurface = pathname.startsWith("/resident");
  const visibleNavItems = isResidentSurface
    ? navItems.filter((item) => item.href === "/" || item.href === "/resident")
    : navItems;

  return (
    <nav className="flex flex-wrap gap-2" aria-label="Primary navigation">
      {visibleNavItems.map((item) => (
        <Link
          className="rounded-lg px-3 py-2 text-sm font-semibold text-foundation-700 hover:bg-surface hover:text-foundation-950"
          href={item.href}
          key={item.href}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
