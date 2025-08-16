export interface SelectOption {
  value: string;
  label: string;
}

export interface ChoiceOption {
  id?: string;
  label: string;
  value: string;
}

// Base interface for all step components
export interface BaseStepProps {
  title?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  stepId?: string;
}

// Specific step interfaces
export interface TextFieldStepProps extends BaseStepProps {
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number';
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

export interface SelectFieldStepProps extends BaseStepProps {
  options: SelectOption[];
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
}

export interface CheckboxFieldStepProps extends BaseStepProps {
  options: ChoiceOption[];
  maxSelections?: number;
  minSelections?: number;
}

export interface FileUploaderStepProps extends BaseStepProps {
  accept?: string;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  allowedTypes?: string[];
}

export interface DateFieldStepProps extends BaseStepProps {
  minDate?: Date;
  maxDate?: Date;
  format?: string;
}

export interface RatingStepProps extends BaseStepProps {
  maxRating: number;
  allowHalf?: boolean;
  showLabels?: boolean;
  labels?: string[];
}

export interface RankingStepProps extends BaseStepProps {
  options: ChoiceOption[];
  maxSelections?: number;
  minSelections?: number;
}

// Form validation types
export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// File upload types
export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'completed' | 'error';
  progress?: number;
  errorMessage?: string;
  url?: string;
} 