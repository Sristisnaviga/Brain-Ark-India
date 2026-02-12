import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { DataProvider } from "@/lib/mockData";

// Pages
import Home from "@/pages/home";
import Auth from "@/pages/auth";
import BookSession from "@/pages/book-session";
import Community from "@/pages/community";
import Profile from "@/pages/profile";
import AdminDashboard from "@/pages/admin";
import Grade10Landing from "@/pages/grade-10";
import Grade12Landing from "@/pages/grade-12";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/book" component={BookSession} />
      <Route path="/community" component={Community} />
      <Route path="/profile" component={Profile} />
      <Route path="/dashboard" component={Profile} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/grade-10" component={Grade10Landing} />
      <Route path="/grade-12" component={Grade12Landing} />
      <Route path="/about" component={Home} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </DataProvider>
    </QueryClientProvider>
  );
}

export default App;
