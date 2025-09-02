import { useState, useCallback, useMemo, useEffect } from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';

// Date range configuration
const DATE_RANGE = {
    minYear: 1950,
    maxYear: 2025,
    yearCount: 76
} as const;

// Utility functions
const isDateInRange = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
    if (minDate && date < minDate) return false;
    if (maxDate && date > maxDate) return false;
    return true;
};

// Helper to create dates without timezone issues
const createUTCDate = (year: number, month: number, day: number): Date => {
    return new Date(Date.UTC(year, month, day));
};

// Helper to check if date is valid
const isValidDate = (date: Date): boolean => {
    return date instanceof Date && !isNaN(date.getTime());
};

interface UseDatePickerProps {
    value?: Date | null;
    onChange?: (date: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
    disabled?: boolean;
    onCancel?: () => void;
    onNext?: () => void;
    onClear?: () => void;
}

export const useDatePicker = ({
    value = null,
    onChange,
    minDate,
    maxDate,
    disabled = false,
    onCancel,
    onNext,
    onClear
}: UseDatePickerProps) => {
    // Internal state for view management
    const [viewDate, setViewDate] = useState(() => {
        if (value && isValidDate(value)) return new Date(value);
        // When no value is provided, use a predictable default date (January 2024)
        const defaultDate = new Date(2024, 0, 1);
        if (minDate && isValidDate(minDate) && defaultDate < minDate) return new Date(minDate);
        if (maxDate && isValidDate(maxDate) && defaultDate > maxDate) return new Date(maxDate);
        return defaultDate;
    });

    // Memoized effective date bounds
    const effectiveMinDate = useMemo(() => {
        if (minDate && isValidDate(minDate)) return new Date(minDate);
        return createUTCDate(DATE_RANGE.minYear, 0, 1);
    }, [minDate]);
    
    const effectiveMaxDate = useMemo(() => {
        if (maxDate && isValidDate(maxDate)) return new Date(maxDate);
        return createUTCDate(DATE_RANGE.maxYear, 11, 31);
    }, [maxDate]);

    // Update viewDate when value changes
    useEffect(() => {
        if (value && isValidDate(value)) {
            setViewDate(new Date(value));
        }
    }, [value]);

    // Navigation handlers
    const handlePrevMonth = useCallback(() => {
        if (disabled) return;
        
        setViewDate(prev => {
            const newDate = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
            if (newDate < effectiveMinDate) return prev;
            return newDate;
        });
    }, [disabled, effectiveMinDate]);

    const handleNextMonth = useCallback(() => {
        if (disabled) return;
        
        setViewDate(prev => {
            const newDate = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
            if (newDate > effectiveMaxDate) return prev;
            return newDate;
        });
    }, [disabled, effectiveMaxDate]);

    const handlePrevYear = useCallback(() => {
        if (disabled) return;
        
        setViewDate(prev => {
            const newDate = new Date(prev.getFullYear() - 1, prev.getMonth(), 1);
            if (newDate < effectiveMinDate) return prev;
            return newDate;
        });
    }, [disabled, effectiveMinDate]);

    const handleNextYear = useCallback(() => {
        if (disabled) return;
        
        setViewDate(prev => {
            const newDate = new Date(prev.getFullYear() + 1, prev.getMonth(), 1);
            if (newDate > effectiveMaxDate) return prev;
            return newDate;
        });
    }, [disabled, effectiveMaxDate]);

    // Select change handlers
    const handleMonthChange = useCallback((event: SelectChangeEvent<string | string[]>) => {
        if (disabled) return;
        
        const value = Array.isArray(event.target.value) ? event.target.value[0] : event.target.value;
        const monthIndex = parseInt(value, 10);
        
        setViewDate(prev => {
            const newDate = new Date(prev.getFullYear(), monthIndex, 1);
            if (newDate < effectiveMinDate || newDate > effectiveMaxDate) return prev;
            return newDate;
        });
    }, [disabled, effectiveMinDate, effectiveMaxDate]);

    const handleYearChange = useCallback((event: SelectChangeEvent<string | string[]>) => {
        if (disabled) return;
        
        const value = Array.isArray(event.target.value) ? event.target.value[0] : event.target.value;
        const year = parseInt(value, 10);
        
        setViewDate(prev => {
            const newDate = new Date(year, prev.getMonth(), 1);
            if (newDate < effectiveMinDate || newDate > effectiveMaxDate) return prev;
            return newDate;
        });
    }, [disabled, effectiveMinDate, effectiveMaxDate]);

    // Date selection handler
    const handleDateSelect = useCallback((date: Date) => {
        if (disabled) return;
        if (!isValidDate(date)) return;
        if (!isDateInRange(date, minDate, maxDate)) return;
        onChange?.(date);
    }, [disabled, minDate, maxDate, onChange]);

    // Action handlers
    const handleClear = useCallback(() => {
        if (disabled) return;
        onChange?.(null);
        onClear?.();
        // Reset to default date or minDate if default date is before minDate
        const defaultDate = new Date(2024, 0, 1);
        const resetDate = minDate && isValidDate(minDate) && defaultDate < minDate ? new Date(minDate) : defaultDate;
        setViewDate(resetDate);
    }, [disabled, onChange, onClear, minDate]);

    const handleCancel = useCallback(() => {
        if (disabled) return;
        onCancel?.();
    }, [disabled, onCancel]);

    const handleNext = useCallback(() => {
        if (disabled) return;
        onNext?.();
    }, [disabled, onNext]);

    return {
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
    };
}; 