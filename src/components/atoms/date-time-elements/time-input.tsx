import { FormControl, FormLabel } from '@mui/material'
import { type ComponentProps, type FC, useState } from 'react'
import { Input } from '../input/input'

interface TimeInputProps extends ComponentProps<typeof Input> {
    label?: boolean
}

const TimeInput: FC<TimeInputProps> = ({ label = false, value, onChange, ...rest }) => {
    const [internalValue, setInternalValue] = useState('00')

    const isControlled = value !== undefined

    const inputValue = isControlled ? value : internalValue
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, '') // Remove non-digits

        let newValue = ''

        if (raw.length === 0) {
            newValue = ''
        } else if (raw.length === 1) {
            newValue = raw
        } else if (raw.length === 2) {
            newValue = raw
        } else {
            // Take last two digits
            newValue = raw.slice(-2)
        }

        if (isControlled) {
            onChange?.({ ...e, target: { ...e.target, value: newValue } })
        } else {
            setInternalValue(newValue)
        }
    }

    return (
        <FormControl sx={{ gap: '7px', height: 'fit-content' }}>
            <Input
                appearance="outlined"
                // inputProps={{ maxLength: 2 }}
                sx={{
                    '& .MuiInputBase-input': {
                        fontSize: !label ? '57px' : '45px',
                        letterSpacing: !label ? '-2px' : '0',
                        height: 'fit-content',
                        width: !label ? '64px' : '50px',
                        padding: 0,
                    },
                    '& .MuiInputBase-root': {
                        padding: 0,
                        width: !label ? 97 : 96,
                        height: !label ? 80 : 72,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(227, 226, 233, 1)',
                        borderRadius: '8px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        padding: 0,
                        border: 0,
                    },
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: label ? '2px solid rgba(74, 92, 146, 1)' : 'none',
                    },
                    '& .Mui-focused': {
                        background: 'rgba(219, 225, 255, 1) ',
                        color: 'rgba(50, 68, 120, 1)',
                    },
                }}
                value={inputValue}
                onChange={handleChange}
                {...rest}
            />

            {label ? (
                <FormLabel sx={{ color: 'rgba(69, 70, 79, 1)' }}>
                    {label ? 'Time label' : ''}
                </FormLabel>
            ) : null}
        </FormControl>
    )
}

export default TimeInput
