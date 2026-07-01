const PONTOS = [
  { titulo: "Clássica sem ser óbvia.", desc: "A riviera existe há décadas mas nunca pareceu datada. Ela é o equilíbrio entre o que sempre funcionou e o que ainda vai funcionar." },
  { titulo: "Unissex por natureza.", desc: "Não foi pensada pra um gênero específico — foi pensada pra quem entende que uma peça boa não precisa de rótulo." },
  { titulo: "Funciona em qualquer contexto.", desc: "No trabalho, no dia casual, na noite. Uma riviera eleva o look sem chamar mais atenção do que você." },
  { titulo: "Eleva o básico sem exagerar.", desc: "Com camiseta branca ou camisa aberta, ela é a diferença entre um look completo e um look esquecível." },
  { titulo: "A primeira assinatura visual da Contreraz.", desc: "Escolhemos rivieras porque acreditamos que a joia certa faz a pessoa ser lembrada — não a joia." },
];

export function PorQueRiviera() {
  return (
    <section style={{ padding: "96px 24px", background: "var(--bg)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="eyebrow" style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
            Rivieras
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(28px, 4vw, 40px)",
            color: "var(--azul)",
            margin: 0,
            lineHeight: 1.2,
          }}>
            Por que riviera?
          </h2>
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
