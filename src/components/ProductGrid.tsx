"use client";

/**
 * Адаптивная сетка карточек товаров.
 * Мобильные: 2 колонки, планшеты: 3, десктоп: 4.
 */

import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-text-muted text-lg">Товары не найдены</p>
        <p className="text-text-muted text-sm mt-1">
          Попробуйте изменить запрос или выбрать другую категорию
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {products.map((product) => (
        <ProductCard key={product.sku} product={product} />
      ))}
    </div>
  );
}
