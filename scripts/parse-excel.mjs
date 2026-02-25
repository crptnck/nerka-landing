#!/usr/bin/env node

/**
 * Скрипт парсинга Excel-файла с товарами → products.json
 *
 * ИСПОЛЬЗОВАНИЕ:
 *   node scripts/parse-excel.mjs путь/к/файлу.xlsx
 *
 * ОЖИДАЕМЫЕ КОЛОНКИ В EXCEL (порядок не важен, ищется по заголовку):
 *   - Артикул        → sku
 *   - Название товара → name
 *   - Категория       → category
 *   - Цена            → price (число, руб)
 *   - Единица         → unit (кг/уп/шт, по умолчанию "кг")
 *   - Остаток         → stock (число)
 *   - Акция           → onSale (да/нет/1/0)
 *   - Описание акции  → saleDescription
 *
 * РЕЗУЛЬТАТ:
 *   Обновляет /data/products.json
 *
 * ПРИМЕЧАНИЕ:
 *   Этот скрипт предназначен для AI-агента, который будет запускать его
 *   каждый понедельник после получения Excel-файла от менеджера.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// xlsx — установлен как devDependency
import XLSX from "xlsx";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRODUCTS_PATH = resolve(__dirname, "../data/products.json");

// Маппинг заголовков Excel → поля Product
const COLUMN_MAP = {
  артикул: "sku",
  "название товара": "name",
  название: "name",
  категория: "category",
  цена: "price",
  "цена оптовая": "price",
  единица: "unit",
  "ед.": "unit",
  остаток: "stock",
  акция: "onSale",
  "описание акции": "saleDescription",
};

function parseExcel(filePath) {
  console.log(`📄 Читаю файл: ${filePath}`);

  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  console.log(`📊 Найдено строк: ${rows.length}`);

  if (rows.length === 0) {
    console.error("❌ Файл пуст или не содержит данных");
    process.exit(1);
  }

  // Определяем маппинг колонок
  const headers = Object.keys(rows[0]);
  const mapping = {};

  for (const header of headers) {
    const normalized = header.toLowerCase().trim();
    for (const [pattern, field] of Object.entries(COLUMN_MAP)) {
      if (normalized.includes(pattern)) {
        mapping[header] = field;
        break;
      }
    }
  }

  console.log(`🔗 Маппинг колонок:`, mapping);

  // Проверяем обязательные поля
  const mappedFields = new Set(Object.values(mapping));
  const required = ["sku", "name", "price"];
  for (const field of required) {
    if (!mappedFields.has(field)) {
      console.error(`❌ Не найдена обязательная колонка: ${field}`);
      console.error(`   Доступные заголовки: ${headers.join(", ")}`);
      process.exit(1);
    }
  }

  // Читаем существующие товары для сохранения изображений
  let existingProducts = {};
  try {
    const existing = JSON.parse(readFileSync(PRODUCTS_PATH, "utf-8"));
    for (const p of existing.products) {
      existingProducts[p.sku] = p;
    }
  } catch {
    // Нет существующего файла — ОК
  }

  // Парсим строки
  const products = rows
    .map((row) => {
      const product = {};

      for (const [header, field] of Object.entries(mapping)) {
        product[field] = row[header];
      }

      // Пропускаем строки без артикула
      if (!product.sku) return null;

      // Нормализация полей
      const sku = String(product.sku).trim();
      const existing = existingProducts[sku];

      return {
        sku,
        name: String(product.name || "").trim(),
        category: String(product.category || "Без категории").trim(),
        price: parseFloat(product.price) || 0,
        unit: normalizeUnit(product.unit),
        stock: parseInt(product.stock) || 0,
        onSale: parseBool(product.onSale),
        saleDescription: String(product.saleDescription || "").trim(),
        // Сохраняем изображение из существующих данных, иначе placeholder
        image: existing?.image || "/images/placeholder.svg",
      };
    })
    .filter(Boolean);

  console.log(`✅ Обработано товаров: ${products.length}`);

  // Записываем результат
  const data = {
    lastUpdated: new Date().toISOString().split("T")[0],
    products,
  };

  writeFileSync(PRODUCTS_PATH, JSON.stringify(data, null, 2), "utf-8");
  console.log(`💾 Сохранено в: ${PRODUCTS_PATH}`);
  console.log(`📅 Дата обновления: ${data.lastUpdated}`);
}

function normalizeUnit(value) {
  const v = String(value || "кг").toLowerCase().trim();
  if (v.includes("уп")) return "уп";
  if (v.includes("шт")) return "шт";
  return "кг";
}

function parseBool(value) {
  if (typeof value === "boolean") return value;
  const v = String(value).toLowerCase().trim();
  return v === "да" || v === "yes" || v === "1" || v === "true";
}

// Запуск
const filePath = process.argv[2];

if (!filePath) {
  console.error("❌ Укажите путь к Excel-файлу");
  console.error("   Использование: node scripts/parse-excel.mjs файл.xlsx");
  process.exit(1);
}

parseExcel(resolve(process.cwd(), filePath));
