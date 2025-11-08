import { WorkflowStep } from '../types';

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    title: 'Strategic Context Definition',
    description: 'Define your strategic objectives, regional focus, and key stakeholders',
    icon: '🎯',
    color: 'cyan',
    opportunityScore: 15,
    moduleScore: 10,
    complexityScore: 8,
    requiredTier: 'basic',
    prerequisites: [],
    estimatedTime: '15-30 minutes',
    deliverables: ['Strategic context document', 'Stakeholder map', 'Objective framework'],
    aiPersonas: ['Regional Economist', 'Strategic Planner'],
    tools: ['ContextEngine', 'GoalAnalyzer']
  },
  {
    id: 2,
    title: 'RROI Analysis',
    description: 'Analyze Regional Return on Investment potential across key sectors',
    icon: '📊',
    color: 'purple',
    opportunityScore: 25,
    moduleScore: 20,
    complexityScore: 15,
    requiredTier: 'basic',
    prerequisites: [1],
    estimatedTime: '30-45 minutes',
    deliverables: ['RROI assessment', 'Investment opportunity matrix', 'Risk-adjusted projections'],
    aiPersonas: ['Venture Capitalist', 'Regional Economist', 'Financial Analyst'],
    tools: ['RROIDisplay', 'EconomicData']
  },
  {
    id: 3,
    title: 'TPT Simulation',
    description: 'Simulate Transformation Pathway Trajectories for regional development',
    icon: '🛤️',
    color: 'green',
    opportunityScore: 30,
    moduleScore: 25,
    complexityScore: 20,
    requiredTier: 'professional',
    prerequisites: [1, 2],
    estimatedTime: '45-60 minutes',
    deliverables: ['Transformation roadmap', 'Milestone timeline', 'Success metrics'],
    aiPersonas: ['Infrastructure Planner', 'Policy Advisor', 'Transformation Specialist'],
    tools: ['TPTSimulator', 'PredictiveAnalysis']
  },
  {
    id: 4,
    title: 'SEAM Architecture',
    description: 'Design Symbiotic Ecosystem Architecture for multi-stakeholder collaboration',
    icon: '🌐',
    color: 'yellow',
    opportunityScore: 35,
    moduleScore: 30,
    complexityScore: 25,
    requiredTier: 'professional',
    prerequisites: [1, 2, 3],
    estimatedTime: '60-90 minutes',
    deliverables: ['Ecosystem map', 'Partnership framework', 'Collaboration protocols'],
    aiPersonas: ['Ecosystem Architect', 'Partnership Facilitator', 'Network Strategist'],
    tools: ['SEAMMapper', 'PartnerNetwork']
  },
  {
    id: 5,
    title: 'Live Opportunities',
    description: 'Identify and analyze real-time investment and partnership opportunities',
    icon: '⚡',
    color: 'red',
    opportunityScore: 40,
    moduleScore: 35,
    complexityScore: 30,
    requiredTier: 'enterprise',
    prerequisites: [1, 2],
    estimatedTime: '30-45 minutes',
    deliverables: ['Opportunity pipeline', 'Due diligence reports', 'Investment briefs'],
    aiPersonas: ['Opportunity Scout', 'Due Diligence Analyst', 'Investment Advisor'],
    tools: ['OpportunityTracker', 'LiveData']
  },
  {
    id: 6,
    title: 'Partner Network',
    description: 'Map and engage with strategic partners across sectors and regions',
    icon: '🤝',
    color: 'cyan',
    opportunityScore: 20,
    moduleScore: 15,
    complexityScore: 12,
    requiredTier: 'basic',
    prerequisites: [1],
    estimatedTime: '20-30 minutes',
    deliverables: ['Partner ecosystem map', 'Engagement strategy', 'Partnership scorecards'],
    aiPersonas: ['Partnership Manager', 'Network Analyst', 'Relationship Strategist'],
    tools: ['PartnerNetwork', 'RelationshipMapping']
  },
  {
    id: 7,
    title: 'Risk Assessment',
    description: 'Comprehensive risk analysis and mitigation strategies',
    icon: '⚠️',
    color: 'orange',
    opportunityScore: 18,
    moduleScore: 20,
    complexityScore: 16,
    requiredTier: 'professional',
    prerequisites: [1, 2, 3],
    estimatedTime: '25-40 minutes',
    deliverables: ['Risk matrix', 'Mitigation strategies', 'Contingency plans'],
    aiPersonas: ['Risk Analyst', 'Crisis Manager', 'Compliance Officer'],
    tools: ['RiskMatrix', 'ScenarioPlanning']
  },
  {
    id: 8,
    title: 'Economic Indicators',
    description: 'Analyze real-time economic data and market trends',
    icon: '📈',
    color: 'blue',
    opportunityScore: 22,
    moduleScore: 18,
    complexityScore: 14,
    requiredTier: 'basic',
    prerequisites: [1],
    estimatedTime: '20-35 minutes',
    deliverables: ['Economic dashboard', 'Trend analysis', 'Market forecasts'],
    aiPersonas: ['Economic Analyst', 'Market Researcher', 'Data Scientist'],
    tools: ['EconomicData', 'TrendAnalysis']
  },
  {
    id: 9,
    title: 'Predictive Analysis',
    description: 'Generate predictive insights using AI and machine learning',
    icon: '🔮',
    color: 'purple',
    opportunityScore: 28,
    moduleScore: 25,
    complexityScore: 22,
    requiredTier: 'professional',
    prerequisites: [1, 8],
    estimatedTime: '35-50 minutes',
    deliverables: ['Predictive models', 'Scenario projections', 'Confidence intervals'],
    aiPersonas: ['Predictive Analyst', 'ML Engineer', 'Forecasting Specialist'],
    tools: ['PredictiveAnalysis', 'MLModels']
  },
  {
    id: 10,
    title: 'Implementation Planning',
    description: 'Create detailed implementation roadmaps and action plans',
    icon: '🗺️',
    color: 'green',
    opportunityScore: 32,
    moduleScore: 28,
    complexityScore: 24,
    requiredTier: 'professional',
    prerequisites: [1, 2, 3, 4],
    estimatedTime: '40-60 minutes',
    deliverables: ['Implementation roadmap', 'Resource allocation', 'Timeline planning'],
    aiPersonas: ['Implementation Manager', 'Project Planner', 'Resource Manager'],
    tools: ['ImplementationRoadmap', 'ProjectPlanning']
  },
  {
    id: 11,
    title: 'Intelligence Dashboard',
    description: 'Comprehensive dashboard with key metrics and insights',
    icon: '📱',
    color: 'cyan',
    opportunityScore: 15,
    moduleScore: 12,
    complexityScore: 10,
    requiredTier: 'basic',
    prerequisites: [1],
    estimatedTime: '15-25 minutes',
    deliverables: ['Executive dashboard', 'KPI tracking', 'Performance metrics'],
    aiPersonas: ['Dashboard Designer', 'KPI Specialist', 'Performance Analyst'],
    tools: ['IntelligenceDashboard', 'KPIEngine']
  },
  {
    id: 12,
    title: 'Report Generation',
    description: 'Generate comprehensive reports with AI-powered insights',
    icon: '📋',
    color: 'gold',
    opportunityScore: 50,
    moduleScore: 40,
    complexityScore: 35,
    requiredTier: 'enterprise',
    prerequisites: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    estimatedTime: '20-30 minutes',
    deliverables: ['Intelligence report', 'Executive summary', 'Strategic recommendations'],
    aiPersonas: ['Report Writer', 'Strategic Analyst', 'Executive Advisor'],
    tools: ['ReportGenerator', 'AISummarizer']
  }
];

export const getWorkflowStepsByTier = (tier: string): WorkflowStep[] => {
  return WORKFLOW_STEPS.filter(step => {
    switch (tier) {
      case 'basic':
        return step.requiredTier === 'basic';
      case 'professional':
        return step.requiredTier === 'basic' || step.requiredTier === 'professional';
      case 'enterprise':
        return true; // Enterprise gets all steps
      default:
        return step.requiredTier === 'basic';
    }
  });
};

export const getAvailableSteps = (completedSteps: number[], tier: string): number[] => {
  const availableSteps: number[] = [];
  
  WORKFLOW_STEPS.forEach(step => {
    const hasRequiredTier = getWorkflowStepsByTier(tier).some(s => s.id === step.id);
    const hasPrerequisites = step.prerequisites.every(prereq => completedSteps.includes(prereq));
    
    if (hasRequiredTier && hasPrerequisites) {
      availableSteps.push(step.id);
    }
  });
  
  return availableSteps;
};

export const calculateTotalOpportunityScore = (tier: string): number => {
  return getWorkflowStepsByTier(tier).reduce((sum, step) => sum + step.opportunityScore, 0);
};

export const calculateTotalModuleScore = (tier: string): number => {
  return getWorkflowStepsByTier(tier).reduce((sum, step) => sum + step.moduleScore, 0);
};

export const calculateTotalComplexityScore = (tier: string): number => {
  return getWorkflowStepsByTier(tier).reduce((sum, step) => sum + step.complexityScore, 0);
};