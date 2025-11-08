import React, { useState, useEffect } from 'react';
import { NSILAlgorithms } from '../utils/nsilAlgorithms';

// Import the Nexus Brain API handler
const nexusBrain = require('../nexus-brain.ts');

interface SuperReportWizardProps {
  onComplete?: (report: any) => void;
}

interface WizardContext {
  // Step 1: Organization Profile
  organizationType: string;
  organizationSize: string;
  industry: string;
  region: string;
  budget: string;

  // Step 2: Intelligence Objectives
  primaryObjective: string;
  secondaryObjectives: string[];
  timeline: string;
  riskTolerance: string;

  // Step 3: NSIL Configuration
  selectedAlgorithms: string[];
  analysisDepth: string;
  dataSources: string[];

  // Step 4: AI Persona Selection
  personas: string[];
  analyticalLenses: string[];
  confidenceThreshold: number;

  // Step 5: Regional Context
  targetRegions: string[];
  regionalData: any;

  // Step 6: Economic Parameters
  investmentRange: { min: number; max: number };
  expectedReturns: number;
  marketSize: number;

  // Step 7: Partnership Framework
  partnershipTypes: string[];
  collaborationModels: string[];

  // Step 8: Risk Assessment
  riskFactors: string[];
  mitigationStrategies: string[];

  // Step 9: Intelligence Generation
  reportFormat: string;
  deliveryMethod: string;

  // Generated Results
  nsilResults: any;
  nexusBrainResults: any;
  finalReport: any;
}

const STEPS = [
  { id: 1, title: 'Organization Profile', description: 'Define your organizational context and capabilities' },
  { id: 2, title: 'Intelligence Objectives', description: 'Specify your strategic goals and requirements' },
  { id: 3, title: 'NSIL Configuration', description: 'Configure the Nexus Symbiotic Intelligence Language algorithms' },
  { id: 4, title: 'AI Configuration', description: 'Select AI personas and analytical frameworks' },
  { id: 5, title: 'Regional Analysis', description: 'Define target regions and gather regional intelligence' },
  { id: 6, title: 'Economic Modeling', description: 'Set economic parameters and investment criteria' },
  { id: 7, title: 'Partnership Framework', description: 'Design collaboration and partnership models' },
  { id: 8, title: 'Risk Assessment', description: 'Evaluate risks and mitigation strategies' },
  { id: 9, title: 'Intelligence Generation', description: 'Generate comprehensive intelligence reports' },
  { id: 10, title: 'Results & Recommendations', description: 'Review final intelligence and strategic recommendations' }
];

export const SuperReportWizard: React.FC<SuperReportWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [context, setContext] = useState<WizardContext>({
    organizationType: '',
    organizationSize: '',
    industry: '',
    region: '',
    budget: '',
    primaryObjective: '',
    secondaryObjectives: [],
    timeline: '',
    riskTolerance: '',
    selectedAlgorithms: [],
    analysisDepth: 'comprehensive',
    dataSources: [],
    personas: [],
    analyticalLenses: [],
    confidenceThreshold: 0.7,
    targetRegions: [],
    regionalData: {},
    investmentRange: { min: 0, max: 10000000 },
    expectedReturns: 15,
    marketSize: 1000000,
    partnershipTypes: [],
    collaborationModels: [],
    riskFactors: [],
    mitigationStrategies: [],
    reportFormat: 'comprehensive',
    deliveryMethod: 'interactive',
    nsilResults: {},
    nexusBrainResults: {},
    finalReport: {}
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const updateContext = (updates: Partial<WizardContext>) => {
    setContext(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const runNSILAnalysis = async () => {
    setIsProcessing(true);
    setProgress(0);

    try {
      const results: any = {};

      // Run selected NSIL algorithms
      if (context.selectedAlgorithms.includes('RCI')) {
        results.rci = NSILAlgorithms.calculateRCI({
          economic: 750000000000,
          infrastructure: 75,
          humanCapital: 78,
          institutions: 76,
          innovation: 72,
          marketAccess: 80
        });
        setProgress(20);
      }

      if (context.selectedAlgorithms.includes('ROI')) {
        results.roi = NSILAlgorithms.calculateROI({
          initialInvestment: context.investmentRange.min,
          expectedROI: context.expectedReturns,
          timeline: parseInt(context.timeline),
          riskFactor: parseFloat(context.riskTolerance) / 100,
          marketSize: context.marketSize,
          growthRate: 8
        });
        setProgress(40);
      }

      if (context.selectedAlgorithms.includes('TPP')) {
        results.tpp = NSILAlgorithms.calculateTPP({
          initialInvestment: context.investmentRange.min,
          expectedROI: context.expectedReturns,
          timeline: parseInt(context.timeline),
          riskFactor: parseFloat(context.riskTolerance) / 100,
          marketSize: context.marketSize,
          growthRate: 8
        });
        setProgress(60);
      }

      if (context.selectedAlgorithms.includes('SEAM')) {
        results.seam = NSILAlgorithms.analyzeSEAM([], context.region, context.industry);
        setProgress(80);
      }

      if (context.selectedAlgorithms.includes('Risk')) {
        results.risk = NSILAlgorithms.calculateRiskIndex({
          gdpGrowth: 3.2,
          inflation: 2.1,
          tradeBalance: -5000000,
          unemployment: 4.5
        }, {});
        setProgress(100);
      }

      updateContext({ nsilResults: results });
      setIsProcessing(false);
    } catch (error) {
      console.error('NSIL Analysis Error:', error);
      setIsProcessing(false);
    }
  };

  const runNexusBrainAnalysis = async () => {
    setIsProcessing(true);
    setProgress(0);

    try {
      const results: any = {};

      // Run Nexus Brain analysis for each target region
      for (const region of context.targetRegions) {
        setProgress(25);

        // Diagnose region
        const diagnoseResult = await fetch('/api/nexus-brain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'diagnose',
            payload: { region, objective: context.primaryObjective }
          })
        });
        results.diagnose = await diagnoseResult.json();

        setProgress(50);

        // Simulate transformation
        const simulateResult = await fetch('/api/nexus-brain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'simulate',
            payload: { region, objective: context.primaryObjective }
          })
        });
        results.simulate = await simulateResult.json();

        setProgress(75);

        // Architect ecosystem
        const architectResult = await fetch('/api/nexus-brain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'architect',
            payload: { region, objective: context.primaryObjective }
          })
        });
        results.architect = await architectResult.json();

        setProgress(100);
      }

      updateContext({ nexusBrainResults: results });
      setIsProcessing(false);
    } catch (error) {
      console.error('Nexus Brain Analysis Error:', error);
      setIsProcessing(false);
    }
  };

  const generateFinalReport = () => {
    const report = {
      metadata: {
        organization: context.organizationType,
        industry: context.industry,
        region: context.region,
        generatedAt: new Date().toISOString(),
        objectives: [context.primaryObjective, ...context.secondaryObjectives]
      },
      nsilAnalysis: context.nsilResults,
      nexusBrainAnalysis: context.nexusBrainResults,
      recommendations: generateStrategicRecommendations(),
      executiveSummary: generateExecutiveSummary()
    };

    updateContext({ finalReport: report });

    if (onComplete) {
      onComplete(report);
    }
  };

  const generateStrategicRecommendations = () => {
    const recommendations = [];

    // Based on NSIL results
    if (context.nsilResults.rci) {
      recommendations.push({
        category: 'Regional Competitiveness',
        priority: context.nsilResults.rci.score > 75 ? 'Maintain' : 'Improve',
        actions: context.nsilResults.rci.recommendations
      });
    }

    if (context.nsilResults.roi) {
      recommendations.push({
        category: 'Investment Strategy',
        priority: context.nsilResults.roi.score > 70 ? 'Proceed' : 'Reevaluate',
        actions: context.nsilResults.roi.recommendations
      });
    }

    // Based on Nexus Brain results
    if (context.nexusBrainResults.diagnose) {
      recommendations.push({
        category: 'Regional Development',
        priority: 'High',
        actions: context.nexusBrainResults.diagnose.result.recommendations
      });
    }

    return recommendations;
  };

  const generateExecutiveSummary = () => {
    return {
      overview: `Comprehensive intelligence analysis for ${context.organizationType} in ${context.industry} sector targeting ${context.region}`,
      keyFindings: [
        `RCI Score: ${context.nsilResults.rci?.score || 'N/A'}/100`,
        `Investment ROI: ${context.nsilResults.roi?.score || 'N/A'}% confidence`,
        `Regional Readiness: ${context.nexusBrainResults.diagnose?.result.score || 'N/A'}/100`
      ],
      strategicDirection: `Based on comprehensive NSIL and Nexus Brain analysis, ${context.primaryObjective.toLowerCase()} with focus on ${context.targetRegions.join(', ')}`,
      nextSteps: [
        'Review detailed analysis results',
        'Engage with recommended partners',
        'Develop implementation roadmap',
        'Monitor progress and adjust strategy'
      ]
    };
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="wizard-step">
            <h2>Organization Profile</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Organization Type</label>
                <select
                  value={context.organizationType}
                  onChange={(e) => updateContext({ organizationType: e.target.value })}
                >
                  <option value="">Select Type</option>
                  <option value="Government">Government</option>
                  <option value="Corporation">Corporation</option>
                  <option value="Banking">Banking & Finance</option>
                  <option value="NGO">NGO/Non-Profit</option>
                  <option value="Academic">Academic Institution</option>
                  <option value="Individual">Individual Investor</option>
                </select>
              </div>

              <div className="form-group">
                <label>Organization Size</label>
                <select
                  value={context.organizationSize}
                  onChange={(e) => updateContext({ organizationSize: e.target.value })}
                >
                  <option value="">Select Size</option>
                  <option value="Startup">Startup (1-50 employees)</option>
                  <option value="SMB">Small/Medium Business (51-500)</option>
                  <option value="Enterprise">Enterprise (500+)</option>
                  <option value="Government">Government Agency</option>
                </select>
              </div>

              <div className="form-group">
                <label>Industry Focus</label>
                <input
                  type="text"
                  value={context.industry}
                  onChange={(e) => updateContext({ industry: e.target.value })}
                  placeholder="e.g., Technology, Manufacturing, Healthcare"
                />
              </div>

              <div className="form-group">
                <label>Primary Region</label>
                <input
                  type="text"
                  value={context.region}
                  onChange={(e) => updateContext({ region: e.target.value })}
                  placeholder="e.g., Southeast Asia, East Africa"
                />
              </div>

              <div className="form-group">
                <label>Budget Range</label>
                <select
                  value={context.budget}
                  onChange={(e) => updateContext({ budget: e.target.value })}
                >
                  <option value="">Select Budget</option>
                  <option value="Under $100K">Under $100K</option>
                  <option value="$100K-$500K">$100K-$500K</option>
                  <option value="$500K-$2M">$500K-$2M</option>
                  <option value="$2M-$10M">$2M-$10M</option>
                  <option value="Over $10M">Over $10M</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="wizard-step">
            <h2>Intelligence Objectives</h2>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Primary Objective</label>
                <textarea
                  value={context.primaryObjective}
                  onChange={(e) => updateContext({ primaryObjective: e.target.value })}
                  placeholder="What is your main strategic goal?"
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label>Timeline</label>
                <select
                  value={context.timeline}
                  onChange={(e) => updateContext({ timeline: e.target.value })}
                >
                  <option value="">Select Timeline</option>
                  <option value="6">6 months</option>
                  <option value="12">1 year</option>
                  <option value="24">2 years</option>
                  <option value="36">3 years</option>
                  <option value="60">5+ years</option>
                </select>
              </div>

              <div className="form-group">
                <label>Risk Tolerance</label>
                <select
                  value={context.riskTolerance}
                  onChange={(e) => updateContext({ riskTolerance: e.target.value })}
                >
                  <option value="">Select Tolerance</option>
                  <option value="10">Very Low (10%)</option>
                  <option value="25">Low (25%)</option>
                  <option value="50">Moderate (50%)</option>
                  <option value="75">High (75%)</option>
                  <option value="90">Very High (90%)</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="wizard-step">
            <h2>NSIL Configuration</h2>
            <p>Select the NSIL algorithms to run for your analysis:</p>
            <div className="algorithm-grid">
              {[
                { id: 'RCI', name: 'Regional Competitiveness Index', desc: 'Evaluates regional economic potential' },
                { id: 'ROI', name: 'Return on Investment Analysis', desc: 'Financial viability assessment' },
                { id: 'TPP', name: 'Time to Profit Analysis', desc: 'Profitability timeline modeling' },
                { id: 'SEAM', name: 'Strategic Ecosystem Analysis', desc: 'Partnership and synergy mapping' },
                { id: 'Risk', name: 'Risk Assessment Index', desc: 'Comprehensive risk evaluation' }
              ].map(algo => (
                <div key={algo.id} className="algorithm-card">
                  <input
                    type="checkbox"
                    id={algo.id}
                    checked={context.selectedAlgorithms.includes(algo.id)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...context.selectedAlgorithms, algo.id]
                        : context.selectedAlgorithms.filter(a => a !== algo.id);
                      updateContext({ selectedAlgorithms: updated });
                    }}
                  />
                  <label htmlFor={algo.id}>
                    <h4>{algo.name}</h4>
                    <p>{algo.desc}</p>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="wizard-step">
            <h2>AI Configuration</h2>
            <div className="ai-config-section">
              <h3>AI Personas</h3>
              <div className="persona-grid">
                {[
                  'Venture Capitalist', 'Geopolitical Strategist', 'Economic Analyst',
                  'Supply Chain Expert', 'Sustainability Specialist', 'Digital Transformation Lead'
                ].map(persona => (
                  <div key={persona} className="persona-card">
                    <input
                      type="checkbox"
                      id={persona}
                      checked={context.personas.includes(persona)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...context.personas, persona]
                          : context.personas.filter(p => p !== persona);
                        updateContext({ personas: updated });
                      }}
                    />
                    <label htmlFor={persona}>{persona}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="wizard-step">
            <h2>Regional Analysis</h2>
            <div className="form-group">
              <label>Target Regions</label>
              <input
                type="text"
                value={context.targetRegions.join(', ')}
                onChange={(e) => updateContext({ targetRegions: e.target.value.split(',').map(r => r.trim()) })}
                placeholder="Enter regions separated by commas"
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="wizard-step">
            <h2>Economic Modeling</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Investment Range (Min)</label>
                <input
                  type="number"
                  value={context.investmentRange.min}
                  onChange={(e) => updateContext({
                    investmentRange: { ...context.investmentRange, min: parseInt(e.target.value) || 0 }
                  })}
                />
              </div>

              <div className="form-group">
                <label>Investment Range (Max)</label>
                <input
                  type="number"
                  value={context.investmentRange.max}
                  onChange={(e) => updateContext({
                    investmentRange: { ...context.investmentRange, max: parseInt(e.target.value) || 0 }
                  })}
                />
              </div>

              <div className="form-group">
                <label>Expected Returns (%)</label>
                <input
                  type="number"
                  value={context.expectedReturns}
                  onChange={(e) => updateContext({ expectedReturns: parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div className="form-group">
                <label>Market Size</label>
                <input
                  type="number"
                  value={context.marketSize}
                  onChange={(e) => updateContext({ marketSize: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="wizard-step">
            <h2>Intelligence Generation</h2>
            {isProcessing ? (
              <div className="processing">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <p>Generating intelligence... {progress}%</p>
              </div>
            ) : (
              <div className="generation-controls">
                <button
                  onClick={async () => {
                    await runNSILAnalysis();
                    await runNexusBrainAnalysis();
                    generateFinalReport();
                    nextStep();
                  }}
                  className="generate-btn"
                >
                  Generate Intelligence Report
                </button>
              </div>
            )}
          </div>
        );

      case 10:
        return (
          <div className="wizard-step">
            <h2>Results & Recommendations</h2>
            {context.finalReport.metadata && (
              <div className="results-summary">
                <div className="executive-summary">
                  <h3>Executive Summary</h3>
                  <p>{context.finalReport.executiveSummary?.overview}</p>
                  <ul>
                    {context.finalReport.executiveSummary?.keyFindings.map((finding: string, i: number) => (
                      <li key={i}>{finding}</li>
                    ))}
                  </ul>
                </div>

                <div className="recommendations">
                  <h3>Strategic Recommendations</h3>
                  {context.finalReport.recommendations?.map((rec: any, i: number) => (
                    <div key={i} className="recommendation-card">
                      <h4>{rec.category}</h4>
                      <p>Priority: {rec.priority}</p>
                      <ul>
                        {rec.actions.map((action: string, j: number) => (
                          <li key={j}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="wizard-step">
            <h2>{STEPS.find(s => s.id === currentStep)?.title}</h2>
            <p>{STEPS.find(s => s.id === currentStep)?.description}</p>
            <div className="coming-soon">Step implementation in progress...</div>
          </div>
        );
    }
  };

  return (
    <div className="super-report-wizard">
      <style>{`
        .super-report-wizard {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .wizard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e0e0e0;
        }

        .wizard-title {
          font-size: 2rem;
          font-weight: bold;
          color: #2c3e50;
        }

        .step-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .step-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ddd;
        }

        .step-dot.active {
          background: #3498db;
        }

        .step-dot.completed {
          background: #27ae60;
        }

        .wizard-content {
          min-height: 500px;
          background: white;
          border-radius: 8px;
          padding: 2rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .wizard-step h2 {
          color: #2c3e50;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #34495e;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
        }

        .algorithm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .algorithm-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background: #f8f9fa;
          transition: all 0.3s;
        }

        .algorithm-card:hover {
          border-color: #3498db;
          background: #ecf0f1;
        }

        .algorithm-card input[type="checkbox"] {
          margin-top: 0.25rem;
        }

        .algorithm-card label {
          flex: 1;
          cursor: pointer;
        }

        .algorithm-card h4 {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
        }

        .algorithm-card p {
          margin: 0;
          color: #7f8c8d;
          font-size: 0.9rem;
        }

        .persona-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .persona-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background: #f8f9fa;
          transition: all 0.3s;
        }

        .persona-card:hover {
          border-color: #3498db;
          background: #ecf0f1;
        }

        .persona-card input[type="checkbox"] {
          margin: 0;
        }

        .persona-card label {
          cursor: pointer;
          margin: 0;
          color: #2c3e50;
        }

        .processing {
          text-align: center;
          padding: 2rem;
        }

        .progress-bar {
          width: 100%;
          height: 20px;
          background: #e0e0e0;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3498db, #2980b9);
          transition: width 0.3s ease;
        }

        .generate-btn {
          background: linear-gradient(135deg, #3498db, #2980b9);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .generate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
        }

        .wizard-navigation {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #e0e0e0;
        }

        .nav-btn {
          padding: 0.75rem 1.5rem;
          border: 1px solid #ddd;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .nav-btn:hover {
          background: #f8f9fa;
          border-color: #3498db;
        }

        .nav-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .nav-btn.primary {
          background: #3498db;
          color: white;
          border-color: #3498db;
        }

        .nav-btn.primary:hover {
          background: #2980b9;
        }

        .results-summary {
          max-width: 800px;
        }

        .executive-summary,
        .recommendations {
          margin-bottom: 2rem;
        }

        .executive-summary h3,
        .recommendations h3 {
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .recommendation-card {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          border-left: 4px solid #3498db;
        }

        .recommendation-card h4 {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
        }

        .recommendation-card p {
          margin: 0 0 0.5rem 0;
          color: #7f8c8d;
          font-weight: 600;
        }

        .recommendation-card ul {
          margin: 0;
          padding-left: 1.5rem;
        }

        .recommendation-card li {
          margin-bottom: 0.25rem;
          color: #34495e;
        }

        .coming-soon {
          text-align: center;
          padding: 3rem;
          color: #7f8c8d;
          font-style: italic;
        }
      `}</style>

      <div className="wizard-header">
        <h1 className="wizard-title">Super Report Wizard</h1>
        <div className="step-indicator">
          {STEPS.map(step => (
            <div
              key={step.id}
              className={`step-dot ${step.id === currentStep ? 'active' : step.id < currentStep ? 'completed' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="wizard-content">
        {renderStepContent()}
      </div>

      <div className="wizard-navigation">
        <button
          className="nav-btn"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          Previous
        </button>

        <span>Step {currentStep} of {STEPS.length}</span>

        <button
          className={`nav-btn ${currentStep === STEPS.length ? 'primary' : ''}`}
          onClick={currentStep === STEPS.length ? () => onComplete?.(context.finalReport) : nextStep}
          disabled={
            (currentStep === 1 && !context.organizationType) ||
            (currentStep === 2 && !context.primaryObjective) ||
            (currentStep === 3 && context.selectedAlgorithms.length === 0) ||
            (currentStep === 4 && context.personas.length === 0) ||
            (currentStep === 5 && context.targetRegions.length === 0)
          }
        >
          {currentStep === STEPS.length ? 'Complete' : 'Next'}
        </button>
      </div>
    </div>
  );
};
