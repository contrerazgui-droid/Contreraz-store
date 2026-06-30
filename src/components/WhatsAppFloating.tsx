import type { StoreContent } from "../lib/types";
import { whatsappLink } from "../lib/api";

export function WhatsAppFloating({ content }: { content: StoreContent }) {
  return (
    <a
      href={whatsappLink(content?.whatsappNumber, content?.whatsappDefaultMessage || "Olá, quero conhecer as rivieras da Contreraz.")}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-floating"
      style={{
        position: "fixed", bottom: 20, right: 20, zIndex: 60,
        display: "none",
        background: "#25D366", color: "#fff", borderRadius: 999,
        padding: "14px 20px", fontSize: 14, fontWeight: 600, textDecoration: "none",
        boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
      }}
    >
      Falar no WhatsApp
    </a>
  );
}
