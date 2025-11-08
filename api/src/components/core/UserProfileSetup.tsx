import React, { useState, useCallback } from 'react';

export interface UserTier {
  id: string;
  name: string;
  description: string;
  icon: string;
  capabilities: string[];
  reportLengths: string[];
  maxOpportunities: number;
  scoringMultiplier: number;
}

export const USER_TIERS: UserTier[] = [
  {
    id: 'government',
    name: 'Government Official',
    description: 'Policy makers and economic development agencies',
    icon: '🏛️',
    capabilities: ['Policy Analysis', 'Regional Planning', 'Investment Promotion', 'Stakeholder Engagement'],
    reportLengths: ['Comprehensive', 'Standard', 'Brief'],
    maxOpportunities: 15,
    scoringMultiplier: 1.2
  },
  {
    id: 'company',
    name: 'Corporate Executive',
    description: 'Business leaders and strategic planners',
    icon: '🏢',
    capabilities: ['Market Analysis', 'Competitive Intelligence', 'Partner Identification', 'Risk Assessment'],
    reportLengths: ['Comprehensive', 'Standard', 'Snapshot'],
    maxOpportunities: 12,
    scoringMultiplier: 1.0
  },
  {
    id: 'banking',
    name: 'Financial Institution',
    description: 'Banks, investors, and financial analysts',
    icon: '🏦',
    capabilities: ['Investment Analysis', 'Risk Modeling', 'Financial Due Diligence', 'Portfolio Strategy'],
    reportLengths: ['Comprehensive', 'Brief'],
    maxOpportunities: 10,
    scoringMultiplier: 1.3
  },
  {
    id: 'consultant',
    name: 'Strategy Consultant',
    description: 'Advisory and consulting professionals',
    icon: '💼',
    capabilities: ['Strategic Planning', 'Due Diligence', 'Implementation Support', 'Change Management'],
    reportLengths: ['Standard', 'Brief', 'Snapshot'],
    maxOpportunities: 8,
    scoringMultiplier: 1.1
  },
  {
    id: 'academic',
    name: 'Research Institution',
    description: 'Universities and research organizations',
    icon: '🎓',
    capabilities: ['Academic Research', 'Policy Studies', 'Economic Modeling', 'Publication Support'],
    reportLengths: ['Comprehensive', 'Standard'],
    maxOpportunities: 6,
    scoringMultiplier: 0.9
  }
];

export interface UserProfileData {
  name: string;
  email: string;
  organization: string;
  title: string;
  tier: string;
  country: string;
  region: string;
  assistanceType: string;
  goals: string[];
  experience: string;
}

interface UserProfileSetupProps {
  onProfileComplete: (profile: UserProfileData) => void;
  onRequestHelp: (context: string) => void;
}

export const UserProfileSetup: React.FC<UserProfileSetupProps> = ({ onProfileComplete, onRequestHelp }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfileData>({
    name: '',
    email: '',
    organization: '',
    title: '',
    tier: '',
    country: '',
    region: '',
    assistanceType: '',
    goals: [],
    experience: ''
  });

  const [analyzing, setAnalyzing] = useState(false);

  const handleInputChange = useCallback((field: keyof UserProfileData, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleTierSelection = useCallback((tierId: string) => {
    handleInputChange('tier', tierId);
    setStep(2);
  }, [handleInputChange]);

  const handleGoalsSelection = useCallback((goal: string) => {
    setProfile(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) 
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  }, []);

  const handleProfileSubmit = useCallback(async () => {
    setAnalyzing(true);
    
    // Simulate AI analysis of user profile
    setTimeout(() => {
      setAnalyzing(false);
      onProfileComplete(profile);
    }, 2000);
  }, [profile, onProfileComplete]);

  const assistanceTypes = [
    'Economic Development Strategy',
    'Investment Promotion',
    'Partner Identification',
    'Market Entry Strategy',
    'Risk Assessment',
    'Policy Development',
    'Infrastructure Planning',
    'Workforce Development'
  ];

  const commonGoals = [
    'Attract Foreign Investment',
    'Create Employment Opportunities',
    'Develop Infrastructure',
    'Promote Innovation',
    'Enhance Regional Competitiveness',
    'Sustainable Development',
    'Supply Chain Diversification',
    'Technology Transfer'
  ];

  const experienceLevels = [
    'New to regional development',
    'Some experience with similar projects',
    'Experienced professional',
    'Senior expert in the field'
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-nexus-text-primary mb-4">Welcome to Nexus Intelligence</h2>
              <p className="text-lg text-nexus-text-secondary max-w-2xl mx-auto">
                First, let's understand your role and perspective to provide personalized intelligence and recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {USER_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className={`bg-nexus-surface-800 rounded-lg p-6 cursor-pointer transition-all hover:bg-nexus-surface-700 border-2 ${
                    profile.tier === tier.id ? 'border-nexus-accent-cyan' : 'border-transparent'
                  }`}
                  onClick={() => handleTierSelection(tier.id)}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{tier.icon}</div>
                    <h3 className="text-xl font-semibold text-nexus-text-primary mb-2">{tier.name}</h3>
                    <p className="text-sm text-nexus-text-secondary mb-4">{tier.description}</p>
                    <div className="space-y-1">
                      {tier.capabilities.slice(0, 3).map((capability, index) => (
                        <div key={index} className="text-xs text-nexus-text-secondary">
                          • {capability}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-xs text-nexus-accent-cyan">
                      {tier.reportLengths.length} report formats • {tier.maxOpportunities} max opportunities
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => onRequestHelp('I need help choosing my user tier')}
                className="text-nexus-accent-cyan hover:text-nexus-accent-cyan/80 text-sm underline"
              >
                Need help choosing your role?
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-nexus-text-primary mb-4">Tell Us About Yourself</h2>
              <p className="text-lg text-nexus-text-secondary">
                Help us personalize your experience with some basic information.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-nexus-text-primary">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-nexus-surface-700 border border-nexus-accent-cyan/30 rounded-lg px-4 py-3 text-nexus-text-primary placeholder-nexus-text-secondary focus:outline-none focus:ring-2 focus:ring-nexus-accent-cyan focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-nexus-text-primary">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@organization.com"
                  className="w-full bg-nexus-surface-700 border border-nexus-accent-cyan/30 rounded-lg px-4 py-3 text-nexus-text-primary placeholder-nexus-text-secondary focus:outline-none focus:ring-2 focus:ring-nexus-accent-cyan focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-nexus-text-primary">Organization</label>
                <input
                  type="text"
                  value={profile.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  placeholder="Your organization name"
                  className="w-full bg-nexus-surface-700 border border-nexus-accent-cyan/30 rounded-lg px-4 py-3 text-nexus-text-primary placeholder-nexus-text-secondary focus:outline-none focus:ring-2 focus:ring-nexus-accent-cyan focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-nexus-text-primary">Title/Position</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Your role/title"
                  className="w-full bg-nexus-surface-700 border border-nexus-accent-cyan/30 rounded-lg px-4 py-3 text-nexus-text-primary placeholder-nexus-text-secondary focus:outline-none focus:ring-2 focus:ring-nexus-accent-cyan focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-nexus-text-primary">Country</label>
                <input
                  type="text"
                  value={profile.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  placeholder="Your country"
                  className="w-full bg-nexus-surface-700 border border-nexus-accent-cyan/30 rounded-lg px-4 py-3 text-nexus-text-primary placeholder-nexus-text-secondary focus:outline-none focus:ring-2 focus:ring-nexus-accent-cyan focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-nexus-text-primary">Region/State</label>
                <input
                  type="text"
                  value={profile.region}
                  onChange={(e) => handleInputChange('region', e.target.value)}
                  placeholder="Your region or state"
                  className="w-full bg-nexus-surface-700 border border-nexus-accent-cyan/30 rounded-lg px-4 py-3 text-nexus-text-primary placeholder-nexus-text-secondary focus:outline-none focus:ring-2 focus:ring-nexus-accent-cyan focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-nexus-surface-700 hover:bg-nexus-surface-600 text-nexus-text-primary rounded-lg transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!profile.name || !profile.email || !profile.organization}
                className="px-6 py-3 bg-nexus-accent-cyan hover:bg-nexus-accent-cyan/90 disabled:bg-nexus-surface-600 disabled:cursor-not-allowed text-nexus-primary-900 font-medium rounded-lg transition-colors"
              >
                Continue →
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-nexus-text-primary mb-4">Define Your Objectives</h2>
              <p className="text-lg text-nexus-text-secondary">
                What type of assistance are you seeking? Select all that apply.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-nexus-text-primary mb-3">Type of Assistance Needed</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {assistanceTypes.map((type) => (
                    <div
                      key={type}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        profile.assistanceType === type
                          ? 'bg-nexus-accent-cyan/20 border-nexus-accent-cyan'
                          : 'bg-nexus-surface-800 border-transparent hover:bg-nexus-surface-700'
                      }`}
                      onClick={() => handleInputChange('assistanceType', type)}
                    >
                      <div className="text-sm font-medium text-nexus-text-primary">{type}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-nexus-text-primary mb-3">Primary Goals</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {commonGoals.map((goal) => (
                    <div
                      key={goal}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        profile.goals.includes(goal)
                          ? 'bg-nexus-accent-cyan/20 border-nexus-accent-cyan'
                          : 'bg-nexus-surface-800 border-transparent hover:bg-nexus-surface-700'
                      }`}
                      onClick={() => handleGoalsSelection(goal)}
                    >
                      <div className="text-sm text-nexus-text-primary">{goal}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-nexus-text-primary mb-3">Experience Level</label>
                <div className="space-y-2">
                  {experienceLevels.map((level) => (
                    <div
                      key={level}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        profile.experience === level
                          ? 'bg-nexus-accent-cyan/20 border-nexus-accent-cyan'
                          : 'bg-nexus-surface-800 border-transparent hover:bg-nexus-surface-700'
                      }`}
                      onClick={() => handleInputChange('experience', level)}
                    >
                      <div className="text-sm text-nexus-text-primary">{level}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-nexus-surface-700 hover:bg-nexus-surface-600 text-nexus-text-primary rounded-lg transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleProfileSubmit}
                disabled={!profile.assistanceType || profile.goals.length === 0 || !profile.experience}
                className="px-6 py-3 bg-nexus-accent-cyan hover:bg-nexus-accent-cyan/90 disabled:bg-nexus-surface-600 disabled:cursor-not-allowed text-nexus-primary-900 font-medium rounded-lg transition-colors"
              >
                {analyzing ? 'Analyzing Profile...' : 'Complete Setup'}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-4 mb-6">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= stepNum
                    ? 'bg-nexus-accent-cyan text-nexus-primary-900'
                    : 'bg-nexus-surface-700 text-nexus-text-secondary'
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    step > stepNum ? 'bg-nexus-accent-cyan' : 'bg-nexus-surface-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-sm text-nexus-text-secondary">
          Step {step} of 3: {step === 1 ? 'Choose Your Role' : step === 2 ? 'Personal Information' : 'Define Objectives'}
        </div>
      </div>

      {renderStep()}

      {analyzing && (
        <div className="bg-nexus-surface-800 rounded-lg p-6 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-nexus-accent-cyan border-t-transparent rounded-full mx-auto mb-4" />
          <h3 className="text-lg font-medium text-nexus-text-primary mb-2">Analyzing Your Profile</h3>
          <p className="text-nexus-text-secondary">
            Our AI is creating a personalized intelligence experience based on your role and objectives...
          </p>
        </div>
      )}
    </div>
  );
};