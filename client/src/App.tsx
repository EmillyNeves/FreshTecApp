import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Login from "@/pages/login";
import Home from "@/pages/home";
import Analytics from "@/pages/analytics";
import CalendarPage from "@/pages/calendar";
import Settings from "@/pages/settings";
import QRScanner from "@/pages/qr-scanner";
import NotFound from "@/pages/not-found";

function Router() {
  const { user } = useAuth();
  
  if (!user) {
    return <Login />;
  }

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/calendar" component={CalendarPage} />
      <Route path="/settings" component={Settings} />
      <Route path="/qr-scanner" component={QRScanner} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
