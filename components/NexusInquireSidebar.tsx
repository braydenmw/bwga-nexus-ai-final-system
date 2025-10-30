import React, { useState } from 'react';

interface NexusInquireSidebarProps {
  params: any;
}

const NexusInquireSidebar: React.FC<NexusInquireSidebarProps> = ({ params }) => {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Welcome to Nexus Inquire AI. Ask any question about your report or opportunity.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    // Here you would call the OpenAI API and append the response
    setTimeout(() => {
      setMessages(msgs => [...msgs, { role: 'assistant', content: 'AI response goes here (integrate OpenAI API).' }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full p-6">
      <h3 className="text-xl font-bold mb-4">Nexus Inquire AI</h3>
      <div className="flex-1 overflow-auto mb-4 bg-gray-50 rounded-lg p-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-200 text-gray-800'}`}>{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2"
          placeholder="Ask Nexus AI..."
        />
        <button onClick={handleSend} className="px-4 py-2 bg-blue-700 text-white rounded-lg font-bold">Send</button>
      </div>
    </div>
  );
};

export default NexusInquireSidebar;