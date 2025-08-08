import { Box, Stack, Typography } from "@mui/material";
import { FormControlAtom } from "../../../Atoms/Form";
import { Input } from "../../../components/atoms/input/input";
import { useFormContext } from "../FormContext";
import { useCallback } from "react";

export const TextField = () => {
  const { updateFormData, getFormData, currentStep } = useFormContext();
  
  // Get current value from centralized form state
  const currentValue = getFormData()[currentStep] || "";

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    updateFormData(currentStep, newValue);
  }, [updateFormData, currentStep]);

  return (
    <Box width="100%">
      <Box pt={"48px"}>
        <Stack gap={"12px"}>
          <Typography variant="h5">What would you like to be called?</Typography>
          <FormControlAtom variant="outlined" fullWidth>
            <Input
              appearance="distinct"
              size="medium"
              label="Okeanos Withburga"
              value={currentValue}
              onChange={handleChange}
              sx={{
                backgroundColor: "white",
                width: "100%",
              }}
            />
          </FormControlAtom>
          <Typography color="text.secondary" variant="caption">
            The location is where you're treatment supplies will be shipped, if prescibed
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
