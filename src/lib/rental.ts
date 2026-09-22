export type ServiceType = "lepas_kunci" | "dengan_sopir";
export type CarStatus = "available" | "booked";

export interface Car {
  id: string;
  name: string;
  image_url: string | null;
  seats: number;
  transmission: string;
  fuel_type: string;
  price_per_24h: number;
  service_type: ServiceType;
  status: CarStatus;
}

export interface OrderRow {
  id: string;
  car_name: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  pickup_date: string;
  pickup_time: string;
  return_date: string;
  service_type: ServiceType;
  duration_days: number;
  total_price: number;
  status: string;
  created_at: string;
}

export const SERVICE_LABEL: Record<ServiceType, string> = {
  lepas_kunci: "Lepas Kunci",
  dengan_sopir: "Dengan Sopir",
};

export function formatRupiah(value: number) {
  return "Rp " + Math.round(value).toLocaleString("id-ID");
}

export function formatDateId(value: string) {
  if (!value) return "-";
  const d = new Date(value + "T00:00:00");
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

/** Rental duration in 24-hour blocks (minimum 1). */
export function durationDays(pickupDate: string, returnDate: string) {
  if (!pickupDate || !returnDate) return 1;
  const start = new Date(pickupDate + "T00:00:00").getTime();
  const end = new Date(returnDate + "T00:00:00").getTime();
  if (Number.isNaN(start) || Number.isNaN(end)) return 1;
  const days = Math.round((end - start) / 86_400_000);
  return days < 1 ? 1 : days;
}

export function todayIso() {
  const d = new Date();
  const offset = d.getTimezoneOffset() * 60_000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 10);
}

export function isValidIdPhone(raw: string) {
  const digits = raw.replace(/[\s\-().]/g, "");
  return /^(?:\+?62|0)8\d{8,12}$/.test(digits);
}

export function normalizePhone(raw: string) {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+62")) return "62" + digits.slice(3);
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  return digits;
}

export interface BookingDetails {
  carName: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  serviceType: ServiceType;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
}

export function buildBookingMessage(b: BookingDetails) {
  return [
    "Halo ABC Palangka Raya, saya ingin sewa mobil:",
    "",
    `🚗 Mobil: ${b.carName}`,
    `📅 Tanggal Ambil: ${formatDateId(b.pickupDate)} ${b.pickupTime}`,
    `📅 Tanggal Kembali: ${formatDateId(b.returnDate)}`,
    `🔧 Layanan: ${SERVICE_LABEL[b.serviceType]}`,
    `👤 Nama: ${b.customerName}`,
    `📱 WhatsApp: ${b.customerPhone}`,
    `📍 Alamat: ${b.customerAddress}`,
    "",
    "Saya akan mengirimkan foto KTP dan SIM saya di chat ini untuk keperluan verifikasi armada. Terima kasih.",
  ].join("\n");
}

