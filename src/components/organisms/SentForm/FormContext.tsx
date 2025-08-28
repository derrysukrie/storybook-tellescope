import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

export interface FormContextType {
    updateFormData: (stepId: string, value: unknown) => void
    formData: Record<string, unknown>
    currentStep: string
}

export const FormContext = createContext<FormContextType | undefined>(undefined)

export const useFormContext = () => {
    const context = useContext(FormContext)
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider')
    }
    return context
}

interface FormProviderProps {
    children: ReactNode
    value: FormContextType
}

export const FormProvider = ({ children, value }: FormProviderProps) => {
    return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}
