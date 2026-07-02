import Link from "next/link";
import { BookOpen, Search, ShoppingBag, Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CartSheet } from "@/components/cart/cart-sheet";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden mr-2" />}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav />
          </SheetContent>
        </Sheet>
        
        <Link href="/" className="flex items-center gap-2 mr-6">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block text-lg">
            Page Turner
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium mr-6">
          <Link href="/books" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Books
          </Link>
          <Link href="/categories" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Categories
          </Link>
          <Link href="/authors" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Authors
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full max-w-sm hidden lg:flex items-center space-x-2">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search books, authors..."
                className="w-full bg-muted/50 pl-8 md:w-[300px]"
              />
            </div>
          </div>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-9 w-9" render={<Link href="/wishlist" />}>
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
            </Button>
            <CartSheet />
            <ThemeToggle />
            <Button size="sm" className="hidden sm:flex ml-2">
              Sign In
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <div className="flex flex-col space-y-4">
      <Link href="/" className="flex items-center gap-2 mb-4">
        <BookOpen className="h-6 w-6 text-primary" />
        <span className="font-bold">Page Turner</span>
      </Link>
      <div className="relative w-full mb-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full bg-muted/50 pl-8"
        />
      </div>
      <Link href="/books" className="text-foreground/70 hover:text-foreground">
        Books
      </Link>
      <Link href="/categories" className="text-foreground/70 hover:text-foreground">
        Categories
      </Link>
      <Link href="/authors" className="text-foreground/70 hover:text-foreground">
        Authors
      </Link>
      <div className="border-t my-4" />
      <Button className="w-full">Sign In</Button>
    </div>
  );
}
