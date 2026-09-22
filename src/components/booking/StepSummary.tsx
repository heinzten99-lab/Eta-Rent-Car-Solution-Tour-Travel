import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/constants";
import { formatDateId, formatRupiah, SERVICE_LABEL, type Car } from "@/lib/rental";
import type { CustomerData } from "./StepData";
import type { TripState } from "./StepTrip";

interface Props {
  car: Car;
  trip: TripState;
  customer: CustomerData;
  days: number;
  total: number;
  saving: boolean;
  saved: boolean;
  onBack: () => void;
  onSave: () => void;
  onWhatsApp: () => void;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}

export function StepSummary({
  car,
  trip,
  customer,
  days,
  total,
  saving,
  saved,
  onBack,
  onSave,
  onWhatsApp,
}: Props) {
  const dp = Math.round((total * BUSINESS.dpPercent) / 100);

  return (
    <section className="space-y-5">
      <div className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <h2 className="font-bold">Ringkasan Pesanan</h2>
        <dl className="mt-3 divide-y divide-border">
          <Row label="Mobil" value={car.name} />
          <Row label="Layanan" value={SERVICE_LABEL[car.service_type]} />
          <Row label="Ambil" value={`${formatDateId(trip.pickupDate)} · ${trip.pickupTime}`} />
          <Row label="Kembali" value={formatDateId(trip.returnDate)} />
          <Row label="Durasi" value={`${days} × 24 jam`} />
          <Row label="Nama" value={customer.name} />
          <Row label="WhatsApp" value={customer.phone} />
          <Row label="Alamat" value={customer.address} />
          
        </dl>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-extrabold">{formatRupiah(total)}</span>
        </div>
      </div>

      <div className="rounded-xl border border-accent/40 bg-accent/10 p-4">
        <h2 className="font-bold">Informasi Pembayaran</h2>
        <p className="mt-2 text-sm">
          Transfer DP {BUSINESS.dpPercent}% sebesar{" "}
          <strong>{formatRupiah(dp)}</strong> untuk mengunci unit. Sisa pembayaran saat serah terima
          mobil.
        </p>
        <ul className="mt-3 space-y-1 text-sm">
          <li>Bank: {BUSINESS.bank.name}</li>
          <li>No. Rekening: {BUSINESS.bank.account}</li>
          <li>Atas Nama: {BUSINESS.bank.holder}</li>
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Konfirmasi pembayaran dilakukan manual oleh admin via WhatsApp setelah bukti transfer
          dikirim.
        </p>
      </div>

      <Button variant="cta" className="h-12 w-full text-base" disabled={saving} onClick={onWhatsApp}>
        <MessageCircle aria-hidden="true" />
        {saving ? "Memproses..." : "Konfirmasi & Kirim via WhatsApp"}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Verifikasi dokumen (KTP &amp; SIM) dilakukan dengan aman via WhatsApp setelah menekan tombol
        konfirmasi.
      </p>


      <div className="flex gap-3">
        <Button type="button" variant="outline" className="h-11 flex-1" onClick={onBack}>
          Kembali
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="h-11 flex-1"
          disabled={saving || saved}
          onClick={onSave}
        >
          {saved ? "Order Tersimpan" : "Simpan Order"}
        </Button>
      </div>
    </section>
  );
}
