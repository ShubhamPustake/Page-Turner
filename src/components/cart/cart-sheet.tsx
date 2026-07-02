"use client";

import { useCart } from "@/store/cart-store";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartSheet() {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 relative">
        <ShoppingBag className="h-5 w-5" />
      </Button>
    );
  }

  const itemCount = cart.getCartCount();
  const total = cart.getCartTotal();

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="h-9 w-9 relative" />}>
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
          <span className="sr-only">Cart</span>
      </SheetTrigger>
      
      <SheetContent className="flex flex-col w-full sm:max-w-lg pr-0">
        <SheetHeader className="px-1">
          <SheetTitle>Shopping Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        
        <div className="flex-1 overflow-y-auto pr-6">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <ShoppingBag className="h-16 w-16 text-muted-foreground opacity-20" />
              <p className="text-muted-foreground text-lg font-medium">Your cart is empty.</p>
              <Button render={<Link href="/books" />} variant="outline" className="mt-4">
                  Browse Books
              </Button>
            </div>
          ) : (
            <ul className="space-y-6">
              {cart.items.map((item) => (
                <li key={item.book.id} className="flex gap-4">
                  <div className="relative aspect-[2/3] w-20 sm:w-24 overflow-hidden rounded bg-muted border">
                    {item.book.coverImage && (
                      <Image 
                        src={item.book.coverImage} 
                        alt={item.book.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="font-semibold line-clamp-1">{item.book.title}</h4>
                      <p className="text-muted-foreground text-sm font-medium mt-1">
                        ${(item.book.price * (1 - item.book.discount / 100)).toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none"
                          onClick={() => cart.updateQuantity(item.book.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none"
                          onClick={() => cart.updateQuantity(item.book.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => cart.removeItem(item.book.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="pt-6 pr-6 space-y-4">
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button className="w-full text-lg h-12" render={<Link href="/checkout" />}>
                Proceed to Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
