import type { StoreContent } from "../lib/types";
import { whatsappLink } from "../lib/api";

export function Hero({ content }: { content: StoreContent }) {
  const headline = content?.heroHeadline || "Joias de presença para quem não precisa gritar.";
  const sub = content?.heroSubheadline || "Rivieras unissex em curadoria limitada, feitas para elevar o básico sem exagero.";
  const ctaPrimary = content?.heroCtaPrimary || "Conhecer rivieras";
  const ctaSecondary = content?.heroCtaSecondary || "Falar no WhatsApp";
  const heroImage = content?.ogImageUrl;

  const bgStyle = heroImage
    ? { backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: "linear-gradient(135deg, #1e2d42 0%, #2c4264 50%, #1a2535 100%)" };

  return (
    <section id="topo" style={{ position: "relative", minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", ...bgStyle }}>
      {/* overlay */}
      <div style={{ position: "absolute", inset: 0, background: heroImage ? "rgba(10,10,18,0.72)" : "rgba(10,10,18,0.45)" }} />

      {/* decorative signature mark */}
      <div style={{
        position: "absolute", top: 60, right: "8%",
        fontFamily: "var(--font-signature)", fontSize: 96, color: "rgba(255,255,255,0.05)",
        pointerEvents: "none", userSelect: "none", lineHeight: 1,
      }}>
        Contreraz
      </div>

      {/* content */}
      <div className="container" style={{ position: "relative", zIndex: 1, paddingBottom: 80, paddingTop: 120 }}>
        <div style={{ maxWidth: 680 }}>
          <span className="eyebrow eyebrow-light" style={{ marginBottom: 24, display: "flex" }}>
            Rivieras · Contreraz
          </span>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(36px, 5.5vw, 62px)",
            lineHeight: 1.1,
            color: "#fff",
            margin: "0 0 20px",
            letterSpacing: "-0.01em",
          }}>
            {headline}
          </h1>

          <p style={{
            fontSize: "clamp(15px, 2vw, 17px)",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.72)",
            maxWidth: 500,
            margin: "0 0 40px",
          }}>
            {sub}
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="#vitrine" className="btn-primary">{ctaPrimary}</a>
            <a
              href={whatsappLink(content?.whatsappNumber, content?.whatsappDefaultMessage || "Olá, quero conhecer as rivieras da Contreraz.")}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-light"
            >
              {ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      {/* brand strip */}
      <div style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(10,10,18,0.4)",
        backdropFilter: "blur(4px)",
      }}>
        <div className="container hero-strip" style={{ display: "flex", alignItems: "center", gap: 32, padding: "18px 24px", flexWrap: "wrap" }}>
          {["Rivieras", "Curadoria limitada", "Atendimento direto"].map((item, i) => (
            <p key={i} style={{ margin: 0, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
