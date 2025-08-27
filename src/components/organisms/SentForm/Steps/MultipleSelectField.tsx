import { Box, MenuItem, Stack, Typography, type SelectChangeEvent } from "@mui/material";
import { FormControlAtom } from "../../../atoms";
import Select from "../../../atoms/select/select";
import { useCallback, memo } from "react";
import { useFormContext } from "../FormContext";
import type { SelectOption } from "./types";

interface MultipleSelectFieldProps {
  title?: string;
  options?: SelectOption[];
  placeholder?: string;
  helperText?: string;
}

export const MultipleSelectField = memo(({ 
  title = "What would you like to be called?",
  options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ],
  placeholder = "Select an option",
  helperText = "The location is where you're treatment supplies will be shipped, if prescibed"
}: MultipleSelectFieldProps) => {
  const { updateFormData, formData, currentStep } = useFormContext();
  
  // Get current value from centralized form state
  const currentValue = formData[currentStep] || [];

  // // Create value-to-label mapping for display
  // const valueToLabelMap = useMemo(() => {
  //   const map = new Map<string, string>();
  //   options.forEach(option => {
  //     map.set(option.value, option.label);
  //   });
  //   return map;
  // }, [options]);

    // // Custom renderValue function to show labels instead of values
    // const renderValue = useCallback((selected: string | string[]) => {
    //   if (Array.isArray(selected)) {
    //     return selected.map(val => valueToLabelMap.get(val) || val);
    //   }
    //   return selected;
    // }, [valueToLabelMap]);
    
    // render placeholder if no value is selected
    // const renderValue = useCallback((selected: string | string[]) => {
    //   if (Array.isArray(selected) && selected.length === 0) {
    //     return placeholder;
    //   }
     
    // }, [placeholder]);

  const handleChange = useCallback((event: SelectChangeEvent<string | string[]>) => {
    const newValue = event.target.value as string[];
    updateFormData(currentStep, newValue);
  }, [updateFormData, currentStep]);

  return (
    <Box width="100%">
      <Box pt={"48px"}>
        <Stack gap={"12px"}>
          <Typography variant="h5">{title}</Typography>
          <FormControlAtom variant="outlined" fullWidth>
            <Select
              appearance="outlined"
              size="small"
              multiple
              displayEmpty
              value={currentValue}
              onChange={handleChange}
              placeholder={placeholder}
              // renderValue={renderValue}
              sx={{
                backgroundColor: "white",
                width: "100%",
                // disable option select shadow
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

MultipleSelectField.displayName = "MultipleSelectField";
