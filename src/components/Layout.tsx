import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Zap, Layers, BarChart3, Box, Book, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/predict", label: "Predict", icon: Zap },
    { path: "/batch", label: "Batch", icon: Layers },
    { path: "/metrics", label: "Metrics", icon: BarChart3 },
    { path: "/models", label: "Models", icon: Box },
    { path: "/docs", label: "Docs", icon: Book },
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
              isActive
                ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-6 space-y-4">
                <div className="mb-6">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Model Deploy
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">AI Deployment Platform</p>
                </div>
                <nav className="space-y-1">
                  <NavLinks />
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Model Deploy
            </h1>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-muted-foreground">All systems operational</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-border/50 min-h-[calc(100vh-4rem)] p-6">
          <nav className="space-y-1">
            <NavLinks />
          </nav>

          <div className="mt-auto pt-6 border-t border-border/50">
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
              <p className="text-sm font-medium mb-1">Need Help?</p>
              <p className="text-xs text-muted-foreground mb-3">
                Check out our comprehensive documentation
              </p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/docs">View Docs</Link>
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
