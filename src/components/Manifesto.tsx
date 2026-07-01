import type { StoreContent } from "../lib/types";

export function Manifesto({ content }: { content: StoreContent }) {
  const text = content?.manifestoText ||
    "É sobrenome. Herança da bisavó espanhola. Um ponto de partida que não pode ser replicado por tendência, algoritmo ou concorrência. A marca carrega essa raiz em cada escolha: da paleta quente às peças selecionadas, do acabamento ao modo como ocupa presença.";

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
          Contreraz não é um nome inventado.
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
