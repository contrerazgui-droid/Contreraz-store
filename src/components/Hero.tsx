import type { StoreContent } from "../lib/types";
import { whatsappLink } from "../lib/api";

export function Hero({ content }: { content: StoreContent }) {
  const headline = content?.heroHeadline || "Você já sabia quem era. Agora tem a peça certa.";
  const sub = content?.heroSubheadline || "Contreraz é uma curadoria de acessórios premium com identidade mediterrânea. Semijoias selecionadas para pessoas autênticas, intensas e difíceis de copiar.";
  const ctaPrimary = content?.heroCtaPrimary || "Ver curadoria";
  const ctaSecondary = content?.heroCtaSecondary || "Falar com a Contreraz";
  const heroImage = content?.ogImageUrl;
  const logoUrl = content?.logoUrl;

  const bgStyle = heroImage
    ? { backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: "linear-gradient(160deg, #1e2d42 0%, #2a3f5e 55%, #1a2535 100%)" };

  return (
    <section id="topo" style={{ position: "relative", minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", ...bgStyle }}>
      {/* overlay */}
      <div style={{ position: "absolute", inset: 0, background: heroImage ? "rgba(10,10,18,0.72)" : "rgba(10,10,18,0.35)" }} />

      {/* logo centralizada no topo */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 2,
        display: "flex", justifyContent: "center", alignItems: "center",
        paddingTop: 48,
        pointerEvents: "none",
      }}>
        {logoUrl ? (
          <img src={logoUrl} alt="Contreraz" style={{ height: 96, width: "auto", opacity: 0.92 }} />
        ) : (
          <p style={{
            fontFamily: "var(--font-signature)", fontSize: 52,
            color: "rgba(255,255,255,0.22)", margin: 0, lineHeight: 1,
          }}>
            Contreraz
          </p>
        )}
      </div>

      {/* conteúdo centralizado */}
      <div className="container" style={{ position: "relative", zIndex: 1, paddingBottom: 80, paddingTop: 120 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(36px, 5.5vw, 64px)",
            lineHeight: 1.1,
            color: "#fff",
            margin: "0 0 20px",
            letterSpacing: "-0.01em",
          }}>
            {headline}
          </h1>

          <p style={{
            fontSize: "clamp(15px, 2vw, 17px)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 480,
            margin: "0 auto 40px",
          }}>
            {sub}
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
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
        borderTop: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(10,10,18,0.4)",
        backdropFilter: "blur(4px)",
      }}>
        <div className="container hero-strip" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40, padding: "16px 24px", flexWrap: "wrap" }}>
          {["Curadoria mediterrânea", "Semijoias selecionadas", "Atendimento direto"].map((item, i) => (
            <p key={i} style={{ margin: 0, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
