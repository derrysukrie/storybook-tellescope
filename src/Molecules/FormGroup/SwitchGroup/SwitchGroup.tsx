import { FormControlLabel, Stack } from "@mui/material";
import { useState } from "react";

import {
  FormControlAtom,
  FormGroupLabel,
  FormHelperText,
} from "../../../components/atoms";
import Switch from "../../../components/atoms/switch/switch";

type Option = {
  label: string;
  value: string;
};

export const SwitchGroup = ({
  label,
  helperText,
  labelSize,
  options,
  onChange,
  value: controlledValue,
}: {
  label: string;
  labelSize?: "default" | "large";
  helperText: string;
  options: Option[];
  onChange?: (value: string[]) => void;
  value?: string[];
}) => {
  const [internalValue, setInternalValue] = useState<string[]>([]);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleSwitchChange = (switchValue: string, checked: boolean) => {
    const currentValues = value || [];
    let newSelectedValues: string[];

    if (checked) {
      newSelectedValues = currentValues.includes(switchValue)
        ? currentValues
        : [...currentValues, switchValue];
    } else {
      newSelectedValues = currentValues.filter(val => val !== switchValue);
    }

    if (onChange) {
      onChange(newSelectedValues);
    }
    if (!isControlled) {
      setInternalValue(newSelectedValues);
    }
  };

  return (
    <FormControlAtom>
      <FormGroupLabel labelSize={labelSize}>{label}</FormGroupLabel>
      <Stack p={1} direction="column" gap={2}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Switch
                label={option.label}
                formlabelProps={{ labelPlacement: "end" }}
                checked={value?.includes(option.value) || false}
                onChange={(e) => handleSwitchChange(option.value, e.target.checked)}
              />
            }
            label={""}
          />
        ))}
      </Stack>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControlAtom>
  );
};
