"use client";

/**
 * Горизонтальный скролл чипов категорий.
 * "Все" — всегда первый чип. Активный чип подсвечен красным.
 */

interface CategoryChipsProps {
  categories: string[];
  active: string | null;
  onChange: (category: string | null) => void;
}

export function CategoryChips({ categories, active, onChange }: CategoryChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
      {/* Чип "Все" */}
      <Chip
        label="Все"
        isActive={active === null}
        onClick={() => onChange(null)}
      />
      {categories.map((cat) => (
        <Chip
          key={cat}
          label={cat}
          isActive={active === cat}
          onClick={() => onChange(cat)}
        />
      ))}
    </div>
  );
}

function Chip({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
        isActive
          ? "bg-brand text-white"
          : "bg-surface-raised text-text-secondary border border-border hover:border-text-muted"
      }`}
    >
      {label}
    </button>
  );
}
