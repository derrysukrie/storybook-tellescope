import type { FC } from 'react'
import { Input, type InputProps } from '../input/input'

type TextareaProps = Omit<InputProps, 'appearance' | 'size'> & {
    rows?: number
    appearance: 'standard' | 'filled' | 'outlined' | 'patientForm' | 'distinct'
}

const Textarea: FC<TextareaProps> = props => {
    const { appearance, sx, rows, ...rest } = props
    if (appearance === 'patientForm') {
        return (
            <Input
                multiline
                placeholder={typeof props.label === 'string' ? props.label : undefined}
                appearance="distinct"
                hiddenLabel
                maxRows={9}
                rows={rows || 9}
                sx={{
                    width: '14rem',
                    ...sx,
                }}
                {...rest}
            />
        )
    }
    return (
        <Input
            {...rest}
            appearance={appearance}
            multiline
            maxRows={9}
            rows={rows || 9}
            sx={{
                width: '14rem',
                ...sx,
            }}
        />
    )
}

export default Textarea
