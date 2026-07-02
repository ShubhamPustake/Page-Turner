import { PrismaClient, Role, OrderStatus, PaymentStatus, PaymentProvider, DiscountType, AddressType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create Publisher
  const publisher = await prisma.publisher.upsert({
    where: { slug: "penguin-classics" },
    update: {},
    create: {
      name: "Penguin Classics",
      slug: "penguin-classics",
      description: "Timeless books and classic literature.",
    },
  });

  // 2. Create Categories
  const fictionCategory = await prisma.category.upsert({
    where: { slug: "fiction" },
    update: {},
    create: { name: "Fiction", slug: "fiction", description: "Fictional literature." },
  });

  const sciFiCategory = await prisma.category.upsert({
    where: { slug: "sci-fi" },
    update: {},
    create: { name: "Science Fiction", slug: "sci-fi", description: "Sci-fi and fantasy." },
  });

  // 3. Create Author
  const author = await prisma.author.upsert({
    where: { slug: "frank-herbert" },
    update: {},
    create: {
      name: "Frank Herbert",
      slug: "frank-herbert",
      bio: "An American science fiction writer best known for the novel Dune.",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400&h=400",
    },
  });

  // 4. Create Book
  const book = await prisma.book.upsert({
    where: { slug: "dune" },
    update: {},
    create: {
      title: "Dune",
      slug: "dune",
      description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides...",
      isbn: "9780441172719",
      publicationDate: new Date("1965-08-01"),
      language: "English",
      pages: 412,
      format: "Paperback",
      price: 19.99,
      discount: 0,
      rating: 4.8,
      coverImage: "https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=600&h=900",
      images: ["https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80"],
      isFeatured: true,
      isBestSeller: true,
      publisherId: publisher.id,
      authors: {
        connect: [{ id: author.id }],
      },
      categories: {
        connect: [{ id: fictionCategory.id }, { id: sciFiCategory.id }],
      },
      inventory: {
        create: {
          sku: "DUNE-PB-001",
          quantity: 150,
          lowStockThreshold: 20,
        },
      },
    },
  });

  console.log(`Created book: ${book.title}`);
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
