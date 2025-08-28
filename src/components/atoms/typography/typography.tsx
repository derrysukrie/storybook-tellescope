import { Typography as MuiTypography } from '@mui/material'
import type { ComponentPropsWithoutRef } from 'react'

// Extend Button component to accept the custom color
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        custom: true
    }
}

interface TypographyProps extends ComponentPropsWithoutRef<typeof MuiTypography> {
    variant?:
        | 'body1'
        | 'body2'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'subtitle1'
        | 'subtitle2'
        | 'caption'
        | 'overline'
        | 'custom'
}

const Typography = ({ children, variant = 'body1', ...rest }: TypographyProps) => {
    return (
        <MuiTypography
            {...rest}
            variant={variant}
            sx={{
                fontSize: variant === 'custom' ? '0.875rem' : variant,
                fontWeight: variant === 'custom' ? 500 : undefined,
                lineHeight: variant === 'custom' ? '24px' : undefined,
                letterSpacing: variant === 'custom' ? '0.17px' : undefined,
                color: rest.color || 'text.primary',
                ...rest.sx,
            }}
        >
            {children}
        </MuiTypography>
    )
}

export default Typography
