/** @vitest-environment jsdom */
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { AppbarSidebarProvider, useAppbarSidebarContext } from './context';

// Test component to access context
const TestComponent = ({ 
  onContextChange 
}: { 
  onContextChange?: (context: any) => void 
}) => {
  const context = useAppbarSidebarContext();
  
  React.useEffect(() => {
    onContextChange?.(context);
  }, [context, onContextChange]);

  return (
    <div>
      <div data-testid="color">{context.color}</div>
      <div data-testid="expanded">{context.expanded.toString()}</div>
      <div data-testid="bgColor">{context.bgColor}</div>
      <button 
        data-testid="setColor" 
        onClick={() => context.setColor('transitional')}
      >
        Set Transitional
      </button>
      <button 
        data-testid="setExpanded" 
        onClick={() => context.setExpanded(true)}
      >
        Set Expanded
      </button>
      <button 
        data-testid="setBgColor" 
        onClick={() => context.setBgColor('#custom')}
      >
        Set Custom Color
      </button>
    </div>
  );
};

// Component without provider for error testing
const TestComponentWithoutProvider = () => {
  try {
    useAppbarSidebarContext();
    return <div>No error</div>;
  } catch (error) {
    return <div data-testid="error">{(error as Error).message}</div>;
  }
};

describe('AppbarSidebarContext', () => {
  describe('useAppbarSidebarContext hook', () => {
    it('throws error when used outside provider', () => {
      render(<TestComponentWithoutProvider />);
      expect(screen.getByTestId('error')).toHaveTextContent(
        'useAppbarSidebarContext must be used within AppbarSidebarProvider'
      );
    });

    it('returns context when used within provider', () => {
      render(
        <AppbarSidebarProvider>
          <TestComponent />
        </AppbarSidebarProvider>
      );
      
      expect(screen.getByTestId('color')).toHaveTextContent('standard');
      expect(screen.getByTestId('expanded')).toHaveTextContent('false');
      expect(screen.getByTestId('bgColor')).toHaveTextContent('#E3E2E9');
    });
  });

  describe('AppbarSidebarProvider', () => {
    describe('initial state with default props', () => {
      it('sets standard color and corresponding background', () => {
        render(
          <AppbarSidebarProvider>
            <TestComponent />
          </AppbarSidebarProvider>
        );
        
        expect(screen.getByTestId('color')).toHaveTextContent('standard');
        expect(screen.getByTestId('bgColor')).toHaveTextContent('#E3E2E9');
        expect(screen.getByTestId('expanded')).toHaveTextContent('false');
      });
    });

    describe('initial state with custom props', () => {
      it('sets transitional color and corresponding background', () => {
        render(
          <AppbarSidebarProvider color="transitional">
            <TestComponent />
          </AppbarSidebarProvider>
        );
        
        expect(screen.getByTestId('color')).toHaveTextContent('transitional');
        expect(screen.getByTestId('bgColor')).toHaveTextContent('#F5F5F5');
      });

      it('sets expanded state when provided', () => {
        render(
          <AppbarSidebarProvider expanded={true}>
            <TestComponent />
          </AppbarSidebarProvider>
        );
        
        expect(screen.getByTestId('expanded')).toHaveTextContent('true');
      });

      it('sets both color and expanded when provided', () => {
        render(
          <AppbarSidebarProvider color="transitional" expanded={true}>
            <TestComponent />
          </AppbarSidebarProvider>
        );
        
        expect(screen.getByTestId('color')).toHaveTextContent('transitional');
        expect(screen.getByTestId('bgColor')).toHaveTextContent('#F5F5F5');
        expect(screen.getByTestId('expanded')).toHaveTextContent('true');
      });
    });

    describe('state updates', () => {
      it('updates color state when setColor is called', async () => {
        const user = userEvent.setup();
        
        render(
          <AppbarSidebarProvider>
            <TestComponent />
          </AppbarSidebarProvider>
        );
        
        expect(screen.getByTestId('color')).toHaveTextContent('standard');
        
        await user.click(screen.getByTestId('setColor'));
        
        expect(screen.getByTestId('color')).toHaveTextContent('transitional');
      });

      it('updates expanded state when setExpanded is called', async () => {
        const user = userEvent.setup();
        
        render(
          <AppbarSidebarProvider>
            <TestComponent />
          </AppbarSidebarProvider>
        );
        
        expect(screen.getByTestId('expanded')).toHaveTextContent('false');
        
        await user.click(screen.getByTestId('setExpanded'));
        
        expect(screen.getByTestId('expanded')).toHaveTextContent('true');
      });

      it('updates background color when setBgColor is called', async () => {
        const user = userEvent.setup();
        
        render(
          <AppbarSidebarProvider>
            <TestComponent />
          </AppbarSidebarProvider>
        );
        
        expect(screen.getByTestId('bgColor')).toHaveTextContent('#E3E2E9');
        
        await user.click(screen.getByTestId('setBgColor'));
        
        expect(screen.getByTestId('bgColor')).toHaveTextContent('#custom');
      });
    });

    describe('background color mapping', () => {
      it('maps standard color to correct background color', () => {
        render(
          <AppbarSidebarProvider color="standard">
            <TestComponent />
          </AppbarSidebarProvider>
        );
        
        expect(screen.getByTestId('bgColor')).toHaveTextContent('#E3E2E9');
      });

      it('maps transitional color to correct background color', () => {
        render(
          <AppbarSidebarProvider color="transitional">
            <TestComponent />
          </AppbarSidebarProvider>
        );
        
        expect(screen.getByTestId('bgColor')).toHaveTextContent('#F5F5F5');
      });
    });

    describe('function references', () => {
      it('provides stable function references', () => {
        const contextRef = React.createRef<any>();
        let renderCount = 0;
        
        const TestStabilityComponent = () => {
          const context = useAppbarSidebarContext();
          renderCount++;
          
          React.useEffect(() => {
            contextRef.current = context;
          });
          
          return <div>{renderCount}</div>;
        };
        
        const { rerender } = render(
          <AppbarSidebarProvider>
            <TestStabilityComponent />
          </AppbarSidebarProvider>
        );
        
        const firstContext = contextRef.current;
        
        rerender(
          <AppbarSidebarProvider>
            <TestStabilityComponent />
          </AppbarSidebarProvider>
        );
        
        const secondContext = contextRef.current;
        
        // Functions should be stable across re-renders
        expect(firstContext.setColor).toBe(secondContext.setColor);
        expect(firstContext.setExpanded).toBe(secondContext.setExpanded);
        expect(firstContext.setBgColor).toBe(secondContext.setBgColor);
      });
    });
  });

  describe('context value structure', () => {
    it('provides all expected context properties', () => {
      const mockContextChange = vi.fn();
      
      render(
        <AppbarSidebarProvider>
          <TestComponent onContextChange={mockContextChange} />
        </AppbarSidebarProvider>
      );
      
      expect(mockContextChange).toHaveBeenCalled();
      const context = mockContextChange.mock.calls[0][0];
      
      expect(context).toHaveProperty('color');
      expect(context).toHaveProperty('expanded');
      expect(context).toHaveProperty('bgColor');
      expect(context).toHaveProperty('setColor');
      expect(context).toHaveProperty('setExpanded');
      expect(context).toHaveProperty('setBgColor');
      
      expect(typeof context.setColor).toBe('function');
      expect(typeof context.setExpanded).toBe('function');
      expect(typeof context.setBgColor).toBe('function');
    });
  });
});
