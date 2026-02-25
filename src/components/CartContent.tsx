"use client";

/**
 * Содержимое корзины.
 * Показывает список товаров, общую сумму и форму оформления заказа.
 */

import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import { useCart } from "./CartProvider";

interface CartContentProps {
  products: Product[];
}

export function CartContent({ products }: CartContentProps) {
  const { items, addItem, decreaseItem, removeItem, clearCart, calcTotal } = useCart();
  const [orderSent, setOrderSent] = useState(false);

  const total = calcTotal(products);

  // Собрать данные корзины с информацией о товарах
  const cartProducts = items
    .map((item) => {
      const product = products.find((p) => p.sku === item.sku);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as (Product & { quantity: number })[];

  if (orderSent) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4">✓</div>
        <h2 className="text-lg font-bold text-white mb-2">Заявка отправлена!</h2>
        <p className="text-text-secondary text-sm mb-6">
          Менеджер свяжется с вами в ближайшее время
        </p>
        <a
          href="/"
          className="inline-block bg-brand hover:bg-brand-dark text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          Вернуться в каталог
        </a>
      </div>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-text-muted text-lg mb-2">Корзина пуста</p>
        <a
          href="/"
          className="inline-block text-brand hover:underline text-sm"
        >
          Перейти в каталог
        </a>
      </div>
    );
  }

  // Формируем текст заказа для WhatsApp/Telegram
  const orderText = cartProducts
    .map((p) => `${p.name} (${p.sku}) × ${p.quantity} = ${formatPrice(p.price * p.quantity)}`)
    .join("\n");

  const handleOrder = () => {
    // Формируем сообщение для WhatsApp
    const msg = encodeURIComponent(
      `🐟 Заказ с nerka.pro\n\n${orderText}\n\nИтого: ${formatPrice(total)}`
    );
    window.open(`https://wa.me/79244034203?text=${msg}`, "_blank");
    setOrderSent(true);
    clearCart();
  };

  return (
    <div className="space-y-4">
      {/* Список товаров */}
      {cartProducts.map((product) => (
        <div
          key={product.sku}
          className="flex items-center gap-3 bg-surface-raised border border-border rounded-lg p-3"
        >
          {/* Информация */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{product.name}</p>
            <p className="text-xs text-text-muted">{product.sku} · {formatPrice(product.price)}/{product.unit}</p>
          </div>

          {/* Количество */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => decreaseItem(product.sku)}
              className="w-8 h-8 flex items-center justify-center bg-surface-overlay rounded text-white hover:text-brand transition-colors"
            >
              −
            </button>
            <span className="text-sm font-bold text-white w-6 text-center">
              {product.quantity}
            </span>
            <button
              onClick={() => addItem(product.sku)}
              className="w-8 h-8 flex items-center justify-center bg-surface-overlay rounded text-white hover:text-brand transition-colors"
            >
              +
            </button>
          </div>

          {/* Сумма за позицию */}
          <div className="text-right shrink-0 w-24">
            <p className="text-sm font-bold text-white">
              {formatPrice(product.price * product.quantity)}
            </p>
          </div>

          {/* Удалить */}
          <button
            onClick={() => removeItem(product.sku)}
            className="text-text-muted hover:text-brand transition-colors shrink-0"
            aria-label="Удалить"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      ))}

      {/* Итого */}
      <div className="flex items-center justify-between py-4 border-t border-border">
        <span className="text-lg font-bold text-white">Итого:</span>
        <span className="text-xl font-bold text-brand">{formatPrice(total)}</span>
      </div>

      {/* Кнопки */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleOrder}
          className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3 rounded-lg transition-colors text-sm"
        >
          Оформить заказ через WhatsApp
        </button>
        <a
          href={`tel:+79244034203`}
          className="w-full text-center border border-border text-white hover:border-brand py-3 rounded-lg transition-colors text-sm"
        >
          Позвонить менеджеру
        </a>
        <button
          onClick={clearCart}
          className="text-text-muted hover:text-brand text-xs transition-colors"
        >
          Очистить корзину
        </button>
      </div>
    </div>
  );
}
