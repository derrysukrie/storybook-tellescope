import { Box } from "@mui/material";
import { FormGroup } from "../../../molecules";
import { useFormContext } from "../FormContext";
import { useCallback, memo } from "react";
import type { ChoiceOption } from "./types";

interface MultipleChoiceProps {
  label?: string;
  options?: ChoiceOption[];
  helperText?: string;
}

export const MultipleChoice = memo(({ 
  label = "Select your location",
  options = [
    { label: "This is a selectable question", value: "1" },
    { label: "This is a selectable question", value: "2" },
    { label: "This is a selectable question", value: "3" },
  ],
  helperText = "This is a helper text"
}: MultipleChoiceProps) => {
  const { updateFormData, formData, currentStep } = useFormContext();
  
  // Get current value from centralized form state
  const currentValue = formData[currentStep] || "";

  const handleChange = useCallback((value: string | string[]) => {
    const selectedValue = Array.isArray(value) ? value[0] || "" : value;
    updateFormData(currentStep, selectedValue);
  }, [updateFormData, currentStep]);

  return (
    <Box width="100%">
      <Box pt={"48px"}>
        <FormGroup.Selectable
          label={label}
          labelSize="large"
          helperText={helperText}
          options={options}
          value={currentValue}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
});

MultipleChoice.displayName = "MultipleChoice";
