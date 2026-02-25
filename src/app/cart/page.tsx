/**
 * Страница корзины.
 * Server Component обёртка — данные товаров берутся из products.json.
 */

import { getAllProducts } from "@/lib/products";
import { Header } from "@/components/Header";
import { CartContent } from "@/components/CartContent";

export default function CartPage() {
  const products = getAllProducts();

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 pt-18 pb-20">
        <h1 className="text-xl font-bold text-white mb-6">Корзина</h1>
        <CartContent products={products} />
      </main>
    </>
  );
}
