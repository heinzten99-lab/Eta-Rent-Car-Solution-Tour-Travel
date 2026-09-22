import { MessageCircle, ShieldCheck, Users, Wallet } from "lucide-react";

const items = [
  { Icon: Users, label: "100+ Pelanggan Puas" },
  { Icon: ShieldCheck, label: "Armada Terawat" },
  { Icon: MessageCircle, label: "Booking via WhatsApp" },
  { Icon: Wallet, label: "Harga Transparan" },
];

export function TrustBadges() {
  return (
    <section aria-label="Keunggulan kami" className="border-b border-border bg-card">
      <ul className="section-x grid grid-cols-2 gap-3 py-5 sm:grid-cols-4">
        {items.map(({ Icon, label }) => (
          <li key={label} className="flex items-center gap-2 text-sm font-medium">
            <Icon className="size-5 shrink-0 text-accent" aria-hidden="true" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
