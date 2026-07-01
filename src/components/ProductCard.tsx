import type { Product } from "../lib/types";
import { useCart } from "../lib/cart";

export function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const { add, items } = useCart();
  const title = product.pieceName || product.name;
  const cover = product.images[0];
  const inCart = items.some(i => i.productId === product.id);
  const subtitle = [product.material, product.stone].filter(Boolean).join(" · ");

  return (
    <div style={{
      background: "#fff",
      border: "1px solid rgba(37,37,37,0.07)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}>
      <button
        onClick={onClick}
        style={{ textAlign: "left", border: "none", padding: 0, background: "none", flex: 1, display: "flex", flexDirection: "column" }}
      >
        <div style={{ aspectRatio: "1 / 1", background: "var(--areia)", overflow: "hidden", width: "100%", position: "relative" }}>
          {cover ? (
            <img src={cover} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            />
          ) : (
            <div style={{
              width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-signature)", fontSize: 22, color: "rgba(59,90,130,0.35)",
            }}>
              Contreraz
            </div>
          )}
          <div style={{
            position: "absolute", top: 12, left: 12,
            fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
            color: "var(--azul)", background: "rgba(246,243,237,0.9)", padding: "4px 8px",
          }}>
            {product.collection || "Signature"}
          </div>
        </div>

        <div style={{ padding: "16px 18px 8px" }}>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 17, color: "var(--texto)", margin: "0 0 4px", lineHeight: 1.3 }}>
            {title}
          </p>
          {subtitle && (
            <p style={{ fontSize: 12, color: "var(--azul-claro)", margin: "0 0 8px", letterSpacing: "0.04em" }}>
              {subtitle}
            </p>
          )}
          <p style={{ fontSize: 15, fontWeight: 600, color: "var(--terracota)", margin: 0 }}>
            {product.salePrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>
      </button>

      <div style={{ padding: "8px 18px 18px", display: "flex", gap: 8 }}>
        <button
          onClick={onClick}
          style={{
            flex: 1,
            padding: "9px 12px",
            border: "1.5px solid var(--azul)",
            background: "transparent",
            color: "var(--azul)",
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            borderRadius: 3,
            transition: "background 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--azul)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--azul)"; }}
        >
          Consultar peça
        </button>
        <button
          onClick={e => { e.stopPropagation(); add(product); }}
          style={{
            padding: "9px 12px",
            border: "1.5px solid",
            borderColor: inCart ? "var(--terracota)" : "rgba(37,37,37,0.15)",
            background: inCart ? "var(--terracota)" : "transparent",
            color: inCart ? "#fff" : "#aaa",
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            borderRadius: 3,
            whiteSpace: "nowrap",
            transition: "all 0.15s",
          }}
          title={inCart ? "Na seleção" : "Reservar"}
        >
          {inCart ? "✓" : "+"}
        </button>
      </div>
    </div>
  );
}
