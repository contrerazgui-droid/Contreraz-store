import type { StoreContent } from "../lib/types";
import { whatsappLink } from "../lib/api";

export function Footer({ content }: { content: StoreContent }) {
  const waUrl = whatsappLink(content?.whatsappNumber, content?.whatsappDefaultMessage || "Olá, quero conhecer as rivieras da Contreraz.");

  return (
    <footer style={{ padding: "48px 24px 32px", background: "var(--azul)" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <p style={{ fontFamily: "var(--font-signature)", fontSize: 36, color: "#fff", margin: 0, lineHeight: 1 }}>
          Contreraz
        </p>
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#vitrine" style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", textDecoration: "none", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Catálogo</a>
          <a href="#como-comprar" style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", textDecoration: "none", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Como comprar</a>
          <a href="#faq" style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", textDecoration: "none", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Dúvidas</a>
          <a href={waUrl} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", textDecoration: "none", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>WhatsApp</a>
        </div>
        <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.15)" }} />
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", margin: 0, letterSpacing: "0.08em" }}>
          © {new Date().getFullYear()} Contreraz · Todas as peças passam por conferência antes do envio.
        </p>
      </div>
    </footer>
  );
}
