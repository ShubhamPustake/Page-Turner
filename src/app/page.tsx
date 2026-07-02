import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookCard } from "@/components/books/book-card";
import { getBestSellers, getNewArrivals, getCategories } from "@/services/book.service";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen } from "lucide-react";

export default async function Home() {
  const [bestsellers, newArrivals, categories] = await Promise.all([
    getBestSellers(4),
    getNewArrivals(4),
    getCategories(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-muted/30 overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors" variant="secondary">
            Welcome to Page Turner
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl">
            Turn Every Page into a <span className="text-primary">New Adventure</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            Discover your next favorite book. From gripping thrillers to heartwarming romances, our curated collection has a story waiting just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="h-12 px-8 text-base" render={<Link href="/books" />}>
              Browse Books
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-background" render={<Link href="/categories" />}>
              Explore Categories
            </Button>
          </div>
        </div>
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
      </section>

      {/* Bestsellers Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Bestsellers</h2>
              <p className="text-muted-foreground">The books everyone is talking about right now.</p>
            </div>
            <Button variant="ghost" className="hidden sm:flex items-center gap-1 hover:text-primary" render={<Link href="/books" />}>
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestsellers.length > 0 ? (
              bestsellers.map((book) => (
                <BookCard key={book.id} book={book as any} />
              ))
            ) : (
              <p className="col-span-full text-muted-foreground text-center py-10 border rounded-lg border-dashed">
                No bestsellers found.
              </p>
            )}
          </div>
          <Button variant="outline" className="w-full mt-6 sm:hidden" render={<Link href="/books" />}>
            View all books
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-16 md:py-24 bg-muted/20 border-y">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find exactly what you're in the mood for by browsing our extensive genres.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.length > 0 ? (
              categories.slice(0, 6).map((category) => (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                  <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all group cursor-pointer bg-background">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full gap-3">
                      <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <p className="col-span-full text-muted-foreground text-center py-10">
                No categories available.
              </p>
            )}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" render={<Link href="/categories" />}>
              See All Categories
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">New Arrivals</h2>
              <p className="text-muted-foreground">Fresh off the press and ready to be read.</p>
            </div>
            <Button variant="ghost" className="hidden sm:flex items-center gap-1 hover:text-primary" render={<Link href="/books" />}>
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.length > 0 ? (
              newArrivals.map((book) => (
                <BookCard key={book.id} book={book as any} />
              ))
            ) : (
              <p className="col-span-full text-muted-foreground text-center py-10 border rounded-lg border-dashed">
                No new arrivals found.
              </p>
            )}
          </div>
          <Button variant="outline" className="w-full mt-6 sm:hidden" render={<Link href="/books" />}>
            View all books
          </Button>
        </div>
      </section>
    </div>
  );
}
