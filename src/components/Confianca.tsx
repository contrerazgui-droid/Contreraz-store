import type { StoreContent } from "../lib/types";

const ICONS = ["◈", "◎", "◇", "◉"];

const DEFAULT_ITEMS = [
  "Semijoias selecionadas",
  "Curadoria em pequenos lotes",
  "Atendimento direto",
  "Conferência antes do envio",
];

export function Confianca({ content }: { content: StoreContent }) {
  const items = content?.trustItems?.length ? content.trustItems : DEFAULT_ITEMS;

  return (
    <section style={{ padding: "80px 24px", background: "var(--azul-deep, #1e2d42)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="eyebrow eyebrow-light" style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
            Por que Contreraz
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(24px, 3.5vw, 34px)",
            color: "#fff",
            margin: 0,
          }}>
            Curadoria também é cuidado.
          </h2>
        </div>

        <div className="confianca-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, marginBottom: 40 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              padding: "32px 24px",
              background: "rgba(255,255,255,0.04)",
              borderTop: "2px solid rgba(207,142,40,0.5)",
              textAlign: "center",
            }}>
              <p style={{ fontSize: 22, color: "var(--dourado)", margin: "0 0 14px" }}>{ICONS[i % ICONS.length]}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", margin: 0, lineHeight: 1.4 }}>{item}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>
            Antes do envio, confirmamos disponibilidade, tamanho, banho, acabamento e cuidados da peça. O atendimento é direto para que a escolha seja clara antes da compra.
          </p>
        </div>
      </div>
    </section>
  );
}
