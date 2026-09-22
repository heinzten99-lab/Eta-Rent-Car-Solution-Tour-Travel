import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/constants";

const title = "Cara Sewa Mobil di ABC Palangka Raya — 4 Langkah Mudah";
const description =
  "Panduan sewa mobil di Palangka Raya: pilih armada, isi data, konfirmasi via WhatsApp. Syarat lengkap dan transparan.";

export const Route = createFileRoute("/cara-sewa")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: CaraSewa,
});

const steps = [
  {
    title: "Pilih mobil & tanggal",
    body: "Tentukan tanggal ambil, jam ambil, tanggal kembali, dan tipe layanan (lepas kunci atau dengan sopir).",
  },
  {
    title: "Isi data & upload dokumen",
    body: "Lengkapi nama, nomor WhatsApp aktif, dan alamat penjemputan. Foto KTP & SIM cukup dikirim via WhatsApp saat verifikasi.",
  },
  {
    title: "Konfirmasi & pembayaran DP",
    body: `Kirim ringkasan pesanan via WhatsApp. Transfer DP ${BUSINESS.dpPercent}% ke rekening resmi kami untuk mengunci unit.`,
  },
  {
    title: "Mobil diantar",
    body: "Unit kami antar ke lokasi Anda di Palangka Raya dan sekitarnya sesuai jam yang dipilih.",
  },
];

const terms = [
  "KTP & SIM A aktif (untuk lepas kunci).",
  "Deposit atau jaminan sesuai kesepakatan untuk unit lepas kunci.",
  "Bahan bakar mengikuti prinsip isi sama dengan saat serah terima.",
  "Keterlambatan lebih dari 3 jam dihitung sewa tambahan proporsional.",
  "Wilayah pemakaian dalam Kalimantan Tengah, luar wilayah wajib konfirmasi.",
];

function CaraSewa() {
  return (
    <SiteShell>
      <div className="section-x py-10 sm:py-14">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Cara Sewa</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Prosesnya sederhana dan bisa selesai dalam beberapa menit dari ponsel Anda.
        </p>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                {i + 1}
              </span>
              <h2 className="mt-3 font-bold">{s.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>

        <h2 className="mt-12 text-2xl font-extrabold">Syarat & Ketentuan</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {terms.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <Button asChild variant="cta" className="mt-8 h-11 w-full sm:w-auto">
          <Link to="/" hash="armada">
            Lihat Armada & Pesan
          </Link>
        </Button>
      </div>
    </SiteShell>
  );
}
