/**
 * API эндпоинт для управления товарами.
 *
 * GET  /api/products — получить текущий список товаров
 * POST /api/products — обновить products.json (для AI-агента)
 *
 * POST принимает JSON в формате ProductsData (см. types.ts).
 * Авторизация через заголовок Authorization: Bearer <token>.
 * Токен задаётся в переменной окружения UPDATE_TOKEN.
 */

import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const PRODUCTS_PATH = resolve(process.cwd(), "data/products.json");

export async function GET() {
  try {
    const data = readFileSync(PRODUCTS_PATH, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ error: "Products not found" }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  // Проверка токена авторизации
  const token = process.env.UPDATE_TOKEN;
  if (token) {
    const auth = request.headers.get("Authorization");
    if (auth !== `Bearer ${token}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const body = await request.json();

    // Валидация базовой структуры
    if (!body.products || !Array.isArray(body.products)) {
      return NextResponse.json(
        { error: "Invalid format: expected { products: [...] }" },
        { status: 400 }
      );
    }

    // Добавляем дату обновления если не указана
    if (!body.lastUpdated) {
      body.lastUpdated = new Date().toISOString().split("T")[0];
    }

    writeFileSync(PRODUCTS_PATH, JSON.stringify(body, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      count: body.products.length,
      lastUpdated: body.lastUpdated,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update products", details: String(error) },
      { status: 500 }
    );
  }
}
