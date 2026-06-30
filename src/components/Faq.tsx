import { useState } from "react";
import type { StoreContent } from "../lib/types";

const DEFAULT_FAQ = [
  { question: "É unissex?", answer: "Sim, as peças Contreraz são pensadas pra qualquer pessoa usar." },
  { question: "Como saber meu tamanho?", answer: "Te ajudamos a definir o tamanho certo direto no WhatsApp." },
  { question: "Escurece?", answer: "Trabalhamos com materiais selecionados pra durar — qualquer dúvida específica, perguntamos no WhatsApp." },
  { question: "Tem garantia?", answer: "Sim, política de troca e garantia disponível — detalhes no WhatsApp." },
  { question: "Como funciona o envio?", answer: "Combinamos o envio direto com você após a confirmação da compra." },
];

export function Faq({ content }: { content: StoreContent }) {
  const items = content?.faqItems?.length ? content.faqItems : DEFAULT_FAQ;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{ padding: "64px 24px", background: "#fff" }}>
      <div className="container" style={{ maxWidth: 640 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--azul)", textAlign: "center", margin: "0 0 32px" }}>
          Dúvidas frequentes
        </h2>
        <div>
          {items.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(37,37,37,0.1)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", textAlign: "left", padding: "16px 0", border: "none", background: "none",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  fontSize: 15, fontWeight: 600, color: "var(--texto)",
                }}
              >
                {item.question}
                <span style={{ color: "var(--terracota)" }}>{open === i ? "–" : "+"}</span>
              </button>
              {open === i && (
                <p style={{ margin: "0 0 16px", fontSize: 14, color: "#666", lineHeight: 1.6 }}>{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
