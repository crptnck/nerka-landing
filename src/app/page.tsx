/**
 * Главная страница = Каталог.
 * Server Component: читает данные из products.json на сервере,
 * передаёт их в клиентский Catalog для интерактивности.
 */

import { getAllProducts, getCategories, getProductsData } from "@/lib/products";
import { Header } from "@/components/Header";
import { Catalog } from "@/components/Catalog";

export default function HomePage() {
  const products = getAllProducts();
  const categories = getCategories();
  const { lastUpdated } = getProductsData();

  return (
    <>
      <Header />

      {/* Основной контент с отступом от фиксированной шапки */}
      <main className="max-w-7xl mx-auto px-4 pt-18 pb-4">
        {/* Заголовок (скрыт визуально, но доступен для SEO и screen readers) */}
        <h1 className="sr-only">
          Каталог морепродуктов — nerka.pro
        </h1>

        <Catalog products={products} categories={categories} />

        {/* Футер с датой обновления */}
        <footer className="mt-8 py-4 border-t border-border text-center">
          <p className="text-xs text-text-muted">
            Прайс обновлён: {lastUpdated}
          </p>
          <p className="text-xs text-text-muted mt-1">
            nerka.pro · Оптовые поставки морепродуктов
          </p>
        </footer>
      </main>
    </>
  );
}
