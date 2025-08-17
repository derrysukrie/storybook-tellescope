import { MenuItem, Stack, type SelectChangeEvent } from "@mui/material";
import { Select } from "../../../atoms";
import { FormControlAtom } from "../../../atoms/Form";
import { StepWrapper, useStepField } from "./shared";
import { useCallback, useMemo } from "react";

const feetOptions = ["4", "5", "6", "7", "8", "9", "10", "11", "12"];
const inchesOptions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

// Time object interface
interface HeightData {
  feet: string;
  inches: string;
}

export const Height = () => {
  // Single field hook that stores the entire time object
  const { value: heightData, error, handleChange: handleHeightChange, handleBlur } = useStepField({
    stepId: "height",
    required: true,
    validations: [],
    defaultValue: {
      feet: "",
      inches: "",
    } as HeightData,
  });

  // Ensure we have a valid time object
  const heightDataValue = useMemo(() => {
    return heightData || {
      feet: "",
      inches: "",
    };
  }, [heightData]);

  // Helper function to update a specific field in the time object
  const updateHeightField = useCallback((field: keyof HeightData, value: string) => {
    const updatedHeight = {
      ...heightData,
      [field]: value,
    };
    handleHeightChange(updatedHeight);
  }, [heightData, handleHeightChange]);

  const renderEmptyFeet = useCallback((selected: string | string[]) => {
    if (typeof selected === "string") {
      // If no value is selected, show placeholder with grey color
      if (!selected) {
        return <span style={{ color: "#999999" }}>Feet</span>;
      }
      return selected;
    }
    return selected;
  }, []);

  const renderEmptyInches = useCallback((selected: string | string[]) => {
    if (typeof selected === "string") {
      if (!selected) {
        return <span style={{ color: "#999999" }}>Inches</span>;
      }
      return selected;
    }
    return selected;
  }, []);

  // Event handlers for Select components
  const handleFeetSelectChange = useCallback(
    (event: SelectChangeEvent<string | string[]>) => {
      const newValue = event.target.value as string;
      updateHeightField("feet", newValue);
    },
    [updateHeightField]
  );

  const handleInchesSelectChange = useCallback(
    (event: SelectChangeEvent<string | string[]>) => {
      const newValue = event.target.value as string;
      updateHeightField("inches", newValue);
    },
    [updateHeightField]
  );


  return (
    <StepWrapper title="Height" error={error || undefined}>
      <FormControlAtom variant="outlined" fullWidth>
        <Stack direction="row" spacing={2}>
          <Select
            appearance="patientForm"
            size="medium"
            value={heightDataValue?.feet}
            onChange={handleFeetSelectChange}
            onBlur={handleBlur}
            displayEmpty
            renderValue={renderEmptyFeet}
            sx={{
              backgroundColor: "white",
            }}
          >
            {feetOptions.map((feet) => (
              <MenuItem key={feet} value={feet}>
                {feet}
              </MenuItem>
            ))}
          </Select>
          <Select
            appearance="patientForm"
            size="medium"
            value={heightDataValue?.inches}
            onChange={handleInchesSelectChange}
            renderValue={renderEmptyInches}
            onBlur={handleBlur}
            displayEmpty
            sx={{
              backgroundColor: "white",
            }}
          >
            {inchesOptions.map((inches) => (
              <MenuItem key={inches} value={inches}>
                {inches}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </FormControlAtom>
    </StepWrapper>
  );
};
