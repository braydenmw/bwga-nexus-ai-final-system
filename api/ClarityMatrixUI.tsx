import React, { useState, useEffect } from 'react';
import { ClarityWorkflowNavigator } from './components/clarity/ClarityWorkflowNavigator';
import { ClarityWorkspace } from './components/clarity/ClarityWorkspace';
import { ClarityCopilot } from './components/clarity/ClarityCopilot';
import { ClarityHeader } from './components/clarity/ClarityHeader';

export interface ClarityStep {
  id: number;
  title: string;
  description: string;
  component: string;
}

export const claritySteps: ClarityStep[] = [
  { id: 1, title: "Context & Profile", description: "Define your organization and regional context", component: "ContextProfile" },
  { id: 2, title: "Goal Articulation", description: "Clearly define your strategic objective", component: "GoalArticulation" },
  { id: 3, title: "Stakeholder Analysis", description: "Identify key stakeholders and their interests", component: "StakeholderAnalysis" },
  { id: 4, title: "Regional Intelligence", description: "Gather comprehensive regional data", component: "RegionalIntelligence" },
  { id: 5, title: "Market Dynamics", description: "Analyze market conditions and opportunities", component: "MarketDynamics" },
  { id: 6, title: "Competitive Landscape", description: "Map competitive environment", component: "CompetitiveLandscape" },
  { id: 7, title: "AI Configuration", description: "Configure AI personas and analytical lenses", component: "AIConfiguration" },
  { id: 8, title: "Data Synthesis", description: "Synthesize all gathered intelligence", component: "DataSynthesis" },
  { id: 9, title: "Strategic Formulation", description: "Develop strategic recommendations", component: "StrategicFormulation" },
  { id: 10, title: "Intelligence Generation", description: "Generate comprehensive intelligence report", component: "IntelligenceGeneration" },
  { id: 11, title: "Validation & Review", description: "Validate findings and recommendations", component: "ValidationReview" },
  { id: 12, title: "Action Planning", description: "Create actionable implementation plan", component: "ActionPlanning" }
];

export interface ClarityContext {
  organizationType: string[];
  region: string;
  industry: string;
  goal: string;
  stakeholders: string[];
  aiConfiguration: {
    personas: string[];
    lenses: string[];
    dataSources: string[];
  };
  intelligenceData: any;
}

export const ClarityMatrixUI: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [context, setContext] = useState<ClarityContext>({
    organizationType: [],
    region: '',
    industry: '',
    goal: '',
    stakeholders: [],
    aiConfiguration: {
      personas: [],
      lenses: [],
      dataSources: []
    },
    intelligenceData: {}
  });
  const [copilotOpen, setCopilotOpen] = useState(true);
  const [copilotMessage, setCopilotMessage] = useState('Welcome to the Clarity Matrix. I am your Nexus Copilot, here to guide you through this professional intelligence suite.');

  const updateContext = (updates: Partial<ClarityContext>) => {
    setContext(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < claritySteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepId: number) => {
    setCurrentStep(stepId);
  };

  return (
    <div className="clarity-matrix-container">
      <style jsx global>{`
        :root {
          --clarity-black: #000000;
          --clarity-white: #FFFFFF;
          --clarity-cyan: #00FFFF;
          --clarity-cyan-glow: rgba(0, 255, 255, 0.3);
          --clarity-cyan-bright: rgba(0, 255, 255, 0.8);
          --clarity-gray-dark: #1a1a1a;
          --clarity-gray-medium: #2a2a2a;
          --clarity-gray-light: #3a3a3a;
        }
        
        .clarity-matrix-container {
          background: var(--clarity-black);
          color: var(--clarity-white);
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          display: grid;
          grid-template-areas: 
            "header header header"
            "navigator workspace copilot";
          grid-template-columns: 280px 1fr 320px;
          grid-template-rows: 80px 1fr;
        }
        
        .clarity-header {
          grid-area: header;
          border-bottom: 1px solid var(--clarity-cyan);
          display: flex;
          align-items: center;
          padding: 0 2rem;
          background: linear-gradient(90deg, var(--clarity-black) 0%, var(--clarity-gray-dark) 100%);
        }
        
        .clarity-navigator {
          grid-area: navigator;
          border-right: 1px solid var(--clarity-cyan);
          background: var(--clarity-gray-dark);
          overflow-y: auto;
        }
        
        .clarity-workspace {
          grid-area: workspace;
          background: var(--clarity-black);
          overflow-y: auto;
          position: relative;
        }
        
        .clarity-copilot {
          grid-area: copilot;
          border-left: 1px solid var(--clarity-cyan);
          background: var(--clarity-gray-dark);
          display: flex;
          flex-direction: column;
        }
        
        .clarity-glow {
          box-shadow: 0 0 20px var(--clarity-cyan-glow);
        }
        
        .clarity-cyan-border {
          border: 1px solid var(--clarity-cyan);
        }
        
        .clarity-cyan-text {
          color: var(--clarity-cyan);
        }
        
        .clarity-cyan-bg {
          background: var(--clarity-cyan);
          color: var(--clarity-black);
        }
        
        .clarity-input {
          background: var(--clarity-gray-dark);
          border: 1px solid var(--clarity-gray-light);
          color: var(--clarity-white);
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }
        
        .clarity-input:focus {
          outline: none;
          border-color: var(--clarity-cyan);
          box-shadow: 0 0 0 2px var(--clarity-cyan-glow);
        }
        
        .clarity-card {
          background: var(--clarity-gray-dark);
          border: 1px solid var(--clarity-gray-light);
          border-radius: 0.75rem;
          padding: 1.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .clarity-card:hover {
          border-color: var(--clarity-cyan);
          box-shadow: 0 0 15px var(--clarity-cyan-glow);
          transform: translateY(-2px);
        }
        
        .clarity-card.selected {
          border-color: var(--clarity-cyan);
          background: linear-gradient(135deg, var(--clarity-gray-dark) 0%, rgba(0, 255, 255, 0.1) 100%);
          box-shadow: 0 0 20px var(--clarity-cyan-glow);
        }
        
        .clarity-button {
          background: var(--clarity-cyan);
          color: var(--clarity-black);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .clarity-button:hover {
          background: var(--clarity-white);
          box-shadow: 0 0 25px var(--clarity-cyan-bright);
          transform: translateY(-1px);
        }
        
        .clarity-button:disabled {
          background: var(--clarity-gray-light);
          color: var(--clarity-gray-medium);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        @keyframes clarity-pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        
        .clarity-pulse {
          animation: clarity-pulse 2s infinite;
        }
        
        @keyframes clarity-energy {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        
        .clarity-energy {
          animation: clarity-energy 3s infinite;
        }
      `}</style>
      
      <ClarityHeader />
      
      <ClarityWorkflowNavigator 
        currentStep={currentStep}
        onStepClick={goToStep}
        context={context}
      />
      
      <ClarityWorkspace 
        currentStep={currentStep}
        context={context}
        updateContext={updateContext}
        nextStep={nextStep}
        prevStep={prevStep}
        setCopilotMessage={setCopilotMessage}
      />
      
      <ClarityCopilot 
        isOpen={copilotOpen}
        message={copilotMessage}
        context={context}
        currentStep={currentStep}
      />
    </div>
  );
};

export default ClarityMatrixUI;