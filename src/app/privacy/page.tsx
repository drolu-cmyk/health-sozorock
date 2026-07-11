import { Footer } from "@/components/footer";
import { brand } from "@/lib/brand";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-foundation-950">
      <section className="mx-auto max-w-4xl px-5 py-12">
        <p className="text-sm font-bold text-access-700">{brand.publicLockup}</p>
        <h1 className="mt-3 text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-5 text-lg leading-8 text-foundation-700">
          SozoRock® Health is built for non-clinical access support. We collect
          only what is needed to help you use the app or request support.
        </p>

        <div className="mt-8 grid gap-5">
          {[
            {
              title: "What we ask for",
              body: "The app may ask for your name or initials, email, ZIP code, city, or county. Support requests may include the message you choose to send.",
            },
            {
              title: "What we do not need",
              body: "We do not need private health details, care details, payment card numbers, insurance claims, or provider records for basic app use.",
            },
            {
              title: "Voice and location",
              body: "The app works without microphone or location access. You can type instead and search by ZIP code, city, or county.",
            },
            {
              title: "Support requests",
              body: "If you request support, we use your message to respond. A support request is not medical care and is not emergency response.",
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
