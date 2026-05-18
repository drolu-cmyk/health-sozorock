import { brand } from "@/lib/brand";
import { designTokens } from "@/lib/design-tokens";

type LayerCardProps = {
  title: string;
  subtitle: string;
  items: string[];
  tone: "resident" | "county";
};

export function LayerCard({ title, subtitle, items, tone }: LayerCardProps) {
  const layer = designTokens.layers[tone];
  const itemClass =
    tone === "resident"
      ? "border-line bg-surface text-foundation-800"
      : "border-white/15 bg-white/8 text-white";
  const layerName = tone === "resident" ? brand.layers.resident.name : brand.layers.county.name;

  return (
    <article className={`rounded-lg border p-6 shadow-sm ${layer.surfaceClass}`}>
      <p className={`text-sm font-bold uppercase tracking-[0.14em] ${layer.labelClass}`}>
        {layerName}
      </p>
      <h3 className="mt-4 text-2xl font-bold tracking-normal">{title}</h3>
      <p className={`mt-3 leading-7 ${layer.contentClass}`}>
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
