import { useCallback } from 'react'
import { FormControlAtom } from '../../../atoms'
import { Input } from '../../../atoms/input/input'
import { StepWrapper, useStepField } from './shared'
import type { TextFieldStepProps } from './types'

export const TextField = ({
    title,
    helperText,
    placeholder = 'Enter your answer',
    type = 'text',
    required = false,
    disabled = false,
    stepId,
}: TextFieldStepProps) => {
    const { value, error, handleChange, handleBlur } = useStepField({
        stepId,
        required,
        validations: [],
    })

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event.target.value)
        },
        [handleChange]
    )

    return (
        <StepWrapper title={title} helperText={helperText} error={error || undefined}>
            <FormControlAtom variant="outlined" fullWidth>
                <Input
                    appearance="distinct"
                    size="medium"
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    disabled={disabled}
                    error={!!error}
                    sx={{
                        backgroundColor: 'white',
                        width: '100%',
                    }}
                />
            </FormControlAtom>
        </StepWrapper>
    )
}
