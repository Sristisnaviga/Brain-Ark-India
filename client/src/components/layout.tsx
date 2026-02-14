import { Link, useLocation } from "wouter";
import { useData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Menu, X, User as UserIcon, Calendar, MessageSquare, LogOut, Languages } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout, isAdmin } = useData();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const NavLink = ({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon?: any }) => {
    const isActive = location === href;
    return (
      <Link href={href}>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors cursor-pointer ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-foreground/70 hover:bg-muted hover:text-foreground'}`}>
          {Icon && <Icon className="w-4 h-4" />}
          {children}
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-primary/10 p-1 rounded-full">
                <img src="/brain-logo.png" alt="Sristi BrainArk Logo" className="w-8 h-8 object-contain" />
              </div>
              <span className="text-xl font-bold font-serif tracking-tight text-foreground">
                Sristi <span className="text-primary">BrainArk</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm lg:text-base">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/grade-10">Grade 10</NavLink>
            <NavLink href="/grade-12">Grade 12</NavLink>
            <NavLink href="/book">Book Session</NavLink>
            <NavLink href="/community">Community</NavLink>
            {isAdmin && <NavLink href="/admin">Admin</NavLink>}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href="/profile"><DropdownMenuItem>Profile</DropdownMenuItem></Link>
                  <Link href="/dashboard"><DropdownMenuItem>Dashboard</DropdownMenuItem></Link>
                  <DropdownMenuItem onClick={logout} className="text-destructive">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Link href="/auth"><Button variant="ghost">Log In</Button></Link>
                <Link href="/auth?tab=register"><Button>Get Started</Button></Link>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon"><Menu className="w-6 h-6" /></Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  <NavLink href="/" icon={BrainCircuit}>Home</NavLink>
                  <NavLink href="/grade-10" icon={BrainCircuit}>Grade 10 Guidance</NavLink>
                  <NavLink href="/grade-12" icon={BrainCircuit}>Grade 12 Guidance</NavLink>
                  <NavLink href="/book" icon={Calendar}>Book Session</NavLink>
                  <NavLink href="/community" icon={MessageSquare}>Community</NavLink>
                  {isAdmin && <NavLink href="/admin" icon={UserIcon}>Admin</NavLink>}
                  <div className="h-px bg-border my-2" />
                  {user ? (
                    <>
                      <NavLink href="/profile" icon={UserIcon}>Profile</NavLink>
                      <Button variant="ghost" className="justify-start px-4 text-destructive" onClick={logout}>
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link href="/auth"><Button variant="outline" className="w-full">Log In</Button></Link>
                      <Link href="/auth?tab=register"><Button className="w-full">Get Started</Button></Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-muted py-12 mt-12">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/brain-logo.png" alt="Sristi BrainArk Logo" className="w-6 h-6 object-contain" />
              <span className="text-lg font-bold font-serif">Sristi BrainArk</span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              Empowering students and parents with Genetic Brain Profiling to make informed career and life choices.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/grade-10" className="hover:text-primary">Stream Selection (Grade 10)</Link></li>
              <li><Link href="/grade-12" className="hover:text-primary">Career Guidance (Grade 12)</Link></li>
              <li><Link href="/book" className="hover:text-primary">Book a Session</Link></li>
              <li><Link href="/community" className="hover:text-primary">Community Forum</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@sristibrainark.com</li>
              <li>+91 80721 59491</li>
              <li>Coimbatore, TN, India</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          © 2024 Sristi BrainArk. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
