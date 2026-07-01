import type { StoreContent } from "../lib/types";
import { whatsappLink } from "../lib/api";

export function Footer({ content }: { content: StoreContent }) {
  const waUrl = whatsappLink(content?.whatsappNumber, content?.whatsappDefaultMessage || "Olá, quero conhecer as rivieras da Contreraz.");
  const logoUrl = content?.logoUrl;

  return (
    <footer style={{ background: "var(--azul)", padding: "64px 24px 0" }}>
      <div className="container">
        {/* grid principal */}
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: 48, paddingBottom: 48 }}>

          {/* col 1: logo + descrição */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {logoUrl && (
              <div style={{ display: "inline-flex", background: "#fff", padding: "10px 14px", borderRadius: 6 }}>
                <img src={logoUrl} alt="Contreraz" style={{ height: 52, width: "auto", display: "block" }} />
              </div>
            )}
            <p style={{ fontFamily: "var(--font-signature)", fontSize: 34, color: "#fff", margin: 0, lineHeight: 1 }}>
              Contreraz
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0, maxWidth: 300 }}>
              Acessórios autorais de inspiração mediterrânea. Semijoias selecionadas em edições pequenas, com nome de cidade e raiz ibérica.
            </p>
          </div>

          {/* col 2: navegar */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dourado)", margin: "0 0 20px" }}>
              Navegar
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a href="#vitrine" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Rivieras</a>
              <a href="#como-comprar" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Como comprar</a>
              <a href="#faq" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>FAQ</a>
            </div>
          </div>

          {/* col 3: contato */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dourado)", margin: "0 0 20px" }}>
              Contato
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {content?.instagramUrl && (
                <a
                  href={content.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
                >
                  @{content.instagramUrl.replace(/.*instagram\.com\//, "").replace(/\/$/, "")}
                </a>
              )}
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
              >
                WhatsApp
              </a>
              <a href="#faq" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                Cuidados com a peça
              </a>
            </div>
          </div>
        </div>

        {/* rodapé inferior */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>
            De él, por él, y para él. (Ro. 11:36)
          </p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", margin: 0, letterSpacing: "0.06em" }}>
            © {new Date().getFullYear()} Contreraz · Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
