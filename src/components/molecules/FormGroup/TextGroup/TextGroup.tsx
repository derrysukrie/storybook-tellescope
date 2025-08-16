import {
  FormControlAtom,
  FormGroupLabel,
  FormHelperText,
} from "../../../../components/atoms";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";

type Option = {
  label: string;
  value: string;
};

export const TextGroup = ({
  label,
  helperText,
  options,
  value: controlledValue,
  onChange,
}: {
  label: string;
  helperText?: string;
  options: Option[];
  value?: Record<string, string>;
  onChange?: (value: Record<string, string>) => void;
}) => {
  const [internalValue, setInternalValue] = useState<Record<string, string>>(
    () => {
      const initialValue: Record<string, string> = {};
      for (const option of options) {
        initialValue[option.value] = "";
      }
      return initialValue;
    }
  );

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (optionValue: string, text: string) => {
    const newValue = { ...value, [optionValue]: text };
    if (onChange) {
      onChange(newValue);
    }
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

  return (
    <FormControlAtom variant="standard">
      <FormGroupLabel>{label}</FormGroupLabel>
      <Stack direction="column" gap={2}>
        {options.map((option) => (
          <TextField
            variant="outlined"
            size="small"
            hiddenLabel
            key={option.value}
            // label={option.label}
            value={value[option.value] || ""}
            onChange={(e) => handleChange(option.value, e.target.value)}
          />
        ))}
      </Stack>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControlAtom>
  );
};
