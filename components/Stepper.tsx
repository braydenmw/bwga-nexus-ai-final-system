
import React from 'react';

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="w-full px-4 sm:px-8">
      <div className="flex items-center">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <React.Fragment key={stepNumber}>
            <div className="flex flex-col items-center cursor-pointer group" onClick={() => onStepClick(stepNumber)}>
              <button
                className={`relative w-10 h-10 rounded-full flex items-center justify-center text-base font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-green-500 text-black ring-4 ring-green-500/30'
                    : isCompleted
                    ? 'bg-gray-700 text-gray-400'
                    : 'bg-gray-800 text-gray-500 group-hover:bg-gray-700'
                }`}
              >
                {isCompleted ? '✔' : stepNumber}
              </button>
              <p className={`mt-3 text-sm text-center font-semibold w-28 transition-colors duration-300 ${isActive ? 'text-green-400' : 'text-gray-400 group-hover:text-gray-300'}`}>
                {step}
              </p>
            </div>
            {stepNumber < steps.length && (
              <div
                className={`flex-1 h-0.5 transition-colors duration-300 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-700'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
    </div>
  );
};

export default Stepper;