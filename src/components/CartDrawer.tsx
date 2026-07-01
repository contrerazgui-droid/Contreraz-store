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
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(10,10,18,0.6)" }} />
      <div style={{
        position: "relative", width: "min(400px, 100%)", height: "100%", background: "#fff",
        display: "flex", flexDirection: "column", boxShadow: "-12px 0 40px rgba(0,0,0,0.18)",
      }}>
        <div style={{ padding: "22px 24px", borderBottom: "1px solid var(--linha)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: 20, color: "var(--azul)", margin: 0 }}>
              Sua seleção
            </h3>
            {items.length > 0 && (
              <p style={{ fontSize: 12, color: "#aaa", margin: "2px 0 0" }}>{items.length} {items.length === 1 ? "peça" : "peças"}</p>
            )}
          </div>
          <button onClick={onClose} style={{ border: "none", background: "none", fontSize: 20, color: "#bbb" }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "8px 24px" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 60 }}>
              <p style={{ color: "#bbb", fontSize: 14 }}>Nenhuma peça selecionada.</p>
              <button onClick={onClose} style={{ marginTop: 12, fontSize: 13, color: "var(--azul)", background: "none", border: "none", textDecoration: "underline" }}>
                Ver catálogo
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.productId} style={{ display: "flex", gap: 14, padding: "16px 0", borderBottom: "1px solid var(--linha)" }}>
                <div style={{ width: 60, height: 60, overflow: "hidden", background: "var(--bg)", flexShrink: 0 }}>
                  {item.image && <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 15, margin: "0 0 4px", color: "var(--texto)", lineHeight: 1.3 }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: 13, color: "var(--terracota)", fontWeight: 600, margin: "0 0 10px" }}>
                    {item.salePrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={() => setQty(item.productId, item.qty - 1)} style={{ width: 26, height: 26, border: "1px solid rgba(0,0,0,0.15)", background: "#fff", fontWeight: 600 }}>–</button>
                    <span style={{ fontSize: 13, minWidth: 18, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => setQty(item.productId, item.qty + 1)} style={{ width: 26, height: 26, border: "1px solid rgba(0,0,0,0.15)", background: "#fff", fontWeight: 600 }}>+</button>
                    <button onClick={() => remove(item.productId)} style={{ marginLeft: "auto", border: "none", background: "none", color: "#ccc", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: "1px solid var(--linha)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#888" }}>Total estimado</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "var(--terracota)" }}>
                {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </div>
            <button
              onClick={() => setCheckout(true)}
              style={{
                width: "100%", padding: "14px 24px",
                background: "var(--azul)", color: "#fff",
                fontWeight: 600, fontSize: 13,
                letterSpacing: "0.08em", textTransform: "uppercase",
                border: "none", borderRadius: 3,
              }}
            >
              Reservar no WhatsApp
            </button>
            <p style={{ fontSize: 11, color: "#bbb", textAlign: "center", marginTop: 10 }}>
              Tamanho e envio confirmados no WhatsApp
            </p>
          </div>
        )}
      </div>

      {checkout && <CheckoutForm content={content} onClose={() => setCheckout(false)} onDone={onClose} />}
    </div>
  );
}
