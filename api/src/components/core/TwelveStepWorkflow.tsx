import React, { useState, useCallback, useEffect } from 'react';
import { UserTier, USER_TIERS } from './UserProfileSetup';
import { WORKFLOW_STEPS, getAvailableSteps } from '../../data/workflowSteps';

export interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  component: string;
  duration: string;
  required: boolean;
  scoring?: {
    opportunities: number;
    modules: number;
    complexity: number;
  };
}

export const TWELVE_STEPS: WorkflowStep[] = [
  {
    id: 1,
    title: 'Strategic Context',
    description: 'Define your regional development goals and strategic objectives',
    icon: '🎯',
    component: 'GoalAnalyzer',
    duration: '5-10 min',
    required: true,
    scoring: { opportunities: 10, modules: 3, complexity: 2 }
  },
  {
    id: 2,
    title: 'Context Intelligence',
    description: 'Gather regional context, market data, and stakeholder information',
    icon: '📊',
    component: 'ContextEngine',
    duration: '10-15 min',
    required: true,
    scoring: { opportunities: 15, modules: 4, complexity: 3 }
  },
  {
    id: 3,
    title: 'Opportunity Scanning',
    description: 'Identify and analyze potential opportunities in your region',
    icon: '🔍',
    component: 'OpportunityTracker',
    duration: '15-20 min',
    required: true,
    scoring: { opportunities: 25, modules: 5, complexity: 4 }
  },
  {
    id: 4,
    title: 'Partner Network Analysis',
    description: 'Map potential partners, investors, and stakeholders',
    icon: '🌐',
    component: 'PartnerNetwork',
    duration: '10-15 min',
    required: true,
    scoring: { opportunities: 20, modules: 4, complexity: 3 }
  },
  {
    id: 5,
    title: 'Risk Assessment',
    description: 'Evaluate risks, challenges, and mitigation strategies',
    icon: '⚠️',
    component: 'RiskMatrix',
    duration: '10-15 min',
    required: true,
    scoring: { opportunities: 15, modules: 3, complexity: 4 }
  },
  {
    id: 6,
    title: 'RROI Analysis',
    description: 'Calculate Regional Return on Investment metrics',
    icon: '📈',
    component: 'RROIDisplay',
    duration: '15-20 min',
    required: true,
    scoring: { opportunities: 20, modules: 4, complexity: 5 }
  },
  {
    id: 7,
    title: 'Transformation Pathway',
    description: 'Design transformation pathways and implementation strategies',
    icon: '🛤️',
    component: 'TPTSimulator',
    duration: '20-25 min',
    required: true,
    scoring: { opportunities: 30, modules: 6, complexity: 5 }
  },
  {
    id: 8,
    title: 'SEAM Architecture',
    description: 'Develop Symbiotic Ecosystem Architecture Mapping',
    icon: '🏗️',
    component: 'SEAMMapper',
    duration: '15-20 min',
    required: true,
    scoring: { opportunities: 25, modules: 5, complexity: 4 }
  },
  {
    id: 9,
    title: 'Implementation Roadmap',
    description: 'Create detailed implementation roadmap and timeline',
    icon: '🗺️',
    component: 'ImplementationRoadmap',
    duration: '20-30 min',
    required: true,
    scoring: { opportunities: 20, modules: 4, complexity: 3 }
  },
  {
    id: 10,
    title: 'Intelligence Dashboard',
    description: 'Compile comprehensive intelligence dashboard',
    icon: '📋',
    component: 'IntelligenceDashboard',
    duration: '10-15 min',
    required: true,
    scoring: { opportunities: 15, modules: 3, complexity: 2 }
  },
  {
    id: 11,
    title: 'Introduction Letter',
    description: 'Generate personalized introduction letters for partners',
    icon: '💌',
    component: 'LetterGenerator',
    duration: '5-10 min',
    required: false,
    scoring: { opportunities: 10, modules: 2, complexity: 1 }
  },
  {
    id: 12,
    title: 'Report Generation',
    description: 'Generate comprehensive reports with different formats and styles',
    icon: '📄',
    component: 'ReportGenerator',
    duration: '15-25 min',
    required: true,
    scoring: { opportunities: 30, modules: 6, complexity: 4 }
  }
];

export interface EngagementStyle {
  id: string;
  name: string;
  description: string;
  icon: string;
  approach: string;
  reportFormats: string[];
  tone: string;
  depth: 'Basic' | 'Standard' | 'Comprehensive';
  timeInvestment: string;
}

export const ENGAGEMENT_STYLES: EngagementStyle[] = [
  {
    id: 'exploratory',
    name: 'Exploratory',
    description: 'Quick scan to understand potential opportunities',
    icon: '🧭',
    approach: 'High-level overview with key insights',
    reportFormats: ['Brief', 'Snapshot'],
    tone: 'Conversational and accessible',
    depth: 'Basic',
    timeInvestment: '2-3 hours'
  },
  {
    id: 'strategic',
    name: 'Strategic',
    description: 'In-depth analysis for decision-making',
    icon: '🎯',
    approach: 'Detailed analysis with actionable recommendations',
    reportFormats: ['Standard', 'Comprehensive'],
    tone: 'Professional and analytical',
    depth: 'Standard',
    timeInvestment: '4-6 hours'
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive',
    description: 'Full intelligence package for major initiatives',
    icon: '🏛️',
    approach: 'Complete analysis with implementation roadmap',
    reportFormats: ['Comprehensive'],
    tone: 'Formal and authoritative',
    depth: 'Comprehensive',
    timeInvestment: '6-8 hours'
  },
  {
    id: 'rapid',
    name: 'Rapid Response',
    description: 'Quick turnaround for urgent needs',
    icon: '⚡',
    approach: 'Focused analysis on critical elements',
    reportFormats: ['Snapshot', 'Brief'],
    tone: 'Direct and actionable',
    depth: 'Basic',
    timeInvestment: '1-2 hours'
  },
  {
    id: 'diagnostic',
    name: 'Diagnostic',
    description: 'Problem identification and solution pathways',
    icon: '🔍',
    approach: 'Root cause analysis and solution mapping',
    reportFormats: ['Standard', 'Brief'],
    tone: 'Clinical and systematic',
    depth: 'Standard',
    timeInvestment: '3-4 hours'
  }
];

export interface ReportFormat {
  id: string;
  name: string;
  description: string;
  pages: string;
  sections: string[];
  aiPersonas: string[];
  complexity: number;
  timeEstimate: string;
}

export const REPORT_FORMATS: ReportFormat[] = [
  {
    id: 'snapshot',
    name: 'Snapshot',
    description: 'Quick overview with key insights',
    pages: '2-4',
    sections: ['Executive Summary', 'Key Opportunities', 'Risk Overview', 'Next Steps'],
    aiPersonas: ['Regional Economist', 'Venture Capitalist'],
    complexity: 1,
    timeEstimate: '30-45 min'
  },
  {
    id: 'brief',
    name: 'Brief',
    description: 'Concise analysis with actionable recommendations',
    pages: '5-8',
    sections: ['Executive Summary', 'Market Analysis', 'Opportunity Assessment', 'Risk Analysis', 'Recommendations'],
    aiPersonas: ['Regional Economist', 'Geopolitical Strategist', 'ESG Analyst'],
    complexity: 2,
    timeEstimate: '45-75 min'
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'Comprehensive analysis for decision-making',
    pages: '10-15',
    sections: [
      'Executive Summary',
      'Strategic Context',
      'Market Analysis',
      'Opportunity Assessment',
      'Risk Analysis',
      'Implementation Roadmap',
      'Financial Projections',
      'Recommendations'
    ],
    aiPersonas: ['Regional Economist', 'Geopolitical Strategist', 'Infrastructure Planner', 'ESG Analyst'],
    complexity: 3,
    timeEstimate: '75-120 min'
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive',
    description: 'Full intelligence package with detailed analysis',
    pages: '20-30',
    sections: [
      'Executive Summary',
      'Strategic Context',
      'Market Analysis',
      'Opportunity Assessment',
      'Partner Network Analysis',
      'Risk Assessment',
      'RROI Analysis',
      'Transformation Pathways',
      'SEAM Architecture',
      'Implementation Roadmap',
      'Financial Projections',
      'Monitoring Framework',
      'Recommendations',
      'Appendices'
    ],
    aiPersonas: [
      'Regional Economist',
      'Geopolitical Strategist',
      'Infrastructure Planner',
      'ESG Analyst',
      'Supply Chain Analyst',
      'Workforce Development Specialist'
    ],
    complexity: 5,
    timeEstimate: '120-180 min'
  }
];

interface TwelveStepWorkflowProps {
  userTier: UserTier;
  currentStep: number;
  completedSteps: number[];
  onStepComplete: (stepId: number, data: any) => void;
  onStepSelect: (stepId: number) => void;
  onEngagementStyleSelect: (style: EngagementStyle) => void;
  onReportFormatSelect: (format: ReportFormat) => void;
  selectedEngagementStyle?: EngagementStyle;
  selectedReportFormat?: ReportFormat;
  workflowData: Record<number, any>;
}

export const TwelveStepWorkflow: React.FC<TwelveStepWorkflowProps> = ({
  userTier,
  currentStep,
  completedSteps,
  onStepComplete,
  onStepSelect,
  onEngagementStyleSelect,
  onReportFormatSelect,
  selectedEngagementStyle,
  selectedReportFormat,
  workflowData
}) => {
  const [showEngagementSelector, setShowEngagementSelector] = useState(false);
  const [showFormatSelector, setShowFormatSelector] = useState(false);

  // Use workflow steps from data file
  const workflowSteps = getAvailableSteps(completedSteps, userTier.id);

  const calculateTotalScore = useCallback(() => {
    let totalScore = 0;
    let totalOpportunities = 0;
    let totalModules = 0;
    let totalComplexity = 0;

    completedSteps.forEach(stepId => {
      const step = TWELVE_STEPS.find(s => s.id === stepId);
      if (step?.scoring) {
        totalScore += (step.scoring.opportunities * userTier.scoringMultiplier) + step.scoring.modules + step.scoring.complexity;
        totalOpportunities += step.scoring.opportunities;
        totalModules += step.scoring.modules;
        totalComplexity += step.scoring.complexity;
      }
    });

    return {
      total: Math.round(totalScore),
      opportunities: Math.round(totalOpportunities * userTier.scoringMultiplier),
      modules: totalModules,
      complexity: totalComplexity
    };
  }, [completedSteps, userTier.scoringMultiplier]);

  const canAccessStep = useCallback((stepId: number) => {
    const step = TWELVE_STEPS.find(s => s.id === stepId);
    if (!step) return false;
    
    // Check if user tier allows this step
    if (stepId === 11) { // Letter generation
      return userTier.reportLengths.includes('Comprehensive') || userTier.reportLengths.includes('Standard');
    }
    
    // Check prerequisites (previous required steps)
    const previousRequiredSteps = TWELVE_STEPS.filter(s => s.id < stepId && s.required).map(s => s.id);
    return previousRequiredSteps.every(id => completedSteps.includes(id));
  }, [completedSteps, userTier.reportLengths]);

  const score = calculateTotalScore();

  return (
    <div className="space-y-6">
      {/* Workflow Overview */}
      <div className="bg-nexus-surface-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-nexus-text-primary">12-Step Intelligence Workflow</h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-nexus-text-secondary">
              Progress: {completedSteps.length}/{TWELVE_STEPS.length} steps
            </div>
            <div className="text-sm font-medium text-nexus-accent-cyan">
              Score: {score.total}
            </div>
          </div>
        </div>

        {/* Engagement Style Selector */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-nexus-text-primary">Engagement Style</h3>
            <button
              onClick={() => setShowEngagementSelector(!showEngagementSelector)}
              className="text-nexus-accent-cyan hover:text-nexus-accent-cyan/80 text-sm underline"
            >
              {showEngagementSelector ? 'Hide' : 'Change Style'}
            </button>
          </div>
          
          {selectedEngagementStyle && !showEngagementSelector && (
            <div className="bg-nexus-surface-700 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{selectedEngagementStyle.icon}</span>
                <div>
                  <div className="font-medium text-nexus-text-primary">{selectedEngagementStyle.name}</div>
                  <div className="text-sm text-nexus-text-secondary">{selectedEngagementStyle.description}</div>
                  <div className="text-xs text-nexus-accent-cyan mt-1">
                    {selectedEngagementStyle.timeInvestment} • {selectedEngagementStyle.depth} depth
                  </div>
                </div>
              </div>
            </div>
          )}

          {showEngagementSelector && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {ENGAGEMENT_STYLES.map((style) => (
                <div
                  key={style.id}
                  className={`bg-nexus-surface-700 rounded-lg p-4 cursor-pointer transition-all border-2 ${
                    selectedEngagementStyle?.id === style.id
                      ? 'border-nexus-accent-cyan bg-nexus-accent-cyan/20'
                      : 'border-transparent hover:bg-nexus-surface-600'
                  }`}
                  onClick={() => {
                    onEngagementStyleSelect(style);
                    setShowEngagementSelector(false);
                  }}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{style.icon}</div>
                    <div className="font-medium text-nexus-text-primary mb-1">{style.name}</div>
                    <div className="text-xs text-nexus-text-secondary mb-2">{style.description}</div>
                    <div className="text-xs text-nexus-accent-cyan">{style.timeInvestment}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Report Format Selector */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-nexus-text-primary">Report Format</h3>
            <button
              onClick={() => setShowFormatSelector(!showFormatSelector)}
              className="text-nexus-accent-cyan hover:text-nexus-accent-cyan/80 text-sm underline"
            >
              {showFormatSelector ? 'Hide' : 'Change Format'}
            </button>
          </div>
          
          {selectedReportFormat && !showFormatSelector && (
            <div className="bg-nexus-surface-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-nexus-text-primary">{selectedReportFormat.name}</div>
                  <div className="text-sm text-nexus-text-secondary">{selectedReportFormat.description}</div>
                  <div className="text-xs text-nexus-accent-cyan mt-1">
                    {selectedReportFormat.pages} pages • {selectedReportFormat.timeEstimate}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-nexus-text-secondary">Complexity</div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < selectedReportFormat.complexity ? 'bg-nexus-accent-cyan' : 'bg-nexus-surface-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {showFormatSelector && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REPORT_FORMATS.map((format) => (
                <div
                  key={format.id}
                  className={`bg-nexus-surface-700 rounded-lg p-4 cursor-pointer transition-all border-2 ${
                    selectedReportFormat?.id === format.id
                      ? 'border-nexus-accent-cyan bg-nexus-accent-cyan/20'
                      : 'border-transparent hover:bg-nexus-surface-600'
                  }`}
                  onClick={() => {
                    onReportFormatSelect(format);
                    setShowFormatSelector(false);
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium text-nexus-text-primary">{format.name}</div>
                    <div className="text-xs text-nexus-accent-cyan">{format.pages} pages</div>
                  </div>
                  <div className="text-sm text-nexus-text-secondary mb-3">{format.description}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-nexus-text-secondary">{format.timeEstimate}</div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < format.complexity ? 'bg-nexus-accent-cyan' : 'bg-nexus-surface-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Score Summary */}
        <div className="bg-nexus-surface-700 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-nexus-accent-cyan">{score.total}</div>
              <div className="text-xs text-nexus-text-secondary">Total Score</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-nexus-text-primary">{score.opportunities}</div>
              <div className="text-xs text-nexus-text-secondary">Opportunities</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-nexus-text-primary">{score.modules}</div>
              <div className="text-xs text-nexus-text-secondary">Modules</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-nexus-text-primary">{score.complexity}</div>
              <div className="text-xs text-nexus-text-secondary">Complexity</div>
            </div>
          </div>
        </div>
      </div>

      {/* Step Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {TWELVE_STEPS.map((step) => {
          const isAccessible = canAccessStep(step.id);
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;

          return (
            <div
              key={step.id}
              className={`bg-nexus-surface-800 rounded-lg p-4 transition-all ${
                !isAccessible
                  ? 'opacity-50 cursor-not-allowed'
                  : isCurrent
                  ? 'ring-2 ring-nexus-accent-cyan bg-nexus-accent-cyan/20'
                  : 'cursor-pointer hover:bg-nexus-surface-700'
              }`}
              onClick={() => isAccessible && onStepSelect(step.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{step.icon}</div>
                  <div className="font-medium text-nexus-text-primary">Step {step.id}</div>
                </div>
                {isCompleted && (
                  <div className="w-6 h-6 bg-nexus-accent-cyan rounded-full flex items-center justify-center">
                    <span className="text-nexus-primary-900 text-sm font-bold">✓</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-nexus-text-primary">{step.title}</h4>
                <p className="text-sm text-nexus-text-secondary line-clamp-2">{step.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-nexus-accent-cyan">{step.duration}</span>
                  {!step.required && (
                    <span className="text-nexus-text-secondary">Optional</span>
                  )}
                </div>
              </div>

              {step.scoring && (
                <div className="mt-3 pt-3 border-t border-nexus-surface-700">
                  <div className="flex items-center justify-between text-xs text-nexus-text-secondary">
                    <span>Score: {Math.round((step.scoring.opportunities * userTier.scoringMultiplier) + step.scoring.modules + step.scoring.complexity)}</span>
                    <span>{step.scoring.opportunities} opp • {step.scoring.modules} mod</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};