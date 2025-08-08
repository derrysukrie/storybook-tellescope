import { Box, Stack, Typography } from "@mui/material";
import { FormControlAtom } from "../../../Atoms/Form";
import { Input } from "../../../components/atoms/input/input";
import { useState } from "react";
import { useFormContext } from "../FormContext";

export const NumberField = () => {
  const { updateFormData, currentStep } = useFormContext();
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric
    if (val === "") {
      setValue("");
      updateFormData(currentStep, "");
      return;
    }
    let num = Number(val);
    if (num < 1) num = 1;
    if (num > 10) num = 10;
    const finalValue = num.toString();
    setValue(finalValue);
    updateFormData(currentStep, finalValue);
  };

  return (
    <Box width="100%">
      <Box pt={"48px"}>
        <Stack gap={"12px"}>
          <Typography variant="h5">Enter a number between 1 and 10</Typography>
          <FormControlAtom variant="outlined" fullWidth>
            <Input
              appearance="distinct"
              type="number"
              placeholder="1-10"
              inputMode="numeric"
              size="medium"
              label="Enter a number between 1 and 10"
              value={value}
              onChange={handleChange}
              sx={{
                backgroundColor: "white",
                width: "100%",
              }}
            />
          </FormControlAtom>
          <Typography color="text.secondary" variant="caption">
            The location is where you’re treatment supplies will be shipped, if prescibed
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
