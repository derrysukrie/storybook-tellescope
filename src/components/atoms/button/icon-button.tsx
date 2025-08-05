import { IconButton as MuiIconButton } from '@mui/material';
import type { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';

// Extend Button component to accept the custom color
declare module '@mui/material/IconButton' {
    interface IconButtonPropsSizeOverrides {
        table: true;
    }
}

export interface IconButtonProps extends Omit<MuiIconButtonProps, 'color' | 'variant' | 'size'> {
    color?: "primary" | "secondary" | "info" | "default";
    size?: "large" | "medium" | "small" | "table";
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
}

export const IconButton = ({ children, color = "primary", size = "medium", disabled = false, sx, ...rest }: IconButtonProps) => (
    <MuiIconButton
        disableRipple
        color={color}
        disabled={disabled}
        size={size}
        {...rest}
        sx={{
            height: "fit-content",
            ...sx
        }}
    >
        {children}
    </MuiIconButton>
);