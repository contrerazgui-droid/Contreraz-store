import { useState } from "react";
import type { Product, StoreContent } from "../lib/types";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";

export function Vitrine({ products, content }: { products: Product[]; content: StoreContent }) {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section id="vitrine" style={{ padding: "88px 24px", background: "#fff" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span className="eyebrow" style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
            Primeira coleção
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(28px, 4vw, 40px)",
            color: "var(--azul)",
            margin: "0 0 12px",
            lineHeight: 1.2,
          }}>
            Rivieras Signature
          </h2>
          <p style={{ fontSize: 14, color: "#999", maxWidth: 400, margin: "0 auto" }}>
            Cada peça é nomeada e numerada. Curadoria limitada — confirme disponibilidade no WhatsApp.
          </p>
        </div>

        {products.length === 0 ? (
          <p style={{ textAlign: "center", color: "#bbb", fontSize: 14 }}>Em breve, novas peças por aqui.</p>
        ) : (
          <div className="vitrine-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 }}>
            {products.map(p => (
              <ProductCard key={p.id} product={p} onClick={() => setSelected(p)} />
            ))}
          </div>
        )}
      </div>

      {selected && <ProductModal product={selected} content={content} onClose={() => setSelected(null)} />}
    </section>
  );
}
