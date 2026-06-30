import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "./types";

export type CartItem = {
  productId: number;
  title: string;
  salePrice: number;
  image: string | null;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (productId: number) => void;
  setQty: (productId: number, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "contreraz-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function add(product: Product) {
    setItems(prev => {
      const existing = prev.find(i => i.productId === product.id);
      if (existing) {
        return prev.map(i => (i.productId === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        {
          productId: product.id,
          title: product.pieceName || product.name,
          salePrice: product.salePrice,
          image: product.images[0] ?? null,
          qty: 1,
        },
      ];
    });
  }

  function remove(productId: number) {
    setItems(prev => prev.filter(i => i.productId !== productId));
  }

  function setQty(productId: number, qty: number) {
    if (qty < 1) return remove(productId);
    setItems(prev => prev.map(i => (i.productId === productId ? { ...i, qty } : i)));
  }

  function clear() {
    setItems([]);
  }

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.salePrice, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, count, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
  return ctx;
}
