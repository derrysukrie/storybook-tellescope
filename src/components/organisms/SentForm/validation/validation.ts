import type { StepConfig, FormData } from "../types/types";

// Helper functions for validation
const isValidString = (value: any): boolean => {
  return typeof value === "string" && value.trim().length > 0;
};

const isValidNonEmptyString = (value: any): boolean => {
  return typeof value === "string" && value.length > 0;
};

const isValidArray = (value: any): boolean => {
  return Array.isArray(value) && value.length > 0;
};

const isValidObject = (value: any): boolean => {
  return typeof value === "object" && value !== null;
};

const isValidNumber = (value: any): boolean => {
  return typeof value === "number" && value >= 0;
};

// Validation for object-based steps
const validateTimeStep = (stepData: any): boolean => {
  if (!isValidObject(stepData)) return false;
  
  return isValidNonEmptyString(stepData.hour) &&
         isValidNonEmptyString(stepData.minute) &&
         isValidNonEmptyString(stepData.amPm);
};

const validateAddressStep = (stepData: any): boolean => {
  if (!isValidObject(stepData)) return false;
  
  return isValidString(stepData.addressLine1) &&
         isValidString(stepData.city) &&
         isValidNonEmptyString(stepData.state) &&
         isValidString(stepData.zipCode);
};

/**
 * Validation function to check if step has valid data
 * @param step - The current step configuration
 * @param formData - The current form data
 * @param checked - Whether the intro checkbox is checked (for intro steps)
 * @returns boolean - True if the step is valid, false otherwise
 */
export const isStepValid = (step: StepConfig, formData: FormData, checked: boolean): boolean => {
  const stepId = step.id;

  // Handle intro step - requires checkbox to be checked
  if (step.type === "intro") {
    return checked;
  }

  // Skip validation for description and ranking steps - always allow continue
  if (step.type === "description" || step.type === "ranking") {
    return true;
  }

  // Handle questions group separately since data is stored with individual keys
  if (step.type === "questionsGroup") {
    const questionKeys = step.questions.map(q => `${stepId}_${q.fieldKey}`);
    return questionKeys.every(key => isValidString(formData[key]));
  }

  // Handle signature consent step - requires both checkbox and signature
  if (step.type === "signatureConsent") {
    const consentValue = formData[`${stepId}_consent`];
    const signatureValue = formData[`${stepId}_signature`];
    
    return consentValue === true && isValidString(signatureValue);
  }

  // For other step types, check if step data exists and is not empty
  const stepData = formData[stepId];
  if (stepData === undefined || stepData === null) {
    return false;
  }

  // Handle different step types
  switch (step.type) {
    case "text":
    case "email":
    case "phone":
    case "number":
    case "longText":
      return isValidString(stepData);

    case "select":
      return isValidNonEmptyString(stepData);

    case "multiSelect":
    case "checkbox":
    case "fileUpload":
      return isValidArray(stepData);

    case "choice":
      return isValidNonEmptyString(stepData);

    case "date":
      return isValidNonEmptyString(stepData);

    case "time":
      return validateTimeStep(stepData);

    case "address":
      return validateAddressStep(stepData);

    case "rating":
      return isValidNumber(stepData);

    default:
      return true;
  }
}; 