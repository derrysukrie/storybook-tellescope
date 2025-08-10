import { Box, Stack, Typography } from "@mui/material";
import { FormControlAtom } from "../../../Atoms/Form";
import { Input } from "../../../components/atoms/input/input";
import { useFormContext } from "../FormContext";
import { useState } from "react";

interface EmailFieldProps {
  title?: string;
  helperText?: string;
}

export const EmailField = ({ title, helperText }: EmailFieldProps) => {
  const { updateFormData, currentStep } = useFormContext();
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    updateFormData(currentStep, newValue);
  };

  return (
    <Box width="100%">
      <Box pt={"48px"}>
        <Stack gap={"12px"}>
          <Typography variant="h5">{title}</Typography>
          <FormControlAtom variant="outlined" fullWidth>
            <Input
              appearance="distinct"
              size="medium"
              type="email"
              placeholder="Your email"
              hiddenLabel
              value={value}
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
