import { useState } from "react";
import type { Product, StoreContent } from "../lib/types";
import { useCart } from "../lib/cart";
import { whatsappLink } from "../lib/api";

export function ProductModal({ product, content, onClose }: { product: Product; content: StoreContent; onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(0);
  const { add, items } = useCart();
  const title = product.pieceName || product.name;
  const images = product.images.length > 0 ? product.images : [null];
  const inCart = items.some(i => i.productId === product.id);

  const waMsg = `Olá! Quero reservar a peça *${title}* da Contreraz. Poderia me dar mais detalhes sobre disponibilidade e tamanho?`;
  const waUrl = whatsappLink(content?.whatsappNumber, waMsg);

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(10,10,18,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="product-modal-grid"
        style={{
          background: "#fff",
          maxWidth: 800,
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {/* imagens */}
        <div>
          <div style={{ aspectRatio: "1 / 1", background: "var(--bg)", overflow: "hidden" }}>
            {images[activeImage] ? (
              <img src={images[activeImage]!} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-signature)", fontSize: 32, color: "rgba(59,90,130,0.3)" }}>
                Contreraz
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div style={{ display: "flex", gap: 4, padding: 8, flexWrap: "wrap" }}>
              {product.images.map((img, i) => (
                <button key={img} onClick={() => setActiveImage(i)} style={{ width: 50, height: 50, overflow: "hidden", padding: 0, border: i === activeImage ? "2px solid var(--terracota)" : "1px solid rgba(0,0,0,0.1)" }}>
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* info */}
        <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column" }}>
          <button onClick={onClose} style={{ alignSelf: "flex-end", border: "none", background: "none", fontSize: 18, color: "#bbb", marginBottom: 8 }}>✕</button>

          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dourado)", margin: "0 0 8px" }}>
            {product.collection || "Signature"}
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: 28, color: "var(--azul)", margin: "0 0 16px", lineHeight: 1.2 }}>
            {title}
          </h2>

          {/* detalhes */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20, borderTop: "1px solid var(--linha)", borderBottom: "1px solid var(--linha)", padding: "14px 0" }}>
            {product.material && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "#999", fontWeight: 500 }}>Material</span>
              <span style={{ color: "var(--texto)" }}>{product.material}</span>
            </div>}
            {product.stone && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "#999", fontWeight: 500 }}>Pedra</span>
              <span style={{ color: "var(--texto)" }}>{product.stone}</span>
            </div>}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "#999", fontWeight: 500 }}>Disponibilidade</span>
              <span style={{ color: product.stock > 0 ? "#2a7a4b" : "var(--terracota)", fontWeight: 600 }}>
                {product.stock > 0 ? "Disponível" : "Consulte"}
              </span>
            </div>
          </div>

          <p style={{ fontSize: 24, fontWeight: 700, color: "var(--terracota)", margin: "0 0 8px" }}>
            {product.salePrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
          <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 24px" }}>
            Tamanho e forma de envio confirmados no WhatsApp
          </p>

          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                padding: "14px 24px",
                background: "var(--azul)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: 3,
              }}
            >
              Reservar pelo WhatsApp
            </a>
            <button
              onClick={() => { add(product); onClose(); }}
              style={{
                padding: "11px 24px",
                border: `1.5px solid ${inCart ? "var(--terracota)" : "rgba(37,37,37,0.2)"}`,
                background: "transparent",
                color: inCart ? "var(--terracota)" : "#888",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                borderRadius: 3,
              }}
            >
              {inCart ? "Já na seleção — adicionar outra" : "Adicionar à seleção"}
            </button>
          </div>

          <p style={{ fontSize: 11, color: "#bbb", textAlign: "center", marginTop: 16 }}>
            Cuidados e garantia informados no atendimento
          </p>
        </div>
      </div>
    </div>
  );
}
