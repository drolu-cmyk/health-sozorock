import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "SozoRock Health | Care for Every ZIP Code",
  description:
    "A non-clinical health access intelligence and activation prototype for underserved communities.",
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
