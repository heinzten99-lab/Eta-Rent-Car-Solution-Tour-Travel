const steps = ["Pilih Mobil", "Isi Data", "Konfirmasi"];

export function StepIndicator({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2" aria-label="Langkah pemesanan">
      {steps.map((label, i) => {
        const index = i + 1;
        const done = index < current;
        const active = index === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              aria-current={active ? "step" : undefined}
              className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                active
                  ? "bg-accent text-accent-foreground"
                  : done
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
              }`}
            >
              {index}
            </span>
            <span
              className={`hidden text-xs font-medium sm:block ${
                active ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
            {index < steps.length && <span className="h-px flex-1 bg-border" />}
          </li>
        );
      })}
    </ol>
  );
}
