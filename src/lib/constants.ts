/**
 * Business configuration — edit these values in one place.
 */
export const ADMIN_WHATSAPP_NUMBER = "6285828295164";

export const BUSINESS = {
  name: "ABC Palangka Raya",
  tagline: "Rental mobil terpercaya di Palangka Raya & sekitarnya",
  email: "info@abcpalangkaraya.co.id",
  area: "Palangka Raya & Sekitarnya",
  address: "Jl. Yos Sudarso, Palangka Raya, Kalimantan Tengah",
  bank: {
    name: "Bank Mandiri",
    account: "123-00-4567890-1",
    holder: "ABC Palangka Raya",
  },
  dpPercent: 30,
} as const;

export const GENERAL_WA_MESSAGE =
  "Halo ABC Palangka Raya, saya ingin bertanya tentang rental mobil.";

export function waLink(message: string) {
  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
