const steps = ["Signal", "Decision", "Action", "Assurance", "Impact"];

export function OperatingSequence() {
  return (
    <ol className="grid gap-3 md:grid-cols-5" aria-label="Signal to impact operating sequence">
      {steps.map((step, index) => (
        <li
          className="rounded-lg border border-line bg-white p-4 shadow-sm"
          key={step}
        >
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-access-700">
            0{index + 1}
          </span>
          <p className="mt-2 text-lg font-bold text-foundation-950">{step}</p>
        </li>
      ))}
    </ol>
  );
}
