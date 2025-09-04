/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DisplayFields, AddFieldButton } from './Expandable';

describe('Expandable', () => {
  const mockOnTogglePin = vi.fn();
  const mockOnToggleHidden = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('DisplayFields', () => {
    const defaultProps = {
      label: 'Test Label',
      value: 'Test Value',
      isPinned: false,
      hidden: false,
      onTogglePin: mockOnTogglePin,
      onToggleHidden: mockOnToggleHidden,
    };

    it('exports component', () => {
      expect(DisplayFields).toBeDefined();
      expect(typeof DisplayFields).toBe('function');
    });

    describe('rendering states', () => {
      it('renders correctly in view state', () => {
        render(<DisplayFields state="view" {...defaultProps} />);
        
        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(screen.getByText('Test Value')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
      });

      it('renders correctly in edit state', () => {
        render(<DisplayFields state="edit" {...defaultProps} />);
        
        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(screen.getByText('Test Value')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /toggle visibility/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /toggle pin/i })).toBeInTheDocument();
      });
    });

    describe('hidden field behavior', () => {
      it('shows hidden field text when hidden is true', () => {
        render(<DisplayFields state="view" {...defaultProps} hidden={true} />);
        
        expect(screen.getByText('Hidden Field')).toBeInTheDocument();
        expect(screen.getByText('Field')).toBeInTheDocument();
        expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
        expect(screen.queryByText('Test Value')).not.toBeInTheDocument();
      });

      it('shows normal label and value when hidden is false', () => {
        render(<DisplayFields state="view" {...defaultProps} hidden={false} />);
        
        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(screen.getByText('Test Value')).toBeInTheDocument();
        expect(screen.queryByText('Hidden Field')).not.toBeInTheDocument();
        expect(screen.queryByText('Field')).not.toBeInTheDocument();
      });
    });

    describe('visibility toggle button', () => {
      it('shows correct visibility icon based on hidden state in edit mode', () => {
        const { rerender } = render(
          <DisplayFields state="edit" {...defaultProps} hidden={false} />
        );
        
        expect(screen.getByRole('button', { name: /toggle visibility/i })).toBeInTheDocument();
        
        rerender(<DisplayFields state="edit" {...defaultProps} hidden={true} />);
        expect(screen.getByRole('button', { name: /toggle visibility/i })).toBeInTheDocument();
      });

      it('does not show visibility toggle button in view state', () => {
        render(<DisplayFields state="view" {...defaultProps} />);
        
        expect(screen.queryByRole('button', { name: /toggle visibility/i })).not.toBeInTheDocument();
      });

      it('calls onToggleHidden when visibility button is clicked', async () => {
        const user = userEvent.setup();
        render(<DisplayFields state="edit" {...defaultProps} />);
        
        const visibilityButton = screen.getByRole('button', { name: /toggle visibility/i });
        await user.click(visibilityButton);
        
        expect(mockOnToggleHidden).toHaveBeenCalledTimes(1);
      });
    });

    describe('pin button behavior', () => {
      it('shows pin button in edit mode regardless of pinned state', () => {
        const { rerender } = render(
          <DisplayFields state="edit" {...defaultProps} isPinned={false} />
        );
        
        expect(screen.getByRole('button', { name: /toggle pin/i })).toBeInTheDocument();
        
        rerender(<DisplayFields state="edit" {...defaultProps} isPinned={true} />);
        expect(screen.getByRole('button', { name: /toggle pin/i })).toBeInTheDocument();
      });

      it('does not show pin button in view state', () => {
        render(<DisplayFields state="view" {...defaultProps} />);
        
        expect(screen.queryByRole('button', { name: /toggle pin/i })).not.toBeInTheDocument();
      });

      it('calls onTogglePin when pin button is clicked', async () => {
        const user = userEvent.setup();
        render(<DisplayFields state="edit" {...defaultProps} />);
        
        const pinButton = screen.getByRole('button', { name: /toggle pin/i });
        await user.click(pinButton);
        
        expect(mockOnTogglePin).toHaveBeenCalledTimes(1);
      });
    });

    describe('action buttons', () => {
      it('always shows edit and delete buttons', () => {
        render(<DisplayFields state="view" {...defaultProps} />);
        
        expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
      });
    });

    describe('edge cases', () => {
      it('handles empty label and value', () => {
        render(<DisplayFields state="view" {...defaultProps} label="" value="" />);
        
        expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
      });

      it('handles long label and value text', () => {
        const longLabel = 'This is a very long label that might cause layout issues and should be handled gracefully';
        const longValue = 'This is a very long value that might cause layout issues and should be handled gracefully';
        
        render(<DisplayFields state="view" {...defaultProps} label={longLabel} value={longValue} />);
        
        expect(screen.getByText(longLabel)).toBeInTheDocument();
        expect(screen.getByText(longValue)).toBeInTheDocument();
      });
    });
  });

  describe('AddFieldButton', () => {
    it('exports component', () => {
      expect(AddFieldButton).toBeDefined();
      expect(typeof AddFieldButton).toBe('function');
    });

    it('renders correctly with proper styling and behavior', async () => {
      const user = userEvent.setup();
      render(<AddFieldButton />);
      
      const button = screen.getByRole('button', { name: /add field/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('MuiButton-contained');
      expect(screen.getByText('Add Field')).toBeInTheDocument();
      
      // Test clickability
      await user.click(button);
      expect(button).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('renders both components together correctly', () => {
      render(
        <div>
          <DisplayFields 
            state="view" 
            label="Test Label" 
            value="Test Value" 
            isPinned={false} 
            hidden={false} 
            onTogglePin={mockOnTogglePin} 
            onToggleHidden={mockOnToggleHidden} 
          />
          <AddFieldButton />
        </div>
      );
      
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByText('Test Value')).toBeInTheDocument();
      expect(screen.getByText('Add Field')).toBeInTheDocument();
    });

    it('maintains independent state between multiple DisplayFields', () => {
      render(
        <div>
          <DisplayFields 
            state="edit" 
            label="First Field" 
            value="First Value" 
            isPinned={true} 
            hidden={false} 
            onTogglePin={mockOnTogglePin} 
            onToggleHidden={mockOnToggleHidden} 
          />
          <DisplayFields 
            state="view" 
            label="Second Field" 
            value="Second Value" 
            isPinned={false} 
            hidden={true} 
            onTogglePin={mockOnTogglePin} 
            onToggleHidden={mockOnToggleHidden} 
          />
        </div>
      );
      
      expect(screen.getByText('First Field')).toBeInTheDocument();
      expect(screen.getByText('First Value')).toBeInTheDocument();
      expect(screen.getByText('Hidden Field')).toBeInTheDocument();
      expect(screen.getByText('Field')).toBeInTheDocument();
    });
  });
});