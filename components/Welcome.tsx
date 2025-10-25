
import React from 'react';
import Card from './common/Card.tsx';
import { RegionalDevelopmentIcon } from './Icons.tsx';

interface WelcomeProps {
  onAccept: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onAccept }) => {
  return (
    <div className="relative min-h-screen bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-30"
          src="https://images.unsplash.com/photo-1534294643569-3c7a3c513c8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Global Connections"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-4xl w-full text-center text-white animate-fadeIn">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight">
            BWGA Nexus AI
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 font-medium">
            The World's First Global Economic Empowerment OS
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto mb-10 shadow-2xl">
          <p className="text-gray-300 text-left">
            <strong className="text-white">Disclaimer:</strong> This is an AI-Human Intelligence Platform intended for guidance and decision-support. Information is sourced from publicly available data and should be independently verified before making strategic or financial commitments. By proceeding, you acknowledge and agree to our terms of use and compliance policies.
          </p>
        </div>
        <button
          onClick={onAccept}
          className="bg-white text-gray-900 font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
        >
          Acknowledge & Enter
        </button>
      </div>
    </div>
  );
};