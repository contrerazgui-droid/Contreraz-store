import { useState } from "react";
import type { Product, StoreContent } from "../lib/types";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";

export function Vitrine({ products, content }: { products: Product[]; content: StoreContent }) {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section id="vitrine" style={{ padding: "72px 24px", background: "var(--bg)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "var(--dourado)", fontWeight: 600, margin: "0 0 8px" }}>
            Primeira coleção
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: "var(--azul)", margin: 0 }}>Rivieras</h2>
        </div>

        {products.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888", fontSize: 14 }}>
            Em breve, novas peças por aqui.
          </p>
        ) : (
          <div className="vitrine-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
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
