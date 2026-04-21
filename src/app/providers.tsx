"use client";

import { CartProvider } from "./context/CartContext";

// Centraliza providers cliente para compartir estado entre home y checkout.
export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
