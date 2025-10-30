import React from 'react';
import { NexusLogo, LightbulbIcon, UsersIcon, TargetIcon, ShieldCheckIcon } from './Icons.tsx';

// Add missing icons that aren't in Icons.tsx
const ArrowRightIconComponent: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const CheckCircleIconComponent: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DocumentIconComponent: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const CogIconComponent: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const TrendingUpIconComponent: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);

const PresentationChartBarIconComponent: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m9.5 0l-.5 1.5M9 11.25h.008v.008H9V11.25zM12 11.25h.008v.008H12V11.25zM15 11.25h.008v.008H15V11.25zM18 11.25h.008v.008H18V11.25zM21 11.25h.008v.008H21V11.25z" />
  </svg>
);

interface HowToUseProps {
  onClose?: () => void;
  isModal?: boolean;
}

const HowToUse: React.FC<HowToUseProps> = ({ onClose, isModal = false }) => {
  const steps = [
    {
      phase: 'Context & Planning',
      phaseColor: 'bg-blue-500',
      steps: [
        {
          id: 1,
          title: 'Strategic Context Definition',
          description: 'Define your strategic context and objectives',
          icon: TargetIcon,
          details: 'Start by providing your basic profile information including business name, industry, location, and contact details. This helps personalize the entire report and ensures the AI understands your specific context.'
        },
        {
          id: 2,
          title: 'Opportunity Assessment',
          description: 'Market research and opportunity identification',
          icon: TrendingUpIconComponent,
          details: 'Identify and assess market opportunities in your target regions. The AI will analyze regional data, market trends, and potential growth areas to help you understand where the best opportunities lie.'
        },
        {
          id: 3,
          title: 'Partnership Intent Clarification',
          description: 'Define partnership goals and criteria',
          icon: UsersIcon,
          details: 'Clearly define what you\'re looking for in a partnership. Specify your ideal partner profile, partnership goals, success criteria, and any specific requirements or preferences.'
        }
      ]
    },
    {
      phase: 'Analysis & Assessment',
      phaseColor: 'bg-green-500',
      steps: [
        {
          id: 4,
          title: 'Regional Diagnostic (RROI)',
          description: 'Analyze regional readiness and opportunity index',
          icon: DocumentIconComponent,
          details: 'The AI performs a comprehensive Regional Resilience & Opportunity Index (RROI) analysis, evaluating factors like human capital, infrastructure, economic composition, governance, and quality of life to assess regional potential.'
        },
        {
          id: 5,
          title: 'Predictive Positioning (TPT)',
          description: 'Run transformation pathway simulations',
          icon: LightbulbIcon,
          details: 'Using Transitional Pathway Theory (TPT), the AI simulates different intervention scenarios and their potential impacts over time, helping you understand the likely outcomes of various strategic approaches.'
        },
        {
          id: 6,
          title: 'Ecosystem Mapping (SEAM)',
          description: 'Design ecosystem architecture and partnerships',
          icon: CogIconComponent,
          details: 'The Symbiotic Ecosystem Architecture Model (SEAM) maps out potential partner ecosystems, identifying anchor partners, infrastructure providers, innovation hubs, capital sources, and government stakeholders.'
        }
      ]
    },
    {
      phase: 'Strategy & Execution',
      phaseColor: 'bg-purple-500',
      steps: [
        {
          id: 7,
          title: 'Risk Assessment & Mitigation',
          description: 'Comprehensive risk analysis and mitigation strategies',
          icon: ShieldCheckIcon,
          details: 'Identify potential risks and develop mitigation strategies. The AI analyzes geopolitical, regulatory, operational, and market risks to help you prepare for challenges and uncertainties.'
        },
        {
          id: 8,
          title: 'Implementation Planning',
          description: 'Actionable execution roadmap and timeline',
          icon: CheckCircleIconComponent,
          details: 'Develop a detailed implementation plan with timelines, milestones, resource requirements, and key performance indicators to ensure successful execution of your partnership strategy.'
        },
        {
          id: 9,
          title: 'Intelligence Blueprint & Presentation (NSIL)',
          description: 'Generate final NSIL intelligence report',
          icon: PresentationChartBarIconComponent,
          details: 'Synthesize all analysis into a comprehensive NSIL (Nexus Strategic Intelligence Layer) report. This final deliverable provides actionable insights, strategic recommendations, and presentation-ready materials.'
        }
      ]
    }
  ];

  const tips = [
    {
      title: 'Be Specific in Your Inputs',
      description: 'The more detailed and specific your inputs are, the more tailored and valuable your analysis will be. Include concrete examples and metrics where possible.'
    },
    {
      title: 'Use the Nexus Copilot',
      description: 'Throughout the process, the AI copilot is available to provide guidance, answer questions, and suggest improvements to your inputs.'
    },
    {
      title: 'Review Each Step Carefully',
      description: 'Take time to review and validate the AI\'s suggestions at each step. You can go back to previous steps to make adjustments as needed.'
    },
    {
      title: 'Leverage Multiple Report Formats',
      description: 'Choose between comprehensive reports, executive summaries, or partnership letters depending on your communication needs.'
    },
    {
      title: 'Save Progress Regularly',
      description: 'The system auto-saves your progress, but you can also manually save important milestones to avoid losing work.'
    }
  ];

  const containerClasses = isModal
    ? "fixed inset-0 z-50 overflow-y-auto bg-gray-50"
    : "bg-gray-50";

  const contentClasses = isModal
    ? "min-h-screen"
    : "";

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        {/* Header */}
        <header className="text-center py-8 px-4 bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <NexusLogo className="w-8 h-8 text-nexus-accent-cyan" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                How to Use BWGA Nexus AI
              </h1>
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-snug max-w-2xl mx-auto">
              Follow our 9-step framework to transform complex regional data into strategic partnership opportunities. This guided process combines AI intelligence with human expertise for optimal results.
            </p>
            {isModal && onClose && (
              <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close help guide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
            )}
          </div>
        </header>

        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          {/* Overview */}
          <section className="mb-12">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <LightbulbIcon className="w-6 h-6 text-nexus-accent-cyan" />
                Process Overview
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TargetIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Context & Planning</h3>
                  <p className="text-sm text-gray-600">Establish your strategic foundation and define objectives</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUpIconComponent className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Analysis & Assessment</h3>
                  <p className="text-sm text-gray-600">Deep-dive analysis using AI-powered diagnostic tools</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircleIconComponent className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Strategy & Execution</h3>
                  <p className="text-sm text-gray-600">Develop actionable plans and generate final deliverables</p>
                </div>
              </div>
            </div>
          </section>

          {/* Step-by-Step Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <DocumentIconComponent className="w-6 h-6 text-nexus-accent-cyan" />
              Step-by-Step Guide
            </h2>

            {steps.map((phase, phaseIndex) => (
              <div key={phaseIndex} className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-8 h-8 ${phase.phaseColor} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {phaseIndex + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{phase.phase}</h3>
                </div>

                <div className="space-y-4">
                  {phase.steps.map((step, stepIndex) => (
                    <div key={step.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <step.icon className="w-6 h-6 text-gray-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-lg font-bold text-gray-900">Step {step.id}</span>
                            <ArrowRightIconComponent className="w-4 h-4 text-gray-400" />
                            <h4 className="text-lg font-semibold text-gray-900">{step.title}</h4>
                          </div>
                          <p className="text-gray-600 mb-3">{step.description}</p>
                          <p className="text-sm text-gray-700 leading-relaxed">{step.details}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Nexus Enquire AI Guidance */}
          <section className="mb-12">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <UsersIcon className="w-6 h-6 text-nexus-accent-cyan" />
                Nexus Enquire AI Guidance
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">What is Nexus Enquire?</h3>
                  <p className="text-gray-700 mb-4">
                    Nexus Enquire is our advanced AI assistant that guides you through each step of the process. It provides contextual help, validates your inputs, and suggests improvements to ensure optimal results.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Provides step-by-step guidance and explanations</li>
                    <li>• Validates inputs and suggests improvements</li>
                    <li>• Answers questions about methodology and tools</li>
                    <li>• Helps troubleshoot issues and resolve problems</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">How to Use Nexus Enquire</h3>
                  <p className="text-gray-700 mb-4">
                    The AI copilot is available throughout the entire process. You can ask questions, request clarifications, or get suggestions at any time.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Click on the copilot panel to ask questions</li>
                    <li>• Get real-time feedback on your inputs</li>
                    <li>• Request examples and templates</li>
                    <li>• Ask for clarification on any step or concept</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Report Generation Options */}
          <section className="mb-12">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <PresentationChartBarIconComponent className="w-6 h-6 text-nexus-accent-cyan" />
                Report Generation Options
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Comprehensive Report</h3>
                  <p className="text-sm text-gray-600 mb-3">Full analysis with detailed insights, methodology, and recommendations</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Complete RROI, TPT, and SEAM analysis</li>
                    <li>• Executive summary and detailed findings</li>
                    <li>• Strategic recommendations and action plans</li>
                    <li>• Data visualizations and charts</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Executive Summary</h3>
                  <p className="text-sm text-gray-600 mb-3">Concise overview with key findings and recommendations</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• High-level analysis results</li>
                    <li>• Key opportunities and risks</li>
                    <li>• Strategic recommendations</li>
                    <li>• Next steps and timeline</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Partnership Letter</h3>
                  <p className="text-sm text-gray-600 mb-3">Professional letter for potential partners and stakeholders</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Personalized introduction</li>
                    <li>• Opportunity overview</li>
                    <li>• Partnership proposal</li>
                    <li>• Call to action</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Tips */}
          <section className="mb-12">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircleIconComponent className="w-6 h-6 text-nexus-accent-cyan" />
                Quick Tips for Optimal Usage
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {tips.map((tip, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-nexus-accent-cyan rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{tip.title}</h3>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Visual Flow Diagram */}
          <section className="mb-12">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUpIconComponent className="w-6 h-6 text-nexus-accent-cyan" />
                Process Flow Diagram
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-center text-gray-600 mb-4">
                  <p className="text-sm">Visual representation of the 9-step BWGA Nexus AI process</p>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  {/* Phase 1 */}
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-700">Context & Planning</span>
                    <div className="flex space-x-1">
                      {[1,2,3].map(num => (
                        <div key={num} className="w-8 h-8 bg-blue-100 border border-blue-200 rounded-full flex items-center justify-center text-xs font-bold text-blue-700">
                          {num}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="w-0.5 h-8 bg-gray-300"></div>
                  <ArrowRightIconComponent className="w-4 h-4 text-gray-400" />

                  {/* Phase 2 */}
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-700">Analysis & Assessment</span>
                    <div className="flex space-x-1">
                      {[4,5,6].map(num => (
                        <div key={num} className="w-8 h-8 bg-green-100 border border-green-200 rounded-full flex items-center justify-center text-xs font-bold text-green-700">
                          {num}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="w-0.5 h-8 bg-gray-300"></div>
                  <ArrowRightIcon className="w-4 h-4 text-gray-400" />

                  {/* Phase 3 */}
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-purple-700">Strategy & Execution</span>
                    <div className="flex space-x-1">
                      {[7,8,9].map(num => (
                        <div key={num} className="w-8 h-8 bg-purple-100 border border-purple-200 rounded-full flex items-center justify-center text-xs font-bold text-purple-700">
                          {num}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Final Output */}
                  <div className="w-0.5 h-8 bg-gray-300"></div>
                  <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                  <div className="bg-nexus-accent-cyan text-white px-4 py-2 rounded-lg font-semibold">
                    NSIL Intelligence Report
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;