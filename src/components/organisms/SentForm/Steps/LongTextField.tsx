import { Box, Stack, Typography } from "@mui/material";
import { FormControlAtom } from "../../../atoms";
import Textarea from "../../../atoms/textarea/textarea";
import { useFormContext } from "../FormContext";
import { useCallback } from "react";

export const LongTextField = ({ title, helperText }: { title?: string; helperText?: string }) => {
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
            <Textarea
              appearance="distinct"
              hiddenLabel
              placeholder="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
              rows={2}
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
