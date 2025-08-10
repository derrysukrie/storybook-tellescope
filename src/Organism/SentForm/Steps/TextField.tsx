import { Box, Stack, Typography } from "@mui/material";
import { FormControlAtom } from "../../../Atoms/Form";
import { Input } from "../../../components/atoms/input/input";
import { useFormContext } from "../FormContext";
import { useCallback } from "react";

interface TextFieldProps {
  title?: string;
  helperText?: string;
}

export const TextField = ({ title, helperText }: TextFieldProps) => {
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
          <Typography variant="h5">{title}</Typography>
          <FormControlAtom variant="outlined" fullWidth>
            <Input
              appearance="distinct"
              size="medium"
              label={"Okeanos Withburga"}
              value={currentValue}
              onChange={handleChange}
              sx={{
                backgroundColor: "white",
                width: "100%",
              }}
            />
          </FormControlAtom>
          <Typography color="text.secondary" variant="caption">
            {helperText}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
