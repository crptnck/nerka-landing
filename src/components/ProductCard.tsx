"use client";

/**
 * Карточка товара.
 * Показывает: изображение, название, цену, остаток, акцию, кнопку добавления.
 * Минималистичный B2B дизайн — упор на информацию, а не на украшения.
 */

import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import { useCart } from "./CartProvider";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, decreaseItem, getQuantity } = useCart();
  const qty = getQuantity(product.sku);
  const inStock = product.stock > 0;

  return (
    <div className="bg-surface-raised border border-border rounded-xl overflow-hidden flex flex-col transition-colors hover:border-text-muted/30">
      {/* Изображение */}
      <div className="relative aspect-square bg-surface-overlay">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
        {/* Бейдж акции */}
        {product.onSale && (
          <span className="absolute top-2 left-2 bg-brand text-white text-xs font-semibold px-2 py-0.5 rounded">
            АКЦИЯ
          </span>
        )}
        {/* Бейдж отсутствия */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-text-muted text-sm font-medium">Нет в наличии</span>
          </div>
        )}
      </div>

      {/* Информация */}
      <div className="p-3 flex flex-col flex-1 gap-1.5">
        {/* Название */}
        <h3 className="text-sm font-medium text-white leading-tight line-clamp-2">
          {product.name}
        </h3>

        {/* Категория и артикул */}
        <p className="text-xs text-text-muted">
          {product.category} · {product.sku}
        </p>

        {/* Описание акции */}
        {product.onSale && product.saleDescription && (
          <p className="text-xs text-brand">{product.saleDescription}</p>
        )}

        {/* Цена и остаток */}
        <div className="mt-auto pt-2">
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold text-white">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-text-muted">/{product.unit}</span>
          </div>

          {/* Остаток */}
          <p className={`text-xs mt-0.5 ${inStock ? "text-text-secondary" : "text-brand"}`}>
            {inStock ? `В наличии: ${product.stock} ${product.unit}` : "Под заказ"}
          </p>
        </div>

        {/* Кнопка добавления / управление количеством */}
        {inStock && (
          <div className="mt-2">
            {qty === 0 ? (
              <button
                onClick={() => addItem(product.sku)}
                className="w-full bg-brand hover:bg-brand-dark text-white text-sm font-medium py-2 rounded-lg transition-colors"
              >
                В корзину
              </button>
            ) : (
              <div className="flex items-center justify-between bg-surface-overlay rounded-lg">
                <button
                  onClick={() => decreaseItem(product.sku)}
                  className="px-4 py-2 text-white hover:text-brand transition-colors text-lg font-medium"
                >
                  −
                </button>
                <span className="text-sm font-bold text-white">{qty}</span>
                <button
                  onClick={() => addItem(product.sku)}
                  className="px-4 py-2 text-white hover:text-brand transition-colors text-lg font-medium"
                >
                  +
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
