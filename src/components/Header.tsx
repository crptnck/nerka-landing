"use client";

/**
 * Шапка сайта.
 * Фиксированная, чёрный фон.
 * Десктоп: логотип слева, телефон справа.
 * Мобильные: логотип слева, бургер-меню справа.
 */

import { useState } from "react";
import { Logo } from "./Logo";

const PHONE = "+7 924 403-42-03";
const PHONE_HREF = "tel:+79244034203";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Логотип */}
        <Logo />

        {/* Телефон — только десктоп */}
        <a
          href={PHONE_HREF}
          className="hidden md:flex items-center gap-2 text-white hover:text-brand transition-colors text-sm font-medium"
        >
          <PhoneIcon />
          {PHONE}
        </a>

        {/* Бургер — только мобильные */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-white"
          aria-label="Меню"
        >
          {menuOpen ? <CloseIcon /> : <BurgerIcon />}
        </button>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <nav className="md:hidden bg-surface border-b border-border px-4 pb-4">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 py-3 text-white hover:text-brand transition-colors"
          >
            <PhoneIcon />
            {PHONE}
          </a>
          <a
            href="/cart"
            className="flex items-center gap-2 py-3 text-white hover:text-brand transition-colors"
          >
            <CartIcon />
            Корзина
          </a>
        </nav>
      )}
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12h18M3 6h18M3 18h18"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  );
}
