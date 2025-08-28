// src/components/AmPmToggle.tsx
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState } from 'react'

export interface VerticalAmPmToggleProps {
    value?: 'AM' | 'PM'
    onChange?: (value: 'AM' | 'PM') => void
    disabled?: boolean
}

export const VerticalAmPmToggle = ({
    value,
    onChange,
    disabled = false,
}: VerticalAmPmToggleProps) => {
    const [internalValue, setInternalValue] = useState<'AM' | 'PM'>(value || 'PM')
    const currentValue = value ?? internalValue

    const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: 'AM' | 'PM' | null) => {
        if (newValue !== null) {
            if (!value) setInternalValue(newValue)
            onChange?.(newValue)
        }
    }

    return (
        <ToggleButtonGroup
            value={currentValue}
            exclusive
            orientation="vertical"
            onChange={handleChange}
            disabled={disabled}
            sx={{
                '& .MuiToggleButtonGroup-grouped': {
                    border: 'none',
                    fontWeight: 500,
                    fontSize: 16,
                    color: '#333',
                    backgroundColor: 'rgba(232, 231, 239, 1)',
                    '&.Mui-selected': {
                        bgcolor: 'rgba(255, 214, 248, 1)',
                        color: 'rgba(90, 61, 88, 1)',
                        '&:hover': {
                            bgcolor: 'rgb(236, 195, 227)',
                        },
                        '&:active': {
                            bgcolor: 'rgb(243, 202, 235)',
                        },
                    },
                },
                '& .MuiToggleButtonGroup-firstButton': {
                    borderRadius: '10px 10px 0 0',
                    border: '1px solid rgba(117, 118, 128, 1)',
                },
                '& .MuiToggleButtonGroup-lastButton': {
                    border: '1px solid rgba(117, 118, 128, 1)',
                    borderRadius: '0 0 10px 10px',
                },
                '& .MuiButtonBase-root': {
                    padding: '4px 0',
                    minWidth: 52,
                },
            }}
        >
            <ToggleButton disableRipple value="AM">
                AM
            </ToggleButton>
            <ToggleButton disableRipple value="PM">
                PM
            </ToggleButton>
        </ToggleButtonGroup>
    )
}
