import React, { useMemo } from 'react';
import { Box, Grid, Typography } from '@mui/material';

// Design tokens
const DESIGN_TOKENS = {
    daySize: 36,
    fontSize: '0.85rem',
    fontWeight: 500,
    todayBorderColor: '#0000008F',
    disabledColor: 'grey.400',
    textPrimary: 'text.primary',
    primaryMain: 'primary.main'
} as const;

// Weekday labels
const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

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

interface CalendarGridProps {
    viewDate: Date;
    selectedDate: Date | null;
    onDateSelect: (date: Date) => void;
    minDate?: Date;
    maxDate?: Date;
    disabled?: boolean;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
    viewDate,
    selectedDate,
    onDateSelect,
    minDate,
    maxDate,
    disabled = false
}) => {
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

    return (
        <>
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
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    const isInCurrentMonth = day.getMonth() === viewDate.getMonth();
                    const isDisabled = disabled || isDateDisabled(day, minDate, maxDate);

                    // Memoized styles to prevent recreation
                    const dayStyles = useMemo(() => ({
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
                        ...(isToday && !isSelected && { borderColor: DESIGN_TOKENS.todayBorderColor }),
                        opacity: isDisabled ? 0.5 : 1,
                        pointerEvents: isDisabled ? 'none' : 'auto',
                    }), [isDisabled, isSelected, isToday, isInCurrentMonth]);

                    return (
                        <Grid item xs={12 / 7} key={index}>
                            <Box
                                onClick={() => onDateSelect(day)}
                                sx={dayStyles}
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
        </>
    );
}; 