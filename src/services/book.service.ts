import db from "@/lib/db";

export const getFeaturedBooks = async (limit = 4) => {
  return db.book.findMany({
    where: { isFeatured: true },
    take: limit,
    include: {
      authors: true,
      categories: true,
    },
  });
};

export const getBestSellers = async (limit = 4) => {
  return db.book.findMany({
    where: { isBestSeller: true },
    take: limit,
    include: {
      authors: true,
      categories: true,
    },
  });
};

export const getNewArrivals = async (limit = 4) => {
  return db.book.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      authors: true,
      categories: true,
    },
  });
};

export const getBooks = async (params?: {
  categoryId?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const { categoryId, search, page = 1, limit = 12 } = params || {};
  const skip = (page - 1) * limit;

  return db.book.findMany({
    where: {
      ...(categoryId && { categories: { some: { id: categoryId } } }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { authors: { some: { name: { contains: search, mode: "insensitive" } } } },
        ],
      }),
    },
    include: {
      authors: true,
    },
    skip,
    take: limit,
  });
};

export const getBookBySlug = async (slug: string) => {
  return db.book.findUnique({
    where: { slug },
    include: {
      authors: true,
      categories: true,
      publisher: true,
      inventory: true,
      reviews: {
        include: {
          user: {
            select: { name: true, image: true },
          },
        },
      },
    },
  });
};

export const getCategories = async () => {
  return db.category.findMany();
};
