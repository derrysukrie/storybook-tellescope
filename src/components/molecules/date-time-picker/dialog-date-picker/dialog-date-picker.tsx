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
    disabled?: boolean;
    /** Callback fired when the dialog is cancelled */
    onCancel?: () => void;
    /** Callback fired when the next action is triggered */
    onNext?: () => void;
    /** Callback fired when the clear action is triggered */
    onClear?: () => void;
    /** Custom class name */
    className?: string;
    /** Custom styles */
    sx?: any;
}

export const DialogDatePicker = forwardRef<HTMLDivElement, DialogDatePickerProps>(
    ({
        value = null,
        onChange,
        minDate,
        maxDate,
        disabled = false,
        onCancel,
        onNext,
        onClear,
        className,
        sx,
        ...props
    }, ref) => {
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
            value,
            onChange,
            minDate,
            maxDate,
            disabled,
            onCancel,
            onNext,
            onClear
        });

        // Memoized container styles
        const containerStyles = useMemo(() => ({
            borderRadius: DESIGN_TOKENS.borderRadius,
            p: DESIGN_TOKENS.padding,
            width: DESIGN_TOKENS.width,
            border: `1px solid ${DESIGN_TOKENS.borderColor}`,
            backgroundColor: DESIGN_TOKENS.backgroundColor,
            ...sx
        }), [sx]);

        return (
            <Box
                ref={ref}
                className={className}
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
                    disabled={disabled}
                />

                <CalendarGrid
                    viewDate={viewDate}
                    selectedDate={value}
                    onDateSelect={handleDateSelect}
                    minDate={minDate}
                    maxDate={maxDate}
                    disabled={disabled}
                />

                <CalendarFooter
                    onClear={handleClear}
                    onCancel={handleCancel}
                    onNext={handleNext}
                    disabled={disabled}
                />
            </Box>
        );
    }
);

DialogDatePicker.displayName = 'DialogDatePicker';

export default DialogDatePicker;
