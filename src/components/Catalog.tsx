"use client";

/**
 * Каталог товаров — основной клиентский компонент главной страницы.
 * Объединяет поиск, фильтры по категориям и сетку товаров.
 * Данные передаются с сервера (SSR) через пропсы.
 */

import { useState, useMemo, useRef } from "react";
import type { Product } from "@/lib/types";
import { SearchBar } from "./SearchBar";
import { CategoryChips } from "./CategoryChips";
import { ProductGrid } from "./ProductGrid";
import { BottomNav } from "./BottomNav";

interface CatalogProps {
  products: Product[];
  categories: string[];
}

export function Catalog({ products, categories }: CatalogProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Фильтрация товаров по поиску и категории
  const filtered = useMemo(() => {
    let result = products;

    // Фильтр по категории
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Фильтр по поиску (по названию и артикулу)
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    return result;
  }, [products, search, activeCategory]);

  // Прокрутка к поисковой строке при нажатии "Поиск" в BottomNav
  const handleSearchClick = () => {
    searchRef.current?.scrollIntoView({ behavior: "smooth" });
    // Фокус на input после прокрутки
    setTimeout(() => {
      const input = searchRef.current?.querySelector("input");
      input?.focus();
    }, 300);
  };

  return (
    <>
      {/* Поиск и фильтры */}
      <div ref={searchRef} className="space-y-3 mb-6">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryChips
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* Счётчик результатов */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-text-muted">
          {filtered.length} {pluralize(filtered.length, "товар", "товара", "товаров")}
        </p>
        {(search || activeCategory) && (
          <button
            onClick={() => { setSearch(""); setActiveCategory(null); }}
            className="text-xs text-brand hover:underline"
          >
            Сбросить фильтры
          </button>
        )}
      </div>

      {/* Сетка товаров */}
      <ProductGrid products={filtered} />

      {/* Нижняя навигация (мобильные) */}
      <BottomNav onSearchClick={handleSearchClick} />

      {/* Отступ снизу для мобильной навигации */}
      <div className="h-16 md:h-0" />
    </>
  );
}

/** Простой плюрализатор для русского языка */
function pluralize(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}
