"use client";

import Image from "next/image";
import Link from "next/link";
import { Book, Author } from "@prisma/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Star } from "lucide-react";
import { useCart } from "@/store/cart-store";

type BookWithAuthors = Book & {
  authors: Author[];
};

interface BookCardProps {
  book: BookWithAuthors;
}

export function BookCard({ book }: BookCardProps) {
  const cart = useCart();
  const authorNames = book.authors.map((a) => a.name).join(", ");
  
  return (
    <Card className="group overflow-hidden flex flex-col h-full border-border/50 hover:border-border transition-colors hover:shadow-lg dark:hover:shadow-primary/5">
      <Link href={`/books/${book.slug}`} className="relative aspect-[2/3] overflow-hidden bg-muted">
        {book.coverImage ? (
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">No Cover</span>
          </div>
        )}
        {book.discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground hover:bg-destructive">
            -{book.discount}%
          </Badge>
        )}
        {book.isBestSeller && (
          <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground hover:bg-secondary">
            Bestseller
          </Badge>
        )}
      </Link>
      
      <CardContent className="flex-1 p-4 flex flex-col gap-2">
        <Link href={`/books/${book.slug}`} className="hover:underline">
          <h3 className="font-semibold text-lg line-clamp-1" title={book.title}>{book.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-1" title={authorNames}>
          {authorNames}
        </p>
        
        <div className="flex items-center gap-1 mt-auto pt-2">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-sm font-medium">{book.rating.toFixed(1)}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          {book.discount > 0 ? (
            <>
              <span className="text-lg font-bold">${(book.price * (1 - book.discount / 100)).toFixed(2)}</span>
              <span className="text-xs text-muted-foreground line-through">${book.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-lg font-bold">${book.price.toFixed(2)}</span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to Wishlist</span>
          </Button>
          <Button 
            size="sm" 
            className="h-8 gap-1"
            onClick={(e) => {
              e.preventDefault();
              cart.addItem(book);
            }}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Add</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
