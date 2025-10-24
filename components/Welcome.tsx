
import React from 'react';
import Card from './common/Card.tsx';
import { RegionalDevelopmentIcon } from './Icons.tsx';

interface WelcomeProps {
  onAccept: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onAccept }) => {
  return (
    <div className="bg-nexus-primary-900 flex items-center justify-center min-h-screen p-4">
      <Card className="max-w-4xl w-full animate-fadeIn bg-gradient-to-br from-nexus-surface-800/60 to-nexus-surface-700/40 border-nexus-border-medium/50 backdrop-blur-lg shadow-2xl">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 p-8 text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-6">
                <RegionalDevelopmentIcon className="w-20 h-20 md:w-24 md:h-24 text-nexus-accent-cyan" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4 font-serif bg-gradient-to-r from-nexus-text-primary via-nexus-accent-cyan to-nexus-text-primary bg-clip-text text-transparent">Welcome to BWGA Nexus AI</h1>
            <p className="text-xl md:text-2xl text-nexus-text-secondary font-medium leading-relaxed mb-6">
              Global Economic Empowerment OS
            </p>
            <button
              onClick={onAccept}
              className="bg-gradient-to-r from-nexus-accent-cyan to-nexus-accent-cyan-dark text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg shadow-nexus-accent-cyan/30 hover:shadow-xl hover:shadow-nexus-accent-cyan/50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-nexus-accent-cyan/50"
            >
              Acknowledge & Enter
            </button>
          </div>
          <div className="flex-1 p-8">
            <div className="bg-gradient-to-br from-nexus-surface-700/60 to-nexus-surface-600/40 border border-nexus-border-medium/50 rounded-xl p-6 text-left text-sm text-nexus-text-secondary shadow-lg">
                <p><strong className="text-nexus-text-primary">Disclaimer:</strong> This is an AI-Human Intelligence Platform intended for guidance and decision-support. Information is sourced from publicly available data and should be independently verified before making strategic or financial commitments.</p>
                <p className="mt-3">By proceeding, you acknowledge and agree to our terms of use and compliance policies.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};