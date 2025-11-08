import React, { useState } from 'react';
import { ClarityStep } from '../../ClarityMatrixUI';

interface ClarityWorkspaceProps {
  currentStep: ClarityStep;
  context: any;
  onContextUpdate: (context: any) => void;
  onStepComplete: (stepId: number) => void;
}

export const ClarityWorkspace: React.FC<ClarityWorkspaceProps> = ({ 
  currentStep, 
  context, 
  onContextUpdate, 
  onStepComplete 
}) => {
  const [localContext, setLocalContext] = useState(context);

  const handleOrganizationSelect = (type: string) => {
    const newContext = { ...localContext, organizationType: type };
    setLocalContext(newContext);
    onContextUpdate(newContext);
  };

  const handleGoalChange = (goal: string) => {
    const newContext = { ...localContext, goal };
    setLocalContext(newContext);
    onContextUpdate(newContext);
  };

  const handleAIConfiguration = (category: string, selection: string[]) => {
    const newContext = {
      ...localContext,
      aiConfiguration: {
        ...localContext.aiConfiguration,
        [category]: selection
      }
    };
    setLocalContext(newContext);
    onContextUpdate(newContext);
  };

  const renderStepContent = () => {
    switch (currentStep.id) {
      case 1:
        return (
          <div className="step-context-profile">
            <h2 className="step-title">Context & Profile</h2>
            <p className="step-description">Define your organizational context to personalize the intelligence analysis</p>
            
            <div className="input-section">
              <label>Report Name</label>
              <input 
                type="text" 
                placeholder="Enter your intelligence report name"
                value={localContext.reportName || ''}
                onChange={(e) => handleGoalChange(e.target.value)}
                className="clarity-input"
              />
            </div>

            <div className="selection-section">
              <label>Organization Type</label>
              <div className="card-grid">
                {['Government', 'Banking', 'Corporation', 'NGO', 'Academic', 'Individual'].map((type) => (
                  <div 
                    key={type}
                    className={`selection-card ${localContext.organizationType === type ? 'selected' : ''}`}
                    onClick={() => handleOrganizationSelect(type)}
                  >
                    <div className="card-icon">🏢</div>
                    <div className="card-title">{type}</div>
                    {localContext.organizationType === type && <div className="card-check">✓</div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="input-section">
              <label>Region</label>
              <input 
                type="text" 
                placeholder="Enter target region"
                value={localContext.region || ''}
                onChange={(e) => handleGoalChange(e.target.value)}
                className="clarity-input"
              />
            </div>

            <div className="input-section">
              <label>Industry Focus</label>
              <input 
                type="text" 
                placeholder="Enter industry focus"
                value={localContext.industryFocus || ''}
                onChange={(e) => handleGoalChange(e.target.value)}
                className="clarity-input"
              />
            </div>

            <button 
              className="clarity-button"
              onClick={() => onStepComplete(currentStep.id)}
              disabled={!localContext.organizationType || !localContext.reportName}
            >
              Continue to Goal Definition
            </button>
          </div>
        );

      case 2:
        return (
          <div className="step-goal-articulation">
            <h2 className="step-title">Goal Articulation</h2>
            <p className="step-description">Define your strategic objective for the intelligence analysis</p>
            
            <div className="goal-input-section">
              <textarea 
                placeholder="Describe your strategic goal... What do you want to achieve?"
                value={localContext.goal || ''}
                onChange={(e) => handleGoalChange(e.target.value)}
                className="clarity-textarea"
                rows={6}
              />
            </div>

            <div className="goal-suggestions">
              <h4>Suggested Goals for {localContext.organizationType}:</h4>
              <div className="suggestion-list">
                {getSuggestedGoals(localContext.organizationType).map((goal, index) => (
                  <div key={index} className="suggestion-item" onClick={() => handleGoalChange(goal)}>
                    {goal}
                  </div>
                ))}
              </div>
            </div>

            <button 
              className="clarity-button"
              onClick={() => onStepComplete(currentStep.id)}
              disabled={!localContext.goal}
            >
              Continue to Context Analysis
            </button>
          </div>
        );

      case 7:
        return (
          <div className="step-ai-configuration">
            <h2 className="step-title">AI Configuration</h2>
            <p className="step-description">Configure the Nexus Brain with specialized AI personas, analytical lenses, and data sources</p>
            
            <div className="configuration-section">
              <h3>AI Personas</h3>
              <div className="card-grid">
                {[
                  'Venture Capitalist', 'Geopolitical Strategist', 'Economic Analyst', 
                  'Supply Chain Expert', 'Sustainability Specialist', 'Digital Transformation Lead'
                ].map((persona) => (
                  <div 
                    key={persona}
                    className={`selection-card ${localContext.aiConfiguration.personas.includes(persona) ? 'selected' : ''}`}
                    onClick={() => {
                      const current = localContext.aiConfiguration.personas;
                      const updated = current.includes(persona) 
                        ? current.filter(p => p !== persona)
                        : [...current, persona];
                      handleAIConfiguration('personas', updated);
                    }}
                  >
                    <div className="card-icon">🧠</div>
                    <div className="card-title">{persona}</div>
                    {localContext.aiConfiguration.personas.includes(persona) && <div className="card-check">✓</div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="configuration-section">
              <h3>Analytical Lenses</h3>
              <div className="card-grid">
                {[
                  'Financial Viability', 'Risk Assessment', 'Market Opportunity',
                  'Regulatory Compliance', 'Technological Feasibility', 'Social Impact'
                ].map((lens) => (
                  <div 
                    key={lens}
                    className={`selection-card ${localContext.aiConfiguration.lenses.includes(lens) ? 'selected' : ''}`}
                    onClick={() => {
                      const current = localContext.aiConfiguration.lenses;
                      const updated = current.includes(lens) 
                        ? current.filter(l => l !== lens)
                        : [...current, lens];
                      handleAIConfiguration('lenses', updated);
                    }}
                  >
                    <div className="card-icon">🔍</div>
                    <div className="card-title">{lens}</div>
                    {localContext.aiConfiguration.lenses.includes(lens) && <div className="card-check">✓</div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="configuration-section">
              <h3>Data Sources</h3>
              <div className="card-grid">
                {[
                  'World Bank Data', 'UN Comtrade', 'Bloomberg Terminal', 
                  'Regional Statistics', 'Industry Reports', 'Academic Research'
                ].map((source) => (
                  <div 
                    key={source}
                    className={`selection-card ${localContext.aiConfiguration.sources.includes(source) ? 'selected' : ''}`}
                    onClick={() => {
                      const current = localContext.aiConfiguration.sources;
                      const updated = current.includes(source) 
                        ? current.filter(s => s !== source)
                        : [...current, source];
                      handleAIConfiguration('sources', updated);
                    }}
                  >
                    <div className="card-icon">📊</div>
                    <div className="card-title">{source}</div>
                    {localContext.aiConfiguration.sources.includes(source) && <div className="card-check">✓</div>}
                  </div>
                ))}
              </div>
            </div>

            <button 
              className="clarity-button"
              onClick={() => onStepComplete(currentStep.id)}
              disabled={localContext.aiConfiguration.personas.length === 0}
            >
              Start Intelligence Generation
            </button>
          </div>
        );

      default:
        return (
          <div className="step-default">
            <h2 className="step-title">{currentStep.title}</h2>
            <p className="step-description">{currentStep.description}</p>
            <div className="step-content-placeholder">
              <div className="placeholder-icon">🚀</div>
              <div className="placeholder-text">Step implementation coming soon...</div>
            </div>
            <button 
              className="clarity-button"
              onClick={() => onStepComplete(currentStep.id)}
            >
              Continue
            </button>
          </div>
        );
    }
  };

  return (
    <div className="clarity-workspace">
      <style jsx>{`
        .clarity-workspace {
          padding: 2rem;
          height: 100%;
          overflow-y: auto;
        }
        
        .step-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--clarity-white);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .step-description {
          font-size: 1rem;
          color: var(--clarity-gray-medium);
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        
        .input-section {
          margin-bottom: 2rem;
        }
        
        .input-section label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--clarity-white);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .clarity-input, .clarity-textarea {
          width: 100%;
          padding: 1rem;
          background: var(--clarity-gray-dark);
          border: 1px solid var(--clarity-gray-light);
          border-radius: 0.5rem;
          color: var(--clarity-white);
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .clarity-input:focus, .clarity-textarea:focus {
          outline: none;
          border-color: var(--clarity-cyan);
          box-shadow: 0 0 20px var(--clarity-cyan-glow);
        }
        
        .clarity-textarea {
          resize: vertical;
          min-height: 120px;
        }
        
        .selection-section {
          margin-bottom: 2rem;
        }
        
        .selection-section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--clarity-white);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .selection-card {
          padding: 1.5rem;
          background: var(--clarity-gray-dark);
          border: 1px solid var(--clarity-gray-light);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          text-align: center;
        }
        
        .selection-card:hover {
          border-color: var(--clarity-cyan);
          transform: translateY(-2px);
          box-shadow: 0 5px 20px var(--clarity-cyan-glow);
        }
        
        .selection-card.selected {
          border-color: var(--clarity-cyan);
          background: linear-gradient(135deg, var(--clarity-gray-dark) 0%, rgba(0, 255, 255, 0.1) 100%);
          box-shadow: 0 0 30px var(--clarity-cyan-glow);
        }
        
        .card-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        
        .card-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--clarity-white);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .card-check {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: var(--clarity-cyan);
          color: var(--clarity-black);
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: bold;
        }
        
        .goal-suggestions {
          background: var(--clarity-gray-dark);
          border: 1px solid var(--clarity-gray-light);
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin-top: 2rem;
        }
        
        .goal-suggestions h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--clarity-white);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .suggestion-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .suggestion-item {
          padding: 0.75rem;
          background: var(--clarity-gray-medium);
          border: 1px solid var(--clarity-gray-light);
          border-radius: 0.25rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.875rem;
          color: var(--clarity-white);
        }
        
        .suggestion-item:hover {
          border-color: var(--clarity-cyan);
          background: var(--clarity-gray-light);
        }
        
        .clarity-button {
          background: linear-gradient(135deg, var(--clarity-cyan) 0%, var(--clarity-white) 100%);
          color: var(--clarity-black);
          border: none;
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 2rem;
        }
        
        .clarity-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px var(--clarity-cyan-glow);
        }
        
        .clarity-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .step-default {
          text-align: center;
          padding: 4rem 2rem;
        }
        
        .step-content-placeholder {
          margin: 2rem 0;
        }
        
        .placeholder-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.7;
        }
        
        .placeholder-text {
          font-size: 1.125rem;
          color: var(--clarity-gray-medium);
          margin-bottom: 2rem;
        }
      `}</style>
      
      {renderStepContent()}
    </div>
  );
};

function getSuggestedGoals(organizationType: string): string[] {
  const goalsByType = {
    Government: [
      'Attract $500M in foreign direct investment over 5 years',
      'Create 10,000 new jobs in technology sector',
      'Develop sustainable infrastructure for 100,000 residents',
      'Establish regional innovation hub and startup ecosystem'
    ],
    Banking: [
      'Identify $1B in viable infrastructure financing opportunities',
      'Assess credit risk for emerging market expansion',
      'Develop green finance products for sustainable development',
      'Evaluate fintech partnership opportunities'
    ],
    Corporation: [
      'Expand operations into 3 new Southeast Asian markets',
      'Establish supply chain resilience in key regions',
      'Identify strategic acquisition targets worth $100M+',
      'Launch joint venture with local partners'
    ],
    NGO: [
      'Design impact investment strategy for $50M fund',
      'Assess social enterprise opportunities in target regions',
      'Develop sustainable development programs',
      'Create partnership framework with local communities'
    ],
    Academic: [
      'Conduct comprehensive regional economic analysis',
      'Establish research collaboration framework',
      'Develop policy recommendations for sustainable growth',
      'Create educational programs for emerging markets'
    ],
    Individual: [
      'Identify personal investment opportunities in emerging markets',
      'Assess real estate development potential',
      'Evaluate business partnership opportunities',
      'Research market entry strategies'
    ]
  };
  
  return goalsByType[organizationType] || goalsByType.Corporation;
}