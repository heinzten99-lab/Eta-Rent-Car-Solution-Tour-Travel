import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

import { ADMIN_WHATSAPP_NUMBER, BUSINESS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div className="section-x grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-lg font-bold">{BUSINESS.name}</p>
          <p className="mt-2 max-w-xs text-sm text-primary-foreground/75">{BUSINESS.tagline}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide">Kontak</h2>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              <a href={`https://wa.me/${ADMIN_WHATSAPP_NUMBER}`}>+{ADMIN_WHATSAPP_NUMBER}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              <span>{BUSINESS.area}</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide">Tautan</h2>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link to="/cara-sewa">Cara Sewa</Link>
            </li>
            <li>
              <Link to="/kontak">Kontak</Link>
            </li>
            <li>
              <Link to="/auth">Login Admin</Link>
            </li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Instagram">
              <Instagram className="size-5" />
            </a>
            <a href="#" aria-label="Facebook">
              <Facebook className="size-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-4">
        <p className="section-x text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} {BUSINESS.name}. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  );
}
