import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Upload, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

interface JobSearchFormProps {
  onSearch: (params: JobSearchParams) => void;
  isSearching: boolean;
}

export interface JobSearchParams {
  role: string;
  location: string;
  skills: string;
  resume?: File;
}

export const JobSearchForm = ({ onSearch, isSearching }: JobSearchFormProps) => {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      role,
      location,
      skills,
      resume: resume || undefined,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium">
              Job Role/Title
            </Label>
            <Input
              id="role"
              placeholder="e.g. Software Engineer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="bg-background border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Location
            </Label>
            <Input
              id="location"
              placeholder="e.g. Remote, New York, Hybrid"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="bg-background border-border"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills" className="text-sm font-medium">
            Skills/Keywords
          </Label>
          <Textarea
            id="skills"
            placeholder="e.g. React, TypeScript, Node.js, AI/ML"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
            className="bg-background border-border min-h-[80px]"
          />
          <p className="text-xs text-muted-foreground">
            Separate skills with commas
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="resume" className="text-sm font-medium">
            Upload Resume (Optional)
          </Label>
          <div className="flex items-center gap-3">
            <Input
              id="resume"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="bg-background border-border"
            />
            {resume && (
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Upload className="w-4 h-4" />
                {resume.name}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            PDF format only. AI will analyze your resume for better matching.
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSearching}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-md hover:shadow-glow"
        >
          {isSearching ? (
            <>
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              Searching with AI...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Find Matching Jobs
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};
