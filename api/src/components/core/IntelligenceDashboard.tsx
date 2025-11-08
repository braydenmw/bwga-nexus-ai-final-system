import React from 'react';

interface IntelligenceDashboardProps {
  onInsightSelect?: (insight: any) => void;
  onRequestHelp?: (context: string) => void;
}

export const IntelligenceDashboard: React.FC<IntelligenceDashboardProps> = ({ 
  onInsightSelect, 
  onRequestHelp 
}) => {
  const insights = [
    {
      id: 1,
      title: 'Regional Economic Growth',
      description: 'Economic indicators show 15% growth potential',
      category: 'Economic',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Infrastructure Development',
      description: 'Transportation infrastructure needs improvement',
      category: 'Infrastructure',
      priority: 'Medium'
    },
    {
      id: 3,
      title: 'Workforce Development',
      description: 'Skills gap identified in technology sector',
      category: 'Human Capital',
      priority: 'High'
    },
    {
      id: 4,
      title: 'Sustainability Opportunities',
      description: 'Renewable energy potential identified',
      category: 'Environmental',
      priority: 'Medium'
    }
  ];

  return (
    <div className="nexus-card p-6">
      <h2 className="text-2xl font-bold text-nexus-text-primary mb-4">Intelligence Dashboard</h2>
      <p className="text-nexus-text-secondary mb-6">
        Regional intelligence insights and strategic recommendations.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="nexus-card p-4 border border-nexus-surface-700 cursor-pointer hover:border-nexus-accent-cyan transition-colors"
            onClick={() => onInsightSelect?.(insight)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-nexus-text-primary">{insight.title}</h3>
              <span className={`px-2 py-1 rounded text-xs ${
                insight.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                insight.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {insight.priority}
              </span>
            </div>
            <p className="text-nexus-text-secondary text-sm mb-2">{insight.description}</p>
            <span className="text-xs text-nexus-accent-cyan">{insight.category}</span>
          </div>
        ))}
      </div>
      
      <div className="flex space-x-4">
        <button
          onClick={() => onRequestHelp?.('Intelligence Dashboard help')}
          className="nexus-button nexus-button-secondary"
        >
          Need Help?
        </button>
      </div>
    </div>
  );
};