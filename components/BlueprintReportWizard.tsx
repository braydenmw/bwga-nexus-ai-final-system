import React, { useState, useEffect, useCallback } from 'react';
import NexusCopilotSidebar from './NexusCopilotSidebar.tsx';
import EnhancedStepper from './EnhancedStepper.tsx';
import { ContextEntryStep } from './ContextEntryStep';
import { OpportunityAssessmentStep } from './OpportunityAssessmentStep';
import { PartnershipIntentStep } from './PartnershipIntentStep';
import { RROIDiagnosticStep } from './RROIDiagnosticStep';
import { TPTSimulationStep } from './TPTSimulationStep';
import { SEAMEcosystemStep } from './SEAMEcosystemStep';
import { RiskAssessmentStep } from './RiskAssessmentStep';
import { ImplementationPlanningStep } from './ImplementationPlanningStep';
import { NSILPresentationStep } from './NSILPresentationStep';
import { LetterGeneratorModal } from './LetterGeneratorModal';
import FormValidation, { useFormValidation } from './FormValidation.tsx';
import Tooltip, { HelpTooltip } from './Tooltip.tsx';
import AutoSave from './AutoSave.tsx';
import StepSummary from './StepSummary.tsx';
import LoadingSkeleton, { SkeletonText, SkeletonForm } from './LoadingSkeleton.tsx';
import { ShieldCheckIcon } from './Icons.tsx';
import TermsAndConditions from './TermsAndConditions.tsx';
import HowToUse from './HowToUse.tsx';

const WIZARD_STEPS = [
    // Phase 1: Context & Planning
    { id: 0, title: 'Strategic Context Definition', description: 'Define your strategic context and objectives', status: 'pending' as const, phase: 1, phaseName: 'Context & Planning' },
    { id: 1, title: 'Opportunity Assessment', description: 'Market research and opportunity identification', status: 'pending' as const, phase: 1, phaseName: 'Context & Planning' },
    { id: 2, title: 'Partnership Intent Clarification', description: 'Define partnership goals and criteria', status: 'pending' as const, phase: 1, phaseName: 'Context & Planning' },

    // Phase 2: Analysis & Assessment
    { id: 3, title: 'Regional Diagnostic (RROI)', description: 'Analyze regional readiness and opportunity index', status: 'pending' as const, phase: 2, phaseName: 'Analysis & Assessment' },
    { id: 4, title: 'Predictive Positioning (TPT)', description: 'Run transformation pathway simulations', status: 'pending' as const, phase: 2, phaseName: 'Analysis & Assessment' },
    { id: 5, title: 'Ecosystem Mapping (SEAM)', description: 'Design ecosystem architecture and partnerships', status: 'pending' as const, phase: 2, phaseName: 'Analysis & Assessment' },

    // Phase 3: Strategy & Execution
    { id: 6, title: 'Risk Assessment & Mitigation', description: 'Comprehensive risk analysis and mitigation strategies', status: 'pending' as const, phase: 3, phaseName: 'Strategy & Execution' },
    { id: 7, title: 'Implementation Planning', description: 'Actionable execution roadmap and timeline', status: 'pending' as const, phase: 3, phaseName: 'Strategy & Execution' },
    { id: 8, title: 'Intelligence Blueprint & Presentation (NSIL)', description: 'Generate final NSIL intelligence report', status: 'pending' as const, phase: 3, phaseName: 'Strategy & Execution' }
];

interface BlueprintReportWizardProps {
  params?: any;
  [key: string]: any;
}

export default function BlueprintReportWizard({ params, ...props }: BlueprintReportWizardProps) {
   const [currentStep, setCurrentStep] = useState(0);
     const [reportParams, setReportParams] = useState(params || {});
     const [copilotMessages, setCopilotMessages] = useState<any[]>([]);
     const [isLoading, setIsLoading] = useState(false);
     const [lastSaved, setLastSaved] = useState<Date | null>(null);
     const [showPhaseOverview, setShowPhaseOverview] = useState(false);
     const [showLetterModal, setShowLetterModal] = useState(false);
     const [mounted, setMounted] = useState(false);
     const [termsAccepted, setTermsAccepted] = useState(false);
     const [showHowToUse, setShowHowToUse] = useState(false);

     useEffect(() => {
       setMounted(true);
       try {
         const accepted = localStorage.getItem('bwga-nexus-terms-accepted') === 'true';
         setTermsAccepted(accepted);
       } catch {}
     }, []);

    const handleChange = useCallback((field: string, value: any) => {
        setReportParams(prev => ({ ...prev, [field]: value }));
    }, []);

  const handleNext = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step: number) => {
     // Allow navigation to completed steps, current phase steps, or adjacent steps
     const targetStep = WIZARD_STEPS[step];
     const currentPhase = WIZARD_STEPS[currentStep]?.phase || 1;

     if (step <= currentStep + 1 || // Adjacent steps
         targetStep?.phase === currentPhase || // Same phase
         (targetStep?.phase || 1) < currentPhase) { // Previous phases
       setCurrentStep(step);
     }
   };

  const handleAutoSave = async (data: any) => {
    // Simulate auto-save functionality
    setIsLoading(true);
    try {
      // In a real implementation, this would save to a backend
      await new Promise(resolve => setTimeout(resolve, 500));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Step summary data
  const stepSummaryData = [
    // Phase 1: Context & Planning
    {
      title: 'Strategic Context Definition',
      completed: currentStep > 0,
      data: reportParams,
      requiredFields: ['reportName', 'userName', 'problemStatement'],
      optionalFields: ['userDepartment', 'organizationType', 'tier', 'industry'],
      phase: 1
    },
    {
      title: 'Opportunity Assessment',
      completed: currentStep > 1,
      data: reportParams,
      requiredFields: ['region', 'industry'],
      optionalFields: ['marketResearch', 'opportunityAnalysis'],
      phase: 1
    },
    {
      title: 'Partnership Intent Clarification',
      completed: currentStep > 2,
      data: reportParams,
      requiredFields: ['idealPartnerProfile', 'partnershipGoals'],
      optionalFields: ['partnershipCriteria', 'successMetrics'],
      phase: 1
    },

    // Phase 2: Analysis & Assessment
    {
      title: 'Regional Diagnostic (RROI)',
      completed: currentStep > 3,
      data: reportParams,
      requiredFields: ['region'],
      optionalFields: ['rroiResult'],
      phase: 2
    },
    {
      title: 'Predictive Positioning (TPT)',
      completed: currentStep > 4,
      data: reportParams,
      requiredFields: ['timeHorizon', 'growthAssumption', 'intervention'],
      optionalFields: ['tptResult'],
      phase: 2
    },
    {
      title: 'Ecosystem Mapping (SEAM)',
      completed: currentStep > 5,
      data: reportParams,
      requiredFields: ['partnerTypes', 'ecosystemParameters'],
      optionalFields: ['collaborationModels', 'seamResult'],
      phase: 2
    },

    // Phase 3: Strategy & Execution
    {
      title: 'Risk Assessment & Mitigation',
      completed: currentStep > 6,
      data: reportParams,
      requiredFields: ['riskAssessment'],
      optionalFields: ['mitigationStrategies', 'contingencyPlans'],
      phase: 3
    },
    {
      title: 'Implementation Planning',
      completed: currentStep > 7,
      data: reportParams,
      requiredFields: ['implementationRoadmap', 'timeline'],
      optionalFields: ['milestones', 'resourceRequirements'],
      phase: 3
    },
    {
      title: 'Intelligence Blueprint & Presentation (NSIL)',
      completed: currentStep > 8,
      data: reportParams,
      requiredFields: [],
      optionalFields: ['nsilReport'],
      phase: 3
    }
  ];

  // Update step statuses based on completion
  const getStepStatus = (stepIndex: number): 'pending' | 'active' | 'completed' | 'error' => {
    // Check if step has required data completed
    const stepData = stepSummaryData[stepIndex];
    if (stepData) {
      const hasRequiredData = stepData.requiredFields.every(field => {
        const value = reportParams[field];
        return value !== undefined && value !== null && value !== '';
      });
      if (hasRequiredData && stepIndex < currentStep) return 'completed';
    }

    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  const stepsWithStatus = WIZARD_STEPS.map((step, index) => ({
    ...step,
    status: getStepStatus(index)
  }));


  const renderStep = () => {
       const inputStyles = "w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all duration-200 placeholder:text-gray-400 text-gray-800 shadow-sm text-sm";
       const labelStyles = "block text-sm font-semibold text-gray-800 mb-2";

       switch (currentStep) {
         case 0: return <ContextEntryStep params={reportParams} handleChange={handleChange} inputStyles={inputStyles} labelStyles={labelStyles} />;
         case 1: return <OpportunityAssessmentStep params={reportParams} onChange={(p) => setReportParams(p)} inputStyles={inputStyles} labelStyles={labelStyles} />;
         case 2: return <PartnershipIntentStep params={reportParams} onChange={(p) => setReportParams(p)} inputStyles={inputStyles} labelStyles={labelStyles} />;
         case 3: return <RROIDiagnosticStep params={reportParams} onChange={(p) => setReportParams(p)} inputStyles={inputStyles} labelStyles={labelStyles} />;
         case 4: return <TPTSimulationStep params={reportParams} onChange={(p) => setReportParams(p)} inputStyles={inputStyles} labelStyles={labelStyles} />;
         case 5: return <SEAMEcosystemStep params={reportParams} onChange={(p) => setReportParams(p)} inputStyles={inputStyles} labelStyles={labelStyles} />;
         case 6: return <RiskAssessmentStep params={reportParams} onChange={(p) => setReportParams(p)} inputStyles={inputStyles} labelStyles={labelStyles} />;
         case 7: return <ImplementationPlanningStep params={reportParams} onChange={(p) => setReportParams(p)} inputStyles={inputStyles} labelStyles={labelStyles} />;
         case 8: return <NSILPresentationStep params={reportParams} onChange={(p) => setReportParams(p)} />;
         default: return null;
       }
     };

  // Gate rendering to avoid flicker and enforce terms acceptance
  if (!mounted) {
    return <div style={{ minHeight: '100vh', background: '#f9fafb', visibility: 'hidden' }} />;
  }

  if (!termsAccepted) {
    return (
      <TermsAndConditions
        onAccept={() => setTermsAccepted(true)}
        onDecline={() => { try { window.location.href = '/'; } catch {} }}
        isModal={false}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Header with Auto-save indicator */}
      <header className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Intelligence Blueprint Generator</h2>
            <p className="mt-0.5 text-xs text-gray-600">Follow the steps below to configure and generate your bespoke intelligence report.</p>
          </div>
          <div className="flex items-center gap-3">
            <AutoSave
              data={reportParams}
              onSave={handleAutoSave}
              enabled={!isLoading}
              className="hidden sm:flex"
            />
            <Tooltip content="Get help with any step of the process">
              <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                Help
              </button>
            </Tooltip>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-start py-4 px-4">
          {/* Phase Navigation */}
          <div className="w-full max-w-4xl mb-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 min-h-[80px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    WIZARD_STEPS[currentStep]?.phase === 1 ? 'bg-blue-500 text-white' :
                    WIZARD_STEPS[currentStep]?.phase === 2 ? 'bg-green-500 text-white' :
                    'bg-purple-500 text-white'
                  }`}>
                    {WIZARD_STEPS[currentStep]?.phase || 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {WIZARD_STEPS[currentStep]?.phaseName || 'Phase'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {WIZARD_STEPS[currentStep]?.phase === 1 ? '3 steps' :
                       WIZARD_STEPS[currentStep]?.phase === 2 ? '3 steps' :
                       '3 steps'} • Step {currentStep + 1} of 9
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPhaseOverview(!showPhaseOverview)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {showPhaseOverview ? 'Hide' : 'Show'} Overview
                </button>
              </div>

              {showPhaseOverview && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <EnhancedStepper
                    steps={stepsWithStatus}
                    currentStep={currentStep}
                    onStepClick={handleStepClick}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Step Content Card */}
          <div className="bg-white rounded-xl shadow-xl border border-gray-200/80 p-4 sm:p-6 w-full max-w-4xl mb-4 relative">
            {/* Letter Generation Button */}
            {(currentStep >= 2 && (reportParams.outputFormat === 'letter' || reportParams.outputFormat === 'both')) && (
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setShowLetterModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
                >
                  <span>✉️</span>
                  Generate Letter
                </button>
              </div>
            )}

            {/* Step content with loading state */}
            <div className="py-1">
              {isLoading ? (
                <div className="space-y-4 w-full">
                  <SkeletonText lines={2} />
                  <SkeletonForm fields={4} />
                </div>
              ) : (
                <div className="w-full">
                  {renderStep()}
                </div>
              )}
            </div>

            {/* Navigation buttons with validation */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 pt-4 border-t border-gray-200">
              <button
                className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
                disabled={currentStep === 0 || isLoading}
                onClick={handleBack}
              >
                ← Back
              </button>

              <div className="flex flex-col items-center gap-1 text-xs text-gray-600">
                  <span>Step {currentStep + 1} of {WIZARD_STEPS.length}</span>
                  <span className="text-gray-500">
                    Phase {WIZARD_STEPS[currentStep]?.phase || 1}: {WIZARD_STEPS[currentStep]?.phaseName || 'Unknown'}
                  </span>
                </div>

              <button
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
                disabled={currentStep === WIZARD_STEPS.length - 1 || isLoading}
                onClick={handleNext}
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar with Copilot and Progress Summary */}
        <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-4 p-3 lg:p-4 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200">
          {/* Nexus Copilot Sidebar */}
          <div className="flex-shrink-0">
            <NexusCopilotSidebar
              large
              context={params}
              currentStep={currentStep}
              reportParams={reportParams}
              onUpdateParams={setReportParams}
              messages={copilotMessages}
              setMessages={setCopilotMessages}
            />
          </div>

          {/* Step Summary */}
          <div className="flex-shrink-0">
            <StepSummary
              steps={stepSummaryData}
              currentStep={currentStep}
            />
          </div>
        </div>
      </div>

      {/* Letter Generator Modal */}
      <LetterGeneratorModal
        isOpen={showLetterModal}
        onClose={() => setShowLetterModal(false)}
        onGenerate={async () => {
          // Generate letter based on current report parameters
          const letterContent = `Dear Potential Partner,

I am writing to you as ${reportParams.userName || 'a representative'} from ${reportParams.organizationType || 'our organization'} regarding an exciting partnership opportunity in ${reportParams.region || 'the region'}.

${reportParams.problemStatement ? `Our core objective is: ${reportParams.problemStatement}` : ''}

${reportParams.idealPartnerProfile ? `We are seeking partners who: ${reportParams.idealPartnerProfile}` : ''}

${reportParams.letterKeyPoints || 'We believe this partnership could bring significant value to both our organizations through shared growth and mutual success.'}

We would welcome the opportunity to discuss this further and explore how we might collaborate.

Best regards,
${reportParams.userName || 'Your Name'}
${reportParams.userDepartment ? `${reportParams.userDepartment}` : ''}`;

          return letterContent;
        }}
      />
    </div>
  );
}