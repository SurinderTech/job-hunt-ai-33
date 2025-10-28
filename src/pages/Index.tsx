import { useState } from "react";
import { Header } from "@/components/Header";
import { JobSearchForm, JobSearchParams } from "@/components/JobSearchForm";
import { JobCard, Job } from "@/components/JobCard";
import { SettingsDialog } from "@/components/SettingsDialog";
import { toast } from "sonner";
import { Briefcase } from "lucide-react";

const Index = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSearch = async (params: JobSearchParams) => {
    setIsSearching(true);
    
    try {
      // Simulated job search - will be replaced with actual API calls
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockJobs: Job[] = [
        {
          id: "1",
          title: "Senior Software Engineer",
          company: "TechCorp",
          location: "Remote",
          platform: "JSearch",
          link: "https://example.com/job1",
          matchScore: 92,
          description: "We're looking for a talented software engineer to join our team...",
          skills: ["React", "TypeScript", "Node.js", "AWS", "Docker"],
        },
        {
          id: "2",
          title: "Full Stack Developer",
          company: "StartupXYZ",
          location: "New York, NY (Hybrid)",
          platform: "JSearch",
          link: "https://example.com/job2",
          matchScore: 85,
          description: "Join our fast-growing startup as a full stack developer...",
          skills: ["JavaScript", "Python", "React", "MongoDB", "GraphQL"],
        },
        {
          id: "3",
          title: "Frontend Engineer",
          company: "Digital Solutions",
          location: "San Francisco, CA",
          platform: "JSearch",
          link: "https://example.com/job3",
          matchScore: 78,
          description: "Looking for a creative frontend engineer to build amazing user experiences...",
          skills: ["React", "CSS", "TypeScript", "Next.js"],
        },
        {
          id: "4",
          title: "Software Developer",
          company: "Enterprise Inc",
          location: "Remote",
          platform: "JSearch",
          link: "https://example.com/job4",
          matchScore: 65,
          description: "Seeking a motivated software developer to work on enterprise solutions...",
          skills: ["Java", "Spring Boot", "MySQL", "Kubernetes"],
        },
      ];
      
      setJobs(mockJobs);
      toast.success(`Found ${mockJobs.length} matching jobs!`);
    } catch (error) {
      toast.error("Failed to search jobs. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenSettings={() => setSettingsOpen(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Find Your Dream Job with AI
            </h2>
            <p className="text-muted-foreground text-lg">
              Let artificial intelligence match you with the perfect opportunities
            </p>
          </div>

          <JobSearchForm onSearch={handleSearch} isSearching={isSearching} />

          {jobs.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-primary" />
                  Matching Jobs ({jobs.length})
                </h3>
                <p className="text-sm text-muted-foreground">
                  Sorted by AI match score
                </p>
              </div>
              
              <div className="grid gap-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          )}

          {!isSearching && jobs.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No jobs yet
              </h3>
              <p className="text-muted-foreground">
                Start by filling out the search form above to find matching opportunities
              </p>
            </div>
          )}
        </div>
      </main>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
};

export default Index;
