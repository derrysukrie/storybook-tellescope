import { FormControl, MenuItem, Select, Stack } from '@mui/material'
import { useState } from 'react'
import { FormGroupLabel, FormHelperText } from '../../../../components/atoms'

type Option = {
    label: string
    value: string
}

export const SelectGroup = ({
    label,
    labelSize,
    helperText,
    options,
    value: controlledValue,
    onChange,
}: {
    label: string
    labelSize?: 'default' | 'large'
    helperText?: string
    options: Option[]
    value?: Record<string, string>
    onChange?: (value: Record<string, string>) => void
}) => {
    const [internalValue, setInternalValue] = useState<Record<string, string>>(() => {
        const initialValue: Record<string, string> = {}
        for (const option of options) {
            initialValue[option.value] = ''
        }
        return initialValue
    })

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const handleChange = (optionValue: string, selectedValue: string) => {
        const newValue = { ...value, [optionValue]: selectedValue }
        if (onChange) {
            onChange(newValue)
        }
        if (!isControlled) {
            setInternalValue(newValue)
        }
    }

    return (
        <FormControl>
            <FormGroupLabel labelSize={labelSize}>{label}</FormGroupLabel>
            <Stack direction="column" gap={2}>
                {options.map(option => (
                    <FormControl key={option.value} variant="outlined" size="medium">
                        <Select
                            value={value[option.value] || ''}
                            displayEmpty
                            onChange={e => handleChange(option.value, e.target.value as string)}
                        >
                            <MenuItem value="" disabled>
                                Select an option
                            </MenuItem>
                            <MenuItem value={option.value}>{option.label}</MenuItem>
                        </Select>
                    </FormControl>
                ))}
            </Stack>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )
}
