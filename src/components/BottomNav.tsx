"use client";

/**
 * Нижняя навигационная панель для мобильных устройств.
 * Каталог | Поиск | Корзина | ЛК
 */

import { useCart } from "./CartProvider";

interface BottomNavProps {
  onSearchClick: () => void;
}

export function BottomNav({ onSearchClick }: BottomNavProps) {
  const { totalItems } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface/95 backdrop-blur-sm border-t border-border">
      <div className="flex items-center justify-around h-14">
        <NavItem href="/" icon={<CatalogIcon />} label="Каталог" />
        <button
          onClick={onSearchClick}
          className="flex flex-col items-center gap-0.5 text-text-muted hover:text-white transition-colors"
        >
          <SearchIcon />
          <span className="text-[10px]">Поиск</span>
        </button>
        <NavItem
          href="/cart"
          icon={<CartIconNav />}
          label="Корзина"
          badge={totalItems > 0 ? totalItems : undefined}
        />
        <NavItem href="/lk" icon={<UserIcon />} label="ЛК" />
      </div>
    </nav>
  );
}

function NavItem({
  href,
  icon,
  label,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}) {
  return (
    <a
      href={href}
      className="relative flex flex-col items-center gap-0.5 text-text-muted hover:text-white transition-colors"
    >
      {icon}
      <span className="text-[10px]">{label}</span>
      {badge !== undefined && (
        <span className="absolute -top-1 right-0 translate-x-1/2 bg-brand text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {badge > 99 ? "99" : badge}
        </span>
      )}
    </a>
  );
}

function CatalogIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  );
}

function CartIconNav() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}
