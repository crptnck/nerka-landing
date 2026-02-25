/**
 * Типы данных для nerka.pro
 * Используется как единственный источник правды для структуры данных.
 * AI-агент должен следовать этим типам при обновлении products.json.
 */

/** Единица измерения цены */
export type PriceUnit = "кг" | "уп" | "шт";

/** Товар в каталоге */
export interface Product {
  /** Уникальный артикул товара (из Excel-колонки "Артикул") */
  sku: string;
  /** Название товара */
  name: string;
  /** Категория (например: "Рыба", "Снеки", "Икра") */
  category: string;
  /** Оптовая цена в рублях */
  price: number;
  /** Единица измерения цены */
  unit: PriceUnit;
  /** Остаток на складе */
  stock: number;
  /** Товар участвует в акции */
  onSale: boolean;
  /** Описание акции (если onSale = true) */
  saleDescription: string;
  /** URL изображения товара (относительный путь) */
  image: string;
}

/** Структура файла products.json */
export interface ProductsData {
  /** Дата последнего обновления (ISO формат) */
  lastUpdated: string;
  /** Массив товаров */
  products: Product[];
}

/** Элемент корзины */
export interface CartItem {
  /** Артикул товара */
  sku: string;
  /** Количество */
  quantity: number;
}
