import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Briefcase, ArrowLeft, Sparkles, DollarSign, Building2 } from 'lucide-react';

const jobTypes = [
  { id: 'full-time', label: 'Full-time' },
  { id: 'part-time', label: 'Part-time' },
  { id: 'contract', label: 'Contract' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'internship', label: 'Internship' },
  { id: 'remote', label: 'Remote' },
];

const salaryRanges = [
  { value: '0-50k', label: '$0 - $50,000' },
  { value: '50k-75k', label: '$50,000 - $75,000' },
  { value: '75k-100k', label: '$75,000 - $100,000' },
  { value: '100k-150k', label: '$100,000 - $150,000' },
  { value: '150k-200k', label: '$150,000 - $200,000' },
  { value: '200k+', label: '$200,000+' },
];

const Onboarding4 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [preferredJobTypes, setPreferredJobTypes] = useState<string[]>([]);
  const [salaryExpectation, setSalaryExpectation] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('preferred_job_types, salary_expectation')
        .eq('user_id', session.user.id)
        .maybeSingle();
      
      if (profile) {
        setPreferredJobTypes(profile.preferred_job_types || []);
        setSalaryExpectation(profile.salary_expectation || '');
      }
    };
    
    checkAuth();
  }, [navigate]);

  const toggleJobType = (jobTypeId: string) => {
    setPreferredJobTypes((prev) =>
      prev.includes(jobTypeId)
        ? prev.filter((t) => t !== jobTypeId)
        : [...prev, jobTypeId]
    );
  };

  const handleComplete = async () => {
    if (preferredJobTypes.length === 0) {
      toast.error('Please select at least one job type');
      return;
    }

    if (!salaryExpectation) {
      toast.error('Please select a salary expectation');
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
      .update({
        preferred_job_types: preferredJobTypes,
        salary_expectation: salaryExpectation,
        onboarding_completed: true,
      })
      .eq('user_id', session.user.id);

    setIsLoading(false);

    if (error) {
      toast.error('Failed to save. Please try again.');
    } else {
      toast.success('Profile completed! Welcome to JobMatch AI!');
      navigate('/');
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
            Almost Done!
          </h1>
          <p className="text-muted-foreground mt-2">Step 4 of 4 - Job Preferences</p>
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 flex-1 rounded-full transition-colors bg-primary`}
            />
          ))}
        </div>

        <Card className="border-border/50 shadow-2xl backdrop-blur-sm bg-card/80">
          <CardHeader>
            <CardTitle className="text-xl">What are you looking for?</CardTitle>
            <CardDescription>
              Tell us your job preferences so we can find the perfect match
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Job Types */}
            <div className="space-y-4">
              <Label className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Preferred Job Types
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {jobTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      preferredJobTypes.includes(type.id)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleJobType(type.id)}
                  >
                    <Checkbox
                      checked={preferredJobTypes.includes(type.id)}
                      onCheckedChange={() => toggleJobType(type.id)}
                    />
                    <span className="text-sm font-medium">{type.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Salary */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Salary Expectation
              </Label>
              <Select value={salaryExpectation} onValueChange={setSalaryExpectation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select salary range" />
                </SelectTrigger>
                <SelectContent>
                  {salaryRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => navigate('/onboarding/3')} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleComplete} className="flex-1 group" disabled={isLoading}>
                {isLoading ? 'Completing...' : 'Complete Setup'}
                <Sparkles className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding4;
