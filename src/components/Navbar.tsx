import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Menu, X, Sparkles, LogIn, LogOut, User } from "lucide-react";
import { SettingsDialog } from "./SettingsDialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <Briefcase className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              JobAI
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Find Jobs
            </a>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <SettingsDialog />
            {user ? (
              <>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  {user.email?.split("@")[0]}
                </Button>
                <Button variant="outline" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/auth")}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button 
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-glow"
                  onClick={() => navigate("/auth")}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Find Jobs
              </a>
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <SettingsDialog />
                {user ? (
                  <Button variant="outline" onClick={handleSignOut} className="flex-1">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <Button 
                    className="flex-1 bg-gradient-to-r from-primary to-accent"
                    onClick={() => navigate("/auth")}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
