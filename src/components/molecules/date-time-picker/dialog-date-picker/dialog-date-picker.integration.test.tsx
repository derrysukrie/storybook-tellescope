import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { DialogDatePicker } from './dialog-date-picker';
import { TEST_DATES, createDefaultProps, formatDateForTest } from './dialog-date-picker.test-utils';

// Helper to create UTC dates without timezone issues
const createUTCDate = (year: number, month: number, day: number): Date => {
  return new Date(Date.UTC(year, month, day));
};

// Mock only the sub-components, not the hook
vi.mock('./calendar-header', () => ({
  CalendarHeader: ({ viewDate, onPrevMonth, onNextMonth, onPrevYear, onNextYear, onMonthChange, onYearChange, ...props }: any) => (
    <div data-testid="calendar-header">
      <button 
        data-testid="prev-month-btn" 
        onClick={onPrevMonth}
        aria-label="Previous month"
      >
        ←
      </button>
      <span data-testid="current-month-year">
        {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </span>
      <button 
        data-testid="next-month-btn" 
        onClick={onNextMonth}
        aria-label="Next month"
      >
        →
      </button>
      <button 
        data-testid="prev-year-btn" 
        onClick={onPrevYear}
        aria-label="Previous year"
      >
        ←←
      </button>
      <button 
        data-testid="next-year-btn" 
        onClick={onNextYear}
        aria-label="Next year"
      >
        →→
      </button>
      <select 
        data-testid="month-select" 
        onChange={onMonthChange}
        value={viewDate.getMonth()}
      >
        <option value={0}>January</option>
        <option value={1}>February</option>
        <option value={2}>March</option>
        <option value={3}>April</option>
        <option value={4}>May</option>
        <option value={5}>June</option>
        <option value={6}>July</option>
        <option value={7}>August</option>
        <option value={8}>September</option>
        <option value={9}>October</option>
        <option value={10}>November</option>
        <option value={11}>December</option>
      </select>
      <select 
        data-testid="year-select" 
        onChange={onYearChange}
        value={viewDate.getFullYear()}
      >
        {Array.from({ length: 76 }, (_, i) => 1950 + i).map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  ),
}));

vi.mock('./calendar-grid', () => ({
  CalendarGrid: ({ viewDate, selectedDate, onDateSelect, minDate, maxDate, ...props }: any) => (
    <div data-testid="calendar-grid">
      <div data-testid="grid-info">
        <span data-testid="view-date">{formatDateForTest(viewDate)}</span>
        <span data-testid="selected-date">{selectedDate ? formatDateForTest(selectedDate) : 'null'}</span>
        <span data-testid="min-date">{minDate ? formatDateForTest(minDate) : 'undefined'}</span>
        <span data-testid="max-date">{maxDate ? formatDateForTest(maxDate) : 'undefined'}</span>
      </div>
      <button 
        data-testid="select-date-btn" 
        onClick={() => onDateSelect(createUTCDate(2024, 0, 20))}
        aria-label="Select date"
      >
        Select Date
      </button>
    </div>
  ),
}));

vi.mock('./calendar-footer', () => ({
  CalendarFooter: ({ onClear, onCancel, onNext, ...props }: any) => (
    <div data-testid="calendar-footer">
      <button data-testid="clear-btn" onClick={onClear}>
        Clear
      </button>
      <button data-testid="cancel-btn" onClick={onCancel}>
        Cancel
      </button>
      <button data-testid="next-btn" onClick={onNext}>
        Next
      </button>
    </div>
  ),
}));

describe('DialogDatePicker - Integration Tests (Core Functionality)', () => {
  const defaultProps = createDefaultProps();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Real Hook Integration - Date Navigation
  describe('Real Hook Integration - Date Navigation', () => {
    it('navigates months using real hook logic', async () => {
      render(<DialogDatePicker {...defaultProps} />);
      
      // Get navigation buttons
      const prevMonthBtn = screen.getByTestId('prev-month-btn');
      const nextMonthBtn = screen.getByTestId('next-month-btn');
      const currentMonthYear = screen.getByTestId('current-month-year');
      
      // Initial state should be January 2024
      expect(currentMonthYear).toHaveTextContent('January 2024');
      
      // Navigate to next month
      fireEvent.click(nextMonthBtn);
      expect(currentMonthYear).toHaveTextContent('February 2024');
      
      // Navigate to previous month
      fireEvent.click(prevMonthBtn);
      expect(currentMonthYear).toHaveTextContent('January 2024');
    });

    it('navigates years using real hook logic', async () => {
      render(<DialogDatePicker {...defaultProps} />);
      
      const prevYearBtn = screen.getByTestId('prev-year-btn');
      const nextYearBtn = screen.getByTestId('next-year-btn');
      const currentMonthYear = screen.getByTestId('current-month-year');
      
      // Initial state should be January 2024
      expect(currentMonthYear).toHaveTextContent('January 2024');
      
      // Navigate to next year
      fireEvent.click(nextYearBtn);
      expect(currentMonthYear).toHaveTextContent('January 2025');
      
      // Navigate to previous year
      fireEvent.click(prevYearBtn);
      expect(currentMonthYear).toHaveTextContent('January 2024');
    });

    it('changes month via dropdown using real hook logic', async () => {
      render(<DialogDatePicker {...defaultProps} />);
      
      const monthSelect = screen.getByTestId('month-select');
      const currentMonthYear = screen.getByTestId('current-month-year');
      
      // Initial state should be January 2024
      expect(currentMonthYear).toHaveTextContent('January 2024');
      
      // Change to June
      fireEvent.change(monthSelect, { target: { value: '5' } });
      expect(currentMonthYear).toHaveTextContent('June 2024');
    });

    it('changes year via dropdown using real hook logic', async () => {
      render(<DialogDatePicker {...defaultProps} />);
      
      const yearSelect = screen.getByTestId('year-select');
      const currentMonthYear = screen.getByTestId('current-month-year');
      
      // Initial state should be January 2024
      expect(currentMonthYear).toHaveTextContent('January 2024');
      
      // Change to 2023
      fireEvent.change(yearSelect, { target: { value: '2023' } });
      expect(currentMonthYear).toHaveTextContent('January 2023');
    });
  });

  // Test 2: Real Hook Integration - Date Selection
  describe('Real Hook Integration - Date Selection', () => {
    it('selects a date and calls onChange', async () => {
      const onChange = vi.fn();
      render(<DialogDatePicker {...defaultProps} onChange={onChange} />);
      
      const selectDateBtn = screen.getByTestId('select-date-btn');
      
      // Click select date button
      fireEvent.click(selectDateBtn);
      
      // Verify onChange was called with the selected date
      expect(onChange).toHaveBeenCalledWith(createUTCDate(2024, 0, 20));
    });

    it('updates view when value prop changes', async () => {
      const { rerender } = render(<DialogDatePicker {...defaultProps} />);
      
      // Initial selected date should be January 15, 2024
      let selectedDate = screen.getByTestId('selected-date');
      expect(selectedDate).toHaveTextContent('2024-01-15');
      
      // Change value prop to June 20, 2024
      rerender(<DialogDatePicker {...defaultProps} value={TEST_DATES.JUN_20_2024} />);
      
      // Selected date should update
      selectedDate = screen.getByTestId('selected-date');
      expect(selectedDate).toHaveTextContent('2024-06-20');
    });
  });

  // Test 3: Real Hook Integration - Action Buttons
  describe('Real Hook Integration - Action Buttons', () => {
    it('clears selected date and resets view', async () => {
      const onChange = vi.fn();
      const onClear = vi.fn();
      render(<DialogDatePicker {...defaultProps} onChange={onChange} onClear={onClear} />);
      
      const clearBtn = screen.getByTestId('clear-btn');
      
      // Click clear button
      fireEvent.click(clearBtn);
      
      // Verify both callbacks are called
      expect(onChange).toHaveBeenCalledWith(null);
      expect(onClear).toHaveBeenCalled();
    });

    it('cancels the dialog', async () => {
      const onCancel = vi.fn();
      render(<DialogDatePicker {...defaultProps} onCancel={onCancel} />);
      
      const cancelBtn = screen.getByTestId('cancel-btn');
      
      // Click cancel button
      fireEvent.click(cancelBtn);
      
      // Verify onCancel was called
      expect(onCancel).toHaveBeenCalled();
    });

    it('proceeds to next step', async () => {
      const onNext = vi.fn();
      render(<DialogDatePicker {...defaultProps} onNext={onNext} />);
      
      const nextBtn = screen.getByTestId('next-btn');
      
      // Click next button
      fireEvent.click(nextBtn);
      
      // Verify onNext was called
      expect(onNext).toHaveBeenCalled();
    });
  });

  // Test 4: Real Hook Integration - Date Boundaries
  describe('Real Hook Integration - Date Boundaries', () => {
    it('respects min date constraint', async () => {
      const minDate = createUTCDate(2024, 0, 1);
      render(<DialogDatePicker {...defaultProps} minDate={minDate} />);
      
      const minDateSpan = screen.getByTestId('min-date');
      expect(minDateSpan).toHaveTextContent('2024-01-01');
      
      // Try to navigate to previous year (should be constrained)
      const prevYearBtn = screen.getByTestId('prev-year-btn');
      const currentMonthYear = screen.getByTestId('current-month-year');
      
      // Initial state
      expect(currentMonthYear).toHaveTextContent('January 2024');
      
      // Try to go to 2023 (should be blocked by minDate)
      fireEvent.click(prevYearBtn);
      expect(currentMonthYear).toHaveTextContent('January 2024'); // Should not change
    });

    it('respects max date constraint', async () => {
      const maxDate = createUTCDate(2024, 11, 31);
      render(<DialogDatePicker {...defaultProps} maxDate={maxDate} />);
      
      const maxDateSpan = screen.getByTestId('max-date');
      expect(maxDateSpan).toHaveTextContent('2024-12-31');
      
      // Try to navigate to next year (should be constrained)
      const nextYearBtn = screen.getByTestId('next-year-btn');
      const currentMonthYear = screen.getByTestId('current-month-year');
      
      // Initial state
      expect(currentMonthYear).toHaveTextContent('January 2024');
      
      // Try to go to 2025 (should be blocked by maxDate)
      fireEvent.click(nextYearBtn);
      expect(currentMonthYear).toHaveTextContent('January 2024'); // Should not change
    });
  });

  // Test 5: Real Hook Integration - Edge Cases
  describe('Real Hook Integration - Edge Cases', () => {
    it('handles null value prop correctly', async () => {
      render(<DialogDatePicker {...defaultProps} value={null} />);
      
      const selectedDate = screen.getByTestId('selected-date');
      expect(selectedDate).toHaveTextContent('null');
      
      // Component should still be functional
      const nextMonthBtn = screen.getByTestId('next-month-btn');
      fireEvent.click(nextMonthBtn);
      
      const currentMonthYear = screen.getByTestId('current-month-year');
      expect(currentMonthYear).toHaveTextContent('February 2024');
    });

    it('handles undefined value prop correctly', async () => {
      render(<DialogDatePicker {...defaultProps} value={undefined} />);
      
      const selectedDate = screen.getByTestId('selected-date');
      expect(selectedDate).toHaveTextContent('null');
      
      // Component should still be functional
      const prevMonthBtn = screen.getByTestId('prev-month-btn');
      fireEvent.click(prevMonthBtn);
      
      const currentMonthYear = screen.getByTestId('current-month-year');
      expect(currentMonthYear).toHaveTextContent('December 2023');
    });
  });
});
