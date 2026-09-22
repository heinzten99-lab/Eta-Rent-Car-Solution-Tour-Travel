import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AboutSection } from "@/components/home/AboutSection";
import { FleetSection } from "@/components/home/FleetSection";
import { Hero } from "@/components/home/Hero";
import { QuickSearch, type SearchCriteria } from "@/components/home/QuickSearch";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustBadges } from "@/components/home/TrustBadges";
import { SiteShell } from "@/components/site/SiteShell";
import { todayIso, type ServiceType } from "@/lib/rental";

const title = "Sewa Mobil Palangka Raya — ABC Palangka Raya | Lepas Kunci & Dengan Sopir";
const description =
  "Rental mobil Palangka Raya harga transparan mulai Rp 300.000/24 jam. Lepas kunci atau dengan sopir, siap antar 24 jam, booking cepat via WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function tomorrowIso() {
  const d = new Date(Date.now() + 86_400_000);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

function Index() {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    pickupDate: todayIso(),
    pickupTime: "09:00",
    returnDate: tomorrowIso(),
    serviceType: "lepas_kunci",
  });
  const [serviceFilter, setServiceFilter] = useState<ServiceType | "all">("all");

  return (
    <SiteShell>
      <Hero>
        <QuickSearch
          value={criteria}
          onChange={setCriteria}
          onSubmit={() => {
            setServiceFilter(criteria.serviceType);
            document.getElementById("armada")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </Hero>
      <TrustBadges />
      <AboutSection />
      <FleetSection
        criteria={criteria}
        serviceFilter={serviceFilter}
        onServiceFilterChange={setServiceFilter}
      />
      <Testimonials />
    </SiteShell>
  );
}
