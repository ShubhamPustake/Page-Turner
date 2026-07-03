"use client";

import { useCart } from "@/store/cart-store";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  const clearCart = useCart((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container py-20 px-4 text-center flex flex-col items-center max-w-lg mx-auto">
      <CheckCircle className="h-16 w-16 text-green-500 mb-6" />
      <h1 className="text-3xl font-bold tracking-tight mb-4">Order Placed Successfully!</h1>
      <p className="text-muted-foreground mb-8">
        Thank you for your order. We are preparing your books for shipment. You will pay for your order via Cash on Delivery when it arrives.
      </p>
      <Button render={<Link href="/books" />} size="lg">
        Continue Shopping
      </Button>
    </div>
  );
}
