import React, { useMemo, useState } from 'react';
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


const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString('default', { month: 'short' })
);
const years = Array.from({ length: 76 }, (_, i) => 1950 + i); // Customize range as needed

const DialogDatePicker: React.FC = () => {
    const [viewDate, setViewDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const today = new Date();

    const isSameDay = (d1: Date, d2: Date) =>
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear();


    const days = useMemo(() => {
        const result: Date[] = [];

        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();

        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = endOfMonth.getDate();
        const startDay = startOfMonth.getDay(); // Sunday = 0

        // Previous month days to fill first row (if needed)
        if (startDay > 0) {
            const prevMonthEnd = new Date(year, month, 0); // last day of previous month
            const prevMonthDays = prevMonthEnd.getDate();
            for (let i = startDay - 1; i >= 0; i--) {
                result.push(new Date(year, month - 1, prevMonthDays - i));
            }
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            result.push(new Date(year, month, i));
        }

        // Next month days to complete last row (if needed)
        const remaining = 7 - (result.length % 7);
        if (remaining < 7) {
            for (let i = 1; i <= remaining; i++) {
                result.push(new Date(year, month + 1, i));
            }
        }

        return result;
    }, [viewDate]);


    const handlePrevMonth = () => {
        setViewDate(prev => {
            if (prev.getFullYear() <= 1950 && prev.getMonth() === 0) {
                return prev; // Prevent going beyond 1950
            }
            return new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
        });
    };

    const handleNextMonth = () => {
        setViewDate(prev => {
            if (prev.getFullYear() >= 2025 && prev.getMonth() === 11) {
                return prev; // Prevent going beyond 2025
            }
            return new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
        });
    };

    const handlePrevYear = () => {
        setViewDate(prev => {
            if (prev.getFullYear() <= 1950) {
                return prev; // Prevent going beyond 1950
            }
            return new Date(prev.getFullYear() - 1, prev.getMonth(), 1);
        });
    };

    const handleNextYear = () => {
        setViewDate(prev => {
            if (prev.getFullYear() >= 2025) {
                return prev; // Prevent going beyond 2025
            }
            return new Date(prev.getFullYear() + 1, prev.getMonth(), 1);
        });
    };


    const handleMonthChange = (event: SelectChangeEvent<string | string[]>) => {
        const value = Array.isArray(event.target.value) ? event.target.value[0] : event.target.value;
        setViewDate(prev => new Date(prev.getFullYear(), Number(value), 1));
    };

    const handleYearChange = (event: SelectChangeEvent<string | string[]>) => {
        const value = Array.isArray(event.target.value) ? event.target.value[0] : event.target.value;
        setViewDate(prev => new Date(Number(value), prev.getMonth(), 1));
    };

    const handleClear = () => {
        // Clear selected date
        if (selectedDate) {
            setSelectedDate(null);
        }
        // Reset view date to today
        setViewDate(new Date());
    }

    return (
        <Box
            sx={{
                borderRadius: 4,
                p: 2,
                width: 360,
                border: "1px solid #0000001F",
                backgroundColor: 'white',
            }}
        >
            {/* Header with Month & Year Select */}
            <Stack sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px"
                }} >
                    <IconButton onClick={handlePrevMonth} size="small" color="default">
                        <ChevronLeft />
                    </IconButton>
                    <Box display="flex" gap={1} alignItems="center">
                        <Select
                            hiddenLabel
                            size="small"
                            value={`${viewDate.toLocaleString('default', { month: 'short' })}`}
                            onChange={handleMonthChange}
                            appearance="standard"
                            disableUnderline
                        >
                            {months.map((month, index) => (
                                <MenuItem key={month} value={index}>
                                    {month}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <IconButton onClick={handleNextMonth} size="small" color="default">
                        <ChevronRight />
                    </IconButton>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px"
                }} >
                    <IconButton onClick={handlePrevYear} size="small" color="default">
                        <ChevronLeft />
                    </IconButton>
                    <Box display="flex" gap={1} alignItems="center">
                        <Select
                            hiddenLabel
                            size="small"
                            value={`${viewDate.getFullYear()}`}
                            onChange={handleYearChange}
                            variant="standard"
                            disableUnderline
                        >
                            {years.map(year => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <IconButton onClick={handleNextYear} size="small" color="default">
                        <ChevronRight />
                    </IconButton>
                </Box>
            </Stack>

            {/* Weekdays */}
            <Grid container spacing={1} mb={1}>
                {daysOfWeek.map(day => (
                    <Grid item xs={12 / 7} key={day}>
                        <Typography align="center" fontWeight={500} fontSize="0.85rem">
                            {day}
                        </Typography>
                    </Grid>
                ))}
            </Grid>

            {/* Calendar Days */}
            <Grid container spacing={1}>
                {days.map((day, index) => {
                    const isToday = isSameDay(day, today);
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    const isInCurrentMonth = day.getMonth() === viewDate.getMonth();

                    return (
                        <Grid item xs={12 / 7} key={index}>
                            <Box
                                onClick={() => setSelectedDate(day)}
                                sx={{
                                    cursor: 'pointer',
                                    width: 36,
                                    height: 36,
                                    mx: 'auto',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: isSelected ? 'primary.main' : 'transparent',
                                    color: isSelected
                                        ? 'white'
                                        : isToday
                                            ? 'black'
                                            : isInCurrentMonth
                                                ? 'text.primary'
                                                : 'grey.400',
                                    border: isToday && !isSelected ? '1px solid' : 'none',
                                    borderColor: isToday && !isSelected ? '#0000008F' : undefined,
                                }}
                            >
                                {day.getDate()}
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>


            {/* Footer */}
            <Box display="flex" justifyContent="space-between" mt={2}>
                <Button appearance="text" color="primary" onClick={handleClear}>CLEAR</Button>
                <Stack sx={{
                    flexDirection: "row",
                    gap: 1,
                    justifyContent: "flex-end",
                }}>
                    <Button appearance="text" color="primary">CANCEL</Button>
                    <Button appearance="text" color="primary">NEXT</Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default DialogDatePicker;
