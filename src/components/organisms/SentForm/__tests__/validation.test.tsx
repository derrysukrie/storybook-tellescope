import { describe, it, expect } from 'vitest';
import { isStepValid } from '../validation/validation';
import type { StepConfig, FormData } from '../types/types';

// Test utilities
const createMockStep = (type: string, overrides: Partial<StepConfig> = {}): StepConfig => ({
  type: type as any,
  id: `step-${type}`,
  ...overrides
});

const createMockFormData = (data: Record<string, any> = {}): FormData => data;

describe('SentForm Validation', () => {
  
  describe('Always Valid Steps', () => {
    it('validates description steps as always valid', () => {
      const step = createMockStep('description', { description: 'Test description' });
      const formData = createMockFormData();
      const checked = false;
      
      expect(isStepValid(step, formData, checked)).toBe(true);
    });

    it('validates ranking steps as always valid', () => {
      const step = createMockStep('ranking', { 
        items: [{ id: '1', text: 'Item 1' }] 
      });
      const formData = createMockFormData();
      const checked = false;
      
      expect(isStepValid(step, formData, checked)).toBe(true);
    });
  });

  describe('Checkbox Required Steps', () => {
    it('validates intro step requires checkbox to be checked', () => {
      const step = createMockStep('intro');
      const formData = createMockFormData();
      
      // Not checked - should be invalid
      expect(isStepValid(step, formData, false)).toBe(false);
      
      // Checked - should be valid
      expect(isStepValid(step, formData, true)).toBe(true);
    });
  });

  describe('String Required Steps', () => {
    const stringSteps = ['text', 'email', 'phone', 'number', 'longText', 'select', 'choice', 'date'];
    
    stringSteps.forEach(stepType => {
      it(`validates ${stepType} step requires non-empty string`, () => {
        const step = createMockStep(stepType, { id: 'test-step' });
        const checked = false;
        
        // No data - invalid
        expect(isStepValid(step, createMockFormData(), checked)).toBe(false);
        
        // Empty string - invalid
        expect(isStepValid(step, createMockFormData({ 'test-step': '' }), checked)).toBe(false);
        
        // Whitespace only - invalid
        expect(isStepValid(step, createMockFormData({ 'test-step': '   ' }), checked)).toBe(false);
        
        // Valid string - valid
        expect(isStepValid(step, createMockFormData({ 'test-step': 'valid input' }), checked)).toBe(true);
      });
    });
  });

  describe('Array Required Steps', () => {
    const arraySteps = ['multiSelect', 'checkbox', 'fileUpload'];
    
    arraySteps.forEach(stepType => {
      it(`validates ${stepType} step requires non-empty array`, () => {
        const step = createMockStep(stepType, { id: 'test-step' });
        const checked = false;
        
        // No data - invalid
        expect(isStepValid(step, createMockFormData(), checked)).toBe(false);
        
        // Empty array - invalid
        expect(isStepValid(step, createMockFormData({ 'test-step': [] }), checked)).toBe(false);
        
        // Valid array - valid
        expect(isStepValid(step, createMockFormData({ 'test-step': ['item1', 'item2'] }), checked)).toBe(true);
      });
    });
  });

  describe('Number Required Steps', () => {
    it('validates rating step requires valid number', () => {
      const step = createMockStep('rating', { 
        id: 'test-step',
        min: 0,
        max: 10,
        step: 1,
        shiftStep: 1,
        marks: true
      });
      const checked = false;
      
      // No data - invalid
      expect(isStepValid(step, createMockFormData(), checked)).toBe(false);
      
      // Negative number - invalid
      expect(isStepValid(step, createMockFormData({ 'test-step': -1 }), checked)).toBe(false);
      
      // Valid number - valid
      expect(isStepValid(step, createMockFormData({ 'test-step': 5 }), checked)).toBe(true);
      
      // Zero - valid
      expect(isStepValid(step, createMockFormData({ 'test-step': 0 }), checked)).toBe(true);
    });
  });

  describe('Special Validation Cases', () => {
    describe('QuestionsGroup Validation', () => {
      it('validates all questions are answered', () => {
        const step = createMockStep('questionsGroup', {
          id: 'test-group',
          questions: [
            { label: 'Q1', hint: 'Hint 1', fieldKey: 'q1' },
            { label: 'Q2', hint: 'Hint 2', fieldKey: 'q2' }
          ]
        });
        const checked = false;
        
        // No answers - invalid
        expect(isStepValid(step, createMockFormData(), checked)).toBe(false);
        
        // Partial answers - invalid
        expect(isStepValid(step, createMockFormData({ 
          'test-group_q1': 'answer1' 
        }), checked)).toBe(false);
        
        // All answers - valid
        expect(isStepValid(step, createMockFormData({ 
          'test-group_q1': 'answer1',
          'test-group_q2': 'answer2'
        }), checked)).toBe(true);
      });
    });

    describe('SignatureConsent Validation', () => {
      it('validates consent and signature are provided', () => {
        const step = createMockStep('signatureConsent', { id: 'test-consent' });
        const checked = false;
        
        // No data - invalid
        expect(isStepValid(step, createMockFormData(), checked)).toBe(false);
        
        // Only consent - invalid
        expect(isStepValid(step, createMockFormData({ 
          'test-consent_consent': true 
        }), checked)).toBe(false);
        
        // Only signature - invalid
        expect(isStepValid(step, createMockFormData({ 
          'test-consent_signature': 'John Doe' 
        }), checked)).toBe(false);
        
        // Both consent and signature - valid
        expect(isStepValid(step, createMockFormData({ 
          'test-consent_consent': true,
          'test-consent_signature': 'John Doe'
        }), checked)).toBe(true);
      });
    });

    describe('Time Validation', () => {
      it('validates time step has hour, minute, and amPm', () => {
        const step = createMockStep('time', { id: 'test-time' });
        const checked = false;
        
        // No data - invalid
        expect(isStepValid(step, createMockFormData(), checked)).toBe(false);
        
        // Partial data - invalid
        expect(isStepValid(step, createMockFormData({ 
          'test-time': { hour: 10 } 
        }), checked)).toBe(false);
        
        // Missing amPm - invalid
        expect(isStepValid(step, createMockFormData({ 
          'test-time': { hour: 10, minute: 30 } 
        }), checked)).toBe(false);
        
        // Complete data - valid
        expect(isStepValid(step, createMockFormData({ 
          'test-time': { hour: 10, minute: 30, amPm: 'AM' } 
        }), checked)).toBe(true);
      });
    });

    describe('Address Validation', () => {
      it('validates address step has required fields', () => {
        const step = createMockStep('address', { id: 'test-address' });
        const checked = false;
        
        // No data - invalid
        expect(isStepValid(step, createMockFormData(), checked)).toBe(false);
        
        // Partial data - invalid
        expect(isStepValid(step, createMockFormData({ 
          'test-address': { addressLine1: '123 Main St' } 
        }), checked)).toBe(false);
        
        // Complete data - valid
        expect(isStepValid(step, createMockFormData({ 
          'test-address': { 
            addressLine1: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345'
          } 
        }), checked)).toBe(true);
      });
    });

    describe('Insurance Validation', () => {
      it('validates insurance step has required fields', () => {
        const step = createMockStep('insurance', { id: 'test-insurance' });
        const checked = false;
        
        // No data - invalid
        expect(isStepValid(step, createMockFormData(), checked)).toBe(false);
        
        // Partial data - invalid
        expect(isStepValid(step, createMockFormData({ 
          'test-insurance': { insurer: 'Blue Cross' } 
        }), checked)).toBe(false);
        
        // Complete data - valid
        expect(isStepValid(step, createMockFormData({ 
          'test-insurance': { 
            insurer: 'Blue Cross',
            memberId: '123456789',
            planName: 'Premium Plan',
            planStartDate: '2024-01-01',
            relationshipToPolicyOwner: 'self'
          } 
        }), checked)).toBe(true);
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles null and undefined values', () => {
      const step = createMockStep('text', { id: 'test-step' });
      const checked = false;
      
      expect(isStepValid(step, createMockFormData({ 'test-step': null }), checked)).toBe(false);
      expect(isStepValid(step, createMockFormData({ 'test-step': undefined }), checked)).toBe(false);
    });

    it('handles boolean values correctly', () => {
      const step = createMockStep('checkbox', { id: 'test-step' });
      const checked = false;
      
      // Boolean true should be valid for checkbox steps
      expect(isStepValid(step, createMockFormData({ 'test-step': true }), checked)).toBe(true);
      expect(isStepValid(step, createMockFormData({ 'test-step': false }), checked)).toBe(false);
    });

    it('handles object values correctly', () => {
      const step = createMockStep('text', { id: 'test-step' });
      const checked = false;
      
      // Empty object - invalid (text steps require strings)
      expect(isStepValid(step, createMockFormData({ 'test-step': {} }), checked)).toBe(false);
      
      // Non-empty object - invalid (text steps require strings)
      expect(isStepValid(step, createMockFormData({ 'test-step': { key: 'value' } }), checked)).toBe(false);
      
      // Valid string - valid
      expect(isStepValid(step, createMockFormData({ 'test-step': 'valid string' }), checked)).toBe(true);
    });

    it('handles unknown step types gracefully', () => {
      const step = createMockStep('unknown' as any, { id: 'test-step' });
      const checked = false;
      
      // Should default to valid if no specific rules apply
      expect(isStepValid(step, createMockFormData({ 'test-step': 'any value' }), checked)).toBe(true);
    });
  });
});
