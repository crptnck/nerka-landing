/**
 * Личный кабинет — заглушка.
 * В будущем здесь будет авторизация и история заказов.
 */

import { Header } from "@/components/Header";

export default function LkPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 pt-18 pb-20">
        <h1 className="text-xl font-bold text-white mb-6">Личный кабинет</h1>
        <div className="text-center py-16 bg-surface-raised border border-border rounded-xl">
          <p className="text-text-secondary mb-4">
            Личный кабинет скоро будет доступен
          </p>
          <p className="text-text-muted text-sm mb-6">
            Для оформления заказа свяжитесь с менеджером
          </p>
          <a
            href="tel:+79244034203"
            className="inline-block bg-brand hover:bg-brand-dark text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            +7 924 403-42-03
          </a>
        </div>
      </main>
    </>
  );
}
