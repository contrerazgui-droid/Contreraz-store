import { useState } from "react";
import type { StoreContent } from "../lib/types";

const DEFAULT_FAQ = [
  { question: "As peças são masculinas ou femininas?", answer: "As rivieras Contreraz são unissex por natureza. Foram escolhidas exatamente por isso: funcionam em qualquer pessoa, sem precisar de rótulo." },
  { question: "Como sei o tamanho ideal?", answer: "Ajudamos você a definir o tamanho certo direto no WhatsApp, antes de confirmar o pedido. Tamanho é acertado antes do envio — sem surpresa." },
  { question: "A peça escurece com o tempo?", answer: "Trabalhamos com peças selecionadas em ródio e materiais de durabilidade comprovada. Os cuidados específicos de cada peça são informados no atendimento." },
  { question: "Qual o material das rivieras?", answer: "Nossas rivieras são banhadas a ródio (branco) ou dourado, com zircônias. O material e banho de cada peça estão descritos no catálogo." },
  { question: "Tem garantia?", answer: "Sim. Qualquer problema de fabricação é tratado diretamente com a marca. Os termos de troca e garantia são alinhados no atendimento." },
  { question: "Como funciona o envio?", answer: "O envio é combinado direto no WhatsApp após a confirmação da peça, tamanho e pagamento. Trabalhamos com envio rastreado." },
  { question: "Posso reservar uma peça?", answer: "Sim. Entre em contato pelo WhatsApp para verificar disponibilidade e reservar antes de confirmar o pagamento." },
];

export function Faq({ content }: { content: StoreContent }) {
  const items = content?.faqItems?.length ? content.faqItems : DEFAULT_FAQ;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{ padding: "80px 24px", background: "var(--bg)" }}>
      <div className="container" style={{ maxWidth: 680 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="eyebrow" style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>Dúvidas</span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(26px, 3.5vw, 36px)",
            color: "var(--azul)",
            margin: 0,
          }}>
            Perguntas frequentes
          </h2>
        </div>

        <div>
          {items.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--linha)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", textAlign: "left", padding: "18px 0", border: "none", background: "none",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                  fontSize: 15, fontWeight: 600, color: "var(--texto)",
                }}
              >
                <span>{item.question}</span>
                <span style={{ color: "var(--terracota)", fontSize: 18, fontWeight: 300, flexShrink: 0, lineHeight: 1 }}>
                  {open === i ? "–" : "+"}
                </span>
              </button>
              {open === i && (
                <p style={{ margin: "0 0 18px", fontSize: 14, color: "#666", lineHeight: 1.7 }}>{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
