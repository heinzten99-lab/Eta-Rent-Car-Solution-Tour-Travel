import { Link } from "@tanstack/react-router";

import carPlaceholder from "@/assets/car-placeholder.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatRupiah, SERVICE_LABEL, todayIso, type Car } from "@/lib/rental";

export interface TripState {
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
}

interface Props {
  car: Car;
  trip: TripState;
  onTripChange: (t: TripState) => void;
  days: number;
  total: number;
  onNext: () => void;
}

export function StepTrip({ car, trip, onTripChange, days, total, onNext }: Props) {
  return (
    <section className="space-y-5">
      <div className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <img
          src={car.image_url || carPlaceholder}
          alt={car.name}
          loading="lazy"
          width={1024}
          height={768}
          className="size-24 shrink-0 rounded-lg object-cover sm:size-32"
        />
        <div className="min-w-0">
          <h2 className="font-bold">{car.name}</h2>
          <p className="text-xs text-muted-foreground">
            {SERVICE_LABEL[car.service_type]} · {car.transmission} · {car.seats} kursi
          </p>
          <p className="mt-2 font-extrabold">
            {formatRupiah(car.price_per_24h)}
            <span className="text-xs font-medium text-muted-foreground"> / 24 Jam</span>
          </p>
          <Link
            to="/"
            hash="armada"
            className="mt-2 inline-flex text-xs font-semibold text-primary underline"
          >
            Ganti Mobil
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <h2 className="font-bold">Detail Perjalanan</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="grid gap-1.5">
            <Label htmlFor="b-pickup-date">Tanggal Ambil</Label>
            <Input
              id="b-pickup-date"
              type="date"
              min={todayIso()}
              value={trip.pickupDate}
              onChange={(e) => onTripChange({ ...trip, pickupDate: e.target.value })}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="b-pickup-time">Jam Ambil</Label>
            <Input
              id="b-pickup-time"
              type="time"
              value={trip.pickupTime}
              onChange={(e) => onTripChange({ ...trip, pickupTime: e.target.value })}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="b-return-date">Tanggal Kembali</Label>
            <Input
              id="b-return-date"
              type="date"
              min={trip.pickupDate}
              value={trip.returnDate}
              onChange={(e) => onTripChange({ ...trip, returnDate: e.target.value })}
            />
          </div>
        </div>

        <dl className="mt-5 space-y-1 border-t border-border pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Durasi</dt>
            <dd className="font-semibold">{days} × 24 jam</dd>
          </div>
          <div className="flex justify-between text-base">
            <dt className="font-semibold">Estimasi Total</dt>
            <dd className="font-extrabold">{formatRupiah(total)}</dd>
          </div>
        </dl>
      </div>

      <Button variant="cta" className="h-11 w-full" onClick={onNext}>
        Lanjut: Isi Data
      </Button>
    </section>
  );
}
