import { WhatsappIcon } from "@/components/shared/social-icons";
import { getSettings } from "@/server/data";

/** Botão flutuante de WhatsApp, presente em todas as páginas. */
export async function WhatsappFab() {
  const s = await getSettings();
  const href = s["contact.whatsapp"] || "https://wa.me/5517991369593";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-premium transition-transform hover:scale-110"
    >
      <WhatsappIcon className="size-8" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
    </a>
  );
}
