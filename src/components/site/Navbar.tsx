import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const links = [
  { label: "Beranda", to: "/" },
  { label: "Armada", to: "/", hash: "armada" },
  { label: "Cara Sewa", to: "/cara-sewa" },
  { label: "Kontak", to: "/kontak" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur">
      <nav aria-label="Navigasi utama" className="section-x flex h-16 items-center gap-3">
        <Link to="/" className="mr-auto flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            ABC
          </span>
          <span className="text-sm font-bold leading-tight sm:text-base">
            ABC <span className="text-muted-foreground font-medium">Palangka Raya</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                {...("hash" in l ? { hash: l.hash } : {})}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Button asChild variant="cta" size="sm" className="hidden md:inline-flex">
          <Link to="/" hash="armada">
            Pesan Sekarang
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      {open && (
        <div className="animate-in fade-in slide-in-from-top-1 border-t border-border bg-background duration-150 md:hidden">
          <ul className="section-x flex flex-col py-2">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  {...("hash" in l ? { hash: l.hash } : {})}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 text-sm font-medium"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="py-2">
              <Button asChild variant="cta" className="w-full">
                <Link to="/" hash="armada" onClick={() => setOpen(false)}>
                  Pesan Sekarang
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
