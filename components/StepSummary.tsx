import React from 'react';
import { ShieldCheckIcon } from './Icons.tsx';

interface StepData {
  title: string;
  completed: boolean;
  data: { [key: string]: any };
  requiredFields: string[];
  optionalFields?: string[];
}

interface StepSummaryProps {
  steps: StepData[];
  currentStep: number;
  className?: string;
}

export const StepSummary: React.FC<StepSummaryProps> = ({
  steps,
  currentStep,
  className = ''
}) => {
  const getFieldValue = (field: string, data: any) => {
    const keys = field.split('.');
    let value = data;
    for (const key of keys) {
      value = value?.[key];
    }
    return value;
  };

  const formatFieldValue = (value: any): string => {
    if (value === null || value === undefined || value === '') {
      return 'Not provided';
    }
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(', ') : 'None selected';
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return String(value);
  };

  const getFieldStatus = (field: string, data: any, required: boolean) => {
    const value = getFieldValue(field, data);
    const hasValue = value !== null && value !== undefined && value !== '' &&
                    (!Array.isArray(value) || value.length > 0);

    if (required && !hasValue) return 'missing';
    if (hasValue) return 'completed';
    return 'optional';
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-3 ${className}`}>
      <h3 className="text-base font-semibold text-gray-900 mb-3">Progress Summary</h3>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg border ${
              index === currentStep
                ? 'border-blue-300 bg-blue-50'
                : step.completed
                ? 'border-green-300 bg-green-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-gray-900 text-sm">{step.title}</h4>
              <div className="flex items-center gap-1">
                {step.completed ? (
                  <ShieldCheckIcon className="h-4 w-4 text-green-600" />
                ) : index === currentStep ? (
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                ) : (
                  <span className="text-gray-400 font-bold text-sm">○</span>
                )}
                <span className={`text-xs font-medium ${
                  step.completed
                    ? 'text-green-700'
                    : index === currentStep
                    ? 'text-blue-700'
                    : 'text-gray-500'
                }`}>
                  {step.completed ? 'Complete' : index === currentStep ? 'In Progress' : 'Pending'}
                </span>
              </div>
            </div>

            <div className="space-y-0.5">
              {step.requiredFields.map(field => {
                const status = getFieldStatus(field, step.data, true);
                const value = getFieldValue(field, step.data);

                return (
                  <div key={field} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 capitalize">
                      {field.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                    </span>
                    <span className={`font-medium ${
                      status === 'missing'
                        ? 'text-red-600'
                        : status === 'completed'
                        ? 'text-green-700'
                        : 'text-gray-500'
                    }`}>
                      {formatFieldValue(value)}
                    </span>
                  </div>
                );
              })}

              {step.optionalFields?.map(field => {
                const value = getFieldValue(field, step.data);
                const hasValue = value !== null && value !== undefined && value !== '' &&
                                (!Array.isArray(value) || value.length > 0);

                if (!hasValue) return null;

                return (
                  <div key={field} className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 capitalize">
                      {field.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                    </span>
                    <span className="text-gray-700 font-medium">
                      {formatFieldValue(value)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Overall Progress</span>
          <span className="font-medium text-gray-900">
            {steps.filter(s => s.completed).length} of {steps.length} steps completed
          </span>
        </div>
        <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(steps.filter(s => s.completed).length / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StepSummary;