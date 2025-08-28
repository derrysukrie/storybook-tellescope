import { MenuItem, type SelectChangeEvent } from '@mui/material'
import { memo, useCallback, useMemo } from 'react'
import { FormControlAtom } from '../../../atoms'
import Select from '../../../atoms/select/select'
import { StepWrapper, useStepField } from './shared'
import type { SelectFieldStepProps } from './types'

export const SelectField = memo(
    ({
        title,
        options = [],
        placeholder = 'Select an option',
        helperText,
        required = false,
        disabled = false,
        stepId,
    }: SelectFieldStepProps) => {
        const { value, error, handleChange, handleBlur } = useStepField({
            stepId,
            required,
            validations: [],
        })

        const currentValue = value || ''

        // Create value-to-label mapping for display
        const valueToLabelMap = useMemo(() => {
            const map = new Map<string, string>()
            options.forEach(option => {
                map.set(option.value, option.label)
            })
            return map
        }, [options])

        // Custom renderValue function to show labels instead of values
        const renderValue = useCallback(
            (selected: string | string[]) => {
                if (typeof selected === 'string') {
                    // If no value is selected, show placeholder with grey color
                    if (!selected) {
                        return <span style={{ color: '#999999' }}>{placeholder}</span>
                    }
                    return valueToLabelMap.get(selected) || selected
                }
                return selected
            },
            [valueToLabelMap, placeholder]
        )

        const handleSelectChange = useCallback(
            (event: SelectChangeEvent<string | string[]>) => {
                const newValue = event.target.value as string
                handleChange(newValue)
            },
            [handleChange]
        )

        return (
            <StepWrapper title={title} helperText={helperText} error={error || undefined}>
                <FormControlAtom variant="outlined" fullWidth>
                    <Select
                        appearance="outlined"
                        size="small"
                        value={currentValue}
                        onChange={handleSelectChange}
                        onBlur={handleBlur}
                        displayEmpty
                        renderValue={renderValue}
                        disabled={disabled}
                        sx={{
                            backgroundColor: 'white',
                            width: '100%',
                            '& .MuiPaper-root': {
                                borderRadius: '6px',
                                overflow: 'hidden',
                                boxShadow: 'none',
                            },
                        }}
                    >
                        {options.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControlAtom>
            </StepWrapper>
        )
    }
)

SelectField.displayName = 'SelectField'
