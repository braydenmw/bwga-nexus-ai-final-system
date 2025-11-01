import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { ReportParameters, UserProfile, LiveOpportunityItem, SymbiosisContext } from '../types.ts';
import { COUNTRIES, INDUSTRIES, AI_PERSONAS, ORGANIZATION_TYPES, TIERS_BY_ORG_TYPE } from '../constants.tsx';
import { generateReportStream, fetchResearchAndScope, diagnoseRegion, simulatePathway, architectEcosystem, generateLetterStream, fetchCapabilities } from '../services/nexusService.ts';
import { RROIResultDisplay } from './RROIResultDisplay.tsx';
import { TPTResultDisplay } from './TPTResultDisplay.tsx';
import { SEAMResultDisplay } from './SEAMResultDisplay.tsx';
import { EconomicSnapshot } from './EconomicSnapshot.tsx';
import Spinner, { SpinnerSmall } from './Spinner.tsx';
import { NexusLogo, DownloadIcon, ChatBubbleLeftRightIcon } from './Icons.tsx';
import Card from './common/Card.tsx';
import { ContextEntryStep } from './ContextEntryStep.tsx';
import ObjectiveStep from './ObjectiveStep.tsx';
import { OpportunityAssessmentStep } from './OpportunityAssessmentStep.tsx';
import { PartnershipIntentStep } from './PartnershipIntentStep.tsx';
import OpportunityStep from './OpportunityStep.tsx';
import { ImplementationPlanningStep } from './ImplementationPlanningStep.tsx';
import { NSILPresentationStep } from './NSILPresentationStep.tsx';
import ReviewStep from './ReviewStep.tsx';
import { StepSummary } from './StepSummary.tsx';
import EnhancedStepper from './EnhancedStepper.tsx';

interface InstantNexusIntelligencePlatformProps {
  onViewChange: (view: any, params: ReportParameters) => void;
  onReportUpdate: (params: ReportParameters, content: string, error: string | null, generating: boolean) => void;
  onProfileUpdate: (profile: UserProfile) => void;
}

type PartnershipType = 'B2B' | 'G2G' | 'G2B' | 'B2G';
type ReportFormat = 'brief' | 'standard' | 'comprehensive';

interface AnalysisResults {
  rroi: any;
  tpt: any;
  seam: any;
  economicData: any;
  opportunities: LiveOpportunityItem[];
}

// Step definitions for the wizard
const WIZARD_STEPS = [
  { id: 0, title: 'Context & Profile', description: 'Establish your background and objectives' },
  { id: 1, title: 'Strategic Objectives', description: 'Define your core business goals' },
  { id: 2, title: 'Opportunity Assessment', description: 'Analyze market opportunities' },
  { id: 3, title: 'Partnership Intent', description: 'Clarify partnership requirements' },
  { id: 4, title: 'Regional Focus', description: 'Select target regions and tiers' },
  { id: 5, title: 'Industry Analysis', description: 'Deep-dive into industry sectors' },
  { id: 6, title: 'AI Configuration', description: 'Configure AI analysis parameters' },
  { id: 7, title: 'Implementation Planning', description: 'Develop execution roadmap' },
  { id: 8, title: 'Intelligence Generation', description: 'Generate comprehensive reports' },
];

const InstantNexusIntelligencePlatform: React.FC<InstantNexusIntelligencePlatformProps> = ({
  onViewChange,
  onReportUpdate,
  onProfileUpdate,
}) => {
  // Wizard state
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Form state
  const [formData, setFormData] = useState<Partial<ReportParameters>>({
    userName: '',
    userDepartment: '',
    organizationType: ORGANIZATION_TYPES[0],
    userCountry: '',
    reportName: '',
    problemStatement: '',
    region: '',
    industry: [],
    idealPartnerProfile: '',
    tier: [],
    aiPersona: [],
  });

  // Processing state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState('');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);

  // Output state
  const [selectedReportFormat, setSelectedReportFormat] = useState<ReportFormat>('standard');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [generatedReport, setGeneratedReport] = useState('');
  const [error, setError] = useState<string | null>(null);

  // AI Chat state
  const [chatMessages, setChatMessages] = useState<{sender: 'user' | 'ai', text: string}[]>([
    {
      sender: 'ai',
      text: `👋 Hi! I'm your Nexus AI Co-Pilot. I can help you refine your objectives, suggest optimal partnership strategies, and provide real-time insights as you build your intelligence report.

Based on your current step (Step ${currentStep + 1}: ${WIZARD_STEPS[currentStep]?.title}), I can assist with:
• Step-by-step guidance through the framework
• Input validation and suggestions
• Real-time assistance and contextual help
• Best practices and optimization tips

What would you like help with?`
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Validation state
  const [stepErrors, setStepErrors] = useState<Record<number, string[]>>({});

  // Refs
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Partnership type detection
  const detectPartnershipType = useCallback((objective: string, partnerProfile: string): PartnershipType => {
    const text = (objective + ' ' + partnerProfile).toLowerCase();

    if (text.includes('government') && text.includes('business')) return 'G2B';
    if (text.includes('government') && text.includes('government')) return 'G2G';
    if (text.includes('business') && text.includes('government')) return 'B2G';
    return 'B2B'; // Default
  }, []);

  // Handle form changes
  const handleFormChange = useCallback((field: keyof ReportParameters, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear any errors for this field
    setStepErrors(prev => {
      const newErrors = { ...prev };
      if (newErrors[currentStep]) {
        newErrors[currentStep] = newErrors[currentStep].filter(error =>
          !error.toLowerCase().includes(field.toLowerCase())
        );
      }
      return newErrors;
    });
  }, [currentStep]);

  // Step navigation
  const nextStep = useCallback(() => {
    if (validateCurrentStep()) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(prev => Math.min(prev + 1, WIZARD_STEPS.length - 1));
      // Update AI co-pilot message for new step
      updateCopilotForStep(currentStep + 1);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    // Update AI co-pilot message for previous step
    updateCopilotForStep(Math.max(currentStep - 1, 0));
  }, [currentStep]);

  const goToStep = useCallback((stepId: number) => {
    if (stepId <= currentStep || completedSteps.has(stepId - 1)) {
      setCurrentStep(stepId);
      updateCopilotForStep(stepId);
    }
  }, [currentStep, completedSteps]);

  // AI Co-pilot step guidance
  const updateCopilotForStep = useCallback((stepId: number) => {
    const step = WIZARD_STEPS[stepId];
    if (!step) return;

    const stepGuidance = getStepGuidance(stepId, formData);
    setChatMessages(prev => [...prev, {
      sender: 'ai',
      text: `📍 **Step ${stepId + 1}: ${step.title}**\n\n${stepGuidance}`
    }]);
  }, [formData]);

  const getStepGuidance = (stepId: number, params: Partial<ReportParameters>): string => {
    switch (stepId) {
      case 0:
        return `Welcome to the first step! Let's establish your profile and context. I'll help you fill out your personal and organizational details. This information helps me provide more targeted guidance throughout the process.\n\n💡 **Tip**: Be specific about your department and organization type - this affects which analysis tiers will be most relevant for your needs.`;
      case 1:
        return `Great! Now let's define your strategic objectives. This is the foundation of your entire intelligence report. I can help you craft clear, actionable objectives that will guide our analysis.\n\n💡 **Tip**: Focus on specific outcomes you want to achieve. For example: "Expand manufacturing operations in Southeast Asia" rather than "Grow business internationally".`;
      case 2:
        return `Now we'll assess market opportunities. Based on your objectives, I can help identify the most promising regions and sectors for your expansion.\n\n💡 **Tip**: Consider both established markets and emerging opportunities. I'll analyze regional readiness and growth potential.`;
      case 3:
        return `Let's clarify your partnership intentions. This step determines what type of collaboration would be most effective for your goals.\n\n💡 **Tip**: Think about whether you need B2B partnerships, government relationships (G2B/G2G), or a combination. I'll help match you with the right partnership model.`;
      case 4:
        return `Time to focus on your target regions and analysis tiers. Based on your previous inputs, I'll recommend the most appropriate geographic areas and depth of analysis.\n\n💡 **Tip**: Different regions require different analysis approaches. I'll help you choose the right level of detail for your specific situation.`;
      case 5:
        return `Let's deep-dive into industry sectors. Your industry focus will determine which economic indicators and market factors are most relevant.\n\n💡 **Tip**: You can select multiple industries if your objectives span different sectors. I'll provide sector-specific insights and recommendations.`;
      case 6:
        return `Now we'll configure the AI analysis parameters. This determines how deeply the system will analyze your objectives and what types of insights to prioritize.\n\n💡 **Tip**: Choose analysis lenses that align with your strategic priorities - financial, operational, risk, or strategic focus.`;
      case 7:
        return `Let's develop your implementation roadmap. Based on all your previous inputs, I'll help create a practical action plan for moving forward.\n\n💡 **Tip**: This step translates our analysis into concrete next steps. I'll provide timelines, milestones, and success metrics.`;
      case 8:
        return `Final step! Now we'll generate your comprehensive intelligence report. This brings together all the analysis from previous steps into actionable insights.\n\n💡 **Tip**: Choose your report format based on your audience - executive brief for leadership, comprehensive report for detailed planning.`;
      default:
        return `How can I help you with this step? Feel free to ask questions or request guidance at any time.`;
    }
  };

  // Step validation
  const validateCurrentStep = useCallback((): boolean => {
    const errors: string[] = [];

    switch (currentStep) {
      case 0: // Context & Profile
        if (!formData.userName?.trim()) errors.push('Full name is required');
        if (!formData.userCountry) errors.push('Country selection is required');
        if (!formData.organizationType) errors.push('Organization type is required');
        break;
      case 1: // Strategic Objectives
        if (!formData.reportName?.trim()) errors.push('Report name is required');
        if (!formData.problemStatement?.trim()) errors.push('Core objective is required');
        break;
      case 2: // Opportunity Assessment
        if (!formData.region?.trim()) errors.push('Target region is required');
        break;
      case 3: // Partnership Intent
        if (!formData.idealPartnerProfile?.trim()) errors.push('Partner profile is required');
        break;
      case 4: // Regional Focus
        if (!formData.industry?.length) errors.push('At least one industry must be selected');
        if (!formData.tier?.length) errors.push('At least one tier must be selected');
        break;
    }

    setStepErrors(prev => ({ ...prev, [currentStep]: errors }));
    return errors.length === 0;
  }, [currentStep, formData]);

  // Multi-select handlers
  const handleIndustryToggle = useCallback((industryId: string) => {
    setFormData(prev => ({
      ...prev,
      industry: prev.industry?.includes(industryId)
        ? prev.industry.filter(id => id !== industryId)
        : [...(prev.industry || []), industryId]
    }));
  }, []);

  const handleTierToggle = useCallback((tierId: string) => {
    setFormData(prev => ({
      ...prev,
      tier: prev.tier?.includes(tierId)
        ? prev.tier.filter(id => id !== tierId)
        : [...(prev.tier || []), tierId]
    }));
  }, []);

  // Parallel analysis processing
  const runParallelAnalysis = useCallback(async () => {
    if (!formData.region || !formData.problemStatement) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setError(null);

    try {
      // Step 1: RROI Analysis
      setCurrentAnalysisStep('Analyzing regional readiness...');
      setAnalysisProgress(20);
      const rroiResult = await diagnoseRegion(formData.region, formData.problemStatement);

      // Step 2: TPT Simulation
      setCurrentAnalysisStep('Simulating growth trajectories...');
      setAnalysisProgress(40);
      const tptResult = await simulatePathway(rroiResult, 'Expand manufacturing operations with local partnerships');

      // Step 3: SEAM Architecture
      setCurrentAnalysisStep('Designing partnership ecosystem...');
      setAnalysisProgress(60);
      const seamResult = await architectEcosystem(rroiResult, formData.problemStatement);

      // Step 4: Economic Data
      setCurrentAnalysisStep('Gathering economic intelligence...');
      setAnalysisProgress(80);

      // Step 5: Research & Scope
      setCurrentAnalysisStep('Finalizing intelligence synthesis...');
      setAnalysisProgress(100);

      const results: AnalysisResults = {
        rroi: rroiResult,
        tpt: tptResult,
        seam: seamResult,
        economicData: {},
        opportunities: []
      };

      setAnalysisResults(results);
      setCurrentAnalysisStep('Analysis complete!');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  }, [formData.region, formData.problemStatement]);

  // Generate letter instantly
  const generateLetter = useCallback(async () => {
    if (!formData.idealPartnerProfile || !formData.problemStatement) {
      setError('Please complete partner profile and objectives first');
      return;
    }

    setIsGeneratingLetter(true);
    setError(null);

    try {
      const partnershipType = detectPartnershipType(
        formData.problemStatement || '',
        formData.idealPartnerProfile || ''
      );

      const letterParams: ReportParameters = {
        ...formData,
        partnershipType,
        outputFormat: 'letter'
      } as ReportParameters;

      const stream = await generateLetterStream(letterParams);
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let letterContent = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        letterContent += decoder.decode(value, { stream: true });
      }

      setGeneratedLetter(letterContent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Letter generation failed');
    } finally {
      setIsGeneratingLetter(false);
    }
  }, [formData, detectPartnershipType]);

  // Generate report
  const generateReport = useCallback(async () => {
    setIsGeneratingReport(true);
    setError(null);

    try {
      const reportParams: ReportParameters = {
        ...formData,
        reportLength: selectedReportFormat,
        outputFormat: 'report'
      } as ReportParameters;

      onProfileUpdate({
        userName: formData.userName || '',
        userDepartment: formData.userDepartment || '',
        organizationType: formData.organizationType || ORGANIZATION_TYPES[0],
        userCountry: formData.userCountry || ''
      });

      onReportUpdate(reportParams, '', null, true);

      const stream = await generateReportStream(reportParams);
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let reportContent = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        reportContent += decoder.decode(value, { stream: true });
        onReportUpdate(reportParams, reportContent, null, true);
      }

      onReportUpdate(reportParams, reportContent, null, false);
      setGeneratedReport(reportContent);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Report generation failed';
      setError(errorMessage);
      onReportUpdate({} as ReportParameters, '', errorMessage, false);
    } finally {
      setIsGeneratingReport(false);
    }
  }, [formData, selectedReportFormat, onProfileUpdate, onReportUpdate]);

  // Auto-run analysis when form is complete
  useEffect(() => {
    const isFormComplete = formData.userName && formData.problemStatement && formData.region && formData.industry?.length;
    if (isFormComplete && !isAnalyzing && !analysisResults) {
      runParallelAnalysis();
    }
  }, [formData, isAnalyzing, analysisResults, runParallelAnalysis]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const currentTiers = TIERS_BY_ORG_TYPE[formData.organizationType || 'Default'] || [];

  // Render step content
  const renderStepContent = () => {
    const inputStyles = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
    const labelStyles = "block text-sm font-medium text-gray-700 mb-1";

    switch (currentStep) {
      case 0:
        return (
          <ContextEntryStep
            params={formData as ReportParameters}
            handleChange={(field, value) => handleFormChange(field as keyof ReportParameters, value)}
            inputStyles={inputStyles}
            labelStyles={labelStyles}
          />
        );
      case 1:
        return (
          <ObjectiveStep
            params={formData as ReportParameters}
            onChange={(params) => setFormData(prev => ({ ...prev, ...params }))}
          />
        );
      case 2:
        return (
          <OpportunityAssessmentStep
            params={formData as ReportParameters}
            onChange={(params) => setFormData(prev => ({ ...prev, ...params }))}
            inputStyles={inputStyles}
            labelStyles={labelStyles}
          />
        );
      case 3:
        return (
          <PartnershipIntentStep
            params={formData as ReportParameters}
            onChange={(params) => setFormData(prev => ({ ...prev, ...params }))}
            inputStyles={inputStyles}
            labelStyles={labelStyles}
          />
        );
      case 4:
        return (
          <OpportunityStep
            params={formData as ReportParameters}
            onChange={(params) => setFormData(prev => ({ ...prev, ...params }))}
          />
        );
      case 5:
        return (
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Industry Analysis</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {INDUSTRIES.map((industry) => (
                  <button
                    key={industry.id}
                    onClick={() => handleIndustryToggle(industry.id)}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      formData.industry?.includes(industry.id)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400 bg-white'
                    }`}
                  >
                    <div className="text-sm font-medium">{industry.title}</div>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className={labelStyles}>AI Analysis Lenses</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Strategic', 'Financial', 'Operational', 'Risk'].map((lens) => (
                      <label key={lens} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.analyticalLens?.includes(lens) || false}
                          onChange={(e) => {
                            const current = formData.analyticalLens || [];
                            const updated = e.target.checked
                              ? [...current, lens]
                              : current.filter(l => l !== lens);
                            handleFormChange('analyticalLens', updated);
                          }}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm">{lens}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      case 7:
        return (
          <ImplementationPlanningStep
            params={formData as ReportParameters}
            onChange={(params) => setFormData(prev => ({ ...prev, ...params }))}
            inputStyles={inputStyles}
            labelStyles={labelStyles}
          />
        );
      case 8:
        return (
          <NSILPresentationStep
            params={formData as ReportParameters}
            onChange={(params) => setFormData(prev => ({ ...prev, ...params }))}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <NexusLogo className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">NEXUS AI Global Intelligence Platform</h1>
              <p className="text-sm text-gray-500">Intelligence in Minutes, Not Hours</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Analysis Progress</div>
            <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${analysisProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Stepper Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="space-y-4">
            {WIZARD_STEPS.map((step, index) => (
              <button
                key={step.id}
                onClick={() => goToStep(step.id)}
                disabled={step.id > currentStep && !completedSteps.has(step.id - 1)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  step.id === currentStep
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : step.id < currentStep || completedSteps.has(step.id)
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 bg-white text-gray-500'
                } ${step.id > currentStep && !completedSteps.has(step.id - 1) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step.id === currentStep
                      ? 'bg-blue-600 text-white'
                      : step.id < currentStep || completedSteps.has(step.id)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step.id < currentStep || completedSteps.has(step.id) ? '✓' : step.id + 1}
                  </div>
                  <div>
                    <div className="font-semibold">{step.title}</div>
                    <div className="text-sm opacity-75">{step.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Step Errors */}
          {stepErrors[currentStep]?.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="text-sm font-semibold text-red-800 mb-2">Please complete:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {stepErrors[currentStep].map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6 pb-20">

            {/* Progress Indicator */}
            {isAnalyzing && (
              <Card className="border-blue-200 bg-blue-50">
                <div className="flex items-center gap-4">
                  <SpinnerSmall />
                  <div>
                    <div className="font-semibold text-blue-800">{currentAnalysisStep}</div>
                    <div className="text-sm text-blue-600">Running parallel AI analysis...</div>
                  </div>
                </div>
              </Card>
            )}

            {/* Step Content */}
            <div className="space-y-6">
              {renderStepContent()}

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="text-sm text-gray-600">
                  Step {currentStep + 1} of {WIZARD_STEPS.length}
                </div>

                {currentStep < WIZARD_STEPS.length - 1 ? (
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={() => {/* Generate final report */}}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Generate Intelligence Report
                  </button>
                )}
              </div>
            </div>

            {/* Analysis Results */}
            {analysisResults && (
              <div className="space-y-6">
                <Card>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">🧠 Nexus Brain Analysis Results</h2>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* RROI Results */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-3">Regional Readiness (RROI)</h3>
                      <RROIResultDisplay rroi={analysisResults.rroi} />
                    </div>

                    {/* TPT Results */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-3">Growth Trajectory (TPT)</h3>
                      <TPTResultDisplay sim={analysisResults.tpt} />
                    </div>

                    {/* SEAM Results */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-3">Partnership Ecosystem (SEAM)</h3>
                      <SEAMResultDisplay seam={analysisResults.seam} />
                    </div>
                  </div>
                </Card>

                {/* Economic Intelligence */}
                {formData.userCountry && (
                  <EconomicSnapshot
                    country={formData.userCountry}
                    objective={formData.problemStatement || ''}
                    isRefining={false}
                    onRefineObjective={() => {}}
                  />
                )}
              </div>
            )}

            {/* Output Generation */}
            {analysisResults && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Generate Intelligence Package</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Letter Generation */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">✉️ Ice-Breaker Letter</h3>
                    <p className="text-gray-600 mb-4">Generate a professional introduction letter for your target partners.</p>

                    <button
                      onClick={generateLetter}
                      disabled={isGeneratingLetter}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isGeneratingLetter ? <SpinnerSmall /> : <DownloadIcon className="w-5 h-5" />}
                      Generate Letter
                    </button>

                    {generatedLetter && (
                      <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="whitespace-pre-wrap text-sm text-gray-800 max-h-48 overflow-y-auto">
                          {generatedLetter}
                        </div>
                        <button className="mt-2 text-blue-600 text-sm hover:text-blue-800">
                          Download PDF
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Report Generation */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Intelligence Report</h3>
                    <p className="text-gray-600 mb-4">Choose your report depth and generate comprehensive analysis.</p>

                    <div className="space-y-3 mb-4">
                      {[
                        { id: 'brief', title: 'Executive Brief', desc: '2-3 pages', pages: '2-3 pages' },
                        { id: 'standard', title: 'Standard Report', desc: '10-15 pages', pages: '10-15 pages' },
                        { id: 'comprehensive', title: 'Comprehensive Analysis', desc: '20-30 pages', pages: '20-30 pages' }
                      ].map((format) => (
                        <label key={format.id} className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="reportFormat"
                            value={format.id}
                            checked={selectedReportFormat === format.id}
                            onChange={(e) => setSelectedReportFormat(e.target.value as ReportFormat)}
                            className="h-4 w-4 text-blue-600"
                          />
                          <div>
                            <div className="font-medium text-gray-800">{format.title}</div>
                            <div className="text-sm text-gray-600">{format.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>

                    <button
                      onClick={generateReport}
                      disabled={isGeneratingReport}
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isGeneratingReport ? <SpinnerSmall /> : <DownloadIcon className="w-5 h-5" />}
                      Generate {selectedReportFormat.charAt(0).toUpperCase() + selectedReportFormat.slice(1)} Report
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {/* Error Display */}
            {error && (
              <Card className="border-red-200 bg-red-50">
                <div className="flex items-center gap-3">
                  <div className="text-red-600">⚠️</div>
                  <div className="text-red-800">{error}</div>
                </div>
              </Card>
            )}
          </div>
        </main>

        {/* AI Co-Pilot Sidebar */}
        <aside className="w-96 bg-white border-l border-gray-200 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">AI Co-Pilot</h3>
            </div>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                👋 Hi! I'm your Nexus AI Co-Pilot. I can help you refine your objectives,
                suggest optimal partnership strategies, and provide real-time insights
                as you build your intelligence report.
              </p>
            </div>

            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-nexus-accent-cyan text-white'
                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  <div className="text-sm whitespace-pre-line">{msg.text}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2">
                    <SpinnerSmall />
                    <span className="text-sm text-gray-600">AI Co-Pilot is analyzing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isTyping}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );

  async function handleSendMessage() {
    if (!currentMessage.trim()) return;

    const userMessage = { sender: 'user' as const, text: currentMessage };
    setChatMessages(prev => [...prev, userMessage]);
    const userQuery = currentMessage;
    setCurrentMessage('');
    setIsTyping(true);

    try {
      // Call the research and scope API for intelligent responses
      const response = await fetchResearchAndScope(userQuery, '', formData);
      const aiResponse = {
        sender: 'ai' as const,
        text: response.summary || `Thank you for your question about "${userQuery}". Based on your current inputs, I can provide guidance on this step. Would you like me to elaborate on any specific aspect of the ${WIZARD_STEPS[currentStep]?.title} process?`
      };
      setChatMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      // Fallback response if API fails
      const fallbackResponse = {
        sender: 'ai' as const,
        text: `I understand you're asking about "${userQuery}". For Step ${currentStep + 1} (${WIZARD_STEPS[currentStep]?.title}), I recommend focusing on completing the required fields first. Once you have your basic information entered, I can provide more specific guidance tailored to your situation. Is there anything particular about this step you'd like help with?`
      };
      setChatMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  }
};

export default InstantNexusIntelligencePlatform;