import type { StepConfig, FormData } from "../types/types";

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

  // Skip validation for description steps
  if (step.type === "description") {
    return true;
  }

  // Handle questions group separately since data is stored with individual keys
  if (step.type === "questionsGroup") {
    // For questions group, check if ALL questions have data
    const questionKeys = step.questions.map(q => `${stepId}_${q.fieldKey}`);
    return questionKeys.every(key => {
      const value = formData[key];
      return typeof value === "string" && value.trim().length > 0;
    });
  }

  // Handle signature consent step - requires both checkbox and signature
  if (step.type === "signatureConsent") {
    const consentValue = formData[`${stepId}_consent`];
    const signatureValue = formData[`${stepId}_signature`];
    
    return consentValue === true && 
           typeof signatureValue === "string" && 
           signatureValue.trim().length > 0;
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
      return typeof stepData === "string" && stepData.trim().length > 0;

    case "select":
      return typeof stepData === "string" && stepData.length > 0;

    case "multiSelect":
      return Array.isArray(stepData) && stepData.length > 0;

    case "choice":
      return typeof stepData === "string" && stepData.length > 0;

    case "checkbox":
      return Array.isArray(stepData) && stepData.length > 0;

    case "fileUpload":
      return Array.isArray(stepData) && stepData.length > 0;

    case "date":
      return typeof stepData === "string" && stepData.length > 0;

    default:
      return true;
  }
}; 