import { useState } from "react";
import { useCart } from "../lib/cart";
import { whatsappLink } from "../lib/api";
import type { StoreContent } from "../lib/types";

const fieldStyle: React.CSSProperties = {
  width: "100%", padding: "12px 14px",
  border: "1px solid rgba(37,37,37,0.15)",
  fontSize: 14, fontFamily: "var(--font-ui)",
  marginTop: 4, outline: "none",
  borderRadius: 3,
  background: "#fff",
};
const labelStyle: React.CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#888" };

export function CheckoutForm({ content, onClose, onDone }: { content: StoreContent; onClose: () => void; onDone: () => void }) {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({ name: "", city: "", notes: "" });
  const set = <K extends keyof typeof form>(k: K, v: string) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.name.trim() && form.city.trim();

  function buildMessage() {
    const lines: string[] = [];
    lines.push("Olá! Quero finalizar um pedido na Contreraz:");
    lines.push("");
    lines.push("🛍️ Peças selecionadas:");
    items.forEach(i => {
      lines.push(`• ${i.title} (x${i.qty}) — ${(i.salePrice * i.qty).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`);
    });
    lines.push("");
    lines.push(`Total: ${total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`);
    lines.push("");
    lines.push(`Nome: ${form.name}`);
    lines.push(`Cidade: ${form.city}`);
    if (form.notes) lines.push(`Obs: ${form.notes}`);
    return lines.join("\n");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    window.open(whatsappLink(content?.whatsappNumber, buildMessage()), "_blank");
    clear();
    onDone();
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 80, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(10,10,18,0.7)" }} />
      <form
        onSubmit={handleSubmit}
        style={{ position: "relative", background: "#fff", padding: "36px 32px", maxWidth: 400, width: "100%", maxHeight: "90vh", overflowY: "auto" }}
      >
        <button type="button" onClick={onClose} style={{ position: "absolute", top: 16, right: 16, border: "none", background: "none", fontSize: 18, color: "#bbb" }}>✕</button>

        <h3 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: 24, color: "var(--azul)", margin: "0 0 6px" }}>
          Finalizar pedido
        </h3>
        <p style={{ fontSize: 13, color: "#999", margin: "0 0 28px", lineHeight: 1.5 }}>
          Deixe seu nome e cidade — o restante (tamanho, endereço, pagamento) acertamos direto no WhatsApp.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <label style={labelStyle}>
            Nome *
            <input style={fieldStyle} value={form.name} onChange={e => set("name", e.target.value)} placeholder="Seu nome" required autoFocus />
          </label>
          <label style={labelStyle}>
            Cidade *
            <input style={fieldStyle} value={form.city} onChange={e => set("city", e.target.value)} placeholder="Sua cidade" required />
          </label>
          <label style={labelStyle}>
            Observação
            <textarea style={{ ...fieldStyle, resize: "none" }} rows={2} value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Tamanho, dúvidas, preferências..." />
          </label>
        </div>

        <button
          type="submit"
          disabled={!valid}
          style={{
            marginTop: 24, width: "100%", padding: "14px 24px",
            background: valid ? "var(--azul)" : "#ccc",
            color: "#fff", fontWeight: 600, fontSize: 13,
            letterSpacing: "0.08em", textTransform: "uppercase",
            border: "none", borderRadius: 3,
          }}
        >
          Reservar no WhatsApp
        </button>
      </form>
    </div>
  );
}
