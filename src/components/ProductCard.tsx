import type { Product } from "../lib/types";
import { useCart } from "../lib/cart";

const CATEGORY_LABELS: Record<string, string> = {
  anel: "Anel", pulseira: "Pulseira", colar: "Colar",
  brinco: "Brinco", riviera: "Riviera", outro: "Peça",
};

export function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const { add, items } = useCart();
  const title = product.pieceName || product.name;
  const cover = product.images[0];
  const inCart = items.some(i => i.productId === product.id);

  return (
    <div style={{ background: "#fff", border: "1px solid rgba(37,37,37,0.08)", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <button
        onClick={onClick}
        style={{ textAlign: "left", border: "none", padding: 0, background: "none", flex: 1, display: "flex", flexDirection: "column" }}
      >
        <div style={{ aspectRatio: "1 / 1", background: "var(--areia)", overflow: "hidden", width: "100%" }}>
          {cover ? (
            <img src={cover} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--azul)", fontFamily: "var(--font-signature)", fontSize: 24 }}>
              Contreraz
            </div>
          )}
        </div>
        <div style={{ padding: "14px 16px 8px" }}>
          <p style={{ fontSize: 11, letterSpacing: 0.6, textTransform: "uppercase", color: "var(--azul-claro)", margin: "0 0 4px", fontWeight: 600 }}>
            {CATEGORY_LABELS[product.category] ?? product.category}
          </p>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 17, color: "var(--texto)", margin: "0 0 6px" }}>{title}</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--terracota)", margin: 0 }}>
            {product.salePrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>
      </button>
      <div style={{ padding: "0 16px 16px" }}>
        <button
          onClick={() => add(product)}
          style={{
            width: "100%", padding: "9px 16px", borderRadius: 999,
            border: `1.5px solid ${inCart ? "var(--terracota)" : "var(--azul)"}`,
            background: inCart ? "var(--terracota)" : "transparent",
            color: inCart ? "#fff" : "var(--azul)",
            fontWeight: 600, fontSize: 12, transition: "all 0.15s",
          }}
        >
          {inCart ? "Adicionado ✓" : "Adicionar à sacola"}
        </button>
      </div>
    </div>
  );
}
