import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Package, CreditCard, Settings, User as UserIcon } from "lucide-react";
import { signOut } from "../../../../auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="container py-10 px-4 md:px-6 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {session.user.name || session.user.email}
          </p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <Button variant="outline" type="submit">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-primary" />
              Profile Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{session.user.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{session.user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="font-medium capitalize">{(session.user as any).role?.toLowerCase() || "Customer"}</p>
            </div>
            <Button variant="secondary" className="w-full mt-4">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Recent Orders
              </CardTitle>
              <CardDescription>View and track your recent purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground border border-dashed rounded-lg">
                <Package className="h-10 w-10 opacity-20 mb-3" />
                <p>You haven't placed any orders yet.</p>
                <Button variant="link" className="mt-2 text-primary">Browse Books</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage your saved credit cards and payment options.
                </p>
                <Button variant="outline" className="w-full">Manage Payments</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Update your notification preferences and security settings.
                </p>
                <Button variant="outline" className="w-full">Account Settings</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
