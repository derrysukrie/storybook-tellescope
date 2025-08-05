import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import type { ReactNode } from 'react';

export interface ButtonProps extends Omit<MuiButtonProps, 'color' | 'variant' | 'size'> {
    children: ReactNode;
    appearance?: "contained" | "outlined" | "text";
    color?: "primary" | "secondary" | "info";
    size?: "large" | "medium" | "small";
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

export const Button = ({ children, appearance = "contained", color = "primary", disabled = false, ...rest }: ButtonProps) => (
    <MuiButton
        variant={appearance}
        color={color}
        disabled={disabled}
        {...rest}
    >
        {children}
    </MuiButton>
);