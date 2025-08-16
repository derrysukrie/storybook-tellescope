import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

export interface FormContextType {
  updateFormData: (stepId: string, value: any) => void;
  getFormData: () => Record<string, any>;
  getAllStepValues: () => Record<string, any>;
  currentStep: string;
}

export const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
  value: FormContextType;
}

export const FormProvider = ({ children, value }: FormProviderProps) => {
  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
}; 