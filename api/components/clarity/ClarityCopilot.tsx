import React, { useState, useEffect } from 'react';

interface ClarityCopilotProps {
  currentStep: number;
  context: any;
  onCopilotResponse: (response: string) => void;
}

export const ClarityCopilot: React.FC<ClarityCopilotProps> = ({ 
  currentStep, 
  context, 
  onCopilotResponse 
}) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Generate contextual responses based on current step and user actions
    const generateResponse = () => {
      setIsTyping(true);
      
      setTimeout(() => {
        const response = getContextualResponse(currentStep, context);
        const newMessage = {
          id: Date.now(),
          type: 'assistant',
          content: response,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, newMessage]);
        setIsTyping(false);
        onCopilotResponse(response);
      }, 1000);
    };

    // Generate initial response when step changes
    generateResponse();
  }, [currentStep, context.organizationType, context.goal, context.aiConfiguration]);

  const getContextualResponse = (step: number, ctx: any): string => {
    switch (step) {
      case 1:
        if (ctx.organizationType) {
          return `Excellent choice! As a ${ctx.organizationType} entity, I recommend focusing on the following report tiers: ${getRecommendedTiers(ctx.organizationType)}. Would you like me to pre-select these for you?`;
        }
        return "Welcome to the BWGA Nexus Intelligence Suite! I'm here to guide you through setting up your organizational profile. Let's start by selecting your organization type.";
      
      case 2:
        if (ctx.goal) {
          return `Your goal of "${ctx.goal}" aligns well with our ${ctx.organizationType} intelligence framework. I can help you refine this further based on regional opportunities and market conditions.`;
        }
        return "Let's define your strategic objective. What do you want to achieve? I can suggest goals based on your organization type and target region.";
      
      case 7:
        if (ctx.aiConfiguration.personas.length > 0) {
          const personas = ctx.aiConfiguration.personas.join(', ');
          return `You've selected: ${personas}. This is an excellent combination for comprehensive analysis. The ${ctx.aiConfiguration.personas[0]} perspective will provide ${getPersonaInsight(ctx.aiConfiguration.personas[0])}.`;
        }
        return "Time to configure your AI intelligence team! Select personas that align with your strategic goals. I recommend starting with 2-3 complementary perspectives.";
      
      default:
        return `You're now on Step ${step}: ${getStepTitle(step)}. This step is crucial for building your comprehensive intelligence report. Let me know if you need guidance!`;
    }
  };

  const getRecommendedTiers = (orgType: string): string => {
    const tiers = {
      Government: 'FDI Attraction and Policy Development',
      Banking: 'Risk Assessment and Market Analysis',
      Corporation: 'Market Expansion and Partnership Development',
      NGO: 'Impact Assessment and Community Development',
      Academic: 'Research Analysis and Policy Recommendations',
      Individual: 'Investment Opportunities and Market Entry'
    };
    return tiers[orgType] || 'Comprehensive Analysis';
  };

  const getPersonaInsight = (persona: string): string => {
    const insights = {
      'Venture Capitalist': 'financial viability and investment potential',
      'Geopolitical Strategist': 'sovereign risk and political stability analysis',
      'Economic Analyst': 'macroeconomic trends and market dynamics',
      'Supply Chain Expert': 'operational efficiency and logistics optimization',
      'Sustainability Specialist': 'ESG impact and sustainable development metrics',
      'Digital Transformation Lead': 'technology adoption and innovation opportunities'
    };
    return insights[persona] || 'specialized domain expertise';
  };

  const getStepTitle = (step: number): string => {
    const titles = {
      1: 'Context & Profile',
      2: 'Goal Articulation',
      3: 'Regional Context',
      4: 'Market Analysis',
      5: 'Stakeholder Mapping',
      6: 'Risk Assessment',
      7: 'AI Configuration',
      8: 'Data Integration',
      9: 'Intelligence Processing',
      10: 'Intelligence Generation',
      11: 'Report Synthesis',
      12: 'Strategic Recommendations'
    };
    return titles[step] || 'Intelligence Step';
  };

  return (
    <div className="clarity-copilot">
      <style jsx>{`
        .clarity-copilot {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, var(--clarity-gray-dark) 0%, rgba(0, 255, 255, 0.05) 100%);
          border-left: 1px solid var(--clarity-cyan);
        }
        
        .copilot-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--clarity-gray-light);
          background: rgba(0, 255, 255, 0.1);
        }
        
        .copilot-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--clarity-cyan);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
        }
        
        .copilot-subtitle {
          font-size: 0.875rem;
          color: var(--clarity-gray-medium);
          opacity: 0.8;
        }
        
        .copilot-messages {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .message {
          max-width: 85%;
          padding: 1rem 1.5rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          line-height: 1.6;
          position: relative;
          animation: messageSlide 0.3s ease-out;
        }
        
        @keyframes messageSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .message.assistant {
          background: linear-gradient(135deg, var(--clarity-cyan) 0%, var(--clarity-white) 100%);
          color: var(--clarity-black);
          align-self: flex-start;
          border-bottom-left-radius: 0.25rem;
          box-shadow: 0 2px 10px var(--clarity-cyan-glow);
        }
        
        .message.user {
          background: var(--clarity-gray-medium);
          color: var(--clarity-white);
          align-self: flex-end;
          border-bottom-right-radius: 0.25rem;
          border: 1px solid var(--clarity-gray-light);
        }
        
        .typing-indicator {
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
          background: rgba(0, 255, 255, 0.1);
          border-radius: 1rem;
          align-self: flex-start;
          border: 1px solid var(--clarity-cyan);
        }
        
        .typing-dots {
          display: flex;
          gap: 0.25rem;
        }
        
        .typing-dot {
          width: 8px;
          height: 8px;
          background: var(--clarity-cyan);
          border-radius: 50%;
          animation: typingAnimation 1.4s infinite ease-in-out;
        }
        
        .typing-dot:nth-child(1) {
          animation-delay: -0.32s;
        }
        
        .typing-dot:nth-child(2) {
          animation-delay: -0.16s;
        }
        
        @keyframes typingAnimation {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .copilot-input {
          padding: 1.5rem;
          border-top: 1px solid var(--clarity-gray-light);
          background: var(--clarity-gray-dark);
        }
        
        .input-container {
          display: flex;
          gap: 0.5rem;
        }
        
        .copilot-input-field {
          flex: 1;
          background: var(--clarity-gray-medium);
          border: 1px solid var(--clarity-gray-light);
          border-radius: 2rem;
          padding: 0.75rem 1.5rem;
          color: var(--clarity-white);
          font-size: 0.875rem;
          outline: none;
          transition: all 0.3s ease;
        }
        
        .copilot-input-field:focus {
          border-color: var(--clarity-cyan);
          box-shadow: 0 0 15px var(--clarity-cyan-glow);
        }
        
        .copilot-input-field::placeholder {
          color: var(--clarity-gray-medium);
        }
        
        .send-button {
          background: linear-gradient(135deg, var(--clarity-cyan) 0%, var(--clarity-white) 100%);
          border: none;
          border-radius: 50%;
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--clarity-black);
          font-weight: bold;
        }
        
        .send-button:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px var(--clarity-cyan);
        }
        
        .send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        
        .status-indicator {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 8px;
          height: 8px;
          background: var(--clarity-cyan);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 var(--clarity-cyan);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(0, 255, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 255, 255, 0);
          }
        }
      `}</style>
      
      <div className="copilot-header">
        <div className="copilot-title">NEXUS COPILOT</div>
        <div className="copilot-subtitle">AI-Powered Intelligence Assistant</div>
        <div className="status-indicator" />
      </div>
      
      <div className="copilot-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            {message.content}
          </div>
        ))}
        
        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-dots">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: 'var(--clarity-cyan)' }}>
              Analyzing context...
            </span>
          </div>
        )}
      </div>
      
      <div className="copilot-input">
        <div className="input-container">
          <input
            type="text"
            className="copilot-input-field"
            placeholder="Ask me anything about your intelligence analysis..."
            disabled={isTyping}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                // Handle user input
                e.currentTarget.value = '';
              }
            }}
          />
          <button className="send-button" disabled={isTyping}>
            →
          </button>
        </div>
      </div>
    </div>
  );
};