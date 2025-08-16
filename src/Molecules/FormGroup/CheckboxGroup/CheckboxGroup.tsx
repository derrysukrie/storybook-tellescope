import {
  FormControlLabel,
  FormGroup as MuiFormGroup,
  FormHelperText,
} from "@mui/material";
import { FormControlAtom, FormGroupLabel } from "../../../Atoms/Form";
import CheckBox from "../../../components/atoms/checkbox/checkbox";
import type React from "react";

export interface Option {
  label: string;
  value: string;
}

export interface CheckboxGroupProps {
  /** Array of checkbox options */
  options: Option[];
  /** Currently selected values */
  value?: string[];
  /** Callback when selection changes */
  label?: string;
  labelSize?: "default" | "large";
  onChange: (value: string[]) => void;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether to display checkboxes in a row instead of column */
  row?: boolean;
  /** Custom styling */
  sx?: React.ComponentProps<typeof MuiFormGroup>["sx"];
  /** Helper text to display below the component */
  helperText?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  onChange,
  value = [],
  disabled = false,
  row = false,
  sx,
  label,
  labelSize = "default",
  helperText,
}) => {
  const handleCheckboxChange = (checkboxValue: string) => {
    const currentValues = Array.isArray(value) ? value : [];
    const newSelectedValues = currentValues.includes(checkboxValue)
      ? currentValues.filter((val) => val !== checkboxValue)
      : [...currentValues, checkboxValue];
    onChange(newSelectedValues);
  };

  const isChecked = (optionValue: string): boolean => {
    const checked = Array.isArray(value) && value.includes(optionValue);
    return checked;
  };

  return (
    <FormControlAtom variant="standard">
      <FormGroupLabel labelSize={labelSize}>{label}</FormGroupLabel>
      <MuiFormGroup row={row} sx={sx}>
        {options.map((option) => {
          const checked = isChecked(option.value);
          return (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={
                <CheckBox
                  checked={checked}
                  onChange={() => handleCheckboxChange(option.value)}
                  disabled={disabled}
                />
              }
              label={option.label}
              disabled={disabled}
            />
          );
        })}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </MuiFormGroup>
    </FormControlAtom>
  );
};
