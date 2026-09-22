import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { StepData, type CustomerData } from "@/components/booking/StepData";
import { StepIndicator } from "@/components/booking/StepIndicator";
import { StepSummary } from "@/components/booking/StepSummary";
import { StepTrip } from "@/components/booking/StepTrip";
import { SiteShell } from "@/components/site/SiteShell";
import { useCars } from "@/hooks/useFleet";
import { supabase } from "@/integrations/supabase/client";
import { buildBookingMessage, durationDays, normalizePhone, todayIso } from "@/lib/rental";
import type { ServiceType } from "@/lib/rental";
import { waLink } from "@/lib/constants";

const title = "Pesan Mobil — ABC Palangka Raya";
const description =
  "Selesaikan pemesanan sewa mobil di Palangka Raya dalam 3 langkah: pilih mobil, isi data, konfirmasi via WhatsApp.";

interface BookingSearch {
  carId: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  service: ServiceType;
}

export const Route = createFileRoute("/booking")({
  validateSearch: (search: Record<string, unknown>): BookingSearch => {
    const str = (key: string) => (typeof search[key] === "string" ? (search[key] as string) : "");
    const service = search["service"];
    return {
      carId: str("carId"),
      pickupDate: str("pickupDate"),
      pickupTime: str("pickupTime"),
      returnDate: str("returnDate"),
      service: service === "dengan_sopir" ? "dengan_sopir" : "lepas_kunci",
    };
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BookingPage,
});

function tomorrowIso() {
  const d = new Date(Date.now() + 86_400_000);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

function BookingPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { data: cars, isPending } = useCars();

  const [step, setStep] = useState(1);
  const [trip, setTrip] = useState({
    pickupDate: search.pickupDate || todayIso(),
    pickupTime: search.pickupTime || "09:00",
    returnDate: search.returnDate || tomorrowIso(),
  });
  const [customer, setCustomer] = useState<CustomerData>({
    name: "",
    phone: "",
    address: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const car = cars?.find((c) => c.id === search.carId);
  const days = useMemo(() => durationDays(trip.pickupDate, trip.returnDate), [trip]);
  const total = (car?.price_per_24h ?? 0) * days;

  async function saveOrder() {
    if (!car) throw new Error("Mobil belum dipilih");
    const { error } = await supabase.from("orders").insert({
      car_id: car.id,
      car_name: car.name,
      customer_name: customer.name.trim(),
      customer_phone: normalizePhone(customer.phone),
      customer_address: customer.address.trim(),
      pickup_date: trip.pickupDate,
      pickup_time: trip.pickupTime,
      return_date: trip.returnDate,
      service_type: car.service_type,
      duration_days: days,
      total_price: total,
      status: "pending_confirmation",
    });
    if (error) throw error;
  }

  async function handleSave(openWhatsApp: boolean) {
    if (!car || saving) return;
    setSaving(true);
    try {
      if (!saved) await saveOrder();
      setSaved(true);
      toast.success("Pesanan tersimpan. Tim kami akan mengonfirmasi.");
      if (openWhatsApp) {
        const message = buildBookingMessage({
          carName: car.name,
          pickupDate: trip.pickupDate,
          pickupTime: trip.pickupTime,
          returnDate: trip.returnDate,
          serviceType: car.service_type,
          customerName: customer.name.trim(),
          customerPhone: customer.phone.trim(),
          customerAddress: customer.address.trim(),
        });
        window.open(waLink(message), "_blank", "noopener,noreferrer");
      }

    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menyimpan pesanan");
    } finally {
      setSaving(false);
    }
  }

  return (
    <SiteShell>
      <div className="section-x max-w-3xl py-8 sm:py-12">
        <h1 className="text-2xl font-extrabold sm:text-3xl">Pemesanan</h1>
        <div className="mt-5">
          <StepIndicator current={step} />
        </div>

        {isPending ? (
          <div className="mt-8 h-64 animate-pulse rounded-xl bg-secondary" />
        ) : !car ? (
          <div className="mt-8 rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Mobil belum dipilih atau tidak ditemukan.
            </p>
            <Link
              to="/"
              hash="armada"
              className="mt-4 inline-flex text-sm font-semibold text-primary underline"
            >
              Pilih mobil dari armada
            </Link>
          </div>
        ) : (
          <div className="mt-8">
            {step === 1 && (
              <StepTrip
                car={car}
                trip={trip}
                onTripChange={setTrip}
                days={days}
                total={total}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <StepData
                value={customer}
                onChange={setCustomer}
                onBack={() => setStep(1)}
                onNext={() => setStep(3)}
              />
            )}
            {step === 3 && (
              <StepSummary
                car={car}
                trip={trip}
                customer={customer}
                days={days}
                total={total}
                saving={saving}
                saved={saved}
                onBack={() => setStep(2)}
                onSave={() => handleSave(false)}
                onWhatsApp={() => handleSave(true)}
              />
            )}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Ingin mengubah pilihan?{" "}
          <button
            type="button"
            onClick={() => navigate({ to: "/", hash: "armada" })}
            className="font-semibold text-primary underline"
          >
            Ganti Mobil
          </button>
        </p>
      </div>
    </SiteShell>
  );
}
