# Palangka Wheels

# MEGAPROMPT: ABC Palangka Raya — Car Rental Web App (MVP)

## ROLE & CONTEXT

Act as a Senior Full-Stack Web Architect building a conversion-focused MVP for a real car rental business called "ABC Palangka Raya" operating in Palangka Raya, Central Kalimantan, Indonesia. This is not a portfolio/demo site — it's a functional booking tool. Prioritize clean code, real functionality over decoration, and mobile performance above everything else.

## TECH & CODE QUALITY RULES

- Build with React + TypeScript + Tailwind CSS + shadcn/ui components (Lovable default stack).

- Use Supabase for backend: database tables, auth (admin login), and file storage (KTP/SIM upload).

- Mobile-first: design and build every component starting from a 375px viewport, then scale up to tablet/desktop with Tailwind breakpoints (sm/md/lg).

- Keep the component tree shallow and modular — one responsibility per component, no god-components.

- Avoid heavy CSS animations, parallax effects, or large unoptimized images. Use lazy-loading (`loading="lazy"`) for all car images. Compress/optimize image usage assumptions.

- No unnecessary libraries — only add a dependency if it's essential.

- All interactive elements (buttons, form inputs, date pickers) must respond instantly with no visible lag — avoid blocking the main thread with heavy client-side logic.

- Use semantic HTML and accessible form labels throughout.

## COLOR PALETTE & DESIGN SYSTEM

- Primary: Navy Blue (#0B2545 or similar deep navy) — used for headers, nav, footer, primary text accents.

- Base: White / Off-white (#FFFFFF, #F8F9FA) — backgrounds, cards.

- Accent/CTA: Amber/Orange (#F5A623 or similar warm amber) — used ONLY for primary CTA buttons ("Pesan Sekarang", "Booking via WhatsApp", "Submit") to maximize conversion visibility.

- Neutral grays for secondary text and borders.

- Typography: clean sans-serif (e.g. Inter or similar), strong hierarchy — bold large headings on hero, readable 14-16px body text on mobile.

- Overall tone: professional, corporate-trustworthy, but approachable — not stiff, not overly playful.

## PAGE 1 — HOMEPAGE (Hero Section)

- Sticky top navbar (logo "ABC Palangka Raya", nav links: Beranda, Armada, Cara Sewa, Kontak, and a prominent CTA button "Pesan Sekarang" in amber).

- Hero section with a strong headline communicating the local USP, e.g. "Sewa Mobil Terpercaya di Palangka Raya — Proses Cepat, Harga Transparan, Siap Antar 24 Jam". Include a short trust-building subheadline (e.g. mentioning fast response, verified drivers, well-maintained fleet).

- Below the headline, embed a Quick Search Form (card style, floating over hero image or directly below hero on mobile) with these fields:

  1. Tanggal Ambil (date picker)

  2. Jam Ambil (time picker)

  3. Tanggal Kembali (date picker)

  4. Tipe Layanan (toggle/select: "Lepas Kunci" / "Dengan Sopir")

  - Submit button "Cari Mobil" (amber CTA) that scrolls to / filters the Fleet Catalog section with the selected criteria pre-applied.

- Add a short trust-badges row below hero (e.g. "100+ Pelanggan Puas", "Armada Terawat", "Booking via WhatsApp", "Harga Transparan Tanpa Biaya Tersembunyi") using simple icon + text, no heavy graphics.

## PAGE 1 (continued) — FLEET CATALOG SECTION

- Responsive grid (1 column mobile, 2 columns tablet, 3-4 columns desktop) of Car Cards.

- Each Car Card must show:

  - Car photo (placeholder image, lazy-loaded, fixed aspect ratio to avoid layout shift)

  - Car name/model (e.g. "Toyota Avanza")

  - Key specs row with small icons: Kursi (seats), Transmisi (Manual/Matic), Bahan Bakar (Bensin/Diesel)

  - Price per 24 hours, formatted in Rupiah, clearly bold (e.g. "Rp 350.000 / 24 Jam")

  - Availability badge (green "Tersedia" / red "Dipesan")

  - CTA button "Pesan Sekarang" (amber, full-width on mobile) that starts the Booking Funnel for that specific car

- Include a simple filter bar above the grid: filter by Tipe Layanan (Lepas Kunci / Dengan Sopir) and Transmisi (Manual/Matic). Keep filtering client-side and instant — no page reload.

- Pull fleet data from a Supabase table `cars` with fields: id, name, image_url, seats, transmission, fuel_type, price_per_24h, service_type (lepas_kunci/dengan_sopir), status (available/booked).

## PAGE 2 — BOOKING FUNNEL (Single-Page 3-Step Checkout)

Build this as ONE page with a visible step indicator (Step 1 / 2 / 3) at the top, using conditional rendering (no full page reloads between steps) so it feels instant.

**Step 1 — Pilih Mobil:**

- Show the selected car summary (photo, name, price, service type) carried over from the catalog. Allow changing car via a "Ganti Mobil" link back to catalog.

- Show trip details: pickup date/time, return date/time (editable here if user skipped the homepage search).

- Auto-calculate total rental duration and estimated price based on price_per_24h × duration.

**Step 2 — Isi Data & Upload Dokumen:**

- Form fields: Nama Lengkap, Nomor WhatsApp Aktif, Alamat Penjemputan/Alamat Domisili.

- Upload fields: Upload Foto KTP, Upload Foto SIM (file input, accept image/* and pdf, store in Supabase Storage bucket `documents`).

- Basic client-side validation: required fields, valid Indonesian phone number format, file size limit (max 5MB per upload) with clear error messages.

**Step 3 — Ringkasan & Konfirmasi Pembayaran:**

- Show full order summary: car, dates, duration, service type, customer data, total price.

- Payment info section: display bank transfer / DP instructions as static info block (assume manual payment confirmation via admin, no payment gateway needed for MVP).

- Two final action buttons:

  1. Primary CTA (amber, large): "Konfirmasi & Kirim via WhatsApp" — this is the most important button on the whole site.

  2. Secondary: "Simpan Order" — saves the order to Supabase table `orders` with status `pending_confirmation` regardless of whether WhatsApp is used.

## WHATSAPP QUICK-BOOK INTEGRATION (Critical Feature)

- On clicking "Konfirmasi & Kirim via WhatsApp", generate a pre-filled WhatsApp deep link using `https://wa.me/[ADMIN_PHONE_NUMBER]?text=[URL_ENCODED_MESSAGE]`.

- Use a placeholder admin number variable `ADMIN_WHATSAPP_NUMBER` (e.g. "6281234567890") that's easy to find and edit in one config file/constant.

- Auto-generate the message text dynamically from form data, formatted like:

  "Halo ABC Palangka Raya, saya ingin sewa mobil:

  🚗 Mobil: [car_name]

  📅 Tanggal Ambil: [pickup_date] [pickup_time]

  📅 Tanggal Kembali: [return_date]

  🔧 Layanan: [service_type]

  👤 Nama: [customer_name]

  📱 WhatsApp: [customer_phone]

  Mohon konfirmasi ketersediaan. Terima kasih."

- Open this link in a new tab on click, and simultaneously save the order to the database before redirecting.

- Also place a smaller floating WhatsApp quick-contact button (bottom-right, fixed position, simple icon, non-intrusive, no heavy animation) visible site-wide for general inquiries, using a generic greeting message.

## PAGE 3 — SIMPLE ADMIN DASHBOARD

- Protect this route with basic Supabase email/password auth (single admin role, no need for complex role management in MVP).

- Login page: simple email + password form.

- Dashboard main view:

  - Table/list of all cars from `cars` table with an inline toggle/select to change status between "Available" and "Booked" — updates instantly (optimistic UI, no page reload).

  - Table of all orders from `orders` table showing: customer name, phone, car booked, dates, status, created_at — sortable by date, newest first.

  - Simple status badge styling consistent with the main site's color system (green = available/confirmed, amber = pending, red = booked/cancelled).

- Keep this dashboard minimal and functional — no analytics charts or complex reporting needed for MVP. This is an internal operations tool, not customer-facing, so styling can be simpler/denser than the public site.

## FOOTER (Site-wide)

- Navy background, white text.

- Business name, short tagline, contact info (WhatsApp number, email placeholder, service area "Palangka Raya & Sekitarnya"), simple social links (placeholder icons), copyright line.

## PERFORMANCE CHECKLIST (Apply Throughout)

- No render-blocking heavy assets on initial load.

- Defer/lazy-load below-the-fold images and sections.

- Keep bundle size minimal — avoid importing full icon libraries; import only icons used (e.g. lucide-react tree-shaken imports).

- Forms must give instant inline validation feedback, not on-submit-only.

- Target: Largest Contentful Paint under 2 seconds on a standard 4G mobile connection.

## FINAL INSTRUCTION

Build this as a working, connected application — not static mockups. All forms must actually write to and read from the Supabase database. The WhatsApp integration must produce a real, functional deep link with correctly encoded dynamic text. Prioritize the mobile experience in every single design decision, since the vast majority of real users will be on smartphones with average network conditions in Palangka Raya.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a652467c-6cb4-414e-9650-53b14e921128).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
