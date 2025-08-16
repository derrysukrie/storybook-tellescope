import { FormControl, FormControlLabel, Switch as MuiSwitch } from "@mui/material";
import type { SwitchProps as MuiSwitchProps, FormControlLabelProps as MuiFormControlLabelProps } from "@mui/material";
import { type FC, type ReactNode } from "react";

interface SwitchToggleProps extends Omit<MuiSwitchProps, "color"> {
    color?: "default" | "primary" | "secondary" | "info";
    label?: ReactNode;
    value?: string;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    name?: string;
    formlabelProps?: Omit<MuiFormControlLabelProps, "label" | "control">;
}

const SwitchToggle: FC<SwitchToggleProps> = ({ 
    formlabelProps, 
    label, 
    value,
    checked,
    onChange,
    name,
    ...props 
}) => {
    const { sx, ...rest } = formlabelProps || {};
    return (
        <FormControl>
            <FormControlLabel
                control={
                    <MuiSwitch
                        color={props.color || "info"}
                        value={value}
                        checked={checked}
                        onChange={onChange}
                        name={name}
                        disableRipple
                        {...props}

                    />
                }
                label={label}
                labelPlacement="start"
                sx={{
                    m: 0,
                    borderRadius: "6px",
                    transition: "background 0.3s ease-in-out",
                    ...sx
                }}
                {...rest}
            />
        </FormControl>
    )
}

export default SwitchToggle
