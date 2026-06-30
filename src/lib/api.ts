import type { Product, StoreContent } from "./types";

const API_URL = import.meta.env.VITE_API_URL as string;
const STORE_USER_ID = import.meta.env.VITE_STORE_USER_ID as string;

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/public/contreraz/${STORE_USER_ID}/products`);
  if (!res.ok) throw new Error("Falha ao carregar produtos");
  return res.json();
}

export async function fetchStoreContent(): Promise<StoreContent> {
  const res = await fetch(`${API_URL}/api/public/contreraz/${STORE_USER_ID}/content`);
  if (!res.ok) throw new Error("Falha ao carregar conteúdo da loja");
  return res.json();
}

export function whatsappLink(number: string | null | undefined, message: string): string {
  const digits = (number ?? "").replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
