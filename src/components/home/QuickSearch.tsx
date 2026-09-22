import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { todayIso, type ServiceType } from "@/lib/rental";

export interface SearchCriteria {
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  serviceType: ServiceType;
}

interface Props {
  value: SearchCriteria;
  onChange: (next: SearchCriteria) => void;
  onSubmit: () => void;
}

export function QuickSearch({ value, onChange, onSubmit }: Props) {
  const min = todayIso();

  return (
    <form
      className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-[var(--shadow-card)] sm:p-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="grid gap-1.5">
          <Label htmlFor="qs-pickup-date">Tanggal Ambil</Label>
          <Input
            id="qs-pickup-date"
            type="date"
            min={min}
            value={value.pickupDate}
            onChange={(e) => onChange({ ...value, pickupDate: e.target.value })}
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="qs-pickup-time">Jam Ambil</Label>
          <Input
            id="qs-pickup-time"
            type="time"
            value={value.pickupTime}
            onChange={(e) => onChange({ ...value, pickupTime: e.target.value })}
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="qs-return-date">Tanggal Kembali</Label>
          <Input
            id="qs-return-date"
            type="date"
            min={value.pickupDate || min}
            value={value.returnDate}
            onChange={(e) => onChange({ ...value, returnDate: e.target.value })}
          />
        </div>
        <div className="grid gap-1.5">
          <span className="text-sm font-medium">Tipe Layanan</span>
          <div className="flex rounded-md border border-input p-0.5" role="group">
            {(["lepas_kunci", "dengan_sopir"] as ServiceType[]).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={value.serviceType === t}
                onClick={() => onChange({ ...value, serviceType: t })}
                className={`flex-1 rounded px-2 py-1.5 text-xs font-medium transition-colors ${
                  value.serviceType === t
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {t === "lepas_kunci" ? "Lepas Kunci" : "Dengan Sopir"}
              </button>
            ))}
          </div>
        </div>
        <div className="grid items-end">
          <Button type="submit" variant="cta" className="h-10 w-full">
            <Search aria-hidden="true" /> Cari Mobil
          </Button>
        </div>
      </div>
    </form>
  );
}
