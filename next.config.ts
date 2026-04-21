import type { NextConfig } from "next";

// Configuracion de Next: compilador de React y dominios permitidos para `next/image` (Unsplash, etc.).
const nextConfig: NextConfig = {
  // Activa el React Compiler cuando el proyecto lo soporta (Next 15+).
  reactCompiler: true,
  images: {
    // Solo estos hosts pueden usarse en `src` de <Image /> sin error de seguridad.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
};

export default nextConfig;
