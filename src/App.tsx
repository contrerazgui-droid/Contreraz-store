import { useEffect, useState } from "react";
import type { Product, StoreContent } from "./lib/types";
import { fetchProducts, fetchStoreContent } from "./lib/api";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { PorQueRiviera } from "./components/PorQueRiviera";
import { Vitrine } from "./components/Vitrine";
import { ComoComprar } from "./components/ComoComprar";
import { Confianca } from "./components/Confianca";
import { Faq } from "./components/Faq";
import { CtaFinal } from "./components/CtaFinal";
import { Footer } from "./components/Footer";
import { WhatsAppFloating } from "./components/WhatsAppFloating";
import { CartProvider } from "./lib/cart";

function AppInner() {
  const [products, setProducts] = useState<Product[]>([]);
  const [content, setContent] = useState<StoreContent>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchStoreContent()])
      .then(([p, c]) => { setProducts(p); setContent(c); })
      .catch(err => console.error("Erro ao carregar loja:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (content?.seoTitle) document.title = content.seoTitle;
    else document.title = "Contreraz — Rivieras e semijoias de identidade mediterrânea";
  }, [content]);

  useEffect(() => {
    if (!content?.logoUrl) return;
    const link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (link) link.href = content.logoUrl;
  }, [content?.logoUrl]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--azul-deep, #1e2d42)" }}>
        <p style={{ fontFamily: "var(--font-signature)", fontSize: 36, color: "rgba(255,255,255,0.3)" }}>Contreraz</p>
      </div>
    );
  }

  return (
    <>
      <Header content={content} />
      <Hero content={content} />
      <Manifesto content={content} />
      <PorQueRiviera />
      <Vitrine products={products} content={content} />
      <ComoComprar content={content} />
      <Confianca content={content} />
      <Faq content={content} />
      <CtaFinal content={content} />
      <Footer content={content} />
      <WhatsAppFloating content={content} />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}
