import type { StepConfig, FormData, QuestionsGroupStepConfig } from "../types/types";

// Type for form field values - can be string, number, boolean, array, or object
type FormFieldValue = string | number | boolean | string[] | object | null | undefined;

// Interface for time step data
interface TimeData {
  hour?: string | number;
  minute?: string | number;
  amPm?: string;
}

// Interface for address step data
interface AddressData {
  addressLine1?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

// Interface for insurance step data
interface InsuranceData {
  insurer?: string;
  memberId?: string;
  planName?: string;
  planStartDate?: string | Date;
  relationshipToPolicyOwner?: string;
}

// Simple validation helpers
const hasValue = (value: FormFieldValue): boolean => {
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
  specialValidation: ["questionsGroup", "signatureConsent", "time", "address", "insurance"]
} as const;

// Special validation functions
const validateQuestionsGroup = (step: QuestionsGroupStepConfig, formData: FormData): boolean => {
  const questionKeys = step.questions.map((q) => `${step.id}_${q.fieldKey}`);
  return questionKeys.every((key: string) => hasValue(formData[key]));
};

const validateSignatureConsent = (stepId: string, formData: FormData): boolean => {
  const consent = formData[`${stepId}_consent`];
  const signature = formData[`${stepId}_signature`];
  return consent === true && hasValue(signature);
};

const validateTime = (stepData: TimeData): boolean => {
  return hasValue(stepData?.hour) && hasValue(stepData?.minute) && hasValue(stepData?.amPm);
};

const validateAddress = (stepData: AddressData): boolean => {
  return hasValue(stepData?.addressLine1) && 
         hasValue(stepData?.city) && 
         hasValue(stepData?.state) && 
         hasValue(stepData?.zipCode);
};

const validateInsurance = (stepData: InsuranceData): boolean => {
  return hasValue(stepData?.insurer) &&
         hasValue(stepData?.memberId) &&
         hasValue(stepData?.planName) &&
         hasValue(stepData?.planStartDate) &&
         hasValue(stepData?.relationshipToPolicyOwner);
};

/**
 * Simplified validation function
 */
export const isStepValid = (step: StepConfig, formData: FormData, checked: boolean): boolean => {
  const { type, id } = step;

  // Always valid steps
  if (validationRules.alwaysValid.includes(type as typeof validationRules.alwaysValid[number])) {
    return true;
  }

  // Steps requiring checkbox
  if (validationRules.requiresCheckbox.includes(type as typeof validationRules.requiresCheckbox[number])) {
    return checked;
  }

  // Special validation cases
  if (type === "questionsGroup") {
    return validateQuestionsGroup(step as QuestionsGroupStepConfig, formData);
  }

  if (type === "signatureConsent") {
    return validateSignatureConsent(id, formData);
  }

  if (type === "time") {
    return validateTime(formData[id] as TimeData);
  }

  if (type === "address") {
    return validateAddress(formData[id] as AddressData);
  }

  if (type === "insurance") {
    return validateInsurance(formData[id] as InsuranceData);
  }

  // Get step data
  const stepData = formData[id];
  
  // Check if data exists
  if (!hasValue(stepData)) {
    return false;
  }

  // Apply type-specific validation
  if (validationRules.requiresString.includes(type as typeof validationRules.requiresString[number])) {
    return typeof stepData === "string" && stepData.trim().length > 0;
  }

  if (validationRules.requiresArray.includes(type as typeof validationRules.requiresArray[number])) {
    return Array.isArray(stepData) && stepData.length > 0;
  }

  if (validationRules.requiresNumber.includes(type as typeof validationRules.requiresNumber[number])) {
    return typeof stepData === "number" && stepData >= 0;
  }

  // Default to valid if no specific rules apply
  return true;
}; 