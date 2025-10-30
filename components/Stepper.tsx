import React from 'react';

export default function Stepper({ steps, currentStep, onStepClick }) {
  return (
    <nav className="w-full flex justify-center items-center gap-0 mb-10">
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center">
          <button
            className={`flex flex-col items-center px-6 py-4 rounded-xl transition-all duration-200 font-bold text-base ${currentStep === idx ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50'} ${idx === 0 ? 'ml-0' : 'ml-2'}`}
            onClick={() => onStepClick(idx)}
            disabled={currentStep === idx}
            style={{ minWidth: 120, minHeight: 70, boxShadow: currentStep === idx ? '0 4px 24px rgba(30, 64, 175, 0.12)' : undefined }}
          >
            <span className="text-lg font-bold">{step.title}</span>
            <span className="text-xs font-normal mt-1 text-gray-500">{step.description}</span>
          </button>
          {idx < steps.length - 1 && (
            <div className="w-10 h-1 bg-blue-200 mx-2 rounded-full" />
          )}
        </div>
      ))}
    </nav>
  );
}