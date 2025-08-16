import React from 'react';
import { Box, Stack } from '@mui/material';
import { Button } from '../../../atoms/button/button';

interface CalendarFooterProps {
    onClear: () => void;
    onCancel: () => void;
    onNext: () => void;
    disabled?: boolean;
}

export const CalendarFooter: React.FC<CalendarFooterProps> = ({
    onClear,
    onCancel,
    onNext,
    disabled = false
}) => {
    return (
        <Box display="flex" justifyContent="space-between" mt={2}>
            <Button 
                appearance="text" 
                color="primary" 
                onClick={onClear}
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
                    onClick={onCancel}
                    disabled={disabled}
                    aria-label="Cancel date selection"
                >
                    CANCEL
                </Button>
                <Button 
                    appearance="text" 
                    color="primary"
                    onClick={onNext}
                    disabled={disabled}
                    aria-label="Confirm date selection"
                >
                    NEXT
                </Button>
            </Stack>
        </Box>
    );
}; 