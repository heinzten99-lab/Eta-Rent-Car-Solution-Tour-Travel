import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";

import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { ADMIN_WHATSAPP_NUMBER, BUSINESS, GENERAL_WA_MESSAGE, waLink } from "@/lib/constants";

const title = "Kontak ABC Palangka Raya — Rental Mobil Palangka Raya";
const description =
  "Hubungi ABC Palangka Raya via WhatsApp untuk sewa mobil di Palangka Raya & sekitarnya. Respon cepat, layanan antar 24 jam.";

export const Route = createFileRoute("/kontak")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Kontak,
});

function Kontak() {
  return (
    <SiteShell>
      <div className="section-x py-10 sm:py-14">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Kontak</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Cara tercepat adalah WhatsApp — tim kami membalas setiap hari.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <h2 className="font-bold">Hubungi kami</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>WhatsApp: +{ADMIN_WHATSAPP_NUMBER}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{BUSINESS.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>Layanan antar & jemput 24 jam</span>
              </li>
            </ul>
            <Button asChild variant="cta" className="mt-5 h-11 w-full">
              <a href={waLink(GENERAL_WA_MESSAGE)} target="_blank" rel="noopener noreferrer">
                Chat via WhatsApp
              </a>
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <h2 className="font-bold">Area layanan</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {BUSINESS.area}. Termasuk antar/jemput Bandara Tjilik Riwut, terminal, hotel, dan
              kantor di dalam kota. Perjalanan luar kota dalam Kalimantan Tengah tersedia dengan
              sopir.
            </p>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
