import type { StoreContent } from "../lib/types";

const DEFAULT_ITEMS = ["Curadoria", "Conferência antes do envio", "Atendimento direto"];

export function Confianca({ content }: { content: StoreContent }) {
  const items = content?.trustItems?.length ? content.trustItems : DEFAULT_ITEMS;

  return (
    <section style={{ padding: "56px 24px", background: "var(--areia)" }}>
      <div className="container" style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
        {items.map((item, i) => (
          <p key={i} style={{ fontSize: 14, fontWeight: 600, color: "var(--azul)", margin: 0 }}>
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
