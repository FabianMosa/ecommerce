"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  startTransition,
} from "react";

import type { CartItem, Product } from "../types";

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CART_STORAGE_KEY = "ecommerce-cart-v1";
const MIN_PRODUCT_ID = 1;
const MAX_PRODUCT_ID = 1_000_000_000;
const MIN_PRICE = 1;
const MAX_PRICE = 10_000_000;
const MAX_TAGLINE_LENGTH = 220;
const MAX_NAME_LENGTH = 120;
const MAX_QTY_PER_ITEM = 20;
const CartContext = createContext<CartContextValue | undefined>(undefined);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeImages(input: unknown): Product["images"] {
  if (!Array.isArray(input)) {
    return undefined;
  }

  const sanitized = input
    .filter((image) => isRecord(image))
    .map((image) => {
      const url = typeof image.url === "string" ? image.url.trim() : "";
      const alt = typeof image.alt === "string" ? image.alt.trim() : undefined;
      if (!url) {
        return null;
      }

      return { url, alt };
    })
    .filter((image): image is NonNullable<typeof image> => Boolean(image));

  return sanitized.length > 0 ? sanitized : undefined;
}

function sanitizeProduct(input: unknown): Product | null {
  if (!isRecord(input)) {
    return null;
  }

  const id = Number(input.id);
  const price = Number(input.price);
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const tagline = typeof input.tagline === "string" ? input.tagline.trim() : "";

  if (
    !Number.isInteger(id) ||
    id < MIN_PRODUCT_ID ||
    id > MAX_PRODUCT_ID ||
    !Number.isInteger(price) ||
    price < MIN_PRICE ||
    price > MAX_PRICE ||
    name.length === 0 ||
    name.length > MAX_NAME_LENGTH ||
    tagline.length === 0 ||
    tagline.length > MAX_TAGLINE_LENGTH
  ) {
    return null;
  }

  const image =
    typeof input.image === "string" && input.image.trim().length > 0
      ? input.image.trim()
      : undefined;

  return {
    id,
    name,
    price,
    tagline,
    image,
    images: normalizeImages(input.images),
  };
}

function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) {
    return 1;
  }

  const normalized = Math.floor(quantity);
  return Math.min(MAX_QTY_PER_ITEM, Math.max(1, normalized));
}

function safeParseCart(raw: string): CartItem[] {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    // Sanitiza estructura completa para impedir persistir payloads maliciosos o corruptos.
    return parsed
      .map((item) => {
        if (!isRecord(item)) {
          return null;
        }

        const product = sanitizeProduct(item.product);
        if (!product) {
          return null;
        }

        const rawQty = Number(item.quantity);
        if (!Number.isFinite(rawQty) || rawQty <= 0) {
          return null;
        }

        return { product, quantity: clampQuantity(rawQty) };
      })
      .filter((item): item is CartItem => Boolean(item));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Siempre igual al SSR en el primer render ([]): leer `localStorage` solo en el cliente
  // despues del mount evita mismatch de hidratacion (servidor 0 vs cliente con items guardados).
  const [items, setItems] = useState<CartItem[]>([]);
  const skipFirstPersist = useRef(true);

  useEffect(() => {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    const next = stored ? safeParseCart(stored) : [];
    // startTransition evita setState sincrono directo en el cuerpo del effect (eslint react-hooks/set-state-in-effect)
    // y marca la restauracion como no urgente; el primer paint sigue alineado con SSR ([]).
    startTransition(() => {
      setItems(next);
    });
  }, []);

  useEffect(() => {
    // No persistir el estado inicial vacio antes de restaurar desde localStorage (evita borrar el carrito).
    if (skipFirstPersist.current) {
      skipFirstPersist.current = false;
      return;
    }
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: clampQuantity(item.quantity + 1) }
            : item,
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity < 1 || !Number.isFinite(quantity)) {
        removeFromCart(productId);
        return;
      }

      const safeQty = clampQuantity(quantity);
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity: safeQty } : item,
        ),
      );
    },
    [removeFromCart],
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );
  const subtotal = useMemo(
    () =>
      items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      totalItems,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [items, totalItems, subtotal, addToCart, removeFromCart, updateQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
}
