import Link from "next/link";
import { BookOpen } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Page Turner</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Turn Every Page into a New Adventure. Discover millions of books,
              connect with authors, and immerse yourself in reading.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <FaFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <FaTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <FaInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <FaYoutube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/books" className="hover:text-primary">All Books</Link></li>
              <li><Link href="/categories" className="hover:text-primary">Categories</Link></li>
              <li><Link href="/bestsellers" className="hover:text-primary">Bestsellers</Link></li>
              <li><Link href="/new-arrivals" className="hover:text-primary">New Arrivals</Link></li>
              <li><Link href="/gift-cards" className="hover:text-primary">Gift Cards</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Help & Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-primary">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-primary">Returns</Link></li>
              <li><Link href="/track-order" className="hover:text-primary">Track Order</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-[220px]"
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Page Turner. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
