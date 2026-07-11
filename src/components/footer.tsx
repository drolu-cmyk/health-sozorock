import { BrandIdentity } from "@/components/brand-identity";
import { brand } from "@/lib/brand";

export function Footer() {
  const socialLinks = [
    { href: "https://www.linkedin.com/company/the-sozorock-foundation", label: "LinkedIn", icon: "in" },
    { href: "https://x.com/SozoRock", label: "X", icon: "x" },
  ];

  return (
    <footer className="border-t border-line bg-white" aria-label="Legal footer">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div className="grid gap-3">
          <BrandIdentity showPromise={false} />
          <p className="max-w-2xl text-sm font-semibold leading-6 text-foundation-800">
            {brand.legalDisclaimer}
          </p>
          <a
            className="w-fit text-sm font-bold text-access-700 underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2"
            href={`mailto:${brand.contactEmail}`}
          >
            {brand.contactEmail}
          </a>
        </div>
        <div className="grid gap-4 lg:justify-items-end">
          <nav
            aria-label="Legal links"
            className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold text-foundation-800"
          >
            <a className="hover:text-access-700 focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2" href="/privacy">
              Privacy Policy
            </a>
            <span aria-hidden="true">•</span>
            <a className="hover:text-access-700 focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2" href="/terms">
              Terms of Use
            </a>
            <span aria-hidden="true">•</span>
            <a className="hover:text-access-700 focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2" href="/non-discrimination">
              Non-Discrimination Notice
            </a>
          </nav>
          <div className="flex gap-3" aria-label="Social media links">
            {socialLinks.map((link) => (
              <a
                aria-label={link.label}
                className="grid size-11 place-items-center rounded-full border border-line text-sm font-bold text-foundation-800 hover:border-access-700 hover:text-access-700 focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2"
                href={link.href}
                key={link.label}
                rel="noreferrer"
                target="_blank"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
