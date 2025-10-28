import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Building2, Sparkles } from "lucide-react";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  platform: string;
  link: string;
  matchScore: number;
  description: string;
  skills: string[];
}

interface JobCardProps {
  job: Job;
}

const getMatchColor = (score: number) => {
  if (score >= 80) return "bg-gradient-success text-success-foreground";
  if (score >= 60) return "bg-primary text-primary-foreground";
  if (score >= 40) return "bg-warning text-warning-foreground";
  return "bg-muted text-muted-foreground";
};

const getMatchLabel = (score: number) => {
  if (score >= 80) return "Excellent Match";
  if (score >= 60) return "Good Match";
  if (score >= 40) return "Fair Match";
  return "Low Match";
};

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card className="p-6 bg-gradient-card border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {job.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${getMatchColor(job.matchScore)}`}>
            <Sparkles className="w-3 h-3" />
            {job.matchScore}%
          </div>
          <span className="text-xs text-muted-foreground">
            {getMatchLabel(job.matchScore)}
          </span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 5).map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
        {job.skills.length > 5 && (
          <Badge variant="outline" className="text-xs">
            +{job.skills.length - 5} more
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <Badge variant="outline" className="text-xs">
          {job.platform}
        </Badge>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary-foreground hover:bg-primary"
          onClick={() => window.open(job.link, '_blank')}
        >
          View Job
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
};
