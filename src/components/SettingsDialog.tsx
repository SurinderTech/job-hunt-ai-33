import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, Key, Settings } from "lucide-react";
import { toast } from "sonner";

export const SettingsDialog = () => {
  const [open, setOpen] = useState(false);
  const [jsearchKey, setJsearchKey] = useState("");
  const [dailyLimit, setDailyLimit] = useState("10");
  const [platforms, setPlatforms] = useState({
    jsearch: true,
    indeed: false,
    linkedin: false,
  });

  // Load saved settings on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("jsearch_api_key");
    if (savedKey) setJsearchKey(savedKey);
    
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      if (parsed.dailyLimit) setDailyLimit(parsed.dailyLimit);
      if (parsed.platforms) setPlatforms(parsed.platforms);
    }
  }, []);

  const handleSave = () => {
    // Save API key separately for easy access
    localStorage.setItem("jsearch_api_key", jsearchKey);
    localStorage.setItem("settings", JSON.stringify({
      dailyLimit,
      platforms,
    }));
    
    toast.success("Settings saved successfully!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Settings className="w-5 h-5" />
        </Button>
      </DialogTrigger>
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
                  id="jsearch-platform"
                  checked={platforms.jsearch}
                  onCheckedChange={(checked) =>
                    setPlatforms({ ...platforms, jsearch: checked as boolean })
                  }
                />
                <label
                  htmlFor="jsearch-platform"
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

          <Button onClick={handleSave} className="w-full bg-gradient-to-r from-primary to-accent">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
