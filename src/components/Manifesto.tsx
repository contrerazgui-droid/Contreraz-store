import type { StoreContent } from "../lib/types";

export function Manifesto({ content }: { content: StoreContent }) {
  const text = content?.manifestoText ||
    "A Contreraz nasce para quem entende que estilo não precisa ser alto para ser notado. A primeira coleção começa pelas rivieras: peças clássicas, unissex e silenciosamente marcantes.";

  return (
    <section style={{ padding: "96px 24px", background: "var(--azul)" }}>
      <div className="container" style={{ maxWidth: 680, textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-signature)", fontSize: 42, color: "rgba(221,194,162,0.6)", margin: "0 0 8px", lineHeight: 1 }}>
          Contreraz
        </p>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontStyle: "italic",
          fontSize: "clamp(26px, 4vw, 38px)",
          lineHeight: 1.25,
          color: "#fff",
          margin: "0 0 24px",
          letterSpacing: "-0.01em",
        }}>
          A presença mora nos detalhes.
        </h2>
        <p style={{
          fontSize: 16,
          lineHeight: 1.75,
          color: "rgba(255,255,255,0.68)",
          margin: 0,
        }}>
          {text}
        </p>
      </div>
    </section>
  );
}
