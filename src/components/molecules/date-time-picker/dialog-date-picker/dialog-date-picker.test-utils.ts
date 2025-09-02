import { vi, expect } from 'vitest';
import type { DialogDatePickerProps } from './dialog-date-picker';

// Helper to create UTC dates without timezone issues
const createUTCDate = (year: number, month: number, day: number): Date => {
  return new Date(Date.UTC(year, month, day));
};

// Test data constants
export const TEST_DATES = {
  JAN_15_2024: createUTCDate(2024, 0, 15),
  JUN_20_2024: createUTCDate(2024, 5, 20),
  DEC_31_2023: createUTCDate(2023, 11, 31),
  JAN_1_2025: createUTCDate(2025, 0, 1),
  MIN_DATE: createUTCDate(1950, 0, 1),
  MAX_DATE: createUTCDate(2025, 11, 31),
} as const;

// Default test props
export const createDefaultProps = (overrides: Partial<DialogDatePickerProps> = {}): DialogDatePickerProps => ({
  value: TEST_DATES.JAN_15_2024,
  onChange: vi.fn(),
  onCancel: vi.fn(),
  onNext: vi.fn(),
  onClear: vi.fn(),
  ...overrides,
});

// Helper to create date range props
export const createDateRangeProps = (
  minDate?: Date,
  maxDate?: Date
): Partial<DialogDatePickerProps> => ({
  minDate,
  maxDate,
});

// Helper to create action props
export const createActionProps = (
  onChange?: (date: Date | null) => void,
  onCancel?: () => void,
  onNext?: () => void,
  onClear?: () => void
): Partial<DialogDatePickerProps> => ({
  onChange,
  onCancel,
  onNext,
  onClear,
});

// Test scenarios
export const TEST_SCENARIOS = {
  // Basic functionality
  BASIC: createDefaultProps(),
  
  // With date constraints
  WITH_MIN_DATE: createDefaultProps(createDateRangeProps(TEST_DATES.MIN_DATE)),
  WITH_MAX_DATE: createDefaultProps(createDateRangeProps(undefined, TEST_DATES.MAX_DATE)),
  WITH_DATE_RANGE: createDefaultProps(createDateRangeProps(TEST_DATES.MIN_DATE, TEST_DATES.MAX_DATE)),
  
  // Edge cases
  NULL_VALUE: createDefaultProps({ value: null }),
  UNDEFINED_VALUE: createDefaultProps({ value: undefined }),
  INVALID_DATE: createDefaultProps({ value: new Date('invalid') }),
  
  // Custom callbacks
  CUSTOM_CALLBACKS: createDefaultProps(createActionProps(
    vi.fn(),
    vi.fn(),
    vi.fn(),
    vi.fn()
  )),
} as const;

// Assertion helpers
export const assertDateNavigationHandlers = (header: HTMLElement) => {
  expect(header).toHaveAttribute('data-prev-month', 'mocked');
  expect(header).toHaveAttribute('data-next-month', 'mocked');
  expect(header).toHaveAttribute('data-prev-year', 'mocked');
  expect(header).toHaveAttribute('data-next-year', 'mocked');
};

export const assertDateSelectionHandlers = (grid: HTMLElement) => {
  expect(grid).toHaveAttribute('data-date-select', 'mocked');
};

export const assertActionHandlers = (footer: HTMLElement) => {
  expect(footer).toHaveAttribute('data-clear', 'mocked');
  expect(footer).toHaveAttribute('data-cancel', 'mocked');
  expect(footer).toHaveAttribute('data-next', 'mocked');
};

export const assertDateBoundaries = (
  grid: HTMLElement,
  expectedMinDate?: string,
  expectedMaxDate?: string
) => {
  if (expectedMinDate) {
    expect(grid).toHaveAttribute('data-min-date', expectedMinDate);
  }
  if (expectedMaxDate) {
    expect(grid).toHaveAttribute('data-max-date', expectedMaxDate);
  }
};

// Mock cleanup helper
export const resetMocks = () => {
  vi.clearAllMocks();
};

// Date formatting helper for tests
export const formatDateForTest = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Invalid date helper
export const createInvalidDate = (): Date => {
  return new Date('invalid');
};
