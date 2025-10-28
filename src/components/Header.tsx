import { Briefcase, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header = ({ onOpenSettings }: HeaderProps) => {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AI Job Finder
              </h1>
              <p className="text-sm text-muted-foreground">
                Smart job search powered by AI
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenSettings}
            className="gap-2"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </div>
    </header>
  );
};
