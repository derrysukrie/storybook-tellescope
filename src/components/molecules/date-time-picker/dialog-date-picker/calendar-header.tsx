import React, { useCallback, useMemo } from 'react';
import { Box, Stack, MenuItem } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { IconButton } from '../../../atoms/button/icon-button';
import Select from '../../../atoms/select/select';

// Design tokens
const DESIGN_TOKENS = {
    gap: '8px'
} as const;

// Date range configuration
const DATE_RANGE = {
    minYear: 1950,
    maxYear: 2025,
    yearCount: 76
} as const;

// Generate months array
const MONTHS = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString('default', { month: 'short' })
);

// Generate years array
const YEARS = Array.from({ length: DATE_RANGE.yearCount }, (_, i) => 
    DATE_RANGE.minYear + i
);

interface CalendarHeaderProps {
    viewDate: Date;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onPrevYear: () => void;
    onNextYear: () => void;
    onMonthChange: (event: SelectChangeEvent<string | string[]>) => void;
    onYearChange: (event: SelectChangeEvent<string | string[]>) => void;
    disabled?: boolean;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
    viewDate,
    onPrevMonth,
    onNextMonth,
    onPrevYear,
    onNextYear,
    onMonthChange,
    onYearChange,
    disabled = false
}) => {
    const monthValue = useMemo(() => viewDate.getMonth().toString(), [viewDate]);
    const yearValue = useMemo(() => viewDate.getFullYear().toString(), [viewDate]);

    return (
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            {/* Month Navigation */}
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: DESIGN_TOKENS.gap
            }}>
                <IconButton 
                    onClick={onPrevMonth} 
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
                        value={monthValue}
                        onChange={onMonthChange}
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
                    onClick={onNextMonth} 
                    size="small" 
                    color="default"
                    disabled={disabled}
                    aria-label="Next month"
                >
                    <ChevronRight />
                </IconButton>
            </Box>

            {/* Year Navigation */}
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: DESIGN_TOKENS.gap
            }}>
                <IconButton 
                    onClick={onPrevYear} 
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
                        value={yearValue}
                        onChange={onYearChange}
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
                    onClick={onNextYear} 
                    size="small" 
                    color="default"
                    disabled={disabled}
                    aria-label="Next year"
                >
                    <ChevronRight />
                </IconButton>
            </Box>
        </Stack>
    );
}; 