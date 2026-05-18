import Link from "next/link";
import { AssuranceBadge } from "@/components/assurance-badge";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-foundation-950">
            SozoRock Health is a program of The SozoRock Foundation, Inc.
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-foundation-700">
            Providers keep their platforms. We help you get ready.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <AssuranceBadge />
          <Link
            className="text-sm font-semibold text-foundation-700 hover:text-foundation-950"
            href="/about-model"
          >
            About the model
          </Link>
        </div>
      </div>
    </footer>
  );
}
