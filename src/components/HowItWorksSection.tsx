import { Search, Sparkles, MousePointerClick, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Enter Your Criteria",
    description: "Tell us your desired job title, location, and skills you're looking for."
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Analysis",
    description: "Our AI searches thousands of jobs and ranks them by relevance to your profile."
  },
  {
    number: "03",
    icon: MousePointerClick,
    title: "Browse Matches",
    description: "Review AI-scored job matches with detailed information and apply links."
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Apply & Track",
    description: "Apply directly to jobs and track your applications all in one place."
  }
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes with our simple 4-step process
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="relative text-center group"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step number badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 z-10">
                  <span className="text-xs font-bold text-primary">{step.number}</span>
                </div>
                
                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-card border border-border/50 flex items-center justify-center mx-auto mb-6 mt-4 group-hover:shadow-glow group-hover:border-primary/30 transition-all duration-300">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
