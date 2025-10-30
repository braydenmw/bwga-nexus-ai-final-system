import React from 'react';
import { ShieldCheckIcon } from './Icons.tsx';

interface Step {
  id: number;
  title: string;
  description: string;
  status?: 'pending' | 'active' | 'completed' | 'error';
  progress?: number;
  phase?: number;
  phaseName?: string;
}

interface EnhancedStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
  className?: string;
}

const EnhancedStepper: React.FC<EnhancedStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className = ''
}) => {
  const getStepIcon = (step: Step, index: number) => {
    if (step.status === 'completed' || index < currentStep) {
      return <ShieldCheckIcon className="h-5 w-5" />;
    }
    if (step.status === 'error') {
      return <span className="text-sm font-bold text-red-600">!</span>;
    }
    if (step.status === 'active' || index === currentStep) {
      return <span className="text-sm font-bold text-blue-600">●</span>;
    }
    return <span className="text-sm font-bold">{index + 1}</span>;
  };

  const getStepClasses = (step: Step, index: number) => {
    const baseClasses = "relative flex flex-col items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 cursor-pointer group";

    if (step.status === 'completed' || index < currentStep) {
      return `${baseClasses} bg-green-500 border-green-500 text-white shadow-lg hover:bg-green-600`;
    }
    if (step.status === 'error') {
      return `${baseClasses} bg-red-500 border-red-500 text-white shadow-lg hover:bg-red-600`;
    }
    if (step.status === 'active' || index === currentStep) {
      return `${baseClasses} bg-blue-600 border-blue-600 text-white shadow-lg ring-4 ring-blue-200 animate-pulse`;
    }
    return `${baseClasses} bg-white border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50`;
  };

  const getConnectorClasses = (index: number) => {
    const baseClasses = "flex-1 h-1 rounded-full transition-all duration-300";

    if (index < currentStep - 1) {
      return `${baseClasses} bg-green-500`;
    }
    if (index === currentStep - 1) {
      return `${baseClasses} bg-blue-500`;
    }
    return `${baseClasses} bg-gray-200`;
  };

  // Group steps by phase
  const phases = steps.reduce((acc, step, index) => {
    const phaseKey = step.phase || 1;
    if (!acc[phaseKey]) {
      acc[phaseKey] = {
        name: step.phaseName || `Phase ${phaseKey}`,
        steps: [],
        completed: false,
        current: false
      };
    }
    acc[phaseKey].steps.push({ ...step, index });
    return acc;
  }, {} as Record<number, { name: string; steps: (Step & { index: number })[]; completed: boolean; current: boolean }>);

  // Calculate phase statuses
  Object.values(phases).forEach(phase => {
    const phaseSteps = phase.steps;
    const completedSteps = phaseSteps.filter(step => step.status === 'completed' || step.index < currentStep).length;
    phase.completed = completedSteps === phaseSteps.length;
    phase.current = phaseSteps.some(step => step.index === currentStep);
  });

  return (
    <div className={`w-full ${className}`}>
      {/* Phase Overview */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Progress by Phase</h3>
        <div className="space-y-2">
          {Object.entries(phases).map(([phaseNum, phase]) => {
            const phaseProgress = (phase.steps.filter(step => step.status === 'completed' || step.index < currentStep).length / phase.steps.length) * 100;
            return (
              <div key={phaseNum} className="flex items-center gap-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  phase.completed ? 'bg-green-500 text-white' :
                  phase.current ? 'bg-blue-500 text-white' :
                  'bg-gray-300 text-gray-600'
                }`}>
                  {phaseNum}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{phase.name}</span>
                    <span className="text-xs text-gray-500">{Math.round(phaseProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full transition-all duration-500 ${
                        phase.completed ? 'bg-green-500' :
                        phase.current ? 'bg-blue-500' :
                        'bg-gray-300'
                      }`}
                      style={{ width: `${phaseProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-gray-700">Overall Progress</span>
          <span className="text-xs font-bold text-blue-600">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="space-y-4">
        {Object.entries(phases).map(([phaseNum, phase]) => (
          <div key={phaseNum} className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                phase.completed ? 'bg-green-500 text-white' :
                phase.current ? 'bg-blue-500 text-white' :
                'bg-gray-300 text-gray-600'
              }`}>
                {phaseNum}
              </div>
              <h4 className="text-sm font-semibold text-gray-800">{phase.name}</h4>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <div className="flex items-center justify-between w-full pl-8">
              {phase.steps.map((step, stepIndex) => {
                const globalIndex = step.index;
                return (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center group">
                      {/* Step Circle */}
                      <button
                        onClick={() => onStepClick(globalIndex)}
                        className={getStepClasses(step, globalIndex)}
                        aria-label={`Step ${globalIndex + 1}: ${step.title}`}
                        disabled={step.status === 'error'}
                      >
                        {getStepIcon(step, globalIndex)}
                      </button>

                      {/* Step Title */}
                      <div className="mt-2 text-center max-w-24">
                        <h3 className={`text-xs font-semibold transition-colors duration-200 ${
                          step.status === 'completed' || globalIndex < currentStep
                            ? 'text-green-700'
                            : step.status === 'error'
                            ? 'text-red-700'
                            : step.status === 'active' || globalIndex === currentStep
                            ? 'text-blue-700'
                            : 'text-gray-600 group-hover:text-blue-600'
                        }`}>
                          {step.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5 leading-tight hidden sm:block">
                          {step.description}
                        </p>
                        {step.progress !== undefined && step.progress > 0 && (
                          <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                            <div
                              className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                              style={{ width: `${step.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Connector Line */}
                    {stepIndex < phase.steps.length - 1 && (
                      <div className={getConnectorClasses(globalIndex)} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Current Step Info */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
          <span className="text-xs font-bold text-blue-600">●</span>
          <span className="text-xs font-medium text-blue-800">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep]?.title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedStepper;