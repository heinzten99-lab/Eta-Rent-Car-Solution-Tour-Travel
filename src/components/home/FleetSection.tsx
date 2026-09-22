import { useMemo, useState } from "react";

import { useCars } from "@/hooks/useFleet";
import type { ServiceType } from "@/lib/rental";
import { CarCard } from "./CarCard";
import type { SearchCriteria } from "./QuickSearch";

type ServiceFilter = ServiceType | "all";
type TransmissionFilter = "all" | "Manual" | "Matic";

interface Props {
  criteria: SearchCriteria;
  serviceFilter: ServiceFilter;
  onServiceFilterChange: (value: ServiceFilter) => void;
}

function FilterGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto">
      <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="flex gap-1.5" role="group" aria-label={label}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              value === o.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function FleetSection({ criteria, serviceFilter, onServiceFilterChange }: Props) {
  const [transmission, setTransmission] = useState<TransmissionFilter>("all");
  const { data: cars, isPending, isError } = useCars();

  const filtered = useMemo(() => {
    return (cars ?? []).filter(
      (c) =>
        (serviceFilter === "all" || c.service_type === serviceFilter) &&
        (transmission === "all" || c.transmission === transmission),
    );
  }, [cars, serviceFilter, transmission]);

  return (
    <section id="armada" className="section-x scroll-mt-20 py-10 sm:py-14">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Armada Kami</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Semua harga sudah termasuk perawatan rutin. Pilih mobil, lanjutkan pemesanan dalam 3
          langkah.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 rounded-lg border border-border bg-card p-3 sm:flex-row sm:items-center sm:gap-6">
        <FilterGroup<ServiceFilter>
          label="Layanan"
          value={serviceFilter}
          onChange={onServiceFilterChange}
          options={[
            { value: "all", label: "Semua" },
            { value: "lepas_kunci", label: "Lepas Kunci" },
            { value: "dengan_sopir", label: "Dengan Sopir" },
          ]}
        />
        <FilterGroup<TransmissionFilter>
          label="Transmisi"
          value={transmission}
          onChange={setTransmission}
          options={[
            { value: "all", label: "Semua" },
            { value: "Manual", label: "Manual" },
            { value: "Matic", label: "Matic" },
          ]}
        />
      </div>

      {isError && (
        <p className="mt-6 text-sm text-destructive">
          Gagal memuat armada. Silakan muat ulang halaman.
        </p>
      )}

      {isPending ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-80 animate-pulse rounded-xl bg-secondary" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          Tidak ada mobil yang cocok dengan filter ini.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((car) => (
            <CarCard key={car.id} car={car} criteria={criteria} />
          ))}
        </div>
      )}
    </section>
  );
}
