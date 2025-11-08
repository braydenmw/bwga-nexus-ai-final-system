import React, { useState } from 'react';

interface CopilotAssistantProps {
  onMessageSend?: (message: string) => void;
  onRequestHelp?: (context: string) => void;
}

export const CopilotAssistant: React.FC<CopilotAssistantProps> = ({ 
  onMessageSend, 
  onRequestHelp 
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'assistant'}>>([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { text: message, sender: 'user' as const };
      setMessages(prev => [...prev, newMessage]);
      onMessageSend?.(message);
      
      // Simulate AI response
      setTimeout(() => {
        const responses = [
          "I understand your query about regional development. Let me analyze the available data.",
          "Based on the regional analysis, I can identify several key opportunities for your area.",
          "Would you like me to help you create a strategic plan for regional development?",
          "I can assist you with partnership development and stakeholder engagement strategies."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setMessages(prev => [...prev, { text: randomResponse, sender: 'assistant' }]);
      }, 1000);
      
      setMessage('');
    }
  };

  return (
    <div className="nexus-card p-4 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-nexus-text-primary mb-4">AI Copilot</h3>
      
      <div className="flex-1 overflow-auto mb-4 space-y-3">
        {messages.length === 0 ? (
          <p className="text-nexus-text-secondary text-sm">
            Hello! I'm your AI copilot for regional development. How can I help you today?
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-nexus-accent-cyan/20 text-nexus-text-primary ml-8'
                  : 'bg-nexus-surface-700 text-nexus-text-secondary mr-8'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          ))
        )}
      </div>
      
      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me about regional development..."
          className="nexus-input flex-1"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="nexus-button nexus-button-primary"
        >
          Send
        </button>
      </div>
      
      <div className="mt-3 flex space-x-2">
        <button
          onClick={() => onRequestHelp?.('Copilot assistance help')}
          className="nexus-button nexus-button-secondary text-xs"
        >
          Need Help?
        </button>
      </div>
    </div>
  );
};