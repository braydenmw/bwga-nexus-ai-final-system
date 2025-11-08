import React, { useState } from 'react';
import { ClarityWorkflowNavigator } from './ClarityWorkflowNavigator';
import { ClarityWorkspace } from './ClarityWorkspace';
import { ClarityCopilot } from './ClarityCopilot';
import { ClarityIntelligenceGeneration } from './ClarityIntelligenceGeneration';

export interface ClarityContext {
  organizationType: string;
  region: string;
  goal: string;
  aiPersona: string;
  analyticalLens: string;
  toneStyle: string;
  modules: string[];
  dataSources: string[];
}

export const ClarityMatrixUI: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [context, setContext] = useState<ClarityContext>({
    organizationType: '',
    region: '',
    goal: '',
    aiPersona: '',
    analyticalLens: '',
    toneStyle: '',
    modules: [],
    dataSources: []
  });
  const [stepStatus, setStepStatus] = useState<{[key: number]: 'pending' | 'active' | 'completed'}>({
    1: 'active',
    2: 'pending',
    3: 'pending',
    4: 'pending',
    5: 'pending',
    6: 'pending',
    7: 'pending',
    8: 'pending',
    9: 'pending',
    10: 'pending',
    11: 'pending',
    12: 'pending'
  });

  const steps = [
    { id: 1, title: 'Context & Profile', description: 'Define your organization and regional context' },
    { id: 2, title: 'Goal Articulation', description: 'Specify your strategic objectives' },
    { id: 3, title: 'Stakeholder Mapping', description: 'Identify key stakeholders and their interests' },
    { id: 4, title: 'Market Analysis', description: 'Analyze market conditions and opportunities' },
    { id: 5, title: 'Competitive Landscape', description: 'Map competitive dynamics' },
    { id: 6, title: 'Risk Assessment', description: 'Evaluate potential risks and mitigation strategies' },
    { id: 7, title: 'AI Configuration', description: 'Configure AI personas and analytical frameworks' },
    { id: 8, title: 'Data Integration', description: 'Integrate and validate data sources' },
    { id: 9, title: 'Model Training', description: 'Train AI models on your specific context' },
    { id: 10, title: 'Intelligence Generation', description: 'Generate novel insights and frameworks' },
    { id: 11, title: 'Validation & Testing', description: 'Validate generated intelligence' },
    { id: 12, title: 'Deployment & Monitoring', description: 'Deploy and monitor your intelligence system' }
  ];

  const updateStepStatus = (stepId: number, status: 'pending' | 'active' | 'completed') => {
    setStepStatus(prev => ({ ...prev, [stepId]: status }));
  };

  const goToNextStep = () => {
    if (currentStep < 12) {
      updateStepStatus(currentStep, 'completed');
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      updateStepStatus(nextStep, 'active');
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      updateStepStatus(currentStep, 'pending');
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      updateStepStatus(prevStep, 'active');
    }
  };

  const goToStep = (stepId: number) => {
    // Allow navigation to completed steps or the next available step
    const canNavigate = stepStatus[stepId] === 'completed' || 
                       (stepId === currentStep + 1 && stepStatus[currentStep] === 'completed');
    
    if (canNavigate) {
      updateStepStatus(currentStep, stepStatus[currentStep] === 'active' ? 'pending' : stepStatus[currentStep]);
      setCurrentStep(stepId);
      updateStepStatus(stepId, 'active');
    }
  };

  const updateContext = (updates: Partial<ClarityContext>) => {
    setContext(prev => ({ ...prev, ...updates }));
  };

  const renderWorkspace = () => {
    if (currentStep === 10) {
      return (
        <ClarityIntelligenceGeneration 
          context={context}
          onComplete={() => goToNextStep()}
        />
      );
    }

    return (
      <ClarityWorkspace
        currentStep={currentStep}
        context={context}
        onUpdateContext={updateContext}
        onCompleteStep={goToNextStep}
        onPreviousStep={goToPreviousStep}
      />
    );
  };

  return (
    <div className="clarity-matrix">
      <style jsx global>{`
        :root {
          --clarity-black: #000000;
          --clarity-white: #ffffff;
          --clarity-cyan: #00ffff;
          --clarity-gray-dark: #1a1a1a;
          --clarity-gray-medium: #2a2a2a;
          --clarity-gray-light: #3a3a3a;
          --clarity-cyan-glow: rgba(0, 255, 255, 0.3);
          --clarity-cyan-bright: rgba(0, 255, 255, 0.8);
          --clarity-gradient: linear-gradient(135deg, var(--clarity-cyan) 0%, var(--clarity-white) 100%);
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: var(--clarity-black);
          color: var(--clarity-white);
        }

        .clarity-matrix {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--clarity-black);
        }

        .clarity-header {
          background: linear-gradient(135deg, var(--clarity-gray-dark) 0%, var(--clarity-black) 100%);
          border-bottom: 1px solid var(--clarity-gray-light);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .clarity-logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--clarity-cyan);
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .clarity-subtitle {
          font-size: 0.875rem;
          color: var(--clarity-gray-medium);
          margin-top: 0.25rem;
        }

        .clarity-main {
          flex: 1;
          display: grid;
          grid-template-columns: 300px 1fr 350px;
          gap: 1px;
          background: var(--clarity-gray-light);
          min-height: calc(100vh - 80px);
        }

        .clarity-navigator {
          background: var(--clarity-gray-dark);
          overflow-y: auto;
        }

        .clarity-workspace {
          background: var(--clarity-black);
          overflow-y: auto;
        }

        .clarity-copilot {
          background: var(--clarity-gray-dark);
          overflow-y: auto;
        }

        .clarity-footer {
          background: var(--clarity-gray-dark);
          border-top: 1px solid var(--clarity-gray-light);
          padding: 1rem 2rem;
          text-align: center;
          color: var(--clarity-gray-medium);
          font-size: 0.75rem;
        }

        /* Responsive design */
        @media (max-width: 1400px) {
          .clarity-main {
            grid-template-columns: 280px 1fr 320px;
          }
        }

        @media (max-width: 1200px) {
          .clarity-main {
            grid-template-columns: 260px 1fr 300px;
          }
        }

        @media (max-width: 1024px) {
          .clarity-main {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
          }
          
          .clarity-navigator {
            order: 2;
          }
          
          .clarity-workspace {
            order: 1;
          }
          
          .clarity-copilot {
            order: 3;
          }
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: var(--clarity-gray-dark);
        }

        ::-webkit-scrollbar-thumb {
          background: var(--clarity-gray-medium);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--clarity-cyan);
        }

        /* Animation utilities */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 var(--clarity-cyan-glow);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(0, 255, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 255, 255, 0);
          }
        }

        .fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        .slide-in {
          animation: slideIn 0.3s ease-out;
        }

        .pulse {
          animation: pulse 2s infinite;
        }
      `}</style>

      <header className="clarity-header">
        <div>
          <div className="clarity-logo">CUSTOMER WORK REPORT SYSTEM</div>
          <div className="clarity-subtitle">12-Step Intelligence Generation System</div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            background: 'var(--clarity-cyan)', 
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }} />
          <span style={{ fontSize: '0.875rem', color: 'var(--clarity-cyan)' }}>
            Step {currentStep} of 12
          </span>
        </div>
      </header>

      <main className="clarity-main">
        <div className="clarity-navigator">
          <ClarityWorkflowNavigator
            steps={steps}
            currentStep={currentStep}
            stepStatus={stepStatus}
            onStepClick={goToStep}
            context={context}
          />
        </div>

        <div className="clarity-workspace fade-in">
          {renderWorkspace()}
        </div>

        <div className="clarity-copilot">
          <ClarityCopilot
            currentStep={currentStep}
            context={context}
          />
        </div>
      </main>

      <footer className="clarity-footer">
        <p>© 2024 Customer Work Report System - Intelligence Generation Platform</p>
      </footer>
    </div>
  );
};

export default ClarityMatrixUI;