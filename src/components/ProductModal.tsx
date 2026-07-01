import { useState, useEffect } from "react";
import type { Product, StoreContent } from "../lib/types";
import { useCart } from "../lib/cart";

export function ProductModal({ product, onClose }: { product: Product; content: StoreContent; onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { add, items } = useCart();
  const title = product.pieceName || product.name;
  const images = product.images.length > 0 ? product.images : [];
  const inCart = items.some(i => i.productId === product.id);

  // scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // reset ao trocar produto
  useEffect(() => { setActiveImage(0); setQty(1); setAdded(false); }, [product.id]);

  // Esc para fechar
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  function handleAdd() {
    for (let i = 0; i < qty; i++) add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const subtitle = [product.material, product.stone].filter(Boolean).join(" · ");

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(10,10,18,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="product-modal-grid"
        style={{
          background: "#fff", maxWidth: 860, width: "100%",
          maxHeight: "94vh", overflowY: "auto",
          display: "grid", gridTemplateColumns: "1.1fr 1fr",
          position: "relative",
        }}
      >
        {/* coluna: galeria */}
        <div style={{ background: "var(--bg)" }}>
          {/* imagem principal 3:4 */}
          <div style={{ aspectRatio: "3 / 4", overflow: "hidden", width: "100%" }}>
            {images[activeImage] ? (
              <img
                src={images[activeImage]}
                alt={title}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.2s" }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-signature)", fontSize: 36, color: "rgba(59,90,130,0.25)" }}>
                Contreraz
              </div>
            )}
          </div>
          {/* thumbnails horizontais */}
          {images.length > 1 && (
            <div style={{ display: "flex", gap: 4, padding: "8px 8px 0", flexWrap: "wrap" }}>
              {images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  style={{
                    width: 56, height: 56, padding: 0, overflow: "hidden",
                    border: i === activeImage ? "2px solid var(--terracota)" : "1px solid rgba(0,0,0,0.1)",
                    background: "none", transition: "border-color 0.15s",
                  }}
                >
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* coluna: info */}
        <div style={{ padding: "32px 28px 28px", display: "flex", flexDirection: "column", gap: 0 }}>
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, border: "none", background: "none", fontSize: 20, color: "#bbb", lineHeight: 1, padding: 4 }}>✕</button>

          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dourado)", margin: "0 0 10px" }}>
            {product.collection || "Signature"}
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: 26, color: "var(--azul)", margin: "0 0 6px", lineHeight: 1.2 }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: 13, color: "var(--azul-claro)", margin: "0 0 20px", letterSpacing: "0.04em" }}>
              {subtitle}
            </p>
          )}

          <p style={{ fontSize: 26, fontWeight: 700, color: "var(--terracota)", margin: "0 0 20px" }}>
            {product.salePrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>

          {/* detalhes */}
          <div style={{ borderTop: "1px solid var(--linha)", borderBottom: "1px solid var(--linha)", padding: "14px 0", marginBottom: 20, display: "flex", flexDirection: "column", gap: 8 }}>
            {product.material && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "#aaa" }}>Material</span>
                <span style={{ color: "var(--texto)", fontWeight: 500 }}>{product.material}</span>
              </div>
            )}
            {product.stone && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "#aaa" }}>Pedra</span>
                <span style={{ color: "var(--texto)", fontWeight: 500 }}>{product.stone}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "#aaa" }}>Disponibilidade</span>
              <span style={{ color: product.stock > 0 ? "#2a7a4b" : "#b05a1e", fontWeight: 600 }}>
                {product.stock > 0 ? "Disponível" : "Consulte"}
              </span>
            </div>
          </div>

          {/* quantidade */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa" }}>Qtd</span>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 3 }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 32, height: 32, border: "none", background: "none", fontSize: 16, color: "#666" }}>−</button>
              <span style={{ minWidth: 28, textAlign: "center", fontSize: 14, fontWeight: 600 }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ width: 32, height: 32, border: "none", background: "none", fontSize: 16, color: "#666" }}>+</button>
            </div>
          </div>

          {/* CTAs */}
          <div style={{ marginTop: "auto" }}>
            <button
              onClick={handleAdd}
              style={{
                width: "100%", padding: "14px 24px",
                background: added ? "var(--terracota)" : "var(--azul)",
                color: "#fff",
                fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase",
                border: "none", borderRadius: 3, transition: "background 0.2s",
              }}
            >
              {added ? "Adicionado ✓" : inCart ? "Adicionar outra unidade" : "Adicionar à seleção"}
            </button>
          </div>

          <p style={{ fontSize: 11, color: "#ccc", textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>
            Tamanho, envio e pagamento confirmados no WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
}
