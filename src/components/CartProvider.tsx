"use client";

/**
 * Контекст корзины.
 * Хранит состояние корзины в localStorage для персистентности.
 * Лёгкая реализация без внешних зависимостей.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import type { CartItem, Product } from "@/lib/types";

interface CartContextType {
  /** Элементы корзины */
  items: CartItem[];
  /** Добавить товар (или увеличить количество) */
  addItem: (sku: string) => void;
  /** Убавить количество товара */
  decreaseItem: (sku: string) => void;
  /** Удалить товар из корзины полностью */
  removeItem: (sku: string) => void;
  /** Очистить корзину */
  clearCart: () => void;
  /** Получить количество конкретного товара */
  getQuantity: (sku: string) => number;
  /** Общее количество позиций в корзине */
  totalItems: number;
  /** Вычислить общую сумму (нужен массив продуктов) */
  calcTotal: (products: Product[]) => number;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "nerka_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Загрузить корзину из localStorage при монтировании
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Игнорируем ошибки парсинга
    }
    setLoaded(true);
  }, []);

  // Сохранять корзину в localStorage при изменении
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, loaded]);

  const addItem = useCallback((sku: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.sku === sku);
      if (existing) {
        return prev.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { sku, quantity: 1 }];
    });
  }, []);

  const decreaseItem = useCallback((sku: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.sku === sku);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter((i) => i.sku !== sku);
      }
      return prev.map((i) =>
        i.sku === sku ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  }, []);

  const removeItem = useCallback((sku: string) => {
    setItems((prev) => prev.filter((i) => i.sku !== sku));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getQuantity = useCallback(
    (sku: string) => {
      return items.find((i) => i.sku === sku)?.quantity ?? 0;
    },
    [items]
  );

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const calcTotal = useCallback(
    (products: Product[]) => {
      return items.reduce((sum, item) => {
        const product = products.find((p) => p.sku === item.sku);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0);
    },
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        decreaseItem,
        removeItem,
        clearCart,
        getQuantity,
        totalItems,
        calcTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/** Хук для использования корзины в компонентах */
export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
