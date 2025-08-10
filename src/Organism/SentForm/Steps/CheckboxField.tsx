import { Box } from "@mui/material";
import { FormGroup } from "../../../Molecules/FormGroup";
import { useState } from "react";
import { useFormContext } from "../FormContext";
import type { CheckboxStepConfig } from "../types/types";

export const CheckboxField = ({ title, helperText, options }: CheckboxStepConfig) => {
  const { updateFormData, currentStep } = useFormContext();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (value: string[]) => {
    setSelectedValues(value);
    updateFormData(currentStep, value);
  };

  return (
    <Box width="100%">
      <Box pt={"48px"}>
        <FormGroup.Checkbox
          label={title}
          labelSize="large"
          helperText={helperText}
          options={options}
          onChange={handleChange}
          value={selectedValues}
        />
      </Box>
    </Box>
  );
};
