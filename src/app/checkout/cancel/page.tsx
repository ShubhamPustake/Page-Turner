import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <div className="container py-20 px-4 text-center flex flex-col items-center max-w-lg mx-auto">
      <XCircle className="h-16 w-16 text-destructive mb-6" />
      <h1 className="text-3xl font-bold tracking-tight mb-4">Payment Cancelled</h1>
      <p className="text-muted-foreground mb-8">
        Your payment was cancelled. No charges were made. You can return to your checkout when you are ready.
      </p>
      <div className="flex gap-4">
        <Button render={<Link href="/checkout" />} size="lg">
          Return to Checkout
        </Button>
        <Button render={<Link href="/books" />} variant="outline" size="lg">
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
