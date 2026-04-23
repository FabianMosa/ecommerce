import { NextResponse } from "next/server";

import { products } from "../../data/store";

const MAX_QTY_PER_ITEM = 20;
const MAX_ITEMS = 30;

interface CheckoutItemInput {
  productId: number;
  quantity: number;
}

function isValidCheckoutItem(value: unknown): value is CheckoutItemInput {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    Number.isInteger(record.productId) &&
    Number.isInteger(record.quantity) &&
    (record.quantity as number) > 0
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const itemsInput = (body as { items?: unknown })?.items;

    if (!Array.isArray(itemsInput) || itemsInput.length === 0) {
      return NextResponse.json(
        { error: "Carrito invalido: sin items para procesar." },
        { status: 400 },
      );
    }

    if (itemsInput.length > MAX_ITEMS) {
      return NextResponse.json(
        { error: "Carrito invalido: supera el maximo de items permitido." },
        { status: 400 },
      );
    }

    const productById = new Map(
      products.map((product) => [product.id, product]),
    );
    const normalizedItems = itemsInput.map((item) =>
      isValidCheckoutItem(item) ? item : null,
    );

    if (normalizedItems.some((item) => item === null)) {
      return NextResponse.json(
        { error: "Formato de checkout invalido." },
        { status: 400 },
      );
    }

    const hasOutOfRangeQty = normalizedItems.some(
      (item) =>
        (item as CheckoutItemInput).quantity < 1 ||
        (item as CheckoutItemInput).quantity > MAX_QTY_PER_ITEM,
    );
    if (hasOutOfRangeQty) {
      return NextResponse.json(
        {
          error:
            "Cantidad invalida: cada item debe estar entre 1 y 20 unidades.",
        },
        { status: 400 },
      );
    }

    // Fuente de verdad: precios y metadata vienen del catálogo del servidor, no del cliente.
    const pricedItems = normalizedItems.map((item) => {
      const safeItem = item as CheckoutItemInput;
      const catalogProduct = productById.get(safeItem.productId);
      if (!catalogProduct) {
        return null;
      }

      return {
        productId: catalogProduct.id,
        name: catalogProduct.name,
        quantity: safeItem.quantity,
        unitPrice: catalogProduct.price,
        lineTotal: catalogProduct.price * safeItem.quantity,
      };
    });

    if (pricedItems.some((item) => item === null)) {
      return NextResponse.json(
        { error: "El carrito contiene productos no disponibles." },
        { status: 400 },
      );
    }

    const subtotal = pricedItems.reduce(
      (acc, item) => acc + (item as NonNullable<typeof item>).lineTotal,
      0,
    );

    return NextResponse.json({
      currency: "CLP",
      items: pricedItems,
      subtotal,
      total: subtotal,
      paymentMode: "demo-tokenized",
      paymentInstruction:
        "Demo PCI-safe: la tokenizacion real se realiza en PSP (no se captura PAN/CVV en este frontend).",
    });
  } catch {
    return NextResponse.json(
      { error: "No fue posible procesar el checkout." },
      { status: 400 },
    );
  }
}
