import type { StoreContent } from "../lib/types";

export function Manifesto({ content }: { content: StoreContent }) {
  const text = content?.manifestoText;
  if (!text) return null;

  return (
    <section style={{ padding: "64px 24px", background: "#fff" }}>
      <div className="container" style={{ maxWidth: 640, textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-signature)", fontSize: 32, color: "var(--dourado)", margin: "0 0 16px" }}>
          Contreraz
        </p>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 20, lineHeight: 1.7, color: "var(--texto)" }}>
          {text}
        </p>
      </div>
    </section>
  );
}
