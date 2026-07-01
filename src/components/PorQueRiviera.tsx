const PONTOS = [
  { titulo: "Âmbar, ouro e luz dura.", desc: "Uma paleta quente, mediterrânea, feita para sair do óbvio sem perder sofisticação." },
  { titulo: "Presença sem volume.", desc: "A peça aparece pelo acabamento, pela cor e pela intenção. Não precisa disputar atenção." },
  { titulo: "Unissex por temperamento.", desc: "A Contreraz não separa estilo por gênero. A peça certa encontra quem sabe usar." },
  { titulo: "Direta, intensa e versátil.", desc: "Funciona no pulso de quem usa terno, camisa aberta, camiseta branca ou linho cru. Não depende de gênero. Depende de atitude." },
  { titulo: "Nada entra por acaso.", desc: "Cada peça passa por escolha estética, análise de acabamento e coerência com a identidade da marca antes de chegar à curadoria." },
];

export function PorQueRiviera() {
  return (
    <section style={{ padding: "96px 24px", background: "var(--bg)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="eyebrow" style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
            Curadoria
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(28px, 4vw, 40px)",
            color: "var(--azul)",
            margin: "0 0 16px",
            lineHeight: 1.2,
          }}>
            A primeira peça não foi escolhida por acaso.
          </h2>
          <p style={{ fontSize: 15, color: "#666", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            A riviera abre a curadoria Contreraz porque traduz bem o que a marca procura: uma peça direta, intensa e com temperamento próprio.
          </p>
        </div>

        <div className="pqr-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {PONTOS.map((p, i) => (
            <div key={i} style={{
              padding: "36px 32px",
              background: i % 2 === 0 ? "#fff" : "var(--bg)",
              borderTop: "2px solid var(--terracota)",
            }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--terracota)", margin: "0 0 12px" }}>
                0{i + 1}
              </p>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: 20,
                color: "var(--azul)",
                margin: "0 0 12px",
                lineHeight: 1.3,
              }}>
                {p.titulo}
              </h3>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.65, margin: 0 }}>
                {p.desc}
              </p>
            </div>
          ))}
          {/* sexta célula decorativa */}
          <div style={{
            padding: "36px 32px",
            background: "var(--azul)",
            display: "flex",
            alignItems: "flex-end",
          }}>
            <p style={{ fontFamily: "var(--font-signature)", fontSize: 48, color: "rgba(255,255,255,0.2)", margin: 0, lineHeight: 1 }}>
              Contreraz
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
