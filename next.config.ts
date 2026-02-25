import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Оптимизация изображений
  images: {
    formats: ["image/webp"],
  },
  // Строгий режим React для лучшего качества кода
  reactStrictMode: true,
};

export default nextConfig;
