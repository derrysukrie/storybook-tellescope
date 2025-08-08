import { Box, MenuItem, Stack, Typography, type SelectChangeEvent } from "@mui/material";
import { FormControlAtom } from "../../../Atoms/Form";
import Select from "../../../components/atoms/select/select";
import { useState } from "react";
import { useFormContext } from "../FormContext";

export const MultipleSelectField = () => {
  const { updateFormData, currentStep } = useFormContext();
  const [value, setValue] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string | string[]>) => {
    const newValue = event.target.value as string[];
    setValue(newValue);
    updateFormData(currentStep, newValue);
  };

  return (
    <Box width="100%">
      <Box pt={"48px"}>
        <Stack gap={"12px"}>
          <Typography variant="h5">What would you like to be called?</Typography>
          <FormControlAtom variant="outlined" fullWidth>
            <Select
              appearance="outlined"
              size="small"
              multiple
              value={value}
              onChange={handleChange}
              placeholder="Select an option"
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
              <MenuItem value="1">Option 1</MenuItem>
              <MenuItem value="2">Option 2</MenuItem>
              <MenuItem value="3">Option 3</MenuItem>
            </Select>
          </FormControlAtom>
          <Typography color="text.secondary" variant="caption">
            The location is where you’re treatment supplies will be shipped, if prescibed
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
