import { useState, useEffect } from "react";
import { useCart } from "../lib/cart";
import { whatsappLink } from "../lib/api";
import type { StoreContent } from "../lib/types";

const FORM_KEY = "contreraz_checkout_form";

type DeliveryType = "entrega" | "retirada";

type FormState = {
  name: string;
  phone: string;
  delivery: DeliveryType;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento: string;
  notes: string;
};

const EMPTY: FormState = {
  name: "", phone: "", delivery: "entrega",
  cep: "", estado: "", cidade: "", bairro: "", rua: "", numero: "", complemento: "",
  notes: "",
};

function loadForm(): FormState {
  try {
    const raw = localStorage.getItem(FORM_KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch { return EMPTY; }
}

const labelCls: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
  textTransform: "uppercase", color: "#888", display: "block", marginBottom: 4,
};
const inputCls: React.CSSProperties = {
  width: "100%", padding: "11px 13px",
  border: "1px solid rgba(37,37,37,0.15)", borderRadius: 3,
  fontSize: 14, fontFamily: "var(--font-ui)",
  background: "#fafafa", outline: "none",
};

export function CheckoutForm({ content, onBack, onDone }: {
  content: StoreContent;
  onBack: () => void;
  onDone: () => void;
}) {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState<FormState>(loadForm);
  const set = <K extends keyof FormState>(k: K, v: string) => setForm(f => ({ ...f, [k]: v }));

  // persistir no localStorage
  useEffect(() => {
    localStorage.setItem(FORM_KEY, JSON.stringify(form));
  }, [form]);

  // lookup de CEP via ViaCEP
  async function lookupCep(cep: string) {
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setForm(f => ({
          ...f,
          estado: data.uf ?? f.estado,
          cidade: data.localidade ?? f.cidade,
          bairro: data.bairro ?? f.bairro,
          rua: data.logradouro ?? f.rua,
        }));
      }
    } catch { /* ignora */ }
  }

  function buildMessage() {
    const lines: string[] = [];
    lines.push("Olá! Quero finalizar um pedido na Contreraz:");
    lines.push("");
    lines.push("🛍️ Peças selecionadas:");
    items.forEach(i => {
      const variant = i.variantLabel ? ` · ${i.variantLabel}` : "";
      lines.push(`• ${i.title}${variant} (x${i.qty}) — ${(i.salePrice * i.qty).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`);
    });
    lines.push(`\nTotal estimado: ${total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`);
    lines.push("");
    lines.push("📋 Dados:");
    lines.push(`Nome: ${form.name}`);
    if (form.phone) lines.push(`WhatsApp: ${form.phone}`);
    lines.push(`Tipo: ${form.delivery === "entrega" ? "Entrega" : "Retirada"}`);
    if (form.delivery === "entrega") {
      const addr = [form.rua, form.numero ? `nº ${form.numero}` : "", form.complemento, form.bairro, form.cidade, form.estado].filter(Boolean).join(", ");
      if (addr) lines.push(`Endereço: ${addr}`);
      if (form.cep) lines.push(`CEP: ${form.cep}`);
    }
    if (form.notes) lines.push(`Obs: ${form.notes}`);
    return lines.join("\n");
  }

  const isEntrega = form.delivery === "entrega";
  const valid = form.name.trim() && form.phone.trim() &&
    (!isEntrega || (form.cidade.trim() && form.rua.trim()));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    window.open(whatsappLink(content?.whatsappNumber, buildMessage()), "_blank");
    clear();
    localStorage.removeItem(FORM_KEY);
    onDone();
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* header */}
      <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--linha)", display: "flex", alignItems: "center", gap: 12 }}>
        <button type="button" onClick={onBack} style={{ border: "none", background: "none", color: "var(--azul)", fontSize: 20, padding: 0, lineHeight: 1, display: "flex", alignItems: "center" }}>←</button>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: 18, color: "var(--azul)", margin: 0 }}>
            Finalizar pedido
          </h3>
          <p style={{ fontSize: 11, color: "#bbb", margin: "2px 0 0" }}>{items.length} {items.length === 1 ? "peça" : "peças"} · {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
        </div>
      </div>

      {/* campos */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 8px" }}>

        {/* tipo de entrega */}
        <div style={{ marginBottom: 18 }}>
          <label style={labelCls}>Tipo de entrega</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid rgba(37,37,37,0.15)", borderRadius: 3, overflow: "hidden" }}>
            {(["entrega", "retirada"] as DeliveryType[]).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => set("delivery", t)}
                style={{
                  padding: "11px 0", border: "none",
                  background: form.delivery === t ? "var(--azul)" : "#fff",
                  color: form.delivery === t ? "#fff" : "#888",
                  fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
                  transition: "background 0.15s",
                }}
              >
                {t === "entrega" ? "Entrega" : "Retirada"}
              </button>
            ))}
          </div>
        </div>

        {/* nome + telefone */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 14 }}>
          <div>
            <label style={labelCls}>Nome completo *</label>
            <input style={inputCls} value={form.name} onChange={e => set("name", e.target.value)} placeholder="Seu nome" required />
          </div>
          <div>
            <label style={labelCls}>Telefone / WhatsApp *</label>
            <input style={inputCls} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="(11) 99999-9999" required />
          </div>
        </div>

        {/* endereço (só entrega) */}
        {isEntrega && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <label style={labelCls}>CEP</label>
                <input
                  style={inputCls} value={form.cep}
                  onChange={e => { set("cep", e.target.value); lookupCep(e.target.value); }}
                  placeholder="00000-000"
                />
              </div>
              <div>
                <label style={labelCls}>Estado</label>
                <input style={inputCls} value={form.estado} onChange={e => set("estado", e.target.value)} placeholder="SP" maxLength={2} />
              </div>
            </div>
            <div>
              <label style={labelCls}>Cidade *</label>
              <input style={inputCls} value={form.cidade} onChange={e => set("cidade", e.target.value)} placeholder="São Paulo" required={isEntrega} />
            </div>
            <div>
              <label style={labelCls}>Bairro</label>
              <input style={inputCls} value={form.bairro} onChange={e => set("bairro", e.target.value)} placeholder="Centro" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10 }}>
              <div>
                <label style={labelCls}>Rua / Avenida *</label>
                <input style={inputCls} value={form.rua} onChange={e => set("rua", e.target.value)} placeholder="Rua das Flores" required={isEntrega} />
              </div>
              <div>
                <label style={labelCls}>Número</label>
                <input style={{ ...inputCls, width: 80 }} value={form.numero} onChange={e => set("numero", e.target.value)} placeholder="123" />
              </div>
            </div>
            <div>
              <label style={labelCls}>Complemento</label>
              <input style={inputCls} value={form.complemento} onChange={e => set("complemento", e.target.value)} placeholder="Apto 42, Bloco B (opcional)" />
            </div>
          </div>
        )}

        {form.delivery === "retirada" && (
          <div style={{ padding: "14px", background: "var(--bg)", borderRadius: 3, marginBottom: 14 }}>
            <p style={{ fontSize: 13, color: "#888", margin: 0, lineHeight: 1.6 }}>
              O ponto e horário de retirada serão combinados diretamente no WhatsApp após o envio do pedido.
            </p>
          </div>
        )}

        <div style={{ marginBottom: 8 }}>
          <label style={labelCls}>Observações</label>
          <textarea
            style={{ ...inputCls, resize: "none" }}
            rows={2}
            value={form.notes}
            onChange={e => set("notes", e.target.value)}
            placeholder="Tamanho, dúvidas, preferências…"
          />
        </div>
      </div>

      {/* footer */}
      <div style={{ padding: "16px 24px", borderTop: "1px solid var(--linha)" }}>
        <button
          type="submit"
          disabled={!valid}
          style={{
            width: "100%", padding: "14px 24px",
            background: valid ? "var(--azul)" : "#e0e0e0",
            color: valid ? "#fff" : "#bbb",
            fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase",
            border: "none", borderRadius: 3, transition: "background 0.15s",
          }}
        >
          Reservar no WhatsApp
        </button>
        <p style={{ fontSize: 11, color: "#ccc", textAlign: "center", marginTop: 10 }}>
          Tamanho e envio confirmados no WhatsApp
        </p>
      </div>
    </form>
  );
}
