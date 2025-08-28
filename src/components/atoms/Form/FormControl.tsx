import { FormControl } from '@mui/material'
import type React from 'react'

export interface FormControlAtomProps {
    children: React.ReactNode
    label?: React.ReactNode
    error?: boolean
    helperText?: React.ReactNode
    variant?: 'standard' | 'outlined' | 'filled'
    fullWidth?: boolean
}

export const FormControlAtom: React.FC<FormControlAtomProps> = ({
    children,
    error = false,
    variant = 'standard',
    fullWidth = false,
}) => {
    return (
        <FormControl component="fieldset" variant={variant} error={error} fullWidth={fullWidth}>
            {children}
        </FormControl>
    )
}
