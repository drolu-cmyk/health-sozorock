import type { Metadata } from "next";
import "./globals.css";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${brand.programName} | ${brand.promise}`,
  description: `${brand.positioning} ${brand.trustBoundary}`,
  applicationName: brand.programName,
  authors: [{ name: brand.foundationName }],
  creator: brand.foundationName,
  publisher: brand.foundationName,
  category: "non-clinical health access operating layer",
  keywords: [
    brand.programName,
    brand.foundationName,
    "Care for Every ZIP Code",
    "non-clinical access",
    "controlled public launch",
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
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
