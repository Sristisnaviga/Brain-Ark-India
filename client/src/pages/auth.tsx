import { Layout } from "@/components/layout";
import { useData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "wouter";
import { useState } from "react";

export default function Auth() {
  const { login, register } = useData();
  const [searchParams] = useSearchParams();
  const defaultTab = new URLSearchParams(searchParams).get("tab") === "register" ? "register" : "login";
  
  const [loginEmail, setLoginEmail] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginEmail);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register(registerName, registerEmail, "parent");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-serif mb-2">Welcome to BrainArk</h1>
            <p className="text-muted-foreground">Join our community of mindful parents.</p>
          </div>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login to your account</CardTitle>
                  <CardDescription>Enter your email to access your dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="parent@example.com" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Login</Button>
                  </form>
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    <p>Demo login: admin@sristi.com (Admin) or rahul@example.com (Parent)</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>Start your journey with Sristi BrainArk.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Rahul Sharma" 
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="rahul@example.com" 
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Create Account</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
