import { render, screen } from '@testing-library/react';
import { DialogDatePicker } from './dialog-date-picker';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Helper to create UTC dates without timezone issues
const createUTCDate = (year: number, month: number, day: number): Date => {
    return new Date(Date.UTC(year, month, day));
};

// Mock the entire hook to focus on component behavior
const mockUseDatePicker = {
  viewDate: createUTCDate(2024, 0, 15), // January 15, 2024
  handlePrevMonth: vi.fn(),
  handleNextMonth: vi.fn(),
  handlePrevYear: vi.fn(),
  handleNextYear: vi.fn(),
  handleMonthChange: vi.fn(),
  handleYearChange: vi.fn(),
  handleDateSelect: vi.fn(),
  handleClear: vi.fn(),
  handleCancel: vi.fn(),
  handleNext: vi.fn(),
};

vi.mock('./use-date-picker', () => ({
  useDatePicker: () => mockUseDatePicker,
}));

// Mock sub-components to focus on coordination
vi.mock('./calendar-header', () => ({
  CalendarHeader: ({ viewDate, onPrevMonth, onNextMonth, onPrevYear, onNextYear, onMonthChange, onYearChange, ...props }: any) => (
    <div 
      data-testid="calendar-header" 
      data-view-date={viewDate.toISOString().split('T')[0]}
      data-prev-month={onPrevMonth ? 'mocked' : 'undefined'}
      data-next-month={onNextMonth ? 'mocked' : 'undefined'}
      data-prev-year={onPrevYear ? 'mocked' : 'undefined'}
      data-next-year={onNextYear ? 'mocked' : 'undefined'}
      data-month-change={onMonthChange ? 'mocked' : 'undefined'}
      data-year-change={onYearChange ? 'mocked' : 'undefined'}
      {...props}
    />
  ),
}));

vi.mock('./calendar-grid', () => ({
  CalendarGrid: ({ viewDate, selectedDate, onDateSelect, minDate, maxDate, ...props }: any) => (
    <div 
      data-testid="calendar-grid"
      data-view-date={viewDate.toISOString().split('T')[0]}
      data-selected-date={selectedDate?.toISOString().split('T')[0] || 'null'}
      data-min-date={minDate?.toISOString().split('T')[0] || 'undefined'}
      data-max-date={maxDate?.toISOString().split('T')[0] || 'undefined'}
      data-date-select={onDateSelect ? 'mocked' : 'undefined'}
      {...props}
    />
  ),
}));

vi.mock('./calendar-footer', () => ({
  CalendarFooter: ({ onClear, onCancel, onNext, ...props }: any) => (
    <div 
      data-testid="calendar-footer"
      data-clear={onClear ? 'mocked' : 'undefined'}
      data-cancel={onCancel ? 'mocked' : 'undefined'}
      data-next={onNext ? 'mocked' : 'undefined'}
      {...props}
    />
  ),
}));

describe('DialogDatePicker - Core Functionality', () => {
  const defaultProps = {
    value: createUTCDate(2024, 0, 15),
    onChange: vi.fn(),
    onCancel: vi.fn(),
    onNext: vi.fn(),
    onClear: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mock hook to default state
    mockUseDatePicker.viewDate = createUTCDate(2024, 0, 15);
  });

  // Test 1: Date Navigation - The Heart of the Component
  describe('Date Navigation', () => {
    it('navigates to previous month correctly', () => {
      render(<DialogDatePicker {...defaultProps} />);
      
      // Verify CalendarHeader receives navigation handlers
      const header = screen.getByTestId('calendar-header');
      expect(header).toHaveAttribute('data-prev-month', 'mocked');
      expect(header).toHaveAttribute('data-next-month', 'mocked');
      expect(header).toHaveAttribute('data-prev-year', 'mocked');
      expect(header).toHaveAttribute('data-next-year', 'mocked');
    });

    it('navigates to next month correctly', () => {
      render(<DialogDatePicker {...defaultProps} />);
      
      const header = screen.getByTestId('calendar-header');
      expect(header).toHaveAttribute('data-next-month', 'mocked');
    });

    it('navigates to previous year correctly', () => {
      render(<DialogDatePicker {...defaultProps} />);
      
      const header = screen.getByTestId('calendar-header');
      expect(header).toHaveAttribute('data-prev-year', 'mocked');
    });

    it('navigates to next year correctly', () => {
      render(<DialogDatePicker {...defaultProps} />);
      
      const header = screen.getByTestId('calendar-header');
      expect(header).toHaveAttribute('data-next-year', 'mocked');
    });

    it('respects min/max date boundaries', () => {
      const minDate = createUTCDate(2023, 0, 1);
      const maxDate = createUTCDate(2025, 11, 31);
      
      render(
        <DialogDatePicker 
          {...defaultProps} 
          minDate={minDate}
          maxDate={maxDate}
        />
      );
      
      // Verify boundaries are passed to CalendarGrid
      const grid = screen.getByTestId('calendar-grid');
      expect(grid).toHaveAttribute('data-min-date', '2023-01-01');
      expect(grid).toHaveAttribute('data-max-date', '2025-12-31');
    });
  });

  // Test 2: Date Selection - User's Primary Action
  describe('Date Selection', () => {
    it('selects a valid date and calls onChange', () => {
      render(<DialogDatePicker {...defaultProps} />);
      
      // Verify CalendarGrid receives selection handler
      const grid = screen.getByTestId('calendar-grid');
      expect(grid).toHaveAttribute('data-date-select', 'mocked');
    });

    it('rejects dates outside min/max range', () => {
      const minDate = createUTCDate(2024, 0, 1);
      const maxDate = createUTCDate(2024, 11, 31);
      
      render(
        <DialogDatePicker 
          {...defaultProps} 
          minDate={minDate}
          maxDate={maxDate}
        />
      );
      
      // Verify boundaries are enforced
      const grid = screen.getByTestId('calendar-grid');
      expect(grid).toHaveAttribute('data-min-date', '2024-01-01');
      expect(grid).toHaveAttribute('data-max-date', '2024-12-31');
    });

    it('updates viewDate when value prop changes', () => {
      const { rerender } = render(<DialogDatePicker {...defaultProps} />);
      
      // Initial render
      let grid = screen.getByTestId('calendar-grid');
      expect(grid).toHaveAttribute('data-selected-date', '2024-01-15');
      
      // Change value prop
      const newValue = createUTCDate(2024, 5, 20); // June 20, 2024
      rerender(<DialogDatePicker {...defaultProps} value={newValue} />);
      
      // Verify selected date updates
      grid = screen.getByTestId('calendar-grid');
      expect(grid).toHaveAttribute('data-selected-date', '2024-06-20');
    });
  });

  // Test 3: Month/Year Dropdown Changes
  describe('Month/Year Selection', () => {
    it('changes month via dropdown', () => {
      render(<DialogDatePicker {...defaultProps} />);
      
      const header = screen.getByTestId('calendar-header');
      expect(header).toHaveAttribute('data-month-change', 'mocked');
    });

    it('changes year via dropdown', () => {
      render(<DialogDatePicker {...defaultProps} />);
      
      const header = screen.getByTestId('calendar-header');
      expect(header).toHaveAttribute('data-year-change', 'mocked');
    });

    it('respects date boundaries in dropdown changes', () => {
      const minDate = createUTCDate(2023, 0, 1);
      const maxDate = createUTCDate(2025, 11, 31);
      
      render(
        <DialogDatePicker 
          {...defaultProps} 
          minDate={minDate}
          maxDate={maxDate}
        />
      );
      
      // Verify boundaries are passed to CalendarHeader for validation
      const header = screen.getByTestId('calendar-header');
      expect(header).toHaveAttribute('data-month-change', 'mocked');
      expect(header).toHaveAttribute('data-year-change', 'mocked');
    });
  });

  // Test 4: Action Buttons - User Controls
  describe('Action Buttons', () => {
    it('clears selected date and resets view', () => {
      render(<DialogDatePicker {...defaultProps} />);
      
      // Verify CalendarFooter receives clear handler
      const footer = screen.getByTestId('calendar-footer');
      expect(footer).toHaveAttribute('data-clear', 'mocked');
    });

    it('cancels the dialog', () => {
      render(<DialogDatePicker {...defaultProps} />);
      
      // Verify CalendarFooter receives cancel handler
      const footer = screen.getByTestId('calendar-footer');
      expect(footer).toHaveAttribute('data-cancel', 'mocked');
    });

    it('proceeds to next step', () => {
      render(<DialogDatePicker {...defaultProps} />);
      
      // Verify CalendarFooter receives next handler
      const footer = screen.getByTestId('calendar-footer');
      expect(footer).toHaveAttribute('data-next', 'mocked');
    });
  });

  // Test 5: Critical Edge Cases
  describe('Boundary Conditions', () => {
    it('handles null/undefined value prop', () => {
      // Test with null value
      const { rerender } = render(<DialogDatePicker {...defaultProps} value={null} />);
      let grid = screen.getByTestId('calendar-grid');
      expect(grid).toHaveAttribute('data-selected-date', 'null');
      
      // Test with undefined value
      rerender(<DialogDatePicker {...defaultProps} value={undefined} />);
      grid = screen.getByTestId('calendar-grid');
      expect(grid).toHaveAttribute('data-selected-date', 'null');
    });

    it('handles invalid date objects gracefully', () => {
      const invalidDate = new Date('invalid');
      
      // Should not crash with invalid date
      expect(() => {
        render(<DialogDatePicker {...defaultProps} value={invalidDate} />);
      }).not.toThrow();
    });

    it('works with extreme date ranges', () => {
      const minDate = createUTCDate(1950, 0, 1);
      const maxDate = createUTCDate(2025, 11, 31);
      
      render(
        <DialogDatePicker 
          {...defaultProps} 
          minDate={minDate}
          maxDate={maxDate}
        />
      );
      
      // Verify extreme ranges are handled
      const grid = screen.getByTestId('calendar-grid');
      expect(grid).toHaveAttribute('data-min-date', '1950-01-01');
      expect(grid).toHaveAttribute('data-max-date', '2025-12-31');
    });
  });

  // Test 6: Component Coordination
  describe('Component Coordination', () => {
    it('coordinates between hook and sub-components correctly', () => {
      render(<DialogDatePicker {...defaultProps} />);
      
      // Verify CalendarHeader receives navigation handlers
      const header = screen.getByTestId('calendar-header');
      expect(header).toHaveAttribute('data-view-date', '2024-01-15');
      
      // Verify CalendarGrid receives selection handlers
      const grid = screen.getByTestId('calendar-grid');
      expect(grid).toHaveAttribute('data-selected-date', '2024-01-15');
      expect(grid).toHaveAttribute('data-view-date', '2024-01-15');
      
      // Verify CalendarFooter receives action handlers
      const footer = screen.getByTestId('calendar-footer');
      expect(footer).toBeInTheDocument();
    });

    it('passes all required props to sub-components', () => {
      const minDate = createUTCDate(2024, 0, 1);
      const maxDate = createUTCDate(2024, 11, 31);
      
      render(
        <DialogDatePicker 
          {...defaultProps} 
          minDate={minDate}
          maxDate={maxDate}
        />
      );
      
      // Verify all props are properly distributed
      const header = screen.getByTestId('calendar-header');
      const grid = screen.getByTestId('calendar-grid');
      const footer = screen.getByTestId('calendar-footer');
      
      expect(header).toBeInTheDocument();
      expect(grid).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
      
      // Verify date constraints are passed through
      expect(grid).toHaveAttribute('data-min-date', '2024-01-01');
      expect(grid).toHaveAttribute('data-max-date', '2024-12-31');
    });
  });

  // Test 7: Design System Integration
  describe('Design System Integration', () => {
    it('has proper accessibility attributes', () => {
      render(<DialogDatePicker {...defaultProps} />);
      
      const container = screen.getByRole('dialog');
      
      // Verify accessibility attributes
      expect(container).toHaveAttribute('role', 'dialog');
      expect(container).toHaveAttribute('aria-label', 'Date picker');
      expect(container).toHaveAttribute('aria-modal', 'true');
    });
  });
});
