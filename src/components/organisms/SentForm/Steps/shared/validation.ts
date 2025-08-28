import type { ValidationResult, ValidationRule } from '../types'

export class FormValidator {
    private rules: ValidationRule[]

    constructor(rules: ValidationRule[] = []) {
        this.rules = rules
    }

    addRule(rule: ValidationRule): void {
        this.rules.push(rule)
    }

    validate(value: unknown): ValidationResult {
        const errors: string[] = []

        for (const rule of this.rules) {
            const isValid = this.validateRule(rule, value)
            if (!isValid) {
                errors.push(rule.message)
            }
        }

        return {
            isValid: errors.length === 0,
            errors,
        }
    }

    private validateRule(rule: ValidationRule, value: unknown): boolean {
        switch (rule.type) {
            case 'required':
                return value !== null && value !== undefined && value !== ''

            case 'email': {
                if (!value) return true // Skip if empty (use required rule for that)
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                return emailRegex.test(value as string)
            }

            case 'minLength':
                return !value || (typeof value === 'string' && value.length >= (rule.value || 0))

            case 'maxLength':
                return !value || (typeof value === 'string' && value.length <= (rule.value || 0))

            case 'pattern': {
                if (!value) return true
                const regex = new RegExp(rule.value || '')
                return regex.test(value as string)
            }

            case 'custom':
                return rule.value ? rule.value(value) : true

            default:
                return true
        }
    }
}

// Common validation rules
export const commonValidations = {
    required: (message = 'This field is required'): ValidationRule => ({
        type: 'required',
        message,
    }),

    email: (message = 'Please enter a valid email address'): ValidationRule => ({
        type: 'email',
        message,
    }),

    minLength: (length: number, message?: string): ValidationRule => ({
        type: 'minLength',
        value: length,
        message: message || `Minimum length is ${length} characters`,
    }),

    maxLength: (length: number, message?: string): ValidationRule => ({
        type: 'maxLength',
        value: length,
        message: message || `Maximum length is ${length} characters`,
    }),

    pattern: (regex: string, message: string): ValidationRule => ({
        type: 'pattern',
        value: regex,
        message,
    }),
}
