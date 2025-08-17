import type { StepConfig, FormData } from "../types/types";

// Simple validation helpers
const hasValue = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "number") return value >= 0;
  if (typeof value === "boolean") return value === true;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return false;
};

// Validation rules for each step type
const validationRules = {
  // Steps that always allow continue
  alwaysValid: ["description", "ranking"],
  
  // Steps that require checkbox to be checked
  requiresCheckbox: ["intro"],
  
  // Steps that require string values
  requiresString: ["text", "email", "phone", "number", "longText", "select", "choice", "date"],
  
  // Steps that require arrays
  requiresArray: ["multiSelect", "checkbox", "fileUpload"],
  
  // Steps that require numbers
  requiresNumber: ["rating"],
  
  // Special validation steps
  specialValidation: ["questionsGroup", "signatureConsent", "time", "address"]
};

// Special validation functions
const validateQuestionsGroup = (step: any, formData: FormData): boolean => {
  const questionKeys = step.questions.map((q: any) => `${step.id}_${q.fieldKey}`);
  return questionKeys.every((key: string) => hasValue(formData[key]));
};

const validateSignatureConsent = (stepId: string, formData: FormData): boolean => {
  const consent = formData[`${stepId}_consent`];
  const signature = formData[`${stepId}_signature`];
  return consent === true && hasValue(signature);
};

const validateTime = (stepData: any): boolean => {
  return hasValue(stepData?.hour) && hasValue(stepData?.minute) && hasValue(stepData?.amPm);
};

const validateAddress = (stepData: any): boolean => {
  return hasValue(stepData?.addressLine1) && 
         hasValue(stepData?.city) && 
         hasValue(stepData?.state) && 
         hasValue(stepData?.zipCode);
};

/**
 * Simplified validation function
 */
export const isStepValid = (step: StepConfig, formData: FormData, checked: boolean): boolean => {
  const { type, id } = step;

  // Always valid steps
  if (validationRules.alwaysValid.includes(type)) {
    return true;
  }

  // Steps requiring checkbox
  if (validationRules.requiresCheckbox.includes(type)) {
    return checked;
  }

  // Special validation cases
  if (type === "questionsGroup") {
    return validateQuestionsGroup(step, formData);
  }

  if (type === "signatureConsent") {
    return validateSignatureConsent(id, formData);
  }

  if (type === "time") {
    return validateTime(formData[id]);
  }

  if (type === "address") {
    return validateAddress(formData[id]);
  }

  // Get step data
  const stepData = formData[id];
  
  // Check if data exists
  if (!hasValue(stepData)) {
    return false;
  }

  // Apply type-specific validation
  if (validationRules.requiresString.includes(type)) {
    return typeof stepData === "string" && stepData.trim().length > 0;
  }

  if (validationRules.requiresArray.includes(type)) {
    return Array.isArray(stepData) && stepData.length > 0;
  }

  if (validationRules.requiresNumber.includes(type)) {
    return typeof stepData === "number" && stepData >= 0;
  }

  // Default to valid if no specific rules apply
  return true;
}; 