import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { JobSearchForm, JobSearchParams } from "@/components/JobSearchForm";
import { JobResultsSection } from "@/components/JobResultsSection";
import { Job } from "@/components/JobCard";
import { toast } from "sonner";

const Index = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (params: JobSearchParams) => {
    setIsSearching(true);
    setHasSearched(true);
    
    try {
      // Get API key from localStorage
      const jsearchKey = localStorage.getItem("jsearch_api_key");
      
      if (!jsearchKey) {
        toast.error("Please add your JSearch API key in settings first");
        setIsSearching(false);
        return;
      }

      // Call JSearch API via RapidAPI
      const query = `${params.role} ${params.location}`.trim();
      const response = await fetch(
        `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=1&num_pages=1&date_posted=all`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": jsearchKey,
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();
      
      // Transform API response to our Job format
      const userSkills = params.skills.toLowerCase().split(",").map(s => s.trim()).filter(Boolean);
      
      const transformedJobs: Job[] = (data.data || []).map((job: any, index: number) => {
        // Extract skills from job description
        const descLower = (job.job_description || "").toLowerCase();
        const matchedSkills = userSkills.filter(skill => descLower.includes(skill));
        
        // Calculate match score based on skills match
        const matchScore = userSkills.length > 0 
          ? Math.round((matchedSkills.length / userSkills.length) * 100)
          : Math.floor(Math.random() * 40) + 50; // Random 50-90 if no skills provided

        // Extract common tech skills from description
        const commonSkills = ["JavaScript", "React", "Python", "Node.js", "TypeScript", "SQL", "AWS", "Docker", "Git", "Java", "C++", "Ruby", "PHP", "Angular", "Vue"];
        const detectedSkills = commonSkills.filter(skill => 
          descLower.includes(skill.toLowerCase())
        ).slice(0, 6);

        return {
          id: job.job_id || `job-${index}`,
          title: job.job_title || "Unknown Title",
          company: job.employer_name || "Unknown Company",
          location: job.job_city 
            ? `${job.job_city}, ${job.job_country || ""}`.trim()
            : job.job_is_remote ? "Remote" : "Location not specified",
          platform: "JSearch",
          link: job.job_apply_link || job.job_google_link || "#",
          matchScore: Math.min(matchScore + Math.floor(Math.random() * 20), 98),
          description: (job.job_description || "No description available").slice(0, 300) + "...",
          skills: detectedSkills.length > 0 ? detectedSkills : ["See job details"],
        };
      });

      // Sort by match score
      transformedJobs.sort((a, b) => b.matchScore - a.matchScore);
      
      setJobs(transformedJobs);
      toast.success(`Found ${transformedJobs.length} matching jobs!`);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs. Please check your API key.");
      setJobs([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <HeroSection />
      
      {/* Search Section */}
      <section id="search" className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <JobSearchForm onSearch={handleSearch} isSearching={isSearching} />
        </div>
      </section>

      {/* Results Section */}
      <JobResultsSection 
        jobs={jobs} 
        isLoading={isSearching} 
        hasSearched={hasSearched} 
      />

      <FeaturesSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
};

export default Index;
