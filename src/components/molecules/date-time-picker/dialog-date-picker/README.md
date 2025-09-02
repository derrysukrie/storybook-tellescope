# DialogDatePicker Component Testing

This document outlines the comprehensive testing strategy for the `DialogDatePicker` component, focusing on **core functionality first**.

## Testing Philosophy

We follow a **functionality-first** approach:
1. **Core Functionality** - Test the essential date picker behavior
2. **Critical Edge Cases** - Test boundary conditions and error handling
3. **Integration Points** - Test how components work together
4. **Design System** - Test styling and accessibility (lower priority)

## Test Files Structure

```
dialog-date-picker/
├── dialog-date-picker.test.tsx          # Unit tests with mocked hook
├── dialog-date-picker.integration.test.tsx  # Integration tests with real hook
├── dialog-date-picker.test-utils.ts     # Test utilities and helpers
└── README.md                            # This file
```

## Test Categories

### 1. **Unit Tests** (`dialog-date-picker.test.tsx`)
- **Purpose**: Test component behavior in isolation
- **Strategy**: Mock the `useDatePicker` hook completely
- **Focus**: Component coordination, prop passing, sub-component integration
- **Use Case**: Fast feedback during development, testing component logic

### 2. **Integration Tests** (`dialog-date-picker.integration.test.tsx`)
- **Purpose**: Test real hook integration and actual behavior
- **Strategy**: Mock only sub-components, use real hook logic
- **Focus**: Real date navigation, selection, and boundary logic
- **Use Case**: Verify the complete feature works end-to-end

### 3. **Test Utilities** (`dialog-date-picker.test-utils.ts`)
- **Purpose**: Shared test helpers and constants
- **Includes**: Test data, assertion helpers, render functions
- **Benefits**: Consistent testing patterns, easier maintenance

## Core Functionality Tests

### **Priority 1: Date Navigation (The Heart)**
```tsx
describe('Date Navigation', () => {
  it('navigates to previous month correctly', () => {
    // Test handlePrevMonth - should go back one month
  });

  it('navigates to next month correctly', () => {
    // Test handleNextMonth - should go forward one month
  });

  it('navigates to previous year correctly', () => {
    // Test handlePrevYear - should go back one year
  });

  it('navigates to next year correctly', () => {
    // Test handleNextYear - should go forward one year
  });

  it('respects min/max date boundaries', () => {
    // Test navigation stops at boundaries
  });
});
```

### **Priority 2: Date Selection (User's Primary Action)**
```tsx
describe('Date Selection', () => {
  it('selects a valid date and calls onChange', () => {
    // Test date selection flow
  });

  it('rejects dates outside min/max range', () => {
    // Test boundary enforcement
  });

  it('updates viewDate when value prop changes', () => {
    // Test controlled behavior
  });
});
```

### **Priority 3: Month/Year Dropdown Changes**
```tsx
describe('Month/Year Selection', () => {
  it('changes month via dropdown', () => {
    // Test month selection
  });

  it('changes year via dropdown', () => {
    // Test year selection
  });

  it('respects date boundaries in dropdown changes', () => {
    // Test boundary validation
  });
});
```

### **Priority 4: Action Buttons (User Controls)**
```tsx
describe('Action Buttons', () => {
  it('clears selected date and resets view', () => {
    // Test clear functionality
  });

  it('cancels the dialog', () => {
    // Test cancel functionality
  });

  it('proceeds to next step', () => {
    // Test next functionality
  });
});
```

## Running the Tests

### **Run All Tests**
```bash
npm test dialog-date-picker
```

### **Run Unit Tests Only**
```bash
npm test dialog-date-picker.test.tsx
```

### **Run Integration Tests Only**
```bash
npm test dialog-date-picker.integration.test.tsx
```

### **Run with Coverage**
```bash
npm test -- --coverage --collectCoverageFrom="**/dialog-date-picker/**/*.{ts,tsx}"
```

## Test Data and Constants

### **Test Dates**
```tsx
export const TEST_DATES = {
  JAN_15_2024: new Date(2024, 0, 15),
  JUN_20_2024: new Date(2024, 5, 20),
  DEC_31_2023: new Date(2023, 11, 31),
  JAN_1_2025: new Date(2025, 0, 1),
  MIN_DATE: new Date(1950, 0, 1),
  MAX_DATE: new Date(2025, 11, 31),
} as const;
```

### **Test Scenarios**
```tsx
export const TEST_SCENARIOS = {
  BASIC: createDefaultProps(),
  WITH_MIN_DATE: createDefaultProps(createDateRangeProps(TEST_DATES.MIN_DATE)),
  WITH_MAX_DATE: createDefaultProps(createDateRangeProps(undefined, TEST_DATES.MAX_DATE)),
  NULL_VALUE: createDefaultProps({ value: null }),
  UNDEFINED_VALUE: createDefaultProps({ value: undefined }),
} as const;
```

## Mocking Strategy

### **Unit Tests: Mock Everything**
```tsx
// Mock the entire hook
vi.mock('./use-date-picker', () => ({
  useDatePicker: () => mockUseDatePicker,
}));

// Mock sub-components
vi.mock('./calendar-header', () => ({
  CalendarHeader: ({ children, ...props }) => (
    <div data-testid="calendar-header" {...props}>
      {children}
    </div>
  ),
}));
```

### **Integration Tests: Mock Only Sub-components**
```tsx
// Don't mock the hook - test real logic
// Mock only sub-components for controlled testing
vi.mock('./calendar-header', () => ({
  CalendarHeader: ({ viewDate, onPrevMonth, ...props }) => (
    <div data-testid="calendar-header">
      <button onClick={onPrevMonth}>←</button>
      <span>{viewDate.toLocaleDateString()}</span>
    </div>
  ),
}));
```

## Assertion Helpers

### **Navigation Handlers**
```tsx
export const assertDateNavigationHandlers = (header: HTMLElement) => {
  expect(header).toHaveAttribute('data-prev-month', 'mocked');
  expect(header).toHaveAttribute('data-next-month', 'mocked');
  expect(header).toHaveAttribute('data-prev-year', 'mocked');
  expect(header).toHaveAttribute('data-next-year', 'mocked');
};
```

### **Date Boundaries**
```tsx
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
```

## Testing Best Practices

### **1. Test the Component's Role as Coordinator**
- Verify props are passed correctly to sub-components
- Test that event handlers are properly connected
- Ensure the component orchestrates between hook and UI

### **2. Focus on Data Flow**
- Test that date changes propagate correctly
- Verify boundary constraints are enforced
- Test that user actions trigger appropriate callbacks

### **3. Use Descriptive Test Names**
```tsx
// Good
it('navigates to previous month and updates view correctly', () => {});

// Avoid
it('works', () => {});
```

### **4. Test Edge Cases**
- Null/undefined values
- Invalid dates
- Extreme date ranges
- Boundary conditions

### **5. Keep Tests Fast and Isolated**
- Use `beforeEach` to reset mocks
- Avoid complex setup in individual tests
- Mock external dependencies

## Debugging Tests

### **Common Issues**

1. **Mock Not Working**
   ```tsx
   // Ensure mock is at the top of the file
   vi.mock('./use-date-picker');
   ```

2. **Date Comparison Issues**
   ```tsx
   // Use formatDateForTest helper for consistent date formatting
   expect(element).toHaveTextContent(formatDateForTest(expectedDate));
   ```

3. **Async Test Issues**
   ```tsx
   // Use async/await for tests that involve state changes
   it('updates view after navigation', async () => {
     // ... test code
   });
   ```

### **Debug Commands**
```bash
# Run tests in watch mode
npm test -- --watch

# Run tests with verbose output
npm test -- --verbose

# Run specific test file
npm test -- dialog-date-picker.test.tsx --verbose
```

## Coverage Goals

- **Statements**: 90%+
- **Branches**: 85%+
- **Functions**: 95%+
- **Lines**: 90%+

## Future Enhancements

1. **Visual Regression Tests** - Test design system consistency
2. **Accessibility Tests** - Test keyboard navigation and screen readers
3. **Performance Tests** - Test with large date ranges
4. **Cross-browser Tests** - Test in different environments

## Contributing

When adding new tests:
1. Follow the existing test structure
2. Use the provided test utilities
3. Focus on functionality first
4. Add integration tests for new features
5. Update this README if needed

Remember: **Test the behavior, not the implementation details!**
