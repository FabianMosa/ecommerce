import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed idempotente para poder ejecutarlo varias veces sin duplicar registros.
  const categories = [
    {
      name: "Laptops",
      slug: "laptops",
      description: "Rendimiento para trabajo, estudio y gaming.",
    },
    {
      name: "Auriculares",
      slug: "auriculares",
      description: "Sonido inmersivo para tu dia a dia.",
    },
    {
      name: "Accesorios",
      slug: "accesorios",
      description: "Todo lo que complementa tu setup.",
    },
    {
      name: "Ofertas",
      slug: "ofertas",
      description: "Productos seleccionados a mejor precio.",
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  const auriculares = await prisma.category.findUniqueOrThrow({
    where: { slug: "auriculares" },
  });

  const accesorios = await prisma.category.findUniqueOrThrow({
    where: { slug: "accesorios" },
  });

  const products = [
    {
      sku: "AUD-PRO-001",
      name: "Auriculares inalambricos Pro",
      slug: "auriculares-inalambricos-pro",
      description: "Auriculares Bluetooth con cancelacion de ruido.",
      tagline: "Cancelacion de ruido y hasta 24h de bateria.",
      price: "59.99",
      image: "/images/auriculares-pro.jpg",
      stock: 50,
      categoryId: auriculares.id,
    },
    {
      sku: "KEY-MEC-002",
      name: "Teclado mecanico compacto",
      slug: "teclado-mecanico-compacto",
      description: "Teclado 75% con switches silenciosos.",
      tagline: "Switches silenciosos y retroiluminacion RGB.",
      price: "89.99",
      image: "/images/teclado-mecanico.jpg",
      stock: 40,
      categoryId: accesorios.id,
    },
  ];

  for (const item of products) {
    const product = await prisma.product.upsert({
      where: { slug: item.slug },
      update: {
        sku: item.sku,
        name: item.name,
        description: item.description,
        tagline: item.tagline,
        price: item.price,
        categoryId: item.categoryId,
      },
      create: {
        sku: item.sku,
        name: item.name,
        slug: item.slug,
        description: item.description,
        tagline: item.tagline,
        price: item.price,
        categoryId: item.categoryId,
      },
    });

    await prisma.inventory.upsert({
      where: { productId: product.id },
      update: { quantity: item.stock },
      create: { productId: product.id, quantity: item.stock, reserved: 0 },
    });

    const currentImage = await prisma.productImage.findFirst({
      where: { productId: product.id, sortOrder: 0 },
    });

    if (!currentImage) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: item.image,
          alt: item.name,
          sortOrder: 0,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Error running prisma seed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
