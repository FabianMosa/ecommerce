import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
