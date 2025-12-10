import { JobCard, Job } from "./JobCard";
import { Loader2, Search, AlertCircle } from "lucide-react";

interface JobResultsSectionProps {
  jobs: Job[];
  isLoading: boolean;
  hasSearched: boolean;
}

export const JobResultsSection = ({ jobs, isLoading, hasSearched }: JobResultsSectionProps) => {
  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Searching for jobs...</p>
            <p className="text-sm text-muted-foreground/60">AI is analyzing matches</p>
          </div>
        </div>
      </section>
    );
  }

  if (!hasSearched) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Start Your Job Search</h3>
            <p className="text-muted-foreground max-w-md">
              Enter your desired job title, location, and skills above to find matching opportunities
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (jobs.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-2xl bg-warning/10 flex items-center justify-center mb-6">
              <AlertCircle className="w-10 h-10 text-warning" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Jobs Found</h3>
            <p className="text-muted-foreground max-w-md">
              Try adjusting your search criteria or check your API key settings
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Found{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {jobs.length}
              </span>{" "}
              Jobs
            </h2>
            <p className="text-sm text-muted-foreground">Sorted by AI match score</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div 
              key={job.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
