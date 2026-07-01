export type Product = {
  id: number;
  name: string;
  pieceName: string | null;
  collection: string | null;
  category: string;
  material: string | null;
  stone: string | null;
  salePrice: number;
  stock: number;
  images: string[];
};

export type FaqItem = { question: string; answer: string };

export type StoreContent = {
  heroHeadline: string | null;
  heroSubheadline: string | null;
  heroCtaPrimary: string | null;
  heroCtaSecondary: string | null;
  manifestoText: string | null;
  howToBuySteps: string[];
  trustItems: string[];
  faqItems: FaqItem[];
  whatsappNumber: string | null;
  whatsappDefaultMessage: string | null;
  logoUrl: string | null;
  ogImageUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  instagramUrl: string | null;
} | null;
