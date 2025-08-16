import { Stack, FormControl, Box, Typography } from "@mui/material";
import { useState } from "react";
import { FormGroupLabel, FormHelperText } from "../../../../components/atoms";

type SelectableOption = {
  label: string;
  value: string;
};

export const SelectableGroup = ({
  label,
  labelSize,
  helperText,
  options,
  value: controlledValue,
  onChange,
  multiple = false,
}: {
  label: string;
  labelSize?: "default" | "large";
  helperText?: string;
  options: SelectableOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
}) => {
  const [internalValue, setInternalValue] = useState<string | string[]>(multiple ? [] : "");

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleOptionClick = (optionValue: string) => {
    let newValue: string | string[];

    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.includes(optionValue)) {
        newValue = currentValues.filter((v) => v !== optionValue);
      } else {
        newValue = [...currentValues, optionValue];
      }
    } else {
      newValue = optionValue;
    }

    if (onChange) {
      onChange(newValue);
    }
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

  const isSelected = (optionValue: string) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <FormControl>
      <FormGroupLabel sx={{ color: "black" }} labelSize={labelSize}>
        {label}
      </FormGroupLabel>
      <Stack direction="column" gap={1.5}>
        {options.map((option, index) => (
          <Box
            key={index}
            onClick={() => handleOptionClick(option.value)}
            sx={{
              border: "1.5px solid",
              height: "80px",
              width: "456px",
              display: "flex",
              borderRadius: "4px",
              alignItems: "center",
              borderColor: isSelected(option.value) ? "primary.main" : "#4A5C9280",
              padding: 2,
              cursor: "pointer",
              backgroundColor: "transparent",
              transition: "all 0.2s ease-in-out",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#4A5C92",
                fontWeight: 600,
              }}
            >
              {option.label}
            </Typography>
          </Box>
        ))}
      </Stack>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
