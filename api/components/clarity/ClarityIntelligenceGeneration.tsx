import React, { useState, useEffect } from 'react';

interface ClarityIntelligenceGenerationProps {
  context: any;
  onComplete: () => void;
}

export const ClarityIntelligenceGeneration: React.FC<ClarityIntelligenceGenerationProps> = ({ 
  context, 
  onComplete 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('Initializing...');
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const generationPhases = [
    'Analyzing regional context...',
    'Processing economic frameworks...',
    'Generating novel theories...',
    'Mapping ecosystem architecture...',
    'Calculating risk assessments...',
    'Synthesizing strategic recommendations...',
    'Finalizing intelligence report...'
  ];

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = Math.min(prev + Math.random() * 15, 100);
          const phaseIndex = Math.floor((newProgress / 100) * generationPhases.length);
          setCurrentPhase(generationPhases[phaseIndex] || 'Finalizing...');
          
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setGeneratedContent(generateMockIntelligence(context));
            }, 500);
          }
          
          return newProgress;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const generateMockIntelligence = (ctx: any) => {
    return {
      economicFramework: "The 'Mindanao Archipelago Model' of decentralized logistics and inter-island digital commerce",
      rroi: {
        humanCapital: 78,
        infrastructure: 65,
        marketAccess: 82,
        regulatoryEnvironment: 71,
        innovationCapacity: 69
      },
      tpt: {
        timeline: [
          { year: 2024, gdpGrowth: 3.2, fdiAttraction: 120 },
          { year: 2025, gdpGrowth: 4.1, fdiAttraction: 185 },
          { year: 2026, gdpGrowth: 5.3, fdiAttraction: 240 },
          { year: 2027, gdpGrowth: 6.2, fdiAttraction: 310 },
          { year: 2028, gdpGrowth: 7.1, fdiAttraction: 395 }
        ]
      },
      seam: [
        {
          company: "Flex Ltd.",
          profile: "Global manufacturing and supply chain solutions leader",
          synergy: "Perfect alignment with regional logistics infrastructure development",
          matchScore: 88,
          confidence: "High"
        },
        {
          company: "Jabil Inc.",
          profile: "Manufacturing services and solutions provider",
          synergy: "Strong capabilities in electronics manufacturing for emerging markets",
          matchScore: 82,
          confidence: "Medium"
        },
        {
          company: "Sanmina Corporation",
          profile: "Integrated manufacturing solutions company",
          synergy: "Expertise in complex system integration and test solutions",
          matchScore: 79,
          confidence: "High"
        }
      ]
    };
  };

  const startGeneration = () => {
    setIsGenerating(true);
    setProgress(0);
  };

  if (generatedContent) {
    return (
      <div className="intelligence-results">
        <style jsx>{`
          .intelligence-results {
            padding: 2rem;
            height: 100%;
            overflow-y: auto;
          }
          
          .results-header {
            text-align: center;
            margin-bottom: 3rem;
          }
          
          .results-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--clarity-white);
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 1rem;
          }
          
          .results-subtitle {
            font-size: 1.125rem;
            color: var(--clarity-cyan);
            opacity: 0.8;
          }
          
          .framework-section {
            background: linear-gradient(135deg, var(--clarity-gray-dark) 0%, rgba(0, 255, 255, 0.05) 100%);
            border: 1px solid var(--clarity-cyan);
            border-radius: 1rem;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 0 30px var(--clarity-cyan-glow);
          }
          
          .framework-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--clarity-cyan);
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .framework-content {
            font-size: 1.125rem;
            color: var(--clarity-white);
            line-height: 1.6;
          }
          
          .rroi-section {
            margin-bottom: 2rem;
          }
          
          .rroi-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--clarity-white);
            margin-bottom: 1.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .radar-chart {
            width: 300px;
            height: 300px;
            margin: 0 auto 2rem;
            position: relative;
          }
          
          .radar-svg {
            width: 100%;
            height: 100%;
          }
          
          .radar-grid {
            stroke: var(--clarity-gray-light);
            stroke-width: 1;
            fill: none;
            opacity: 0.3;
          }
          
          .radar-axis {
            stroke: var(--clarity-gray-medium);
            stroke-width: 1;
          }
          
          .radar-area {
            fill: var(--clarity-cyan);
            fill-opacity: 0.2;
            stroke: var(--clarity-cyan);
            stroke-width: 2;
          }
          
          .radar-point {
            fill: var(--clarity-cyan);
            stroke: var(--clarity-white);
            stroke-width: 2;
          }
          
          .radar-label {
            fill: var(--clarity-white);
            font-size: 12px;
            font-weight: 600;
            text-anchor: middle;
          }
          
          .rroi-scores {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin-top: 2rem;
          }
          
          .score-item {
            text-align: center;
            padding: 1rem;
            background: var(--clarity-gray-dark);
            border: 1px solid var(--clarity-gray-light);
            border-radius: 0.5rem;
          }
          
          .score-label {
            font-size: 0.875rem;
            color: var(--clarity-gray-medium);
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .score-value {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--clarity-cyan);
          }
          
          .tpt-section {
            margin-bottom: 2rem;
          }
          
          .tpt-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--clarity-white);
            margin-bottom: 1.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .timeline-chart {
            height: 200px;
            background: var(--clarity-gray-dark);
            border: 1px solid var(--clarity-gray-light);
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1rem;
          }
          
          .seam-section {
            margin-bottom: 2rem;
          }
          
          .seam-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--clarity-white);
            margin-bottom: 1.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .company-cards {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          
          .company-card {
            background: var(--clarity-gray-dark);
            border: 1px solid var(--clarity-gray-light);
            border-radius: 0.75rem;
            padding: 1.5rem;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .company-card:hover {
            border-color: var(--clarity-cyan);
            transform: translateY(-2px);
            box-shadow: 0 10px 30px var(--clarity-cyan-glow);
          }
          
          .company-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--clarity-cyan) 0%, var(--clarity-white) 100%);
          }
          
          .company-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
          }
          
          .company-name {
            font-size: 1.125rem;
            font-weight: 600;
            color: var(--clarity-white);
          }
          
          .match-score {
            background: linear-gradient(135deg, var(--clarity-cyan) 0%, var(--clarity-white) 100%);
            color: var(--clarity-black);
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.875rem;
            font-weight: 700;
          }
          
          .company-profile {
            font-size: 0.875rem;
            color: var(--clarity-gray-medium);
            margin-bottom: 1rem;
            line-height: 1.5;
          }
          
          .synergy-analysis {
            font-size: 0.875rem;
            color: var(--clarity-white);
            line-height: 1.5;
            margin-bottom: 1rem;
          }
          
          .confidence-flag {
            display: inline-block;
            border-bottom: 2px dotted var(--clarity-cyan);
            cursor: help;
            position: relative;
          }
          
          .confidence-flag:hover::after {
            content: attr(data-tooltip);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: var(--clarity-black);
            color: var(--clarity-white);
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.75rem;
            white-space: nowrap;
            border: 1px solid var(--clarity-cyan);
            box-shadow: 0 5px 15px var(--clarity-cyan-glow);
            z-index: 10;
          }
          
          .action-buttons {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
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
          }
          
          .clarity-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px var(--clarity-cyan-glow);
          }
          
          .secondary-button {
            background: transparent;
            color: var(--clarity-cyan);
            border: 1px solid var(--clarity-cyan);
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .secondary-button:hover {
            background: var(--clarity-cyan);
            color: var(--clarity-black);
          }
        `}</style>
        
        <div className="results-header">
          <h1 className="results-title">Intelligence Generation Complete</h1>
          <p className="results-subtitle">Novel Economic Framework Generated</p>
        </div>

        <div className="framework-section">
          <h3 className="framework-title">Generated Economic Framework</h3>
          <p className="framework-content">{generatedContent.economicFramework}</p>
        </div>

        <div className="rroi-section">
          <h3 className="rroi-title">Regional Readiness & Opportunity Index</h3>
          <div className="radar-chart">
            <svg className="radar-svg" viewBox="0 0 300 300">
              {/* Radar chart implementation */}
              <g transform="translate(150, 150)">
                {/* Grid circles */}
                {[50, 100, 150].map((radius) => (
                  <circle
                    key={radius}
                    cx="0"
                    cy="0"
                    r={radius}
                    className="radar-grid"
                  />
                ))}
                
                {/* Axis lines */}
                {[
                  { angle: 0, label: 'Human Capital' },
                  { angle: 72, label: 'Infrastructure' },
                  { angle: 144, label: 'Market Access' },
                  { angle: 216, label: 'Regulatory' },
                  { angle: 288, label: 'Innovation' }
                ].map(({ angle, label }) => (
                  <g key={angle}>
                    <line
                      x1="0"
                      y1="0"
                      x2={150 * Math.cos((angle - 90) * Math.PI / 180)}
                      y2={150 * Math.sin((angle - 90) * Math.PI / 180)}
                      className="radar-axis"
                    />
                    <text
                      x={170 * Math.cos((angle - 90) * Math.PI / 180)}
                      y={170 * Math.sin((angle - 90) * Math.PI / 180)}
                      className="radar-label"
                    >
                      {label}
                    </text>
                  </g>
                ))}
                
                {/* Data polygon */}
                <polygon
                  points={[
                    { score: generatedContent.rroi.humanCapital, angle: 0 },
                    { score: generatedContent.rroi.infrastructure, angle: 72 },
                    { score: generatedContent.rroi.marketAccess, angle: 144 },
                    { score: generatedContent.rroi.regulatoryEnvironment, angle: 216 },
                    { score: generatedContent.rroi.innovationCapacity, angle: 288 }
                  ].map(({ score, angle }) => 
                    `${(score / 100) * 150 * Math.cos((angle - 90) * Math.PI / 180)},${(score / 100) * 150 * Math.sin((angle - 90) * Math.PI / 180)}`
                  ).join(' ')}
                  className="radar-area"
                />
                
                {/* Data points */}
                {[
                  { score: generatedContent.rroi.humanCapital, angle: 0 },
                  { score: generatedContent.rroi.infrastructure, angle: 72 },
                  { score: generatedContent.rroi.marketAccess, angle: 144 },
                  { score: generatedContent.rroi.regulatoryEnvironment, angle: 216 },
                  { score: generatedContent.rroi.innovationCapacity, angle: 288 }
                ].map(({ score, angle }) => (
                  <circle
                    key={angle}
                    cx={(score / 100) * 150 * Math.cos((angle - 90) * Math.PI / 180)}
                    cy={(score / 100) * 150 * Math.sin((angle - 90) * Math.PI / 180)}
                    r="6"
                    className="radar-point"
                  />
                ))}
              </g>
            </svg>
          </div>
          
          <div className="rroi-scores">
            {Object.entries(generatedContent.rroi).map(([key, value]) => (
              <div key={key} className="score-item">
                <div className="score-label">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className="score-value">{value}/100</div>
              </div>
            ))}
          </div>
        </div>

        <div className="seam-section">
          <h3 className="seam-title">Symbiotic Ecosystem Architecture Mapping</h3>
          <div className="company-cards">
            {generatedContent.seam.map((company, index) => (
              <div key={index} className="company-card">
                <div className="company-header">
                  <div className="company-name">{company.company}</div>
                  <div className="match-score">{company.matchScore}%</div>
                </div>
                <div className="company-profile">{company.profile}</div>
                <div className="synergy-analysis">
                  <span 
                    className="confidence-flag"
                    data-tooltip={`AI Confidence: ${company.confidence} - Based on comprehensive market analysis and partnership compatibility assessment`}
                  >
                    {company.synergy}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <button className="clarity-button" onClick={onComplete}>
            View Full Report
          </button>
          <button className="secondary-button">
            Export Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="intelligence-generation">
      <style jsx>{`
        .intelligence-generation {
          padding: 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        
        .generation-header {
          margin-bottom: 3rem;
        }
        
        .generation-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--clarity-white);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1rem;
        }
        
        .generation-subtitle {
          font-size: 1.125rem;
          color: var(--clarity-gray-medium);
          line-height: 1.6;
          max-width: 600px;
        }
        
        .generation-animation {
          margin: 3rem 0;
          position: relative;
        }
        
        .brain-animation {
          width: 200px;
          height: 200px;
          position: relative;
        }
        
        .brain-core {
          width: 100%;
          height: 100%;
          border: 3px solid var(--clarity-cyan);
          border-radius: 50%;
          position: relative;
          animation: brainPulse 2s infinite ease-in-out;
        }
        
        @keyframes brainPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px var(--clarity-cyan);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 40px var(--clarity-cyan), 0 0 60px var(--clarity-cyan);
          }
        }
        
        .neural-network {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 80%;
        }
        
        .neural-node {
          position: absolute;
          width: 8px;
          height: 8px;
          background: var(--clarity-cyan);
          border-radius: 50%;
          animation: neuralActivity 1.5s infinite ease-in-out;
        }
        
        .neural-node:nth-child(1) { top: 20%; left: 30%; animation-delay: 0s; }
        .neural-node:nth-child(2) { top: 40%; left: 70%; animation-delay: 0.3s; }
        .neural-node:nth-child(3) { top: 60%; left: 20%; animation-delay: 0.6s; }
        .neural-node:nth-child(4) { top: 80%; left: 60%; animation-delay: 0.9s; }
        
        @keyframes neuralActivity {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
        
        .progress-container {
          width: 100%;
          max-width: 500px;
          margin: 2rem 0;
        }
        
        .progress-bar {
          height: 8px;
          background: var(--clarity-gray-dark);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--clarity-cyan) 0%, var(--clarity-white) 100%);
          transition: width 0.3s ease;
          box-shadow: 0 0 10px var(--clarity-cyan);
        }
        
        .progress-text {
          font-size: 0.875rem;
          color: var(--clarity-cyan);
          text-align: center;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .progress-percentage {
          font-size: 2rem;
          font-weight: 700;
          color: var(--clarity-white);
          text-align: center;
        }
        
        .generation-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 800px;
          margin-top: 3rem;
        }
        
        .feature-item {
          text-align: center;
          padding: 1.5rem;
          background: var(--clarity-gray-dark);
          border: 1px solid var(--clarity-gray-light);
          border-radius: 1rem;
          transition: all 0.3s ease;
        }
        
        .feature-item:hover {
          border-color: var(--clarity-cyan);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px var(--clarity-cyan-glow);
        }
        
        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.8;
        }
        
        .feature-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--clarity-white);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .feature-description {
          font-size: 0.875rem;
          color: var(--clarity-gray-medium);
          line-height: 1.5;
        }
        
        .start-button {
          background: linear-gradient(135deg, var(--clarity-cyan) 0%, var(--clarity-white) 100%);
          color: var(--clarity-black);
          border: none;
          padding: 1.5rem 3rem;
          border-radius: 0.5rem;
          font-size: 1.125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: 2rem;
        }
        
        .start-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px var(--clarity-cyan-glow);
        }
        
        .start-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>
      
      {!isGenerating ? (
        <>
          <div className="generation-header">
            <h1 className="generation-title">Intelligence Generation</h1>
            <p className="generation-subtitle">
              The Nexus Brain is ready to generate novel economic theories, 
              ecosystem architectures, and strategic intelligence based on your configuration.
            </p>
          </div>
          
          <div className="generation-animation">
            <div className="brain-animation">
              <div className="brain-core" />
              <div className="neural-network">
                <div className="neural-node" />
                <div className="neural-node" />
                <div className="neural-node" />
                <div className="neural-node" />
              </div>
            </div>
          </div>
          
          <div className="generation-features">
            <div className="feature-item">
              <div className="feature-icon">🧠</div>
              <div className="feature-title">Novel Theory Generation</div>
              <div className="feature-description">AI creates original economic frameworks tailored to your region</div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <div className="feature-title">Interactive Analytics</div>
              <div className="feature-description">Dynamic visualizations of RROI, TPT, and SEAM data</div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🤝</div>
              <div className="feature-title">Partner Matching</div>
              <div className="feature-description">Intelligent ecosystem architecture and synergy analysis</div>
            </div>
          </div>
          
          <button className="start-button" onClick={startGeneration}>
            Start Intelligence Generation
          </button>
        </>
      ) : (
        <>
          <div className="generation-header">
            <h1 className="generation-title">Generating Intelligence...</h1>
            <p className="generation-subtitle">{currentPhase}</p>
          </div>
          
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="progress-percentage">{Math.round(progress)}%</div>
          </div>
          
          <div className="generation-animation">
            <div className="brain-animation">
              <div className="brain-core" />
              <div className="neural-network">
                <div className="neural-node" />
                <div className="neural-node" />
                <div className="neural-node" />
                <div className="neural-node" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};