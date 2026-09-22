const reviews = [
  {
    quote:
      "Kami sewa dua unit Innova untuk kunjungan klien selama seminggu. Unit bersih, sopirnya tepat waktu, dan invoice-nya rapi untuk keperluan reimburse kantor.",
    name: "Rudi Hartono",
    role: "Manajer Operasional, PT Borneo Sejahtera",
  },
  {
    quote:
      "Dipakai untuk agenda dinas ke Kabupaten Katingan. Prosesnya cepat, administrasi jelas, dan sopirnya paham rute serta kondisi jalan di luar kota.",
    name: "Ibu Sari Wulandari",
    role: "Staf Sekretariat Dinas, Palangka Raya",
  },
  {
    quote:
      "Liburan keluarga ke Tangkiling dan Taman Nasional. Mobil dijemput langsung di hotel, harga sesuai yang dijanjikan di WhatsApp. Recommended!",
    name: "Andre & Keluarga",
    role: "Wisatawan dari Surabaya",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-accent" aria-label="Penilaian 5 dari 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
          <path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.2-4.1 5.8-.8z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimoni"
      aria-labelledby="testimoni-title"
      className="border-t border-border bg-secondary/40"
    >
      <div className="section-x py-10 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">Testimoni</p>
        <h2 id="testimoni-title" className="mt-2 text-2xl font-extrabold sm:text-3xl">
          Apa kata pelanggan kami
        </h2>

        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {reviews.map((r) => (
            <li
              key={r.name}
              className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-transform duration-100 hover:-translate-y-0.5"
            >
              <Stars />
              <blockquote className="mt-3 flex-1 text-sm text-muted-foreground">
                “{r.quote}”
              </blockquote>
              <footer className="mt-4 border-t border-border pt-3">
                <p className="text-sm font-bold">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
