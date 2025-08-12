import { useMemo, useState, forwardRef } from 'react';
import {
    Box,
    Typography,
    Grid,
    Stack,
    MenuItem
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { IconButton } from '../../../atoms/button/icon-button';
import Select from '../../../atoms/select/select';
import { Button } from '../../../atoms/button/button';

// Design system constants
const DESIGN_TOKENS = {
    borderRadius: 4,
    padding: 2,
    width: 360,
    borderColor: '#0000001F',
    backgroundColor: 'white',
    gap: '8px',
    daySize: 36,
    fontSize: '0.85rem',
    fontWeight: 500,
    todayBorderColor: '#0000008F',
    disabledColor: 'grey.400',
    textPrimary: 'text.primary',
    primaryMain: 'primary.main'
} as const;

// Date range configuration
const DATE_RANGE = {
    minYear: 1950,
    maxYear: 2025,
    yearCount: 76
} as const;

// Weekday labels
const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Generate months array
const MONTHS = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString('default', { month: 'short' })
);

// Generate years array
const YEARS = Array.from({ length: DATE_RANGE.yearCount }, (_, i) => 
    DATE_RANGE.minYear + i
);

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

// Utility functions
const isSameDay = (d1: Date, d2: Date): boolean =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

const isDateDisabled = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
};

const isDateInRange = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
    if (minDate && date < minDate) return false;
    if (maxDate && date > maxDate) return false;
    return true;
};

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
        // Internal state for view management
        const [viewDate, setViewDate] = useState(() => {
            // Start with selected date, today, or minDate
            if (value) return new Date(value);
            if (minDate) return new Date(minDate);
            return new Date();
        });

        const today = new Date();

        // Memoized calendar days calculation
        const days = useMemo(() => {
            const result: Date[] = [];
            const year = viewDate.getFullYear();
            const month = viewDate.getMonth();

            const startOfMonth = new Date(year, month, 1);
            const endOfMonth = new Date(year, month + 1, 0);
            const daysInMonth = endOfMonth.getDate();
            const startDay = startOfMonth.getDay(); // Sunday = 0

            // Previous month days to fill first row
            if (startDay > 0) {
                const prevMonthEnd = new Date(year, month, 0);
                const prevMonthDays = prevMonthEnd.getDate();
                for (let i = startDay - 1; i >= 0; i--) {
                    result.push(new Date(year, month - 1, prevMonthDays - i));
                }
            }

            // Current month days
            for (let i = 1; i <= daysInMonth; i++) {
                result.push(new Date(year, month, i));
            }

            // Next month days to complete last row
            const remaining = 7 - (result.length % 7);
            if (remaining < 7) {
                for (let i = 1; i <= remaining; i++) {
                    result.push(new Date(year, month + 1, i));
                }
            }

            return result;
        }, [viewDate]);

        // Navigation handlers with proper bounds checking
        const handlePrevMonth = () => {
            if (disabled) return;
            
            setViewDate(prev => {
                const newDate = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
                const effectiveMinDate = minDate || new Date(DATE_RANGE.minYear, 0, 1);
                
                if (newDate < effectiveMinDate) {
                    return prev; // Prevent going beyond min date
                }
                return newDate;
            });
        };

        const handleNextMonth = () => {
            if (disabled) return;
            
            setViewDate(prev => {
                const newDate = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
                const effectiveMaxDate = maxDate || new Date(DATE_RANGE.maxYear, 11, 31);
                
                if (newDate > effectiveMaxDate) {
                    return prev; // Prevent going beyond max date
                }
                return newDate;
            });
        };

        const handlePrevYear = () => {
            if (disabled) return;
            
            setViewDate(prev => {
                const newDate = new Date(prev.getFullYear() - 1, prev.getMonth(), 1);
                const effectiveMinDate = minDate || new Date(DATE_RANGE.minYear, 0, 1);
                
                if (newDate < effectiveMinDate) {
                    return prev; // Prevent going beyond min date
                }
                return newDate;
            });
        };

        const handleNextYear = () => {
            if (disabled) return;
            
            setViewDate(prev => {
                const newDate = new Date(prev.getFullYear() + 1, prev.getMonth(), 1);
                const effectiveMaxDate = maxDate || new Date(DATE_RANGE.maxYear, 11, 31);
                
                if (newDate > effectiveMaxDate) {
                    return prev; // Prevent going beyond max date
                }
                return newDate;
            });
        };

        // Select change handlers with proper type handling
        const handleMonthChange = (event: SelectChangeEvent<string | string[]>) => {
            if (disabled) return;
            
            const value = Array.isArray(event.target.value) ? event.target.value[0] : event.target.value;
            const monthIndex = parseInt(value, 10);
            
            setViewDate(prev => {
                const newDate = new Date(prev.getFullYear(), monthIndex, 1);
                const effectiveMinDate = minDate || new Date(DATE_RANGE.minYear, 0, 1);
                const effectiveMaxDate = maxDate || new Date(DATE_RANGE.maxYear, 11, 31);
                
                if (newDate < effectiveMinDate || newDate > effectiveMaxDate) {
                    return prev; // Keep current view if out of range
                }
                return newDate;
            });
        };

        const handleYearChange = (event: SelectChangeEvent<string | string[]>) => {
            if (disabled) return;
            
            const value = Array.isArray(event.target.value) ? event.target.value[0] : event.target.value;
            const year = parseInt(value, 10);
            
            setViewDate(prev => {
                const newDate = new Date(year, prev.getMonth(), 1);
                const effectiveMinDate = minDate || new Date(DATE_RANGE.minYear, 0, 1);
                const effectiveMaxDate = maxDate || new Date(DATE_RANGE.maxYear, 11, 31);
                
                if (newDate < effectiveMinDate || newDate > effectiveMaxDate) {
                    return prev; // Keep current view if out of range
                }
                return newDate;
            });
        };

        // Date selection handler
        const handleDateSelect = (date: Date) => {
            if (disabled) return;
            if (!isDateInRange(date, minDate, maxDate)) return;
            
            onChange?.(date);
        };

        // Clear handler
        const handleClear = () => {
            if (disabled) return;
            
            onChange?.(null);
            onClear?.();
            
            // Reset view to today or min date
            const resetDate = minDate ? new Date(minDate) : new Date();
            setViewDate(resetDate);
        };

        // Cancel handler
        const handleCancel = () => {
            if (disabled) return;
            onCancel?.();
        };

        // Next handler
        const handleNext = () => {
            if (disabled) return;
            onNext?.();
        };

        return (
            <Box
                ref={ref}
                className={className}
                sx={{
                    borderRadius: DESIGN_TOKENS.borderRadius,
                    p: DESIGN_TOKENS.padding,
                    width: DESIGN_TOKENS.width,
                    border: `1px solid ${DESIGN_TOKENS.borderColor}`,
                    backgroundColor: DESIGN_TOKENS.backgroundColor,
                    ...sx
                }}
                role="dialog"
                aria-label="Date picker"
                aria-modal="true"
                {...props}
            >
                {/* Header with Month & Year Select */}
                <Stack sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: DESIGN_TOKENS.gap
                    }}>
                        <IconButton 
                            onClick={handlePrevMonth} 
                            size="small" 
                            color="default"
                            disabled={disabled}
                            aria-label="Previous month"
                        >
                            <ChevronLeft />
                        </IconButton>
                        <Box display="flex" gap={1} alignItems="center">
                            <Select
                                hiddenLabel
                                size="small"
                                value={viewDate.getMonth().toString()}
                                onChange={handleMonthChange}
                                appearance="standard"
                                disableUnderline
                                disabled={disabled}
                                aria-label="Select month"
                            >
                                {MONTHS.map((month, index) => (
                                    <MenuItem key={month} value={index.toString()}>
                                        {month}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <IconButton 
                            onClick={handleNextMonth} 
                            size="small" 
                            color="default"
                            disabled={disabled}
                            aria-label="Next month"
                        >
                            <ChevronRight />
                        </IconButton>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: DESIGN_TOKENS.gap
                    }}>
                        <IconButton 
                            onClick={handlePrevYear} 
                            size="small" 
                            color="default"
                            disabled={disabled}
                            aria-label="Previous year"
                        >
                            <ChevronLeft />
                        </IconButton>
                        <Box display="flex" gap={1} alignItems="center">
                            <Select
                                hiddenLabel
                                size="small"
                                value={viewDate.getFullYear().toString()}
                                onChange={handleYearChange}
                                appearance="standard"
                                disableUnderline
                                disabled={disabled}
                                aria-label="Select year"
                            >
                                {YEARS.map(year => (
                                    <MenuItem key={year} value={year.toString()}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <IconButton 
                            onClick={handleNextYear} 
                            size="small" 
                            color="default"
                            disabled={disabled}
                            aria-label="Next year"
                        >
                            <ChevronRight />
                        </IconButton>
                    </Box>
                </Stack>

                {/* Weekdays */}
                <Grid container spacing={1} mb={1} role="rowgroup" aria-label="Week days">
                    {DAYS_OF_WEEK.map((day, index) => (
                        <Grid item xs={12 / 7} key={day}>
                            <Typography 
                                align="center" 
                                fontWeight={DESIGN_TOKENS.fontWeight} 
                                fontSize={DESIGN_TOKENS.fontSize}
                                role="columnheader"
                                aria-label={day}
                            >
                                {day}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>

                {/* Calendar Days */}
                <Grid container spacing={1} role="grid" aria-label="Calendar">
                    {days.map((day, index) => {
                        const isToday = isSameDay(day, today);
                        const isSelected = value && isSameDay(day, value);
                        const isInCurrentMonth = day.getMonth() === viewDate.getMonth();
                        const isDisabled = disabled || isDateDisabled(day, minDate, maxDate);

                        return (
                            <Grid item xs={12 / 7} key={index}>
                                <Box
                                    onClick={() => handleDateSelect(day)}
                                    sx={{
                                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                                        width: DESIGN_TOKENS.daySize,
                                        height: DESIGN_TOKENS.daySize,
                                        mx: 'auto',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bgcolor: isSelected ? DESIGN_TOKENS.primaryMain : 'transparent',
                                        color: isSelected
                                            ? 'white'
                                            : isToday
                                                ? 'black'
                                                : isInCurrentMonth
                                                    ? DESIGN_TOKENS.textPrimary
                                                    : DESIGN_TOKENS.disabledColor,
                                        border: isToday && !isSelected ? '1px solid' : 'none',
                                        borderColor: isToday && !isSelected ? DESIGN_TOKENS.todayBorderColor : undefined,
                                        opacity: isDisabled ? 0.5 : 1,
                                        pointerEvents: isDisabled ? 'none' : 'auto',
                                    }}
                                                                         role="gridcell"
                                     aria-label={`${day.toLocaleDateString()}, ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                                     aria-selected={isSelected || undefined}
                                     tabIndex={isDisabled ? -1 : 0}
                                >
                                    {day.getDate()}
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>

                {/* Footer */}
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button 
                        appearance="text" 
                        color="primary" 
                        onClick={handleClear}
                        disabled={disabled}
                        aria-label="Clear selected date"
                    >
                        CLEAR
                    </Button>
                    <Stack sx={{
                        flexDirection: "row",
                        gap: 1,
                        justifyContent: "flex-end",
                    }}>
                        <Button 
                            appearance="text" 
                            color="primary"
                            onClick={handleCancel}
                            disabled={disabled}
                            aria-label="Cancel date selection"
                        >
                            CANCEL
                        </Button>
                        <Button 
                            appearance="text" 
                            color="primary"
                            onClick={handleNext}
                            disabled={disabled}
                            aria-label="Confirm date selection"
                        >
                            NEXT
                        </Button>
                    </Stack>
                </Box>
            </Box>
        );
    }
);

DialogDatePicker.displayName = 'DialogDatePicker';

export default DialogDatePicker;
