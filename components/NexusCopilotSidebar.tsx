import React, { useState, useEffect } from 'react';
import { LightbulbIcon, SymbiosisIcon } from './Icons.tsx';

const copilotAvatar = (
  <SymbiosisIcon className="h-8 w-8 text-blue-600" />
);

// Step-specific guidance messages with dynamic tier recommendations
const getStepGuidance = (currentStep: number, reportParams: any): string => {
  const baseGuidance: { [key: number]: string } = {
    0: 'Welcome to the BWGA Nexus AI 9-Step Framework! I\'m your Nexus Enquire AI assistant. I\'ll guide you through defining your context and intent. Please review the terms and conditions, then tell me about your project or needs.',
    1: 'Strategic Context Definition: Let\'s establish your profile and objectives. Share details about your organization, location, and goals for personalized guidance.',
    2: 'Opportunity Assessment: Define your market opportunities and strategic focus areas. I can help you identify potential areas based on your inputs.',
    3: 'Partnership Intent Clarification: Specify your partnership goals and criteria. Tell me what type of collaborations you\'re seeking.',
    4: 'Regional Diagnostic (RROI): Let\'s analyze your target region\'s economic DNA and readiness factors.',
    5: 'Predictive Positioning (TPT): Run transformation pathway simulations for your strategic plans.',
    6: 'Ecosystem Mapping (SEAM): Design your partner network and symbiotic relationships.',
    7: 'Risk Assessment & Mitigation: Evaluate risks and develop mitigation strategies.',
    8: 'Implementation Planning: Create actionable execution roadmaps and timelines.',
    9: 'Intelligence Blueprint & Presentation (NSIL): Generate your comprehensive NSIL intelligence report.'
  };

  let guidance = baseGuidance[currentStep] || 'I\'m here to help with any step of the process.';

  // Add dynamic tier recommendations for step 0
  if (currentStep === 0 && reportParams.organizationType) {
    const orgType = reportParams.organizationType.toLowerCase();
    if (orgType.includes('government')) {
      guidance += ' Based on your government focus, I recommend exploring Policy Development, Infrastructure Investment, and Regional Economic Development tiers.';
    } else if (orgType.includes('bank') || orgType.includes('financial')) {
      guidance += ' For financial institutions, I suggest Investment Risk Assessment, Regulatory Compliance Analysis, and Market Stability tiers.';
    } else if (orgType.includes('corporat') || orgType.includes('company')) {
      guidance += ' Corporate organizations typically benefit from Market Entry Strategy, Supply Chain Optimization, and Technology Investment tiers.';
    }
  }

  // Add tier feedback for step with tier selection
  if (currentStep === 0 && reportParams.tier && reportParams.tier.length > 0) {
    const selectedCount = reportParams.tier.length;
    if (selectedCount === 1) {
      guidance += ` You've selected ${selectedCount} tier. Consider adding 1-2 more for comprehensive analysis.`;
    } else if (selectedCount === 2) {
      guidance += ` You've selected ${selectedCount} tiers. One more would provide optimal coverage.`;
    } else if (selectedCount === 3) {
      guidance += ` Perfect! You've selected ${selectedCount} tiers for comprehensive analysis.`;
    } else if (selectedCount > 3) {
      guidance += ` You've selected ${selectedCount} tiers. Consider focusing on your top 3 priorities.`;
    }
  }

  return guidance;
};

export default function NexusCopilotSidebar({ context, large, currentStep, reportParams, onUpdateParams, messages, setMessages }: {
  context: any;
  large: boolean;
  currentStep: number;
  reportParams: any;
  onUpdateParams: (params: any) => void;
  messages: any[];
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize messages based on current step
  useEffect(() => {
    const currentGuidance = getStepGuidance(currentStep, reportParams);
    if (messages.length === 0 || messages[0].text !== currentGuidance) {
      setMessages((prev: any[]) => [{ sender: 'copilot', text: currentGuidance }]);
    }
  }, [currentStep, messages, setMessages, reportParams]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Check if it's a fact-search query
      if (input.toLowerCase().includes('search') || input.toLowerCase().includes('fact') || input.toLowerCase().includes('find')) {
        // Call ChatGPT for fact-searching
        const response = await fetch('/api/chatgpt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: input, context: reportParams })
        });
        const data = await response.json();
        setMessages((prev: any[]) => [...prev, { sender: 'copilot', text: data.response || 'I couldn\'t find specific facts for that query. Try rephrasing.' }]);
      } else {
        // Simulate copilot response or provide suggestions based on inputs
        let response = `Copilot response to: "${input}"`;
        if (input.toLowerCase().includes('review') || input.toLowerCase().includes('suggest')) {
          response = generateSuggestions(reportParams, currentStep);
        } else if (input.toLowerCase().includes('help') || input.toLowerCase().includes('what')) {
          response = getStepHelp(currentStep);
        } else if (input.toLowerCase().includes('review my inputs') || input.toLowerCase().includes('check my data')) {
          response = reviewUserInputs(reportParams, currentStep);
        }
        setTimeout(() => {
          setMessages((prev: any[]) => [...prev, { sender: 'copilot', text: response }]);
        }, 700);
      }
    } catch (error) {
      setMessages((prev: any[]) => [...prev, { sender: 'copilot', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSuggestions = (params: any, step: number) => {
    // Generate context-aware suggestions based on current step and params
    switch (step) {
      case 1:
        return params.businessName ? `For ${params.businessName}, consider focusing on digital transformation opportunities.` : 'Please provide your business name for tailored suggestions.';
      case 2:
        return 'Based on your opportunities, I suggest tiering them by market potential and implementation complexity.';
      case 3:
        return 'For your objectives, AI analyst recommends configuring for predictive analytics and risk assessment.';
      case 4:
        return params.location ? `For ${params.location}, regional diagnostic shows strong RROI in technology and healthcare sectors.` : 'Provide location details for regional insights.';
      case 5:
        return 'TPT simulation suggests a 3-year transformation pathway with phased implementation.';
      case 6:
        return 'SEAM mapping identifies potential partners in supply chain and innovation ecosystems.';
      case 7:
        return 'NSIL blueprint ready. Consider adding executive summary and risk mitigation sections.';
      case 8:
        return 'Review complete. All inputs look solid. Ready to generate report.';
      default:
        return 'I\'m here to help with any questions or suggestions for this step.';
    }
  };

  const getStepHelp = (step: number) => {
    const helpMessages: { [key: number]: string } = {
      0: 'This is the starting point. Please read and accept the terms and conditions to begin your journey through the BWGA Nexus AI 5-Step Framework.',
      1: 'In this step, provide your basic profile information including business name, industry, location, and contact details. This helps personalize the entire report.',
      2: 'Define your opportunities and analysis tiers. Think about what areas you want to explore and how to categorize them by priority and complexity.',
      3: 'Set your objectives and configure AI settings. What are your main goals? Choose AI capabilities that align with your objectives.',
      4: 'Regional Diagnostic (RROI) - Provide location data for regional readiness and opportunity analysis. I can help analyze regional factors.',
      5: 'Predictive Positioning (TPT) - Share your strategic plans for transformation pathway simulations. This predicts future scenarios.',
      6: 'Symbiotic Ecosystem Mapping (SEAM) - Design your ecosystem architecture and identify potential partners. Think about collaborative opportunities.',
      7: 'Intelligence Blueprint & Presentation (NSIL) - Generate your final NSIL intelligence report. This is where everything comes together.',
      8: 'Review all your inputs and generate the final report. Make sure everything looks correct before proceeding.',
      9: 'Your report is complete! Download it and explore the insights. You can also ask me about next steps or further analysis.'
    };
    return helpMessages[step] || 'I\'m here to help with any questions about this step.';
  };

  const reviewUserInputs = (params: any, step: number) => {
    let review = 'Let me review your current inputs:\n\n';

    switch (step) {
      case 1:
        review += `Business Name: ${params.businessName || 'Not provided'}\n`;
        review += `Industry: ${params.industry || 'Not provided'}\n`;
        review += `Location: ${params.location || 'Not provided'}\n`;
        break;
      case 2:
        review += `Opportunities: ${params.opportunities ? params.opportunities.length : 0} defined\n`;
        review += `Tiers: ${params.tiers ? params.tiers.length : 0} configured\n`;
        break;
      case 3:
        review += `Objectives: ${params.objectives || 'Not specified'}\n`;
        review += `AI Configuration: ${params.aiConfig || 'Default settings'}\n`;
        break;
      case 4:
        review += `Location Data: ${params.locationData ? 'Provided' : 'Missing'}\n`;
        review += `Regional Factors: ${params.regionalFactors ? 'Analyzed' : 'Pending'}\n`;
        break;
      case 5:
        review += `Strategic Plans: ${params.strategicPlans ? 'Defined' : 'Not provided'}\n`;
        review += `TPT Simulation: ${params.tptResults ? 'Completed' : 'Pending'}\n`;
        break;
      case 6:
        review += `Ecosystem Partners: ${params.partners ? params.partners.length : 0} identified\n`;
        review += `SEAM Architecture: ${params.seamMap ? 'Designed' : 'Pending'}\n`;
        break;
      case 7:
        review += `NSIL Blueprint: ${params.nsilBlueprint ? 'Generated' : 'Pending'}\n`;
        break;
      case 8:
        review += 'All inputs have been collected. Ready for final review and report generation.\n';
        break;
      default:
        review += 'Please complete the current step to see a detailed review.\n';
    }

    review += '\nSuggestions: ';
    if (step === 1 && !params.businessName) {
      review += 'Please provide your business name for personalized guidance.';
    } else if (step === 4 && !params.location) {
      review += 'Location data is crucial for accurate regional diagnostics.';
    } else {
      review += 'Your inputs look good! Continue to the next step or ask for specific suggestions.';
    }

    return review;
  };

  return (
    <aside className={`w-full md:w-[320px] bg-gradient-to-b from-blue-50 to-white border-l border-blue-100 p-0 flex flex-col min-h-screen shadow-2xl rounded-r-3xl overflow-hidden`} style={{ boxShadow: '0 8px 32px rgba(30,64,175,0.10)', borderLeft: '1px solid #e0e7ff' }}>
      <div className="flex items-center gap-3 px-4 py-4 border-b border-blue-100 bg-white rounded-tr-3xl">
        <SymbiosisIcon className="h-6 w-6 text-blue-600" />
        <span className="text-lg font-extrabold text-blue-900 tracking-wide">Nexus Inquire AI</span>
      </div>
      <div className="flex-1 flex flex-col bg-white rounded-none shadow-none px-4 py-4 gap-3 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'copilot' ? 'justify-start' : 'justify-end'}`}>
            <div className={`flex items-end gap-2 ${msg.sender === 'copilot' ? '' : 'flex-row-reverse'}`}>
              {msg.sender === 'copilot' && <SymbiosisIcon className="h-5 w-5 text-blue-600" />}
              <div className={`px-3 py-2 rounded-xl shadow ${msg.sender === 'copilot' ? 'bg-blue-50 text-blue-900' : 'bg-blue-600 text-white'} max-w-xs text-sm`} style={{ fontSize: '0.875rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(30,64,175,0.07)' }}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-4 border-t border-blue-100 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm bg-blue-50"
            placeholder="Type a question or key fact..."
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            style={{ borderRadius: '8px', fontSize: '0.875rem' }}
          />
          <button
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition text-sm shadow-lg"
            onClick={handleSend}
            style={{ borderRadius: '8px', fontSize: '0.875rem' }}
          >
            Send
          </button>
        </div>
        <div className="mt-3">
          <span className="text-gray-500 text-xs">Inquire AI provides context-aware suggestions and guidance as you build your report.</span>
        </div>
      </div>
    </aside>
  );
}