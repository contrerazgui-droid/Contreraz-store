import type { Product } from "../lib/types";

const CATEGORY_LABELS: Record<string, string> = {
  anel: "Anel", pulseira: "Pulseira", colar: "Colar",
  brinco: "Brinco", riviera: "Riviera", outro: "Peça",
};

export function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const title = product.pieceName || product.name;
  const cover = product.images[0];

  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left",
        background: "#fff",
        border: "1px solid rgba(37,37,37,0.08)",
        borderRadius: 16,
        overflow: "hidden",
        padding: 0,
      }}
    >
      <div style={{ aspectRatio: "1 / 1", background: "var(--areia)", overflow: "hidden" }}>
        {cover ? (
          <img src={cover} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--azul)", fontFamily: "var(--font-signature)", fontSize: 24 }}>
            Contreraz
          </div>
        )}
      </div>
      <div style={{ padding: "16px 16px 18px" }}>
        <p style={{ fontSize: 11, letterSpacing: 0.6, textTransform: "uppercase", color: "var(--azul-claro)", margin: "0 0 4px", fontWeight: 600 }}>
          {CATEGORY_LABELS[product.category] ?? product.category}
        </p>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--texto)", margin: "0 0 8px" }}>
          {title}
        </p>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--terracota)", margin: 0 }}>
          {product.salePrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </p>
      </div>
    </button>
  );
}
