import { Box, Stack, Typography } from "@mui/material";
import { FormControlAtom } from "../../../Atoms/Form";
import Textarea from "../../../components/atoms/textarea/textarea";
import { useFormContext } from "../FormContext";
import { useState } from "react";

export const LongTextField = () => {
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
          <Typography variant="h5">What would you like to be called?</Typography>
          <FormControlAtom variant="outlined" fullWidth>
            <Textarea
              appearance="distinct"
              hiddenLabel
              placeholder="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
              rows={2}
              value={value}
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
