import React from 'react';

interface NexusIntelligenceHubProps {
  onStepComplete?: (stepId: number, data: any) => void;
  onRequestHelp?: (context: string) => void;
}

export const NexusIntelligenceHub: React.FC<NexusIntelligenceHubProps> = ({ 
  onStepComplete, 
  onRequestHelp 
}) => {
  return (
    <div className="nexus-card p-6">
      <h2 className="text-2xl font-bold text-nexus-text-primary mb-4">Nexus Intelligence Hub</h2>
      <p className="text-nexus-text-secondary mb-6">
        Central hub for regional intelligence and strategic planning.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="nexus-card p-4 border border-nexus-surface-700">
          <h3 className="text-lg font-semibold text-nexus-text-primary mb-2">Regional Analysis</h3>
          <p className="text-nexus-text-secondary text-sm mb-4">
            Analyze regional data and identify opportunities.
          </p>
          <button 
            className="nexus-button nexus-button-primary"
            onClick={() => onStepComplete?.(1, { analysis: 'Regional data analyzed' })}
          >
            Start Analysis
          </button>
        </div>
        
        <div className="nexus-card p-4 border border-nexus-surface-700">
          <h3 className="text-lg font-semibold text-nexus-text-primary mb-2">Strategic Planning</h3>
          <p className="text-nexus-text-secondary text-sm mb-4">
            Develop strategic plans for regional development.
          </p>
          <button 
            className="nexus-button nexus-button-primary"
            onClick={() => onStepComplete?.(2, { plan: 'Strategic plan created' })}
          >
            Create Plan
          </button>
        </div>
        
        <div className="nexus-card p-4 border border-nexus-surface-700">
          <h3 className="text-lg font-semibold text-nexus-text-primary mb-2">Partnership Development</h3>
          <p className="text-nexus-text-secondary text-sm mb-4">
            Build strategic partnerships and networks.
          </p>
          <button 
            className="nexus-button nexus-button-primary"
            onClick={() => onStepComplete?.(3, { partnerships: 'Partnerships established' })}
          >
            Build Network
          </button>
        </div>
      </div>
      
      <div className="mt-6 flex space-x-4">
        <button 
          className="nexus-button nexus-button-secondary"
          onClick={() => onRequestHelp?.('Nexus Intelligence Hub help')}
        >
          Need Help?
        </button>
      </div>
    </div>
  );
};