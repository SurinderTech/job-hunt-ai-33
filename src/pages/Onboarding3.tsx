import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Briefcase, ArrowRight, ArrowLeft, Code, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

const suggestedSkills = [
  'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript',
  'SQL', 'AWS', 'Docker', 'Kubernetes', 'Machine Learning',
  'Data Analysis', 'Project Management', 'Agile', 'Scrum',
  'Communication', 'Leadership', 'Problem Solving', 'Excel',
  'Figma', 'Photoshop', 'Marketing', 'SEO', 'Sales',
];

const Onboarding3 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('skills')
        .eq('user_id', session.user.id)
        .maybeSingle();
      
      if (profile?.skills) {
        setSkills(profile.skills);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !skills.includes(customSkill.trim())) {
      setSkills([...skills, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  const handleNext = async () => {
    if (skills.length === 0) {
      toast.error('Please select at least one skill');
      return;
    }

    setIsLoading(true);
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ skills })
      .eq('user_id', session.user.id);

    setIsLoading(false);

    if (error) {
      toast.error('Failed to save. Please try again.');
    } else {
      navigate('/onboarding/4');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-accent">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Your Skills
          </h1>
          <p className="text-muted-foreground mt-2">Step 3 of 4 - Skills & Expertise</p>
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 flex-1 rounded-full transition-colors ${
                step <= 3 ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <Card className="border-border/50 shadow-2xl backdrop-blur-sm bg-card/80">
          <CardHeader>
            <CardTitle className="text-xl">What are your skills?</CardTitle>
            <CardDescription>
              Select skills that best describe your expertise
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Selected skills */}
            {skills.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Skills ({skills.length})</Label>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="default"
                      className="cursor-pointer group px-3 py-1"
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                      <X className="ml-1 h-3 w-3 group-hover:text-destructive" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Add custom skill */}
            <div className="space-y-2">
              <Label>Add Custom Skill</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Code className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter a skill..."
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" onClick={addCustomSkill}>
                  Add
                </Button>
              </div>
            </div>

            {/* Suggested skills */}
            <div className="space-y-2">
              <Label>Suggested Skills</Label>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                {suggestedSkills
                  .filter((skill) => !skills.includes(skill))
                  .map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => toggleSkill(skill)}
                    >
                      + {skill}
                    </Badge>
                  ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => navigate('/onboarding/2')} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1 group" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Continue'}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding3;
