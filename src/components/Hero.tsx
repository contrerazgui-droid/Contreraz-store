import type { StoreContent } from "../lib/types";
import { whatsappLink } from "../lib/api";

export function Hero({ content }: { content: StoreContent }) {
  const headline = content?.heroHeadline || "Joias de presença para quem não precisa gritar.";
  const sub = content?.heroSubheadline || "";
  const ctaPrimary = content?.heroCtaPrimary || "Conhecer rivieras";
  const ctaSecondary = content?.heroCtaSecondary || "Falar no WhatsApp";

  return (
    <section
      id="topo"
      style={{
        padding: "96px 24px 80px",
        textAlign: "center",
        background: `linear-gradient(180deg, var(--bg) 0%, #efe8db 100%)`,
      }}
    >
      <div className="container" style={{ maxWidth: 720 }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(32px, 5vw, 52px)",
            lineHeight: 1.15,
            color: "var(--azul)",
            margin: "0 0 20px",
          }}
        >
          {headline}
        </h1>
        {sub && (
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "#5a5a5a", maxWidth: 540, margin: "0 auto 36px" }}>
            {sub}
          </p>
        )}
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#vitrine"
            style={{
              display: "inline-block",
              padding: "14px 28px",
              borderRadius: 999,
              background: "var(--terracota)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
              letterSpacing: 0.3,
            }}
          >
            {ctaPrimary}
          </a>
          <a
            href={whatsappLink(content?.whatsappNumber, content?.whatsappDefaultMessage || "Olá, quero conhecer as rivieras da Contreraz.")}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              padding: "14px 28px",
              borderRadius: 999,
              border: "1px solid var(--azul)",
              color: "var(--azul)",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
              letterSpacing: 0.3,
            }}
          >
            {ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
