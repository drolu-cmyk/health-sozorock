import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${brand.programName} | ${brand.promise}`,
  description: brand.positioning,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
