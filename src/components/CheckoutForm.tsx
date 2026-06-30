import { useState } from "react";
import { useCart } from "../lib/cart";
import { whatsappLink } from "../lib/api";
import type { StoreContent } from "../lib/types";

const PAYMENT_OPTIONS = [
  { value: "pix", label: "Pix" },
  { value: "cartao", label: "Cartão de crédito" },
  { value: "dinheiro", label: "Dinheiro" },
  { value: "combinar", label: "A combinar" },
];

const fieldStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid rgba(37,37,37,0.15)",
  fontSize: 14, fontFamily: "var(--font-ui)", marginTop: 4,
};
const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: "#555" };

export function CheckoutForm({ content, onClose, onDone }: { content: StoreContent; onClose: () => void; onDone: () => void }) {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({
    name: "", phone: "", city: "", address: "", payment: "pix", notes: "",
  });

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function buildMessage() {
    const lines: string[] = [];
    lines.push("Olá! Quero finalizar uma compra na Contreraz:");
    lines.push("");
    lines.push("🛍️ Peças:");
    items.forEach(i => {
      lines.push(`• ${i.title} (x${i.qty}) — ${(i.salePrice * i.qty).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`);
    });
    lines.push("");
    lines.push(`Total: ${total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`);
    lines.push("");
    lines.push("📋 Dados:");
    lines.push(`Nome: ${form.name}`);
    lines.push(`Cidade: ${form.city}`);
    lines.push(`Endereço: ${form.address}`);
    lines.push(`Forma de pagamento: ${PAYMENT_OPTIONS.find(p => p.value === form.payment)?.label ?? form.payment}`);
    if (form.notes) lines.push(`Observações: ${form.notes}`);
    return lines.join("\n");
  }

  const valid = form.name.trim() && form.city.trim() && form.address.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    const url = whatsappLink(content?.whatsappNumber, buildMessage());
    window.open(url, "_blank");
    clear();
    onDone();
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 80, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(37,37,37,0.6)" }} />
      <form
        onSubmit={handleSubmit}
        style={{
          position: "relative", background: "#fff", borderRadius: 18, padding: 28,
          maxWidth: 440, width: "100%", maxHeight: "90vh", overflowY: "auto",
        }}
      >
        <button type="button" onClick={onClose} style={{ position: "absolute", top: 16, right: 16, border: "none", background: "none", fontSize: 18, color: "#999" }}>✕</button>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--azul)", margin: "0 0 4px" }}>Finalizar pedido</h3>
        <p style={{ fontSize: 13, color: "#777", margin: "0 0 20px" }}>
          Preencha seus dados — você vai confirmar e finalizar a compra direto no WhatsApp.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <label style={labelStyle}>
            Nome completo *
            <input style={fieldStyle} value={form.name} onChange={e => set("name", e.target.value)} required />
          </label>
          <label style={labelStyle}>
            WhatsApp
            <input style={fieldStyle} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="(11) 99999-9999" />
          </label>
          <label style={labelStyle}>
            Cidade *
            <input style={fieldStyle} value={form.city} onChange={e => set("city", e.target.value)} required />
          </label>
          <label style={labelStyle}>
            Endereço completo *
            <input style={fieldStyle} value={form.address} onChange={e => set("address", e.target.value)} placeholder="Rua, número, bairro, CEP" required />
          </label>
          <label style={labelStyle}>
            Forma de pagamento
            <select style={fieldStyle} value={form.payment} onChange={e => set("payment", e.target.value)}>
              {PAYMENT_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </label>
          <label style={labelStyle}>
            Observações
            <textarea style={{ ...fieldStyle, resize: "none" }} rows={2} value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Tamanho, preferências, etc." />
          </label>
        </div>

        <button
          type="submit"
          disabled={!valid}
          style={{
            marginTop: 22, width: "100%", padding: "14px 24px", borderRadius: 999,
            background: valid ? "#25D366" : "#ccc", color: "#fff", fontWeight: 600, fontSize: 14, border: "none",
          }}
        >
          Finalizar no WhatsApp
        </button>
      </form>
    </div>
  );
}
