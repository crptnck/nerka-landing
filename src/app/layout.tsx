import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";

export const metadata: Metadata = {
  title: "nerka.pro — Оптовые морепродукты, снеки и закуски",
  description:
    "Оптовый интернет-магазин морепродуктов: нерка, кета, горбуша, икра, сушёные снеки. B2B поставки по России.",
  keywords:
    "морепродукты опт, рыба оптом, икра оптом, снеки оптом, нерка, кета, горбуша",
  openGraph: {
    title: "nerka.pro — Оптовые морепродукты",
    description: "B2B поставки морепродуктов по России",
    url: "https://nerka.pro",
    siteName: "nerka.pro",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        {/* Asap 400 — основной шрифт логотипа и текста */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Asap:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans min-h-screen">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
