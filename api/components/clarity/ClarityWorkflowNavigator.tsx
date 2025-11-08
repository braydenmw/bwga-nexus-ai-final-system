import React from 'react';
import { claritySteps, ClarityStep } from '../../ClarityMatrixUI';

interface ClarityWorkflowNavigatorProps {
  currentStep: number;
  onStepClick: (stepId: number) => void;
  context: any;
}

export const ClarityWorkflowNavigator: React.FC<ClarityWorkflowNavigatorProps> = ({ 
  currentStep, 
  onStepClick, 
  context 
}) => {
  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getContextIndicator = (stepId: number) => {
    // Show context indicators based on what data is available
    switch (stepId) {
      case 1: // Context & Profile
        return context.organizationType.length > 0 ? '🏢' : '○';
      case 2: // Goal Articulation  
        return context.goal ? '🎯' : '○';
      case 7: // AI Configuration
        return context.aiConfiguration.personas.length > 0 ? '🧠' : '○';
      default:
        return '○';
    }
  };

  return (
    <div className="clarity-navigator">
      <style jsx>{`
        .clarity-navigator {
          padding: 2rem 1.5rem;
          height: 100%;
          overflow-y: auto;
        }
        
        .navigator-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--clarity-cyan);
          margin-bottom: 2rem;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .step-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .step-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid transparent;
          position: relative;
          overflow: hidden;
        }
        
        .step-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background: transparent;
          transition: all 0.3s ease;
        }
        
        .step-item:hover {
          background: var(--clarity-gray-medium);
          border-color: var(--clarity-cyan);
          transform: translateX(4px);
        }
        
        .step-item.current {
          background: linear-gradient(135deg, var(--clarity-gray-dark) 0%, rgba(0, 255, 255, 0.1) 100%);
          border-color: var(--clarity-cyan);
          box-shadow: 0 0 20px var(--clarity-cyan-glow);
        }
        
        .step-item.current::before {
          background: var(--clarity-cyan);
          box-shadow: 0 0 10px var(--clarity-cyan);
        }
        
        .step-item.completed {
          background: var(--clarity-gray-medium);
          border-color: var(--clarity-gray-light);
        }
        
        .step-item.completed:hover {
          border-color: var(--clarity-cyan);
        }
        
        .step-indicator {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 600;
          margin-right: 1rem;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        
        .step-item.current .step-indicator {
          background: var(--clarity-cyan);
          color: var(--clarity-black);
          box-shadow: 0 0 15px var(--clarity-cyan);
        }
        
        .step-item.completed .step-indicator {
          background: var(--clarity-cyan);
          color: var(--clarity-black);
        }
        
        .step-item.upcoming .step-indicator {
          background: var(--clarity-gray-light);
          color: var(--clarity-gray-medium);
        }
        
        .step-content {
          flex: 1;
        }
        
        .step-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--clarity-white);
          margin-bottom: 0.25rem;
        }
        
        .step-description {
          font-size: 0.75rem;
          color: var(--clarity-gray-medium);
          line-height: 1.4;
        }
        
        .step-item.current .step-description {
          color: var(--clarity-cyan);
        }
        
        .context-indicator {
          margin-left: auto;
          font-size: 1.25rem;
          opacity: 0.8;
        }
        
        .progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--clarity-gray-light);
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--clarity-cyan) 0%, var(--clarity-white) 100%);
          transition: width 0.5s ease;
          box-shadow: 0 0 10px var(--clarity-cyan);
        }
      `}</style>
      
      <div className="navigator-title">
        Intelligence Workflow
      </div>
      
      <div className="step-list">
        {claritySteps.map((step) => {
          const status = getStepStatus(step.id);
          return (
            <div
              key={step.id}
              className={`step-item ${status}`}
              onClick={() => onStepClick(step.id)}
            >
              <div className="step-indicator">
                {status === 'completed' ? '✓' : step.id}
              </div>
              <div className="step-content">
                <div className="step-title">{step.title}</div>
                <div className="step-description">{step.description}</div>
              </div>
              <div className="context-indicator">
                {getContextIndicator(step.id)}
              </div>
              
              {status === 'current' && (
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${((step.id - 1) / claritySteps.length) * 100}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};