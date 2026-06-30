import type { StoreContent } from "../lib/types";

const DEFAULT_STEPS = ["Escolha a peça.", "Confirme disponibilidade e tamanho.", "Finalize pelo WhatsApp."];

export function ComoComprar({ content }: { content: StoreContent }) {
  const steps = content?.howToBuySteps?.length ? content.howToBuySteps : DEFAULT_STEPS;

  return (
    <section id="como-comprar" style={{ padding: "64px 24px", background: "#fff" }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--azul)", textAlign: "center", margin: "0 0 40px" }}>
          Como comprar
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 24 }} className="vitrine-grid">
          {steps.map((step, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 36, height: 36, borderRadius: "50%", background: "var(--terracota)", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, margin: "0 auto 14px",
                }}
              >
                {i + 1}
              </div>
              <p style={{ fontSize: 14, color: "var(--texto)", lineHeight: 1.5, margin: 0 }}>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
