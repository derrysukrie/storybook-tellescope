/** @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { FormBuilder } from './FormBuilder';

describe('FormBuilder', () => {
  const mockOnEdit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component rendering', () => {
    it('renders without crashing', () => {
      render(<FormBuilder type="tellescope-soft" onEdit={mockOnEdit} />);
      expect(screen.getByText('Primary')).toBeInTheDocument();
    });

    it('renders all required text elements', () => {
      render(<FormBuilder type="tellescope" onEdit={mockOnEdit} />);
      
      expect(screen.getByText('Primary')).toBeInTheDocument();
      expect(screen.getByText('Secondary')).toBeInTheDocument();
      expect(screen.getByText('Accent')).toBeInTheDocument();
      expect(screen.getByText('Tellescope')).toBeInTheDocument();
    });

    it('renders the edit button with more options icon', () => {
      render(<FormBuilder type="agua" onEdit={mockOnEdit} />);
      
      const editButton = screen.getByRole('button');
      expect(editButton).toBeInTheDocument();
    });
  });

  describe('Color schemes', () => {
    it('applies tellescope-soft color scheme correctly', () => {
      render(<FormBuilder type="tellescope-soft" onEdit={mockOnEdit} />);
      
      expect(screen.getByText('Primary')).toHaveStyle('color: #798ED0');
      expect(screen.getByText('Secondary')).toHaveStyle('color: #585E72');
      expect(screen.getByText('Accent')).toHaveStyle('color: #DDE1F9');
      expect(screen.getByText('Tellescope Soft')).toBeInTheDocument();
    });

    it('applies tellescope color scheme correctly', () => {
      render(<FormBuilder type="tellescope" onEdit={mockOnEdit} />);
      
      expect(screen.getByText('Primary')).toHaveStyle('color: #4A5C92');
      expect(screen.getByText('Secondary')).toHaveStyle('color: #585E72');
      expect(screen.getByText('Accent')).toHaveStyle('color: #0288D1');
      expect(screen.getByText('Tellescope')).toBeInTheDocument();
    });

    it('applies agua color scheme correctly', () => {
      render(<FormBuilder type="agua" onEdit={mockOnEdit} />);
      
      expect(screen.getByText('Primary')).toHaveStyle('color: #ACE1D8');
      expect(screen.getByText('Secondary')).toHaveStyle('color: #889390');
      expect(screen.getByText('Accent')).toHaveStyle('color: #86929F');
      expect(screen.getByText('Agua')).toBeInTheDocument();
    });
  });

  describe('Selected state', () => {
    it('shows grey check circle when not selected', () => {
      render(<FormBuilder type="tellescope-soft" onEdit={mockOnEdit} selected={false} />);
      
      const checkCircle = screen.getByTestId('CheckCircleIcon');
      expect(checkCircle).toHaveStyle('color: #9E9E9E');
    });

    it('shows green check circle when selected', () => {
      render(<FormBuilder type="tellescope-soft" onEdit={mockOnEdit} selected={true} />);
      
      const checkCircle = screen.getByTestId('CheckCircleIcon');
      expect(checkCircle).toHaveStyle('color: #4CAF50');
    });

    it('defaults to not selected when selected prop is not provided', () => {
      render(<FormBuilder type="tellescope-soft" onEdit={mockOnEdit} />);
      
      const checkCircle = screen.getByTestId('CheckCircleIcon');
      expect(checkCircle).toHaveStyle('color: #9E9E9E');
    });
  });

  describe('User interactions', () => {
    it('calls onEdit when edit button is clicked', async () => {
      const user = userEvent.setup();
      render(<FormBuilder type="tellescope-soft" onEdit={mockOnEdit} />);
      
      const editButton = screen.getByRole('button');
      await user.click(editButton);
      
      expect(mockOnEdit).toHaveBeenCalledTimes(1);
    });

    it('does not call onEdit when component is rendered', () => {
      render(<FormBuilder type="tellescope-soft" onEdit={mockOnEdit} />);
      
      expect(mockOnEdit).not.toHaveBeenCalled();
    });
  });

  describe('Component structure', () => {
    const findElementWithBg = (rgb: string) => {
      const nodes = Array.from(document.querySelectorAll('div'));
      return nodes.find(n => getComputedStyle(n).backgroundColor === rgb);
    };

    it('applies correct background color based on type', () => {
      const { rerender } = render(<FormBuilder type="tellescope-soft" onEdit={mockOnEdit} />);
      expect(findElementWithBg('rgb(244, 243, 250)')).toBeTruthy();

      rerender(<FormBuilder type="tellescope" onEdit={mockOnEdit} />);
      expect(findElementWithBg('rgb(255, 255, 255)')).toBeTruthy();

      rerender(<FormBuilder type="agua" onEdit={mockOnEdit} />);
      expect(findElementWithBg('rgb(244, 251, 248)')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has proper button accessibility', () => {
      render(<FormBuilder type="tellescope-soft" onEdit={mockOnEdit} />);
      
      const editButton = screen.getByRole('button');
      expect(editButton).toBeInTheDocument();
    });

    it('has proper text hierarchy', () => {
      render(<FormBuilder type="tellescope-soft" onEdit={mockOnEdit} />);
      
      // Check that text elements are properly rendered
      expect(screen.getByText('Primary')).toBeInTheDocument();
      expect(screen.getByText('Secondary')).toBeInTheDocument();
      expect(screen.getByText('Accent')).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('handles all valid type values', () => {
      const types = ['tellescope-soft', 'tellescope', 'agua'] as const;
      
      types.forEach(type => {
        const { unmount } = render(<FormBuilder type={type} onEdit={mockOnEdit} />);
        expect(screen.getByText('Primary')).toBeInTheDocument();
        unmount();
      });
    });

    it('handles multiple rapid clicks on edit button', async () => {
      const user = userEvent.setup();
      render(<FormBuilder type="tellescope-soft" onEdit={mockOnEdit} />);
      
      const editButton = screen.getByRole('button');
      await user.click(editButton);
      await user.click(editButton);
      await user.click(editButton);
      
      expect(mockOnEdit).toHaveBeenCalledTimes(3);
    });
  });
});
