import React from 'react';

interface HorizontalStepperProps {
    steps: string[];
    currentStep: number;
    onStepClick: (step: number) => void;
}

const HorizontalStepper: React.FC<HorizontalStepperProps> = ({ steps, currentStep, onStepClick }) => {
    return (
        <div className="flex items-center justify-center space-x-4">
            {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;

                return (
                    <React.Fragment key={stepNumber}>
                        <button
                            onClick={() => onStepClick(stepNumber)}
                            className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all duration-200 ${
                                isCompleted
                                    ? 'bg-green-500 text-white'
                                    : isActive
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                        >
                            {isCompleted ? '✓' : stepNumber}
                        </button>
                        {index < steps.length - 1 && (
                            <div
                                className={`flex-1 h-1 rounded ${
                                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                                }`}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default HorizontalStepper;