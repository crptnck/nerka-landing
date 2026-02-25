# nerka.pro — Оптовый интернет-магазин морепродуктов

B2B e-commerce сайт для оптовых поставок морепродуктов, снеков и закусок.

## Стек

- **Next.js 15** (App Router, React Server Components, TypeScript)
- **Tailwind CSS v4** (CSS-based theme)
- **Без тяжёлых зависимостей** — только React, Next.js, Tailwind

## Структура

```
data/products.json     — база товаров (обновляется AI-агентом)
scripts/parse-excel.mjs — парсер Excel → products.json
src/app/               — страницы (каталог, корзина, ЛК)
src/components/        — UI-компоненты
src/lib/               — типы и утилиты
```

## Обновление товаров (для AI-агента)

### Способ 1: Excel → JSON → Git Push (рекомендуемый)

```bash
# 1. Парсим Excel-файл менеджера
node scripts/parse-excel.mjs path/to/price-list.xlsx

# 2. Проверяем результат
cat data/products.json | head -20

# 3. Коммитим и пушим
git add data/products.json
git commit -m "Обновление прайса от [дата]"
git push origin main
```

Vercel автоматически пересоберёт сайт.

### Способ 2: API (для dev-окружения)

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $UPDATE_TOKEN" \
  -d @data/products.json
```

### Формат Excel

Ожидаемые колонки (порядок не важен):
- Артикул
- Название товара
- Категория
- Цена (руб)
- Единица (кг/уп/шт)
- Остаток
- Акция (да/нет)
- Описание акции

## Разработка

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Деплой

Подключен к Vercel. Пуш в `main` → автоматический деплой на nerka.pro.

---
**Made by:** pik + AI
