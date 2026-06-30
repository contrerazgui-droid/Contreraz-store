import type { StoreContent } from "../lib/types";
import { whatsappLink } from "../lib/api";

export function Footer({ content }: { content: StoreContent }) {
  return (
    <footer style={{ padding: "40px 24px", background: "var(--azul)", color: "#fff", textAlign: "center" }}>
      <p style={{ fontFamily: "var(--font-signature)", fontSize: 28, margin: "0 0 12px" }}>Contreraz</p>
      <a
        href={whatsappLink(content?.whatsappNumber, content?.whatsappDefaultMessage || "Olá, quero conhecer as rivieras da Contreraz.")}
        target="_blank"
        rel="noreferrer"
        style={{ fontSize: 13, color: "#fff", opacity: 0.85, textDecoration: "none" }}
      >
        Falar no WhatsApp
      </a>
      <p style={{ fontSize: 11, opacity: 0.6, margin: "20px 0 0" }}>© {new Date().getFullYear()} Contreraz</p>
    </footer>
  );
}
