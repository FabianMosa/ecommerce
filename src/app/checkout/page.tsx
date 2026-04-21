"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { formatPriceCLP } from "../lib/currency";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { items, subtotal, clearCart, removeFromCart, updateQuantity } = useCart();
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [validatedTotal, setValidatedTotal] = useState<number | null>(null);
  const [quantityDrafts, setQuantityDrafts] = useState<Record<number, string>>({});

  const commitQuantity = (productId: number) => {
    const draft = quantityDrafts[productId];
    // Mientras el usuario borra temporalmente el campo, no mutamos el carrito.
    if (typeof draft !== "string") {
      return;
    }

    if (draft.trim() === "") {
      setQuantityDrafts((prev) => {
        const next = { ...prev };
        delete next[productId];
        return next;
      });
      return;
    }

    const parsed = Number(draft);
    if (!Number.isFinite(parsed)) {
      setQuantityDrafts((prev) => {
        const next = { ...prev };
        delete next[productId];
        return next;
      });
      return;
    }

    // Eliminar queda como acción explícita: botón "Quitar" o cantidad confirmada < 1.
    updateQuantity(productId, parsed);
    setQuantityDrafts((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCheckoutError(null);
    setValidatedTotal(null);

    if (items.length === 0) {
      setCheckoutError("Debes agregar al menos un producto para continuar.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });

      const payload = (await response.json()) as
        | { total: number }
        | { error?: string };
      if (!response.ok || !("total" in payload)) {
        setCheckoutError(
          "error" in payload && payload.error
            ? payload.error
            : "No fue posible validar tu checkout.",
        );
        return;
      }

      // El monto final usado para confirmar es el total recalculado en backend.
      setValidatedTotal(payload.total);
      clearCart();
      setPurchaseCompleted(true);
    } catch {
      setCheckoutError("No fue posible conectar con el validador de checkout.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8 lg:py-12">
        <section className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Checkout basico
            </h1>
            <p className="text-sm text-slate-600">
              Completa tus datos para finalizar una compra estandar.
            </p>
          </div>

          {purchaseCompleted ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <h2 className="text-lg font-semibold text-emerald-900">
                Pago registrado correctamente
              </h2>
              <p className="mt-1 text-sm text-emerald-800">
                Tu pedido se genero y enviamos la confirmacion a tu correo.
              </p>
              {validatedTotal !== null ? (
                <p className="mt-2 text-sm font-medium text-emerald-900">
                  Total validado por servidor: {formatPriceCLP(validatedTotal)}
                </p>
              ) : null}
              <Link
                href="/"
                className="mt-4 inline-flex rounded-full bg-emerald-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              >
                Volver a la tienda
              </Link>
            </div>
          ) : (
            <form
              className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 sm:p-6"
              onSubmit={handleSubmit}
            >
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                Nombre completo
                <input
                  required
                  name="fullName"
                  className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Tu nombre"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-slate-700">
                Correo electronico
                <input
                  required
                  name="email"
                  type="email"
                  className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="nombre@correo.com"
                />
              </label>
              <label className="sm:col-span-2 flex flex-col gap-1 text-sm text-slate-700">
                Direccion de envio
                <input
                  required
                  name="address"
                  className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Calle, numero, comuna"
                />
              </label>
              <div className="sm:col-span-2 rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm text-blue-900">
                <p className="font-medium">Pago estandar (modo demo PCI-safe)</p>
                <p className="mt-1 text-blue-800">
                  Este frontend no captura numero de tarjeta ni CVV. En producción,
                  estos datos se tokenizan directamente en el PSP.
                </p>
              </div>

              {checkoutError ? (
                <p className="sm:col-span-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
                  {checkoutError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={items.length === 0 || isSubmitting}
                className="sm:col-span-2 inline-flex justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {isSubmitting ? "Validando checkout..." : "Confirmar pago"}
              </button>
            </form>
          )}
        </section>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Resumen de compra</h2>
          {items.length === 0 ? (
            <p className="mt-3 text-sm text-slate-600">
              Tu carrito esta vacio.{" "}
              <Link href="/" className="font-medium text-blue-700 hover:text-blue-800">
                Volver al catalogo
              </Link>
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="rounded-xl border border-slate-200 p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {formatPriceCLP(item.product.price)} c/u
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-xs font-medium text-rose-700 hover:text-rose-800"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Quitar
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <label
                      htmlFor={`qty-${item.product.id}`}
                      className="text-xs text-slate-600"
                    >
                      Cantidad
                    </label>
                    <input
                      id={`qty-${item.product.id}`}
                      type="number"
                      min={1}
                      max={20}
                      value={
                        Object.prototype.hasOwnProperty.call(
                          quantityDrafts,
                          item.product.id,
                        )
                          ? quantityDrafts[item.product.id]
                          : String(item.quantity)
                      }
                      className="w-20 rounded-md border border-slate-300 px-2 py-1 text-sm"
                      onChange={(event) =>
                        setQuantityDrafts((prev) => ({
                          ...prev,
                          [item.product.id]: event.target.value,
                        }))
                      }
                      onBlur={() => commitQuantity(item.product.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          commitQuantity(item.product.id);
                        }
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>{formatPriceCLP(subtotal)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-base font-semibold text-slate-900">
              <span>Total</span>
              <span>{formatPriceCLP(subtotal)}</span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
