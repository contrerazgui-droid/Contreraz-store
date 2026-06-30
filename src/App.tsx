import { useEffect, useState } from "react";
import type { Product, StoreContent } from "./lib/types";
import { fetchProducts, fetchStoreContent } from "./lib/api";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { Vitrine } from "./components/Vitrine";
import { ComoComprar } from "./components/ComoComprar";
import { Confianca } from "./components/Confianca";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { WhatsAppFloating } from "./components/WhatsAppFloating";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [content, setContent] = useState<StoreContent>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchStoreContent()])
      .then(([p, c]) => {
        setProducts(p);
        setContent(c);
      })
      .catch(err => console.error("Erro ao carregar loja:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (content?.seoTitle) document.title = content.seoTitle;
  }, [content]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--azul)" }}>
        Carregando...
      </div>
    );
  }

  return (
    <>
      <Header content={content} />
      <Hero content={content} />
      <Manifesto content={content} />
      <Vitrine products={products} content={content} />
      <ComoComprar content={content} />
      <Confianca content={content} />
      <Faq content={content} />
      <Footer content={content} />
      <WhatsAppFloating content={content} />
    </>
  );
}

export default App;
