import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

export default async function WishlistPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="container py-10 px-4 md:px-6 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Heart className="h-8 w-8 text-destructive fill-destructive" />
            My Wishlist
          </h1>
          <p className="text-muted-foreground mt-1">
            Books you've saved for later
          </p>
        </div>
      </div>

      <Card>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground border-dashed rounded-lg">
            <Heart className="h-12 w-12 opacity-20 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="mb-6 max-w-md mx-auto">
              You haven't added any books to your wishlist yet. Browse our catalog and click the heart icon on books you'd like to save.
            </p>
            <Button render={<Link href="/books" />} size="lg">
              Explore Catalog
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
