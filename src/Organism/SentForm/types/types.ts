
// Step configuration types for the Organism
export interface IntroStepConfig {
  type: "intro";
  id: string;
  title?: string;
  subtitle?: string;
}

export interface DescriptionStepConfig {
  type: "description";
  id: string;
  description: string;
}

export interface SelectStepConfig {
  type: "select";
  id: string;
  title: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  helperText?: string;
}

export interface MultiSelectStepConfig {
  type: "multiSelect";
  id: string;
  title: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  helperText?: string;
}

export interface ChoiceStepConfig {
  type: "choice";
  id: string;
  label: string;
  options: Array<{ id: string; label: string; value: string }>;
  helperText?: string;
}

export interface TextStepConfig {
  type: "text";
  id: string;
  title?: string;
  placeholder?: string;
  helperText?: string;
}

export interface EmailStepConfig {
  type: "email";
  id: string;
  title?: string;
  placeholder?: string;
  helperText?: string;
}

export interface PhoneStepConfig {
  type: "phone";
  id: string;
  title?: string;
  placeholder?: string;
  helperText?: string;
}

export interface NumberStepConfig {
  type: "number";
  id: string;
  title?: string;
  placeholder?: string;
  helperText?: string;
}

export interface LongTextStepConfig {
  type: "longText";
  id: string;
  title?: string;
  placeholder?: string;
  helperText?: string;
}

export interface CheckboxStepConfig {
  type: "checkbox";
  id: string;
  title: string;
  options: Array<{  label: string; value: string }>;
  helperText: string;
}

export interface FileUploadStepConfig {
  type: "fileUpload";
  id: string;
}

export interface QuestionsGroupStepConfig {
  type: "questionsGroup";
  id: string;
  title: string;
  description: string;
  questions: {
    label: string;
    hint: string;
    fieldKey: string;
    hiddenLabel?: boolean;
  }[];
}

export interface SignatureConsentStepConfig {
  type: "signatureConsent";
  id: string;
}

export interface DateStepConfig {
  type: "date";
  id: string;
  title?: string;
  placeholder?: string;
  helperText?: string;
}

export interface RatingStepConfig {
  type: "rating";
  id: string;
  min: number;
  max: number;
  step: number;
  shiftStep: number;
  marks: boolean;
}

export interface RankingStepConfig {
  type: "ranking";
  id: string;
  items: {
    id: string;
    text: string;
  }[];
}

// Union type for all step configurations
export type StepConfig = 
  | IntroStepConfig
  | DescriptionStepConfig
  | SelectStepConfig
  | MultiSelectStepConfig
  | ChoiceStepConfig
  | TextStepConfig
  | EmailStepConfig
  | PhoneStepConfig
  | NumberStepConfig
  | LongTextStepConfig
  | CheckboxStepConfig
  | FileUploadStepConfig
  | QuestionsGroupStepConfig
  | SignatureConsentStepConfig
  | DateStepConfig
  | RatingStepConfig
  | RankingStepConfig;

// Form data type
export interface FormData {
  [stepId: string]: any;
}

// Proper Organism props
export interface SentFormProps {
  steps: StepConfig[];
  onComplete?: (data: FormData) => void;
  onFormDataChange?: (formData: FormData) => void;
  debounceDelay?: number;
}
