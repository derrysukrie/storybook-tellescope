import { render, screen, fireEvent } from '../../../../../test/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { FormProvider, useFormContext } from '../FormContext';
import { useState } from 'react';

// Test component that uses the context
const TestComponent = () => {
  const { updateFormData, formData, currentStep } = useFormContext();
  
  return (
    <div>
      <div data-testid="current-step">{currentStep}</div>
      <div data-testid="form-data">{JSON.stringify(formData)}</div>
      <button 
        data-testid="update-button"
        onClick={() => updateFormData('test-key', 'test-value')}
      >
        Update Data
      </button>
    </div>
  );
};

// Test component that should throw error when used outside provider
const TestComponentWithoutProvider = () => {
  try {
    useFormContext();
    return <div data-testid="no-error">No error thrown</div>;
  } catch (error) {
    return <div data-testid="error">{(error as Error).message}</div>;
  }
};

describe('FormContext', () => {
  describe('FormProvider', () => {
    it('provides context values to children', () => {
      const mockUpdateFormData = vi.fn();
      const mockFormData = { existing: 'data' };
      const mockCurrentStep = 'step-1';
      
      const contextValue = {
        updateFormData: mockUpdateFormData,
        formData: mockFormData,
        currentStep: mockCurrentStep
      };
      
      render(
        <FormProvider value={contextValue}>
          <TestComponent />
        </FormProvider>
      );
      
      expect(screen.getByTestId('current-step')).toHaveTextContent('step-1');
      expect(screen.getByTestId('form-data')).toHaveTextContent('{"existing":"data"}');
    });

    it('updates context when value changes', () => {
      const TestWrapper = () => {
        const [step, setStep] = useState('step-1');
        const [data, setData] = useState({ initial: 'data' });
        
        const contextValue = {
          updateFormData: vi.fn((key, value) => {
            setData(prev => ({ ...prev, [key]: value }));
          }),
          formData: data,
          currentStep: step
        };
        
        return (
          <div>
            <FormProvider value={contextValue}>
              <TestComponent />
            </FormProvider>
            <button 
              data-testid="change-step"
              onClick={() => setStep('step-2')}
            >
              Change Step
            </button>
          </div>
        );
      };
      
      render(<TestWrapper />);
      
      // Initial values
      expect(screen.getByTestId('current-step')).toHaveTextContent('step-1');
      expect(screen.getByTestId('form-data')).toHaveTextContent('{"initial":"data"}');
      
      // Change step
      fireEvent.click(screen.getByTestId('change-step'));
      expect(screen.getByTestId('current-step')).toHaveTextContent('step-2');
    });

    it('handles multiple children', () => {
      const contextValue = {
        updateFormData: vi.fn(),
        formData: {},
        currentStep: 'step-1'
      };
      
      render(
        <FormProvider value={contextValue}>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
          <TestComponent />
        </FormProvider>
      );
      
      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
      expect(screen.getByTestId('current-step')).toBeInTheDocument();
    });

    it('handles empty children', () => {
      const contextValue = {
        updateFormData: vi.fn(),
        formData: {},
        currentStep: 'step-1'
      };
      
      const { container } = render(
        <FormProvider value={contextValue}>
          {null}
        </FormProvider>
      );
      
      expect(container.firstChild).toBeNull();
    });
  });

  describe('useFormContext Hook', () => {
    it('returns context when used within provider', () => {
      const mockUpdateFormData = vi.fn();
      const mockFormData = { test: 'data' };
      const mockCurrentStep = 'test-step';
      
      const contextValue = {
        updateFormData: mockUpdateFormData,
        formData: mockFormData,
        currentStep: mockCurrentStep
      };
      
      render(
        <FormProvider value={contextValue}>
          <TestComponent />
        </FormProvider>
      );
      
      expect(screen.getByTestId('current-step')).toHaveTextContent('test-step');
      expect(screen.getByTestId('form-data')).toHaveTextContent('{"test":"data"}');
    });

    it('throws error when used outside provider', () => {
      render(<TestComponentWithoutProvider />);
      
      expect(screen.getByTestId('error')).toHaveTextContent(
        'useFormContext must be used within a FormProvider'
      );
    });

    it('provides working updateFormData function', () => {
      const mockUpdateFormData = vi.fn();
      const contextValue = {
        updateFormData: mockUpdateFormData,
        formData: {},
        currentStep: 'test-step'
      };
      
      render(
        <FormProvider value={contextValue}>
          <TestComponent />
        </FormProvider>
      );
      
      const updateButton = screen.getByTestId('update-button');
      fireEvent.click(updateButton);
      
      expect(mockUpdateFormData).toHaveBeenCalledWith('test-key', 'test-value');
    });

    it('maintains referential stability of context values', () => {
      let renderCount = 0;
      
      const TestComponentWithRenderCount = () => {
        renderCount++;
        const { updateFormData, formData, currentStep } = useFormContext();
        
        return (
          <div>
            <div data-testid="render-count">{renderCount}</div>
            <div data-testid="current-step">{currentStep}</div>
            <div data-testid="form-data">{JSON.stringify(formData)}</div>
          </div>
        );
      };
      
      const TestWrapper = () => {
        const [step, setStep] = useState('step-1');
        const [data, setData] = useState({ initial: 'data' });
        
        // Create stable context value
        const contextValue = {
          updateFormData: vi.fn(),
          formData: data,
          currentStep: step
        };
        
        return (
          <div>
            <FormProvider value={contextValue}>
              <TestComponentWithRenderCount />
            </FormProvider>
            <button 
              data-testid="change-step"
              onClick={() => setStep('step-2')}
            >
              Change Step
            </button>
          </div>
        );
      };
      
      render(<TestWrapper />);
      
      // Initial render
      expect(screen.getByTestId('render-count')).toHaveTextContent('1');
      
      // Change step - should cause re-render
      fireEvent.click(screen.getByTestId('change-step'));
      expect(screen.getByTestId('render-count')).toHaveTextContent('2');
      expect(screen.getByTestId('current-step')).toHaveTextContent('step-2');
    });
  });

  describe('Context Type Safety', () => {
    it('provides correct TypeScript types', () => {
      const contextValue = {
        updateFormData: vi.fn(),
        formData: { key: 'value' },
        currentStep: 'step-1'
      };
      
      // This should compile without TypeScript errors
      render(
        <FormProvider value={contextValue}>
          <TestComponent />
        </FormProvider>
      );
      
      expect(screen.getByTestId('current-step')).toHaveTextContent('step-1');
    });

    it('handles different data types in formData', () => {
      const complexFormData = {
        string: 'test',
        number: 42,
        boolean: true,
        array: [1, 2, 3],
        object: { nested: 'value' },
        null: null,
        undefined: undefined
      };
      
      const contextValue = {
        updateFormData: vi.fn(),
        formData: complexFormData,
        currentStep: 'complex-step'
      };
      
      render(
        <FormProvider value={contextValue}>
          <TestComponent />
        </FormProvider>
      );
      
      const formDataElement = screen.getByTestId('form-data');
      expect(formDataElement).toHaveTextContent(JSON.stringify(complexFormData));
    });
  });
});
