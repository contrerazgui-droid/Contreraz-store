import type { StoreContent } from "../lib/types";

const DEFAULT_STEPS = [
  "Escolha a peça no catálogo e clique em Consultar.",
  "Confirme disponibilidade, tamanho e banho diretamente no WhatsApp.",
  "Acerte o pagamento e envio — e receba sua peça com rastreio.",
];

export function ComoComprar({ content }: { content: StoreContent }) {
  const steps = content?.howToBuySteps?.length ? content.howToBuySteps : DEFAULT_STEPS;

  return (
    <section id="como-comprar" style={{ padding: "80px 24px", background: "var(--bg)" }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span className="eyebrow" style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
            Processo
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(26px, 3.5vw, 36px)",
            color: "var(--azul)",
            margin: 0,
          }}>
            Como comprar
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 0 }} className="vitrine-grid">
          {steps.map((step, i) => (
            <div key={i} style={{
              padding: "36px 28px",
              background: i % 2 === 0 ? "#fff" : "transparent",
              borderTop: "2px solid var(--areia)",
            }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--terracota)", margin: "0 0 14px" }}>
                Passo {String(i + 1).padStart(2, "0")}
              </p>
              <p style={{ fontSize: 15, color: "var(--texto)", lineHeight: 1.65, margin: 0 }}>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
