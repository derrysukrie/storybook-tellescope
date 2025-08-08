import { Box, Stack, Typography } from "@mui/material";
import { FormControlAtom } from "../../../Atoms/Form";
import { Input } from "../../../components/atoms/input/input";
import { useFormContext } from "../FormContext";
import { useState } from "react";

export const QuestionsGroup = () => {
  const { updateFormData, currentStep } = useFormContext();
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue1(newValue);
    updateFormData(`${currentStep}_question1`, newValue);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue2(newValue);
    updateFormData(`${currentStep}_question2`, newValue);
  };

  return (
    <Box width="100%">
      <Box pt={"48px"}>
        <Stack gap={"48px"}>
          <Box display={"flex"} flexDirection={"column"} gap={"16px"}>
            <Typography variant="h5">Question group</Typography>
            <Typography variant="body2">A paragraph of question group details</Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={"12px"}>
            <Typography variant="h5">What would you like to be called?</Typography>
            <FormControlAtom variant="outlined" fullWidth>
              <Input
                appearance="distinct"
                size="medium"
                value={value1}
                onChange={handleChange1}
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                }}
              />
            </FormControlAtom>
            <Typography color="text.secondary" variant="caption">
              The location is where you're treatment supplies will be shipped, if prescibed
            </Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={"12px"}>
            <Typography variant="h5">What would you like to be called?</Typography>
            <FormControlAtom variant="outlined" fullWidth>
              <Input
                appearance="distinct"
                size="medium"
                hiddenLabel
                value={value2}
                onChange={handleChange2}
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                }}
              />
            </FormControlAtom>
            <Typography color="text.secondary" variant="caption">
              The location is where you're treatment supplies will be shipped, if prescibed
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
