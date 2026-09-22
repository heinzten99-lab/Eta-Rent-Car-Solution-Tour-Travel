import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { isValidIdPhone } from "@/lib/rental";

export interface CustomerData {
  name: string;
  phone: string;
  address: string;
}

function errorsFor(v: CustomerData) {
  return {
    name: v.name.trim().length < 3 ? "Nama minimal 3 karakter" : "",
    phone: isValidIdPhone(v.phone) ? "" : "Nomor WhatsApp tidak valid (contoh: 081234567890)",
    address: v.address.trim().length < 8 ? "Alamat minimal 8 karakter" : "",
  };
}

interface Props {
  value: CustomerData;
  onChange: (v: CustomerData) => void;
  onBack: () => void;
  onNext: () => void;
}

export function StepData({ value, onChange, onBack, onNext }: Props) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const errors = errorsFor(value);
  const valid = Object.values(errors).every((e) => !e);

  const show = (key: keyof typeof errors) => (touched[key] ? errors[key] : "");

  return (
    <form
      className="space-y-5"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setTouched({ name: true, phone: true, address: true });
        if (valid) onNext();
      }}
    >
      <fieldset className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <legend className="px-1 font-bold">Data Penyewa</legend>
        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="c-name">Nama Lengkap</Label>
            <Input
              id="c-name"
              autoComplete="name"
              value={value.name}
              aria-invalid={Boolean(show("name"))}
              onChange={(e) => onChange({ ...value, name: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            />
            {show("name") && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="c-phone">Nomor WhatsApp Aktif</Label>
            <Input
              id="c-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="081234567890"
              value={value.phone}
              aria-invalid={Boolean(show("phone"))}
              onChange={(e) => onChange({ ...value, phone: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            />
            {show("phone") && <p className="text-xs text-destructive">{errors.phone}</p>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="c-address">Alamat Penjemputan / Domisili</Label>
            <Textarea
              id="c-address"
              rows={3}
              value={value.address}
              aria-invalid={Boolean(show("address"))}
              onChange={(e) => onChange({ ...value, address: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, address: true }))}
            />
            {show("address") && <p className="text-xs text-destructive">{errors.address}</p>}
          </div>
        </div>
      </fieldset>

      <div className="flex gap-3">
        <Button type="button" variant="outline" className="h-11 flex-1" onClick={onBack}>
          Kembali
        </Button>
        <Button type="submit" variant="cta" className="h-11 flex-1">
          Lanjut: Ringkasan
        </Button>
      </div>
    </form>
  );
}
