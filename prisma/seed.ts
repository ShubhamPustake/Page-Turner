import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create Publishers
  const penguin = await prisma.publisher.upsert({
    where: { slug: "penguin-classics" },
    update: {},
    create: {
      name: "Penguin Classics",
      slug: "penguin-classics",
      description: "Timeless books and classic literature.",
    },
  });

  const tor = await prisma.publisher.upsert({
    where: { slug: "tor-books" },
    update: {},
    create: {
      name: "Tor Books",
      slug: "tor-books",
      description: "Science fiction and fantasy publisher.",
    },
  });

  // 2. Create Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "fiction" },
      update: {},
      create: { name: "Fiction", slug: "fiction", description: "Fictional literature." },
    }),
    prisma.category.upsert({
      where: { slug: "sci-fi" },
      update: {},
      create: { name: "Science Fiction", slug: "sci-fi", description: "Sci-fi and space operas." },
    }),
    prisma.category.upsert({
      where: { slug: "fantasy" },
      update: {},
      create: { name: "Fantasy", slug: "fantasy", description: "Magic and mythical worlds." },
    }),
    prisma.category.upsert({
      where: { slug: "mystery" },
      update: {},
      create: { name: "Mystery", slug: "mystery", description: "Whodunits and thrillers." },
    }),
    prisma.category.upsert({
      where: { slug: "romance" },
      update: {},
      create: { name: "Romance", slug: "romance", description: "Love stories and romance." },
    })
  ]);

  const [fiction, sciFi, fantasy, mystery, romance] = categories;

  // 3. Create Authors
  const authors = await Promise.all([
    prisma.author.upsert({
      where: { slug: "frank-herbert" },
      update: {},
      create: {
        name: "Frank Herbert",
        slug: "frank-herbert",
        bio: "An American science fiction writer best known for the novel Dune.",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400&h=400",
      },
    }),
    prisma.author.upsert({
      where: { slug: "jrr-tolkien" },
      update: {},
      create: {
        name: "J.R.R. Tolkien",
        slug: "jrr-tolkien",
        bio: "English writer and philologist, author of The Lord of the Rings.",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400&h=400",
      },
    }),
    prisma.author.upsert({
      where: { slug: "agatha-christie" },
      update: {},
      create: {
        name: "Agatha Christie",
        slug: "agatha-christie",
        bio: "English writer known for her detective novels.",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400&h=400",
      },
    })
  ]);

  const [frank, tolkien, agatha] = authors;

  // 4. Create Books
  const books = [
    {
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
      isFeatured: true,
      isBestSeller: true,
      publisherId: tor.id,
      authorId: frank.id,
      categoryIds: [fiction.id, sciFi.id],
      sku: "DUNE-PB-001"
    },
    {
      title: "The Fellowship of the Ring",
      slug: "fellowship-ring",
      description: "The first part of J.R.R. Tolkien's epic masterpiece The Lord of the Rings.",
      isbn: "9780547928210",
      publicationDate: new Date("1954-07-29"),
      language: "English",
      pages: 432,
      format: "Paperback",
      price: 14.99,
      discount: 10,
      rating: 4.9,
      coverImage: "https://images.unsplash.com/photo-1629196914275-f7e48b8db4e5?auto=format&fit=crop&q=80&w=600&h=900",
      isFeatured: true,
      isBestSeller: true,
      publisherId: penguin.id,
      authorId: tolkien.id,
      categoryIds: [fiction.id, fantasy.id],
      sku: "FOTR-PB-001"
    },
    {
      title: "Murder on the Orient Express",
      slug: "murder-orient",
      description: "Just after midnight, a snowdrift stops the Orient Express in its tracks...",
      isbn: "9780062073501",
      publicationDate: new Date("1934-01-01"),
      language: "English",
      pages: 274,
      format: "Hardcover",
      price: 24.99,
      discount: 0,
      rating: 4.7,
      coverImage: "https://images.unsplash.com/photo-1587876931563-37c223c713be?auto=format&fit=crop&q=80&w=600&h=900",
      isFeatured: false,
      isBestSeller: true,
      publisherId: penguin.id,
      authorId: agatha.id,
      categoryIds: [fiction.id, mystery.id],
      sku: "MOTOE-HC-001"
    },
    {
      title: "Dune Messiah",
      slug: "dune-messiah",
      description: "Book Two in the Magnificent Dune Chronicles.",
      isbn: "9780441172696",
      publicationDate: new Date("1969-01-01"),
      language: "English",
      pages: 336,
      format: "Paperback",
      price: 12.99,
      discount: 0,
      rating: 4.5,
      coverImage: "https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=600&h=900",
      isFeatured: false,
      isBestSeller: false,
      publisherId: tor.id,
      authorId: frank.id,
      categoryIds: [fiction.id, sciFi.id],
      sku: "DUNEM-PB-001"
    }
  ];

  for (const b of books) {
    const book = await prisma.book.upsert({
      where: { slug: b.slug },
      update: {},
      create: {
        title: b.title,
        slug: b.slug,
        description: b.description,
        isbn: b.isbn,
        publicationDate: b.publicationDate,
        language: b.language,
        pages: b.pages,
        format: b.format,
        price: b.price,
        discount: b.discount,
        rating: b.rating,
        coverImage: b.coverImage,
        images: b.coverImage ? [b.coverImage] : [],
        isFeatured: b.isFeatured,
        isBestSeller: b.isBestSeller,
        publisherId: b.publisherId,
        authors: {
          connect: [{ id: b.authorId }],
        },
        categories: {
          connect: b.categoryIds.map(id => ({ id })),
        },
        inventory: {
          create: {
            sku: b.sku,
            quantity: 100,
            lowStockThreshold: 10,
          },
        },
      },
    });
    console.log(`Created book: ${book.title}`);
  }

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
