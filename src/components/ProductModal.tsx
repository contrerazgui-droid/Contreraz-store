import { useState } from "react";
import type { Product, StoreContent } from "../lib/types";
import { whatsappLink } from "../lib/api";

export function ProductModal({ product, content, onClose }: { product: Product; content: StoreContent; onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(0);
  const title = product.pieceName || product.name;
  const images = product.images.length > 0 ? product.images : [null];

  const message = `${content?.whatsappDefaultMessage ? content.whatsappDefaultMessage + " " : "Olá, "}Quero saber mais sobre a peça ${title}.`;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: "rgba(37,37,37,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 20, maxWidth: 760, width: "100%",
          maxHeight: "90vh", overflowY: "auto",
          display: "grid", gridTemplateColumns: "1fr 1fr",
        }}
        className="product-modal-grid"
      >
        <div>
          <div style={{ aspectRatio: "1 / 1", background: "var(--areia)" }}>
            {images[activeImage] ? (
              <img src={images[activeImage]!} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--azul)", fontFamily: "var(--font-signature)", fontSize: 28 }}>
                Contreraz
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div style={{ display: "flex", gap: 6, padding: 10 }}>
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  style={{
                    width: 48, height: 48, borderRadius: 8, overflow: "hidden", padding: 0,
                    border: i === activeImage ? "2px solid var(--terracota)" : "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div style={{ padding: 28, display: "flex", flexDirection: "column" }}>
          <button onClick={onClose} style={{ alignSelf: "flex-end", border: "none", background: "none", fontSize: 20, color: "#999" }}>✕</button>
          <p style={{ fontSize: 11, letterSpacing: 0.6, textTransform: "uppercase", color: "var(--azul-claro)", margin: "0 0 6px", fontWeight: 600 }}>
            {product.collection || "Coleção Contreraz"}
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--azul)", margin: "0 0 12px" }}>{title}</h2>
          {(product.material || product.stone) && (
            <p style={{ fontSize: 14, color: "#666", margin: "0 0 16px" }}>
              {[product.material, product.stone].filter(Boolean).join(" · ")}
            </p>
          )}
          <p style={{ fontSize: 22, fontWeight: 700, color: "var(--terracota)", margin: "0 0 24px" }}>
            {product.salePrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
          <a
            href={whatsappLink(content?.whatsappNumber, message)}
            target="_blank"
            rel="noreferrer"
            style={{
              marginTop: "auto", textAlign: "center", padding: "14px 24px", borderRadius: 999,
              background: "#25D366", color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none",
            }}
          >
            Comprar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
