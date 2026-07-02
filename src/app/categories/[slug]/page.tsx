import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug } from "@/services/book.service";
import { BookCard } from "@/components/books/book-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Library } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = await getCategoryBySlug(resolvedParams.slug);
  
  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.name} Books`,
    description: category.description || `Browse our collection of ${category.name} books.`,
  };
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = await getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="container px-4 md:px-6 py-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" size="sm" className="mb-4 -ml-3 text-muted-foreground" render={<Link href="/categories" />}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Categories
        </Button>
        <div className="flex items-center gap-3">
          <Library className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {category.name} Books
          </h1>
        </div>
        {category.description && (
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl">
            {category.description}
          </p>
        )}
      </div>

      <div className="border-t pt-8">
        {category.books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border rounded-lg border-dashed text-muted-foreground bg-muted/20">
            <Library className="h-10 w-10 opacity-20 mb-4" />
            <p className="text-lg font-medium text-foreground">No books found.</p>
            <p>We are currently restocking this category. Check back soon!</p>
            <Button variant="outline" className="mt-6" render={<Link href="/books" />}>
              Browse All Books
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {category.books.map((book) => (
              <BookCard key={book.id} book={book as any} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
