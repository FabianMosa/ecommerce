// Layout raiz de App Router: fuentes, metadatos SEO y envoltorio HTML compartido por todas las rutas.
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fuentes de Next.js con variables CSS para usarlas en Tailwind (`font-sans` / `font-mono` via @theme).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// URL canonica para Open Graph; en produccion debe apuntar al dominio real via NEXT_PUBLIC_SITE_URL.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fabian-store.example.com";

export const metadata: Metadata = {
  title: "Fabian Store | Ecommerce simple",
  description:
    "Tienda online de ejemplo para mostrar productos destacados y práctica de portafolio. Tecnología, gadgets y accesorios.",
  keywords: ["ecommerce", "tienda", "gadgets", "tecnología", "portafolio"],
  authors: [{ name: "Fabian Store" }],
  openGraph: {
    title: "Fabian Store | Ecommerce simple",
    description:
      "Tienda online de ejemplo. Encuentra tu próximo gadget favorito.",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabian Store | Ecommerce simple",
    description:
      "Tienda online de ejemplo. Encuentra tu próximo gadget favorito.",
  },
  robots: "index, follow",
};

// Children corresponde al contenido de cada `page.tsx` bajo `src/app/`.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
