import {
  Box,
  MenuItem,
  Stack,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { FormControlAtom } from "../../../Atoms/Form";
import Select from "../../../components/atoms/select/select";
import { useCallback, memo, useMemo } from "react";
import { useFormContext } from "../FormContext";
import type { SelectOption } from "./types";

interface SelectFieldProps {
  title?: string;
  options?: SelectOption[];
  placeholder?: string;
  helperText?: string;
}

export const SelectField = memo(({ 
  title = "What would you like to be called?",
  options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ],
  placeholder = "Select an option",
  helperText = "The location is where you're treatment supplies will be shipped, if prescibed"
}: SelectFieldProps) => {
  
  const { updateFormData, getFormData, currentStep } = useFormContext();
  
  // Get current value from centralized form state
  const currentValue = getFormData()[currentStep] || "";

  // Create value-to-label mapping for display
  const valueToLabelMap = useMemo(() => {
    const map = new Map<string, string>();
    options.forEach(option => {
      map.set(option.value, option.label);
    });
    return map;
  }, [options]);

  // Custom renderValue function to show labels instead of values
  const renderValue = useCallback((selected: string | string[]) => {
    if (typeof selected === 'string') {
      return valueToLabelMap.get(selected) || selected;
    }
    return selected;
  }, [valueToLabelMap]);

  const handleChange = useCallback((event: SelectChangeEvent<string | string[]>) => {
    const newValue = event.target.value as string;
    // Store the value (for API), not the label
    updateFormData(currentStep, newValue);
  }, [updateFormData, currentStep]);

  return (
    <Box width="100%">
      <Box pt={"48px"}>
        <Stack gap={"12px"}>
          <Typography variant="h5">
            {title}
          </Typography>
          <FormControlAtom variant="outlined" fullWidth>
            <Select
              appearance="outlined"
              size="small"
              value={currentValue}
              onChange={handleChange}
              placeholder={placeholder}
              renderValue={renderValue}
              sx={{
                backgroundColor: "white",
                width: "100%",
                "& .MuiPaper-root": {
                  borderRadius: "6px",
                  overflow: "hidden",
                  boxShadow: "none",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControlAtom>
          <Typography color="text.secondary" variant="caption">
            {helperText}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
});

SelectField.displayName = "SelectField";
