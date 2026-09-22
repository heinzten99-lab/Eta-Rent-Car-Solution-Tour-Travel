import { MessageCircle } from "lucide-react";

import { GENERAL_WA_MESSAGE, waLink } from "@/lib/constants";

export function WhatsAppFab() {
  return (
    <a
      href={waLink(GENERAL_WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi kami via WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex size-13 items-center justify-center rounded-full bg-success text-success-foreground shadow-[var(--shadow-float)] transition-colors hover:bg-success/90"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}
