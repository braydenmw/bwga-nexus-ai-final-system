import React from 'react';

interface ContextualHelpProps {
  context: string;
  onClose?: () => void;
}

export const ContextualHelp: React.FC<ContextualHelpProps> = ({ 
  context, 
  onClose 
}) => {
  const helpContent = {
    'General help and support': {
      title: 'General Help',
      content: 'Welcome to the Nexus Intelligence System. This platform helps you with regional development planning, partnership building, and strategic intelligence. Navigate through different sections using the sidebar menu.',
      tips: [
        'Complete your user profile to unlock advanced features',
        'Follow the 12-step workflow for comprehensive regional analysis',
        'Use the AI copilot for assistance with any section',
        'Generate reports and letters for stakeholders'
      ]
    },
    'Nexus Intelligence Hub help': {
      title: 'Nexus Intelligence Hub',
      content: 'The Intelligence Hub is your central dashboard for regional analysis and strategic planning. Here you can access various tools for regional development.',
      tips: [
        'Start with Regional Analysis to understand your area',
        'Use Strategic Planning to develop comprehensive strategies',
        'Build partnerships through the Partnership Development tool',
        'Track your progress through the workflow'
      ]
    },
    'Goal analysis help': {
      title: 'Goal Analysis Help',
      content: 'Define clear, measurable goals for your regional development initiatives. This step helps establish the foundation for your strategic planning.',
      tips: [
        'Be specific about your regional development objectives',
        'Consider both short-term and long-term goals',
        'Think about economic, social, and environmental impacts',
        'Align goals with regional strengths and opportunities'
      ]
    },
    'Context building help': {
      title: 'Context Building Help',
      content: 'Gather comprehensive information about your region including market conditions, stakeholder interests, and regulatory environment.',
      tips: [
        'Research local economic data and trends',
        'Identify key stakeholders and their interests',
        'Understand regulatory requirements and constraints',
        'Consider cultural and social factors'
      ]
    },
    'default': {
      title: 'Help & Support',
      content: 'This section provides contextual help for the current feature you are using.',
      tips: [
        'Use the AI copilot for immediate assistance',
        'Check the documentation for detailed guides',
        'Contact support for technical issues',
        'Explore the workflow for step-by-step guidance'
      ]
    }
  };

  const content = helpContent[context as keyof typeof helpContent] || helpContent.default;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-nexus-text-primary mb-2">{content.title}</h3>
        <p className="text-nexus-text-secondary text-sm leading-relaxed">{content.content}</p>
      </div>
      
      <div>
        <h4 className="text-md font-medium text-nexus-text-primary mb-2">Quick Tips:</h4>
        <ul className="space-y-1">
          {content.tips.map((tip, index) => (
            <li key={index} className="text-nexus-text-secondary text-sm flex items-start">
              <span className="text-nexus-accent-cyan mr-2">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="pt-4 border-t border-nexus-surface-700">
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="nexus-button nexus-button-primary"
          >
            Got it
          </button>
          <button
            onClick={() => alert('Additional help resources would be available here')}
            className="nexus-button nexus-button-secondary"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};