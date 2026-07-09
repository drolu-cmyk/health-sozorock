type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="min-w-0 max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-access-700">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-normal text-foundation-950 break-words md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-foundation-700 break-words md:text-lg">
        {description}
      </p>
    </div>
  );
}
