import type { StoreContent } from "../lib/types";
import { whatsappLink } from "../lib/api";

export function CtaFinal({ content }: { content: StoreContent }) {
  const waUrl = whatsappLink(content?.whatsappNumber, content?.whatsappDefaultMessage || "Olá! Quero conhecer as rivieras da Contreraz e saber mais sobre disponibilidade.");

  return (
    <section style={{
      padding: "96px 24px",
      background: "var(--azul-deep, #1e2d42)",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* decoração */}
      <div style={{
        position: "absolute", bottom: -20, right: "5%",
        fontFamily: "var(--font-signature)", fontSize: 160,
        color: "rgba(255,255,255,0.03)", pointerEvents: "none",
        lineHeight: 1, userSelect: "none",
      }}>
        Contreraz
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: 600 }}>
        <span className="eyebrow eyebrow-light" style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}>
          Primeira curadoria · Unidades limitadas
        </span>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(28px, 4.5vw, 46px)",
          color: "#fff",
          margin: "0 0 20px",
          lineHeight: 1.15,
        }}>
          Sua primeira peça de presença começa aqui.
        </h2>
        <p style={{
          fontSize: 15,
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.7,
          margin: "0 0 40px",
        }}>
          Escolha sua riviera e fale direto com a Contreraz para confirmar disponibilidade.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#vitrine" className="btn-primary">Ver catálogo</a>
          <a href={waUrl} target="_blank" rel="noreferrer" className="btn-outline-light">
            Reservar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
