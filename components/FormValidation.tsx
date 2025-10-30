import React, { useState, useEffect } from 'react';
import { QuestionMarkCircleIcon, ShieldCheckIcon } from './Icons.tsx';

interface ValidationRule {
  field: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  message: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: { [field: string]: string[] };
  warnings: { [field: string]: string[] };
}

interface FormValidationProps {
  rules: ValidationRule[];
  values: { [key: string]: any };
  onValidationChange?: (result: ValidationResult) => void;
  showRealTimeFeedback?: boolean;
  className?: string;
}

export const useFormValidation = (rules: ValidationRule[], values: { [key: string]: any }) => {
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: true,
    errors: {},
    warnings: {}
  });

  useEffect(() => {
    const result = validateForm(values, rules);
    setValidationResult(result);
  }, [values, rules]);

  return validationResult;
};

const validateForm = (values: { [key: string]: any }, rules: ValidationRule[]): ValidationResult => {
  const errors: { [field: string]: string[] } = {};
  const warnings: { [field: string]: string[] } = {};
  let isValid = true;

  rules.forEach(rule => {
    const value = values[rule.field];
    const fieldErrors: string[] = [];
    const fieldWarnings: string[] = [];

    // Required validation
    if (rule.required && (value === undefined || value === null || value === '')) {
      fieldErrors.push(`${rule.field} is required`);
      isValid = false;
    }

    // Skip other validations if field is empty and not required
    if (value === undefined || value === null || value === '') {
      if (fieldErrors.length > 0) {
        errors[rule.field] = fieldErrors;
      }
      return;
    }

    // String-specific validations
    if (typeof value === 'string') {
      if (rule.minLength && value.length < rule.minLength) {
        fieldErrors.push(`Must be at least ${rule.minLength} characters`);
        isValid = false;
      }

      if (rule.maxLength && value.length > rule.maxLength) {
        fieldErrors.push(`Must be no more than ${rule.maxLength} characters`);
        isValid = false;
      }

      if (rule.pattern && !rule.pattern.test(value)) {
        fieldErrors.push(rule.message || 'Invalid format');
        isValid = false;
      }
    }

    // Array-specific validations
    if (Array.isArray(value)) {
      if (rule.minLength && value.length < rule.minLength) {
        fieldErrors.push(`Must select at least ${rule.minLength} item(s)`);
        isValid = false;
      }

      if (rule.maxLength && value.length > rule.maxLength) {
        fieldWarnings.push(`Consider selecting fewer items (max ${rule.maxLength})`);
      }
    }

    // Custom validation
    if (rule.custom && !rule.custom(value)) {
      fieldErrors.push(rule.message);
      isValid = false;
    }

    if (fieldErrors.length > 0) {
      errors[rule.field] = fieldErrors;
    }

    if (fieldWarnings.length > 0) {
      warnings[rule.field] = fieldWarnings;
    }
  });

  return { isValid, errors, warnings };
};

export const FormValidation: React.FC<FormValidationProps> = ({
  rules,
  values,
  onValidationChange,
  showRealTimeFeedback = true,
  className = ''
}) => {
  const validationResult = useFormValidation(rules, values);

  useEffect(() => {
    onValidationChange?.(validationResult);
  }, [validationResult, onValidationChange]);

  if (!showRealTimeFeedback) {
    return null;
  }

  const totalErrors = Object.values(validationResult.errors).reduce((sum, errs) => sum + errs.length, 0);
  const totalWarnings = Object.values(validationResult.warnings).reduce((sum, warns) => sum + warns.length, 0);

  if (totalErrors === 0 && totalWarnings === 0) {
    return null;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {totalErrors > 0 && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <span className="text-red-600 font-bold text-lg flex-shrink-0">!</span>
          <div className="text-sm text-red-800">
            <div className="font-medium">Please fix the following errors:</div>
            <ul className="mt-1 list-disc list-inside space-y-1">
              {Object.entries(validationResult.errors).map(([field, errs]) =>
                errs.map((error, idx) => (
                  <li key={`${field}-${idx}`} className="text-red-700">
                    <span className="font-medium capitalize">{field.replace(/([A-Z])/g, ' $1')}:</span> {error}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}

      {totalWarnings > 0 && totalErrors === 0 && (
        <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <QuestionMarkCircleIcon className="h-5 w-5 text-yellow-600 flex-shrink-0" />
          <div className="text-sm text-yellow-800">
            <div className="font-medium">Suggestions:</div>
            <ul className="mt-1 list-disc list-inside space-y-1">
              {Object.entries(validationResult.warnings).map(([field, warns]) =>
                warns.map((warning, idx) => (
                  <li key={`${field}-${idx}`} className="text-yellow-700">
                    <span className="font-medium capitalize">{field.replace(/([A-Z])/g, ' $1')}:</span> {warning}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}

      {totalErrors === 0 && totalWarnings === 0 && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <ShieldCheckIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
          <span className="text-sm text-green-800 font-medium">All fields are valid!</span>
        </div>
      )}
    </div>
  );
};

export default FormValidation;