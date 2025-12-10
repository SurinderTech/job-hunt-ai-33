import { Brain, Zap, Shield, Globe, BarChart3, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Our AI analyzes job descriptions against your skills to find the perfect fit.",
    gradient: "from-primary to-primary/50"
  },
  {
    icon: Globe,
    title: "Multi-Platform Search",
    description: "Search across LinkedIn, Indeed, and more job platforms simultaneously.",
    gradient: "from-accent to-accent/50"
  },
  {
    icon: Zap,
    title: "Real-Time Results",
    description: "Get instant job matches as you search with live API integration.",
    gradient: "from-success to-success/50"
  },
  {
    icon: BarChart3,
    title: "Match Scoring",
    description: "See how well each job matches your profile with AI-generated scores.",
    gradient: "from-warning to-warning/50"
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Stop scrolling through irrelevant jobs. We show you what matters.",
    gradient: "from-primary to-accent"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data and API keys are encrypted and never shared.",
    gradient: "from-accent to-primary"
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              JobAI
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to revolutionize your job search experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="p-6 bg-gradient-card border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
