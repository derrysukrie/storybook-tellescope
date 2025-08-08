import { Box } from "@mui/material";
import { FormGroup } from "../../../Molecules/FormGroup";
import { useFormContext } from "../FormContext";
import { useState } from "react";

export const MultipleChoice = () => {
  const { updateFormData, currentStep } = useFormContext();
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (value: string | string[]) => {
    const selectedValue = Array.isArray(value) ? value[0] || "" : value;
    setSelectedValue(selectedValue);
    updateFormData(currentStep, selectedValue);
  };

  return (
    <Box width="100%">
      <Box pt={"48px"}>
        <FormGroup.Selectable
          label="Select your location"
          labelSize="large"
          helperText="This is a helper text"
          options={[
            { id: "1", label: "This is a selectable  question ", value: "1" },
            { id: "2", label: "This is a selectable  question ", value: "2" },
            { id: "3", label: "This is a selectable  question ", value: "3" },
          ]}
          value={selectedValue}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};
