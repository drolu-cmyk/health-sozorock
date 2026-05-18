type LayerCardProps = {
  title: string;
  subtitle: string;
  items: string[];
  tone: "resident" | "county";
};

export function LayerCard({ title, subtitle, items, tone }: LayerCardProps) {
  const toneClass =
    tone === "resident"
      ? "border-access-600/20 bg-white"
      : "border-foundation-800/20 bg-foundation-950 text-white";
  const itemClass =
    tone === "resident"
      ? "border-line bg-surface text-foundation-800"
      : "border-white/15 bg-white/8 text-white";

  return (
    <article className={`rounded-lg border p-6 shadow-sm ${toneClass}`}>
      <p
        className={`text-sm font-bold uppercase tracking-[0.14em] ${
          tone === "resident" ? "text-access-700" : "text-access-100"
        }`}
      >
        {tone === "resident" ? "Resident Access Layer" : "County Operating Intelligence Layer"}
      </p>
      <h3 className="mt-4 text-2xl font-bold tracking-normal">{title}</h3>
      <p
        className={`mt-3 leading-7 ${
          tone === "resident" ? "text-foundation-700" : "text-blue-100"
        }`}
      >
        {subtitle}
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <span
            className={`rounded-lg border px-3 py-2 text-sm font-semibold ${itemClass}`}
            key={item}
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
