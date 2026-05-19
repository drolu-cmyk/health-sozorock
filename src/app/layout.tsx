import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${brand.programName} | ${brand.promise}`,
  description: `${brand.positioning} ${brand.trustBoundary}`,
  applicationName: brand.programName,
  authors: [{ name: brand.foundationName }],
  creator: brand.foundationName,
  publisher: brand.foundationName,
  category: "non-clinical health access intelligence prototype",
  keywords: [
    brand.programName,
    brand.foundationName,
    "Care for Every ZIP Code",
    "non-clinical access",
    "synthetic data prototype",
    "human review",
  ],
  openGraph: {
    title: `${brand.programName} | ${brand.promise}`,
    description: brand.positioning,
    siteName: brand.programName,
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
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
