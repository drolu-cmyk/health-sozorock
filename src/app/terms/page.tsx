import { Footer } from "@/components/footer";
import { brand } from "@/lib/brand";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-foundation-950">
      <section className="mx-auto max-w-4xl px-5 py-12">
        <p className="text-sm font-bold text-access-700">{brand.publicLockup}</p>
        <h1 className="mt-3 text-4xl font-bold">Terms of Use</h1>
        <p className="mt-5 text-lg leading-8 text-foundation-700">
          Use SozoRock® Health for access guidance, preparation, and support
          requests. It is not a clinic, provider, or telehealth platform.
        </p>

        <div className="mt-8 grid gap-5">
          {[
            {
              title: "Non-clinical support",
              body: brand.legalDisclaimer,
            },
            {
              title: "Emergency help",
              body: "Do not use this app for emergencies. Call local emergency services or seek urgent help from a licensed provider.",
            },
            {
              title: "Provider responsibility",
              body: "Providers keep their platforms, care decisions, records, and patient responsibilities. SozoRock® Health helps you get ready.",
            },
            {
              title: "Availability",
              body: "Some options may be limited by geography, permission, partner readiness, or support capacity.",
            },
          ].map((section) => (
            <section className="rounded-lg border border-line bg-surface p-5" key={section.title}>
              <h2 className="text-xl font-bold">{section.title}</h2>
              <p className="mt-2 leading-7 text-foundation-700">{section.body}</p>
            </section>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
