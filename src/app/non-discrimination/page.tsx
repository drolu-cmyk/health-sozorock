import { Footer } from "@/components/footer";
import { brand } from "@/lib/brand";

export default function NonDiscriminationPage() {
  return (
    <main className="min-h-screen bg-white text-foundation-950">
      <section className="mx-auto max-w-4xl px-5 py-12">
        <p className="text-sm font-bold text-access-700">{brand.publicLockup}</p>
        <h1 className="mt-3 text-4xl font-bold">Non-Discrimination Notice</h1>
        <p className="mt-5 text-lg leading-8 text-foundation-700">
          SozoRock® Health is designed to support fair access. We aim to serve
          people with respect across race, color, national origin, age, disability,
          sex, language, income, geography, and background.
        </p>

        <div className="mt-8 grid gap-5">
          <section className="rounded-lg border border-line bg-surface p-5">
            <h2 className="text-xl font-bold">Access for everyone</h2>
            <p className="mt-2 leading-7 text-foundation-700">
              The app supports typing, guided text, and ZIP, city, or county search.
              Voice and location are optional.
            </p>
          </section>
          <section className="rounded-lg border border-line bg-surface p-5">
            <h2 className="text-xl font-bold">Need help?</h2>
            <p className="mt-2 leading-7 text-foundation-700">
              Email {brand.contactEmail} if you need help using SozoRock® Health
              or need an access format that works better for you.
            </p>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
