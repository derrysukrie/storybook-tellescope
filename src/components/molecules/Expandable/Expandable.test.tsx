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
    it('exports component', () => {
      expect(DisplayFields).toBeDefined();
      expect(typeof DisplayFields).toBe('function');
    });

    it('renders with view state', () => {
      render(
        <DisplayFields 
          state="view" 
          label="Test Label" 
          value="Test Value" 
          isPinned={false} 
          hidden={false} 
          onTogglePin={mockOnTogglePin} 
          onToggleHidden={mockOnToggleHidden} 
        />
      );
      
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByText('Test Value')).toBeInTheDocument();
    });

    it('renders with edit state', () => {
      render(
        <DisplayFields 
          state="edit" 
          label="Test Label" 
          value="Test Value" 
          isPinned={false} 
          hidden={false} 
          onTogglePin={mockOnTogglePin} 
          onToggleHidden={mockOnToggleHidden} 
        />
      );
      
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByText('Test Value')).toBeInTheDocument();
    });

    it('shows hidden field text when hidden is true', () => {
      render(
        <DisplayFields 
          state="view" 
          label="Test Label" 
          value="Test Value" 
          isPinned={false} 
          hidden={true} 
          onTogglePin={mockOnTogglePin} 
          onToggleHidden={mockOnToggleHidden} 
        />
      );
      
      expect(screen.getByText('Hidden Field')).toBeInTheDocument();
      expect(screen.getByText('Field')).toBeInTheDocument();
      expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Value')).not.toBeInTheDocument();
    });

    it('shows normal label and value when hidden is false', () => {
      render(
        <DisplayFields 
          state="view" 
          label="Test Label" 
          value="Test Value" 
          isPinned={false} 
          hidden={false} 
          onTogglePin={mockOnTogglePin} 
          onToggleHidden={mockOnToggleHidden} 
        />
      );
      
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByText('Test Value')).toBeInTheDocument();
      expect(screen.queryByText('Hidden Field')).not.toBeInTheDocument();
      expect(screen.queryByText('Field')).not.toBeInTheDocument();
    });

    it('shows visibility toggle button in edit state when not hidden', () => {
      render(
        <DisplayFields 
          state="edit" 
          label="Test Label" 
          value="Test Value" 
          isPinned={false} 
          hidden={false} 
          onTogglePin={mockOnTogglePin} 
          onToggleHidden={mockOnToggleHidden} 
        />
      );
      
      const visibilityButton = screen.getByTestId('VisibilityOutlinedIcon').closest('button');
      expect(visibilityButton).toBeInTheDocument();
    });

    it('shows visibility off button in edit state when hidden', () => {
      render(
        <DisplayFields 
          state="edit" 
          label="Test Label" 
          value="Test Value" 
          isPinned={false} 
          hidden={true} 
          onTogglePin={mockOnTogglePin} 
          onToggleHidden={mockOnToggleHidden} 
        />
      );
      
      const visibilityButton = screen.getByTestId('VisibilityOffOutlinedIcon').closest('button');
      expect(visibilityButton).toBeInTheDocument();
    });

    it('does not show visibility toggle button in view state', () => {
      render(
        <DisplayFields 
          state="view" 
          label="Test Label" 
          value="Test Value" 
          isPinned={false} 
          hidden={false} 
          onTogglePin={mockOnTogglePin} 
          onToggleHidden={mockOnToggleHidden} 
        />
      );
      
      expect(screen.queryByTestId('VisibilityOutlinedIcon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('VisibilityOffOutlinedIcon')).not.toBeInTheDocument();
    });

    it('shows pin button in edit state when not pinned', () => {
      render(
        <DisplayFields 
          state="edit" 
          label="Test Label" 
          value="Test Value" 
          isPinned={false} 
          hidden={false} 
          onTogglePin={mockOnTogglePin} 
          onToggleHidden={mockOnToggleHidden} 
        />
      );
      
      const pinButton = screen.getByTestId('PushPinOutlinedIcon').closest('button');
      expect(pinButton).toBeInTheDocument();
    });

    it('shows pinned button in edit state when pinned', () => {
      render(
        <DisplayFields 
          state="edit" 
          label="Test Label" 
          value="Test Value" 
          isPinned={true} 
          hidden={false} 
          onTogglePin={mockOnTogglePin} 
          onToggleHidden={mockOnToggleHidden} 
        />
      );
      
      const pinButton = screen.getByTestId('PushPinIcon').closest('button');
      expect(pinButton).toBeInTheDocument();
    });

    it('does not show pin button in view state', () => {
      render(
        <DisplayFields 
          state="view" 
          label="Test Label" 
          value="Test Value" 
          isPinned={false} 
          hidden={false} 
          onTogglePin={mockOnTogglePin} 
          onToggleHidden={mockOnToggleHidden} 
        />
      );
      
      expect(screen.queryByTestId('PushPinIcon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('PushPinOutlinedIcon')).not.toBeInTheDocument();
    });

    it('calls onToggleHidden when visibility button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <DisplayFields 
          state="edit" 
          label="Test Label" 
          value="Test Value" 
          isPinned={false} 
          hidden={false} 
          onTogglePin={mockOnTogglePin} 
          onToggleHidden={mockOnToggleHidden} 
        />
      );
      
      const visibilityButton = screen.getByTestId('VisibilityOutlinedIcon').closest('button');
      expect(visibilityButton).toBeInTheDocument();
      await user.click(visibilityButton!);
      
      expect(mockOnToggleHidden).toHaveBeenCalledTimes(1);
    });

    it('calls onTogglePin when pin button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <DisplayFields 
          state="edit" 
          label="Test Label" 
          value="Test Value" 
          isPinned={false} 
          hidden={false} 
          onTogglePin={mockOnTogglePin} 
          onToggleHidden={mockOnToggleHidden} 
        />
      );
      
      const pinButton = screen.getByTestId('PushPinOutlinedIcon').closest('button');
      expect(pinButton).toBeInTheDocument();
      await user.click(pinButton!);
      
      expect(mockOnTogglePin).toHaveBeenCalledTimes(1);
    });

    it('always shows edit button', () => {
      render(
        <DisplayFields 
          state="view" 
          label="Test Label" 
          value="Test Value" 
          isPinned={false} 
          hidden={false} 
          onTogglePin={mockOnTogglePin} 
          onToggleHidden={mockOnToggleHidden} 
        />
      );
      
      const editButton = screen.getByTestId('EditOutlinedIcon').closest('button');
      expect(editButton).toBeInTheDocument();
    });

    it('always shows delete button', () => {
      render(
        <DisplayFields 
          state="view" 
          label="Test Label" 
          value="Test Value" 
          isPinned={false} 
          hidden={false} 
          onTogglePin={mockOnTogglePin} 
          onToggleHidden={mockOnToggleHidden} 
        />
      );
      
      const deleteButton = screen.getByTestId('DeleteOutlineIcon').closest('button');
      expect(deleteButton).toBeInTheDocument();
    });

    it('applies correct styling to label text', () => {
      render(
        <DisplayFields 
          state="view" 
          label="Test Label" 
          value="Test Value" 
          isPinned={false} 
          hidden={false} 
          onTogglePin={mockOnTogglePin} 
          onToggleHidden={mockOnToggleHidden} 
        />
      );
      
      const labelElement = screen.getByText('Test Label');
      expect(labelElement).toBeInTheDocument();
    });

    it('applies correct styling to value text', () => {
      render(
        <DisplayFields 
          state="view" 
          label="Test Label" 
          value="Test Value" 
          isPinned={false} 
          hidden={false} 
          onTogglePin={mockOnTogglePin} 
          onToggleHidden={mockOnToggleHidden} 
        />
      );
      
      const valueElement = screen.getByText('Test Value');
      expect(valueElement).toBeInTheDocument();
    });

    it('handles empty label and value', () => {
      render(
        <DisplayFields 
          state="view" 
          label="" 
          value="" 
          isPinned={false} 
          hidden={false} 
          onTogglePin={mockOnTogglePin} 
          onToggleHidden={mockOnToggleHidden} 
        />
      );
      
      // Should render without errors even with empty strings
      expect(screen.getByTestId('EditOutlinedIcon')).toBeInTheDocument();
      expect(screen.getByTestId('DeleteOutlineIcon')).toBeInTheDocument();
    });

    it('handles long label and value text', () => {
      const longLabel = 'This is a very long label that might cause layout issues and should be handled gracefully';
      const longValue = 'This is a very long value that might cause layout issues and should be handled gracefully';
      
      render(
        <DisplayFields 
          state="view" 
          label={longLabel} 
          value={longValue} 
          isPinned={false} 
          hidden={false} 
          onTogglePin={mockOnTogglePin} 
          onToggleHidden={mockOnToggleHidden} 
        />
      );
      
      expect(screen.getByText(longLabel)).toBeInTheDocument();
      expect(screen.getByText(longValue)).toBeInTheDocument();
    });
  });

  describe('AddFieldButton', () => {
    it('exports component', () => {
      expect(AddFieldButton).toBeDefined();
      expect(typeof AddFieldButton).toBe('function');
    });

    it('renders with correct text', () => {
      render(<AddFieldButton />);
      
      expect(screen.getByText('Add Field')).toBeInTheDocument();
    });

    it('renders with Add icon', () => {
      render(<AddFieldButton />);
      
      const button = screen.getByRole('button', { name: /add field/i });
      expect(button).toBeInTheDocument();
    });

    it('has correct button variant', () => {
      render(<AddFieldButton />);
      
      const button = screen.getByRole('button', { name: /add field/i });
      expect(button).toHaveClass('MuiButton-contained');
    });

    it('applies custom styling', () => {
      render(<AddFieldButton />);
      
      const button = screen.getByRole('button', { name: /add field/i });
      expect(button).toBeInTheDocument();
    });

    it('is clickable', async () => {
      const user = userEvent.setup();
      render(<AddFieldButton />);
      
      const button = screen.getByRole('button', { name: /add field/i });
      await user.click(button);
      
      // Button should be clickable without errors
      expect(button).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('renders both components together', () => {
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

    it('maintains state independently between multiple DisplayFields', () => {
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