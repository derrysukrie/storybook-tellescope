import { Radio as MuiRadio } from '@mui/material'
import type { RadioProps as MuiRadioProps } from '@mui/material/Radio'

declare module '@mui/material/Radio' {
    interface RadioPropsSizeOverrides {
        large: true
    }
}

export interface RadioProps extends Omit<MuiRadioProps, 'color' | 'size'> {
    color?: 'primary' | 'secondary' | 'info' | 'default'
    size?: 'large' | 'medium' | 'small' // Add "large" as MUI Radio does not support it
}

export const Radio = ({ color = 'default', ...rest }: RadioProps) => (
    <MuiRadio disableRipple color={color} {...rest} />
)
