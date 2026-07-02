import Link from "next/link";
import { getCategories } from "@/services/book.service";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, FolderOpen } from "lucide-react";

export const metadata = {
  title: "Categories",
  description: "Browse our book categories.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container px-4 md:px-6 py-10 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <FolderOpen className="h-8 w-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Browse by Category
        </h1>
      </div>

      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border rounded-lg border-dashed text-muted-foreground">
          <BookOpen className="h-10 w-10 opacity-20 mb-4" />
          <p>No categories available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all group cursor-pointer bg-background">
                <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full gap-4">
                  <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">{category.name}</h3>
                    {category.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
