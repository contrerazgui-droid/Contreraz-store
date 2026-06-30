import { useState } from "react";
import type { StoreContent } from "../lib/types";
import { useCart } from "../lib/cart";
import { CartDrawer } from "./CartDrawer";

export function Header({ content }: { content: StoreContent }) {
  const { count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: "sticky", top: 0, zIndex: 40,
          background: "rgba(246,243,237,0.92)", backdropFilter: "blur(6px)",
          borderBottom: "1px solid rgba(37,37,37,0.08)",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px" }}>
          <a href="#topo" style={{ textDecoration: "none" }}>
            {content?.logoUrl ? (
              <img src={content.logoUrl} alt="Contreraz" style={{ height: 32 }} />
            ) : (
              <span style={{ fontFamily: "var(--font-signature)", fontSize: 28, color: "var(--azul)" }}>Contreraz</span>
            )}
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <nav className="header-nav" style={{ display: "flex", gap: 24, fontSize: 14, fontWeight: 500 }}>
              <a href="#vitrine" style={{ textDecoration: "none", color: "var(--texto)" }}>Catálogo</a>
              <a href="#como-comprar" style={{ textDecoration: "none", color: "var(--texto)" }}>Como comprar</a>
              <a href="#faq" style={{ textDecoration: "none", color: "var(--texto)" }}>Dúvidas</a>
            </nav>

            <button
              onClick={() => setCartOpen(true)}
              style={{ position: "relative", border: "none", background: "none", padding: 4 }}
              aria-label="Abrir sacola"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--azul)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {count > 0 && (
                <span style={{
                  position: "absolute", top: -2, right: -2,
                  background: "var(--terracota)", color: "#fff",
                  borderRadius: "50%", width: 16, height: 16,
                  fontSize: 10, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} content={content} />
    </>
  );
}
