const benefits = [
  {
    title: "Kondisi Armada Prima",
    text: "Servis dan pengecekan rutin sebelum setiap penyewaan — interior bersih, mesin siap jalan jauh.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M3 13.5 4.9 8a2 2 0 0 1 1.9-1.3h10.4A2 2 0 0 1 19.1 8L21 13.5V18a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-.8H6.5V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4.5Z" strokeLinejoin="round" />
        <path d="M3.4 13.6h17.2M7 16h2m6 0h2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Sopir Lokal Berpengalaman",
    text: "Hafal rute Palangka Raya dan sekitarnya, ramah, berpakaian rapi, dan terverifikasi identitasnya.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <circle cx="12" cy="8" r="3.4" />
        <path d="M4.5 20c0-3.6 3.4-5.6 7.5-5.6s7.5 2 7.5 5.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Dukungan 24/7",
    text: "Admin siap merespons lewat WhatsApp kapan saja, termasuk antar-jemput unit di luar jam kerja.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <circle cx="12" cy="12" r="8.6" />
        <path d="M12 7.4V12l3.2 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function AboutSection() {
  return (
    <section id="tentang" aria-labelledby="tentang-title" className="section-x py-10 sm:py-14">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">Tentang Kami</p>
        <h2 id="tentang-title" className="mt-2 text-2xl font-extrabold sm:text-3xl">
          Rental mobil lokal yang dipercaya warga Palangka Raya
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          ABC Palangka Raya adalah penyedia sewa mobil lokal dengan armada terawat dan sopir
          profesional. Kami melayani kebutuhan harian, perjalanan dinas, hingga wisata keluarga
          dengan harga transparan tanpa biaya tersembunyi — cukup satu pesan WhatsApp, unit kami
          antar ke lokasi Anda.
        </p>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {benefits.map((b) => (
          <li
            key={b.title}
            className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-transform duration-100 hover:-translate-y-0.5"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-accent/15 text-accent [&_svg]:size-5">
              {b.icon}
            </span>
            <h3 className="mt-3 font-bold">{b.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{b.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
