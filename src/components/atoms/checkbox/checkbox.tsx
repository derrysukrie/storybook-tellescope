import { Checkbox as MuiCheckbox } from '@mui/material';
import type { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';

export interface CheckBoxProps extends Omit<MuiCheckboxProps, 'color' | 'variant' | 'size'> {
    color?: "primary" | "secondary" | "info";
    size?: "large" | "medium" | "small";
}

const CheckBox = ({ color = "primary", ...rest }: CheckBoxProps) => (
    <MuiCheckbox
        disableRipple
        color={color}
        {...rest}
    />
);

export default CheckBox;