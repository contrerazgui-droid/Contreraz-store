import { useState } from "react";
import { useCart } from "../lib/cart";
import { CheckoutForm } from "./CheckoutForm";
import type { StoreContent } from "../lib/types";

export function CartDrawer({ open, onClose, content }: { open: boolean; onClose: () => void; content: StoreContent }) {
  const { items, remove, setQty, total } = useCart();
  const [checkout, setCheckout] = useState(false);

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 70, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(37,37,37,0.55)" }} />
      <div
        style={{
          position: "relative", width: "min(420px, 100%)", height: "100%", background: "#fff",
          display: "flex", flexDirection: "column", boxShadow: "-8px 0 24px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(37,37,37,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--azul)", margin: 0 }}>Sua sacola</h3>
          <button onClick={onClose} style={{ border: "none", background: "none", fontSize: 20, color: "#999" }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "12px 24px" }}>
          {items.length === 0 ? (
            <p style={{ color: "#888", fontSize: 14, textAlign: "center", marginTop: 40 }}>Sua sacola está vazia.</p>
          ) : (
            items.map(item => (
              <div key={item.productId} style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: "1px solid rgba(37,37,37,0.06)" }}>
                <div style={{ width: 56, height: 56, borderRadius: 10, overflow: "hidden", background: "var(--areia)", flexShrink: 0 }}>
                  {item.image && <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 15, margin: "0 0 4px", color: "var(--texto)" }}>{item.title}</p>
                  <p style={{ fontSize: 13, color: "var(--terracota)", fontWeight: 600, margin: "0 0 8px" }}>
                    {item.salePrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={() => setQty(item.productId, item.qty - 1)} style={{ width: 24, height: 24, border: "1px solid rgba(0,0,0,0.15)", borderRadius: 6, background: "#fff" }}>–</button>
                    <span style={{ fontSize: 13, minWidth: 16, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => setQty(item.productId, item.qty + 1)} style={{ width: 24, height: 24, border: "1px solid rgba(0,0,0,0.15)", borderRadius: 6, background: "#fff" }}>+</button>
                    <button onClick={() => remove(item.productId)} style={{ marginLeft: "auto", border: "none", background: "none", color: "#aaa", fontSize: 12, textDecoration: "underline" }}>remover</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(37,37,37,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 15, fontWeight: 600 }}>
              <span>Total</span>
              <span style={{ color: "var(--terracota)" }}>{total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
            </div>
            <button
              onClick={() => setCheckout(true)}
              style={{
                width: "100%", padding: "14px 24px", borderRadius: 999, background: "var(--azul)",
                color: "#fff", fontWeight: 600, fontSize: 14, border: "none",
              }}
            >
              Finalizar pedido
            </button>
          </div>
        )}
      </div>

      {checkout && <CheckoutForm content={content} onClose={() => setCheckout(false)} onDone={onClose} />}
    </div>
  );
}
