import heroCar from "@/assets/hero-car.jpg";

export function Hero({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <img
        src={heroCar}
        alt="Mobil sewaan ABC Palangka Raya siap antar"
        width={1600}
        height={1008}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 size-full object-cover opacity-35"
      />
      <div className="relative section-x py-10 sm:py-16 lg:py-20">
        <p className="inline-flex rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
          Palangka Raya · Kalimantan Tengah
        </p>
        <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
          Sewa Mobil Terpercaya di Palangka Raya — Proses Cepat, Harga Transparan, Siap Antar 24
          Jam
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-primary-foreground/85 sm:text-base">
          Respon cepat lewat WhatsApp, sopir berpengalaman dan terverifikasi, armada terawat rutin.
          Lepas kunci maupun dengan sopir — kami antar ke lokasi Anda.
        </p>
        <div className="mt-6 lg:mt-8">{children}</div>
      </div>
    </section>
  );
}
