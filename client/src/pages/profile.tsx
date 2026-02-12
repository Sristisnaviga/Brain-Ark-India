import { Layout } from "@/components/layout";
import { useData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, School, LogOut, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  const { user, logout } = useData();

  if (!user) return (
    <Layout>
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Please log in to view profile.</h1>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-serif">My Profile</h1>
            <Button variant="outline" onClick={logout} className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* User Info Card */}
            <Card className="md:col-span-1 h-fit">
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4 text-primary">
                  <User className="w-12 h-12" />
                </div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription className="uppercase text-xs font-bold tracking-wider">{user.role}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  +91 80721 59491
                </div>
                <Separator />
                <Button variant="outline" className="w-full gap-2">
                  <Settings className="w-4 h-4" /> Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Student Details & History */}
            <div className="md:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Student Details</CardTitle>
                  <CardDescription>Manage your child's information for the report.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Student Name</Label>
                      <Input defaultValue={user.profile?.studentName || "Arjun Sharma"} />
                    </div>
                    <div className="space-y-2">
                      <Label>Grade/Class</Label>
                      <Input defaultValue={user.profile?.grade || "10th Standard"} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>School Name</Label>
                    <Input defaultValue={user.profile?.school || "National Public School"} />
                  </div>
                  <Button className="ml-auto block">Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-lg bg-muted/20">
                      <div>
                        <p className="font-semibold">Standard GBP Session</p>
                        <p className="text-sm text-muted-foreground">Feb 15, 2024 • 10:00 AM</p>
                      </div>
                      <div className="text-right">
                         <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500 text-white shadow hover:bg-green-600">Confirmed</span>
                         <p className="text-xs text-muted-foreground mt-1">Paid</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
