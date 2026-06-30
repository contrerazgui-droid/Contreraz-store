import type { StoreContent } from "../lib/types";

export function Header({ content }: { content: StoreContent }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(246, 243, 237, 0.92)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid rgba(37,37,37,0.08)",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px" }}>
        <a href="#topo" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          {content?.logoUrl ? (
            <img src={content.logoUrl} alt="Contreraz" style={{ height: 32 }} />
          ) : (
            <span style={{ fontFamily: "var(--font-signature)", fontSize: 28, color: "var(--azul)" }}>Contreraz</span>
          )}
        </a>
        <nav className="header-nav" style={{ display: "flex", gap: 24, fontSize: 14, fontWeight: 500 }}>
          <a href="#vitrine" style={{ textDecoration: "none", color: "var(--texto)" }}>Rivieras</a>
          <a href="#como-comprar" style={{ textDecoration: "none", color: "var(--texto)" }}>Como comprar</a>
          <a href="#faq" style={{ textDecoration: "none", color: "var(--texto)" }}>Dúvidas</a>
        </nav>
      </div>
    </header>
  );
}
