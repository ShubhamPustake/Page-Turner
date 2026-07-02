import { getBooks, getCategories } from "@/services/book.service";
import { BookCard } from "@/components/books/book-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search } from "lucide-react";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  
  const categoryId = typeof resolvedParams.category === "string" ? resolvedParams.category : undefined;
  const search = typeof resolvedParams.q === "string" ? resolvedParams.q : undefined;
  
  const [books, categories] = await Promise.all([
    getBooks({ categoryId, search, limit: 24 }),
    getCategories(),
  ]);

  return (
    <div className="container py-8 md:py-12 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Browse Books</h1>
          <p className="text-muted-foreground mt-1">
            {books.length} {books.length === 1 ? "book" : "books"} found
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="hidden md:flex flex-col gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Categories</h3>
            <div className="flex flex-col gap-2">
              <Link 
                href="/books"
                className={`text-sm ${!categoryId ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                All Books
              </Link>
              {categories.map((c) => (
                <Link 
                  key={c.id} 
                  href={`/books?category=${c.id}`}
                  className={`text-sm ${categoryId === c.id ? "font-bold text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <div className="md:col-span-3">
          {books.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center border rounded-xl border-dashed">
              <Search className="h-10 w-10 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No books found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find any books matching your criteria.
              </p>
              <Button render={<Link href="/books" />}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
