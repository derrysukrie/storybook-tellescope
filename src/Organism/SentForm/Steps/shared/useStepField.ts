import { useState, useCallback, useEffect } from "react";
import { useFormContext } from "../../FormContext";
import { FormValidator, commonValidations } from "./validation";
import type { ValidationRule, ValidationResult } from "../types";

interface UseStepFieldOptions {
  stepId?: string;
  validations?: ValidationRule[];
  defaultValue?: any;
  required?: boolean;
}

export const useStepField = (options: UseStepFieldOptions = {}) => {
  const { stepId, validations = [], defaultValue, required = false } = options;
  const { updateFormData, getFormData, currentStep } = useFormContext();
  
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState(false);
  
  const effectiveStepId = stepId || currentStep;
  
  // Initialize validator with required validation if needed
  const validator = new FormValidator();
  if (required) {
    validator.addRule(commonValidations.required());
  }
  validations.forEach(rule => validator.addRule(rule));
  
  // Get current value from form context on mount and reset when step changes
  useEffect(() => {
    const formData = getFormData();
    const currentValue = formData[effectiveStepId];
    if (currentValue !== undefined) {
      setValue(currentValue);
    } else {
      // Reset to default value when step changes and no value exists
      setValue(defaultValue || "");
    }
    // Reset error and touched state when step changes
    setError(null);
    setIsTouched(false);
  }, [effectiveStepId, getFormData, defaultValue]);
  
  const validate = useCallback((val: any): ValidationResult => {
    return validator.validate(val);
  }, [validator]);
  
  const handleChange = useCallback((newValue: any) => {
    setValue(newValue);
    updateFormData(effectiveStepId, newValue);
    
    // Validate on change if touched
    if (isTouched) {
      const validation = validate(newValue);
      setError(validation.isValid ? null : validation.errors[0]);
    }
  }, [updateFormData, effectiveStepId, isTouched, validate]);
  
  const handleBlur = useCallback(() => {
    setIsTouched(true);
    const validation = validate(value);
    setError(validation.isValid ? null : validation.errors[0]);
  }, [value, validate]);
  
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  
  const reset = useCallback(() => {
    setValue(defaultValue || "");
    setError(null);
    setIsTouched(false);
  }, [defaultValue]);
  
  return {
    value,
    error,
    isTouched,
    handleChange,
    handleBlur,
    clearError,
    reset,
    validate: () => validate(value)
  };
}; 