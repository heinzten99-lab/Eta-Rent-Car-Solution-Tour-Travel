import { Link } from "@tanstack/react-router";
import { Cog, Fuel, Users } from "lucide-react";

import carPlaceholder from "@/assets/car-placeholder.jpg";
import { Button } from "@/components/ui/button";
import { formatRupiah, SERVICE_LABEL, type Car } from "@/lib/rental";
import type { SearchCriteria } from "./QuickSearch";

export function CarCard({ car, criteria }: { car: Car; criteria: SearchCriteria }) {
  const available = car.status === "available";

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="relative aspect-[4/3] bg-secondary">
        <img
          src={car.image_url || carPlaceholder}
          alt={car.name}
          loading="lazy"
          decoding="async"
          width={1024}
          height={768}
          className="size-full object-cover"
        />
        <span
          className={`absolute left-3 top-3 rounded-md px-2 py-0.5 text-xs font-semibold ${
            available
              ? "bg-success text-success-foreground"
              : "bg-destructive text-destructive-foreground"
          }`}
        >
          {available ? "Tersedia" : "Dipesan"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-base font-bold">{car.name}</h3>
          <p className="text-xs text-muted-foreground">{SERVICE_LABEL[car.service_type]}</p>
        </div>

        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <Users className="size-4" aria-hidden="true" /> {car.seats} Kursi
          </li>
          <li className="flex items-center gap-1.5">
            <Cog className="size-4" aria-hidden="true" /> {car.transmission}
          </li>
          <li className="flex items-center gap-1.5">
            <Fuel className="size-4" aria-hidden="true" /> {car.fuel_type}
          </li>
        </ul>

        <p className="mt-auto text-lg font-extrabold">
          {formatRupiah(car.price_per_24h)}
          <span className="text-xs font-medium text-muted-foreground"> / 24 Jam</span>
        </p>

        {available ? (
          <Button asChild variant="cta" className="h-10 w-full">
            <Link
              to="/booking"
              search={{
                carId: car.id,
                pickupDate: criteria.pickupDate,
                pickupTime: criteria.pickupTime,
                returnDate: criteria.returnDate,
                service: criteria.serviceType,
              }}
            >
              Pesan Sekarang
            </Link>
          </Button>
        ) : (
          <Button disabled className="h-10 w-full" variant="secondary">
            Sedang Dipesan
          </Button>
        )}
      </div>
    </article>
  );
}
