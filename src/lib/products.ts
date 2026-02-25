/**
 * Библиотека доступа к данным товаров.
 * Читает products.json из /data/ на этапе сборки (build time).
 *
 * AI-агент обновляет /data/products.json → git push → Vercel пересобирает сайт.
 */

import { Product, ProductsData } from "./types";
import productsJson from "@/data/products.json";

/** Получить все данные (включая дату обновления) */
export function getProductsData(): ProductsData {
  return productsJson as ProductsData;
}

/** Получить все товары */
export function getAllProducts(): Product[] {
  return (productsJson as ProductsData).products;
}

/** Получить уникальные категории (для фильтров) */
export function getCategories(): string[] {
  const cats = new Set(
    (productsJson as ProductsData).products.map((p) => p.category)
  );
  return Array.from(cats).sort();
}

/** Найти товар по артикулу */
export function getProductBySku(sku: string): Product | undefined {
  return (productsJson as ProductsData).products.find((p) => p.sku === sku);
}

/** Получить товары со скидкой */
export function getSaleProducts(): Product[] {
  return (productsJson as ProductsData).products.filter((p) => p.onSale);
}

/** Форматировать цену в рублях */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
}
