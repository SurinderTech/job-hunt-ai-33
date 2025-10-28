import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, Key } from "lucide-react";
import { toast } from "sonner";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const [jsearchKey, setJsearchKey] = useState("");
  const [dailyLimit, setDailyLimit] = useState("10");
  const [platforms, setPlatforms] = useState({
    jsearch: true,
    indeed: false,
    linkedin: false,
  });

  const handleSave = () => {
    // Save to localStorage for now
    localStorage.setItem("settings", JSON.stringify({
      jsearchKey,
      dailyLimit,
      platforms,
    }));
    
    toast.success("Settings saved successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Settings
          </DialogTitle>
          <DialogDescription>
            Configure your API keys and job search preferences
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="jsearch" className="text-sm font-medium">
              JSearch API Key (RapidAPI)
            </Label>
            <Input
              id="jsearch"
              type="password"
              placeholder="Enter your RapidAPI JSearch key"
              value={jsearchKey}
              onChange={(e) => setJsearchKey(e.target.value)}
              className="bg-background"
            />
            <p className="text-xs text-muted-foreground">
              Get your key from{" "}
              <a
                href="https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                RapidAPI
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dailyLimit" className="text-sm font-medium">
              Daily Application Limit
            </Label>
            <Input
              id="dailyLimit"
              type="number"
              min="1"
              max="50"
              value={dailyLimit}
              onChange={(e) => setDailyLimit(e.target.value)}
              className="bg-background"
            />
            <p className="text-xs text-muted-foreground">
              Maximum number of jobs to apply to per day
            </p>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Job Platforms</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="jsearch"
                  checked={platforms.jsearch}
                  onCheckedChange={(checked) =>
                    setPlatforms({ ...platforms, jsearch: checked as boolean })
                  }
                />
                <label
                  htmlFor="jsearch"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  JSearch (Multiple sources)
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="indeed"
                  checked={platforms.indeed}
                  onCheckedChange={(checked) =>
                    setPlatforms({ ...platforms, indeed: checked as boolean })
                  }
                  disabled
                />
                <label
                  htmlFor="indeed"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Indeed (Coming soon)
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="linkedin"
                  checked={platforms.linkedin}
                  onCheckedChange={(checked) =>
                    setPlatforms({ ...platforms, linkedin: checked as boolean })
                  }
                  disabled
                />
                <label
                  htmlFor="linkedin"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  LinkedIn (Coming soon)
                </label>
              </div>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full bg-gradient-primary">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
