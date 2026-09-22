// TEMPORARY DEMO AUTH — replace with proper authentication
// (e.g. Supabase email/password or magic link) before production/client handover.
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCars, useOrders, useUpdateCarStatus } from "@/hooks/useFleet";
import { formatDateId, formatRupiah, SERVICE_LABEL, type CarStatus } from "@/lib/rental";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Dashboard Admin — ABC Palangka Raya" },
      { name: "description", content: "Panel internal armada dan pesanan ABC Palangka Raya." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function StatusBadge({ tone, children }: { tone: "success" | "warning" | "danger"; children: string }) {
  const cls =
    tone === "success"
      ? "bg-success text-success-foreground"
      : tone === "warning"
        ? "bg-warning text-warning-foreground"
        : "bg-destructive text-destructive-foreground";
  return <span className={`rounded px-2 py-0.5 text-xs font-semibold ${cls}`}>{children}</span>;
}

function orderTone(status: string): "success" | "warning" | "danger" {
  if (status === "confirmed") return "success";
  if (status === "cancelled") return "danger";
  return "warning";
}

// DEMO ONLY — change this PIN before real deployment
const ADMIN_PIN = "1234";
const PIN_SESSION_KEY = "abc-admin-pin-ok";

function AdminPage() {
  const [unlocked, setUnlocked] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem(PIN_SESSION_KEY) === "1",
  );
  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />;
  return <AdminDashboard onLock={() => {
    sessionStorage.removeItem(PIN_SESSION_KEY);
    setUnlocked(false);
  }} />;
}

function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  return (
    <main className="flex min-h-screen items-center justify-center bg-primary px-4 py-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (pin === ADMIN_PIN) {
            sessionStorage.setItem(PIN_SESSION_KEY, "1");
            onUnlock();
            return;
          }
          setError("PIN salah, coba lagi.");
          setPin("");
        }}
        className="w-full max-w-xs rounded-xl border border-border bg-card p-6 text-center shadow-[var(--shadow-float)]"
      >
        <h1 className="text-xl font-extrabold">Akses Admin</h1>
        <p className="mt-1 text-sm text-muted-foreground">Masukkan PIN 4 digit.</p>

        <label className="sr-only" htmlFor="admin-pin">
          PIN Admin
        </label>
        <input
          id="admin-pin"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={4}
          value={pin}
          autoFocus
          aria-invalid={Boolean(error)}
          onChange={(e) => {
            setError("");
            setPin(e.target.value.replace(/\D/g, "").slice(0, 4));
          }}
          className="mt-6 w-full rounded-lg border border-input bg-background py-4 text-center text-3xl font-extrabold tracking-[0.6em] outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="••••"
        />
        {error && <p className="mt-2 text-xs text-destructive">{error}</p>}

        <Button
          type="submit"
          variant="cta"
          className="mt-5 h-11 w-full"
          disabled={pin.length !== 4}
        >
          Masuk
        </Button>
      </form>
    </main>
  );
}

function AdminDashboard({ onLock }: { onLock: () => void }) {
  const { data: cars, isPending: carsPending } = useCars();
  const { data: orders, isPending: ordersPending } = useOrders();
  const updateStatus = useUpdateCarStatus();
  const [tab, setTab] = useState<"cars" | "orders">("cars");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="section-x flex h-14 items-center gap-3">
          <h1 className="mr-auto text-sm font-bold">Admin · ABC Palangka Raya</h1>
          <Button variant="secondary" size="sm" onClick={onLock}>
            Keluar
          </Button>
        </div>
      </header>

      <div className="section-x py-6">
        <div className="flex gap-2" role="tablist">
          {(["cars", "orders"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                tab === t ? "bg-primary text-primary-foreground" : "bg-secondary"
              }`}
            >
              {t === "cars" ? `Armada (${cars?.length ?? 0})` : `Pesanan (${orders?.length ?? 0})`}
            </button>
          ))}
        </div>

        {tab === "cars" && (
          <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <caption className="sr-only">Daftar armada dan status ketersediaan</caption>
              <thead className="bg-secondary text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="p-2">Mobil</th>
                  <th className="p-2">Layanan</th>
                  <th className="p-2">Transmisi</th>
                  <th className="p-2">Harga / 24 Jam</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Ubah</th>
                </tr>
              </thead>
              <tbody>
                {carsPending && (
                  <tr>
                    <td className="p-3 text-muted-foreground" colSpan={6}>
                      Memuat...
                    </td>
                  </tr>
                )}
                {cars?.map((car) => (
                  <tr key={car.id} className="border-t border-border">
                    <td className="p-2 font-medium">{car.name}</td>
                    <td className="p-2">{SERVICE_LABEL[car.service_type]}</td>
                    <td className="p-2">{car.transmission}</td>
                    <td className="p-2">{formatRupiah(car.price_per_24h)}</td>
                    <td className="p-2">
                      <StatusBadge tone={car.status === "available" ? "success" : "danger"}>
                        {car.status === "available" ? "Tersedia" : "Dipesan"}
                      </StatusBadge>
                    </td>
                    <td className="p-2">
                      <label className="sr-only" htmlFor={`status-${car.id}`}>
                        Status {car.name}
                      </label>
                      <select
                        id={`status-${car.id}`}
                        className="rounded-md border border-input bg-background px-2 py-1 text-xs"
                        value={car.status}
                        onChange={(e) =>
                          updateStatus.mutate(
                            { id: car.id, status: e.target.value as CarStatus },
                            { onError: (err) => toast.error(err.message) },
                          )
                        }
                      >
                        <option value="available">Available</option>
                        <option value="booked">Booked</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "orders" && (
          <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <caption className="sr-only">Daftar pesanan terbaru</caption>
              <thead className="bg-secondary text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="p-2">Tanggal</th>
                  <th className="p-2">Pelanggan</th>
                  <th className="p-2">WhatsApp</th>
                  <th className="p-2">Mobil</th>
                  <th className="p-2">Periode</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {ordersPending && (
                  <tr>
                    <td className="p-3 text-muted-foreground" colSpan={7}>
                      Memuat...
                    </td>
                  </tr>
                )}
                {orders?.length === 0 && !ordersPending && (
                  <tr>
                    <td className="p-3 text-muted-foreground" colSpan={7}>
                      Belum ada pesanan.
                    </td>
                  </tr>
                )}
                {orders?.map((o) => (
                  <tr key={o.id} className="border-t border-border">
                    <td className="p-2 whitespace-nowrap">
                      {new Date(o.created_at).toLocaleString("id-ID")}
                    </td>
                    <td className="p-2 font-medium">{o.customer_name}</td>
                    <td className="p-2">
                      <a
                        className="underline"
                        href={`https://wa.me/${o.customer_phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {o.customer_phone}
                      </a>
                    </td>
                    <td className="p-2">{o.car_name}</td>
                    <td className="p-2 whitespace-nowrap">
                      {formatDateId(o.pickup_date)} {o.pickup_time} → {formatDateId(o.return_date)}
                    </td>
                    <td className="p-2">{formatRupiah(o.total_price)}</td>
                    <td className="p-2">
                      <StatusBadge tone={orderTone(o.status)}>{o.status}</StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
