/**
 * Логотип nerka.pro
 * "nerka" — красный (#f20019), точка после "a" — белая, "pro" — красный.
 * Шрифт: Asap 400.
 */
export function Logo() {
  return (
    <a href="/" className="flex items-center text-xl sm:text-2xl font-normal tracking-tight">
      <span className="text-brand">nerka</span>
      <span className="text-white">.</span>
      <span className="text-brand">pro</span>
    </a>
  );
}
