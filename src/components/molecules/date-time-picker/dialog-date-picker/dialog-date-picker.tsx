import  { forwardRef, useMemo } from 'react';
import { Box } from '@mui/material';
import { CalendarHeader } from './calendar-header';
import { CalendarGrid } from './calendar-grid';
import { CalendarFooter } from './calendar-footer';
import { useDatePicker } from './use-date-picker';

// Design system constants
const DESIGN_TOKENS = {
    borderRadius: 4,
    padding: 2,
    width: 360,
    borderColor: '#0000001F',
    backgroundColor: 'white'
} as const;

// Helper to check if date is valid
const isValidDate = (date: Date | null | undefined): boolean => {
    return date instanceof Date && !isNaN(date.getTime());
};

// Props interface for proper API design
export interface DialogDatePickerProps {
    /** The currently selected date */
    value?: Date | null;
    /** Callback fired when a date is selected */
    onChange?: (date: Date | null) => void;
    /** Minimum selectable date */
    minDate?: Date;
    /** Maximum selectable date */
    maxDate?: Date;
    /** Whether the date picker is disabled */
    /** Callback fired when the dialog is cancelled */
    onCancel?: () => void;
    /** Callback fired when the next action is triggered */
    onNext?: () => void;
    /** Callback fired when the clear action is triggered */
    onClear?: () => void;
}

export const DialogDatePicker = forwardRef<HTMLDivElement, DialogDatePickerProps>(
    ({
        value = null,
        onChange,
        minDate,
        maxDate,
        onCancel,
        onNext,
        onClear,
        ...props
    }, ref) => {
        // Validate and sanitize dates
        const validValue = value && isValidDate(value) ? value : null;
        const validMinDate = minDate && isValidDate(minDate) ? minDate : undefined;
        const validMaxDate = maxDate && isValidDate(maxDate) ? maxDate : undefined;

        // Use custom hook for all date picker logic
        const {
            viewDate,
            handlePrevMonth,
            handleNextMonth,
            handlePrevYear,
            handleNextYear,
            handleMonthChange,
            handleYearChange,
            handleDateSelect,
            handleClear,
            handleCancel,
            handleNext
        } = useDatePicker({
            value: validValue,
            onChange,
            minDate: validMinDate,
            maxDate: validMaxDate,
            onCancel,
            onNext,
            onClear
        });

        // Memoized container styles
        const containerStyles = useMemo(() => ({
            borderRadius: `${DESIGN_TOKENS.borderRadius}px`,
            p: DESIGN_TOKENS.padding,
            width: DESIGN_TOKENS.width,
            border: `1px solid ${DESIGN_TOKENS.borderColor}`,
            backgroundColor: DESIGN_TOKENS.backgroundColor,
        }), []);

        return (
            <Box
                ref={ref}
                sx={containerStyles}
                role="dialog"
                aria-label="Date picker"
                aria-modal="true"
                {...props}
            >
                <CalendarHeader
                    viewDate={viewDate}
                    onPrevMonth={handlePrevMonth}
                    onNextMonth={handleNextMonth}
                    onPrevYear={handlePrevYear}
                    onNextYear={handleNextYear}
                    onMonthChange={handleMonthChange}
                    onYearChange={handleYearChange}
                />

                <CalendarGrid
                    viewDate={viewDate}
                    selectedDate={validValue}
                    onDateSelect={handleDateSelect}
                    minDate={validMinDate}
                    maxDate={validMaxDate}
                />

                <CalendarFooter
                    onClear={handleClear}
                    onCancel={handleCancel}
                    onNext={handleNext}
                />
            </Box>
        );
    }
);

DialogDatePicker.displayName = 'DialogDatePicker';

export default DialogDatePicker;
