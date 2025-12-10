import { Sparkles, Search, Zap, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute top-40 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Job Matching</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Find Your{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Dream Job
            </span>
            <br />
            With AI Precision
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Our AI analyzes your skills and experience to match you with the perfect opportunities. 
            Search thousands of jobs from top platforms in seconds.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in mb-12" style={{ animationDelay: '0.25s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-glow text-lg px-8 py-6 group"
              onClick={() => navigate("/auth")}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Search className="w-5 h-5 text-primary" />
                <span className="text-2xl md:text-3xl font-bold text-foreground">10K+</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">Jobs Available</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-5 h-5 text-accent" />
                <span className="text-2xl md:text-3xl font-bold text-foreground">95%</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">Match Accuracy</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-success" />
                <span className="text-2xl md:text-3xl font-bold text-foreground">Fast</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">Real-time Results</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
