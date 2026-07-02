import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookBySlug } from "@/services/book.service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Heart, Star, Share2, Truck, ShieldCheck, ArrowLeft } from "lucide-react";

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const book = await getBookBySlug(resolvedParams.slug);

  if (!book) {
    notFound();
  }

  const authorNames = book.authors.map((a) => a.name).join(", ");
  const discountPrice = book.price * (1 - book.discount / 100);

  return (
    <div className="container py-8 md:py-12 px-4 md:px-6">
      <Link href="/books" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Left Column: Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[2/3] w-full max-w-md mx-auto overflow-hidden rounded-xl border bg-muted shadow-xl">
            {book.coverImage ? (
              <Image
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <span className="text-muted-foreground">No Cover</span>
              </div>
            )}
            
            {book.discount > 0 && (
              <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 text-sm">
                -{book.discount}% OFF
              </Badge>
            )}
          </div>
          
          {book.images.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {book.images.map((img, idx) => (
                <div key={idx} className="relative w-16 h-24 rounded-md overflow-hidden border cursor-pointer hover:border-primary">
                  <Image src={img} alt="Thumbnail" fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Book Details */}
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              {book.isBestSeller && (
                <Badge className="bg-secondary text-secondary-foreground">Bestseller</Badge>
              )}
              {book.categories.map((c) => (
                <Badge key={c.id} variant="outline">{c.name}</Badge>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{book.title}</h1>
            <p className="text-xl text-muted-foreground">
              by <Link href={`/authors/${book.authors[0]?.slug}`} className="text-primary hover:underline">{authorNames}</Link>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <Star className="h-5 w-5 fill-primary text-primary" />
              <Star className="h-5 w-5 fill-primary text-primary" />
              <Star className="h-5 w-5 fill-primary text-primary" />
              <Star className="h-5 w-5 text-muted-foreground" />
              <span className="ml-2 font-medium">{book.rating.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground">({book.reviews.length} reviews)</span>
          </div>

          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold">${discountPrice.toFixed(2)}</span>
            {book.discount > 0 && (
              <span className="text-xl text-muted-foreground line-through mb-1">${book.price.toFixed(2)}</span>
            )}
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            {book.description}
          </p>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground block mb-1">Format</span>
              <span className="font-medium">{book.format || "Hardcover"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">Print Length</span>
              <span className="font-medium">{book.pages} pages</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">Language</span>
              <span className="font-medium">{book.language}</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">ISBN</span>
              <span className="font-medium">{book.isbn}</span>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Button size="lg" className="flex-1 text-lg">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="px-3">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
              <Button size="lg" variant="outline" className="px-3">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
            
            <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span>Free shipping over $50</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
