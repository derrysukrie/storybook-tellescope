import { Typography, FormControlLabel, Stack } from "@mui/material";
import CheckBox from "../../../components/atoms/checkbox/checkbox";
import { useState } from "react";
import { FormControlAtom } from "../../../Atoms/Form/FormControl";
import { Input } from "../../../components/atoms/input/input";
import { useFormContext } from "../FormContext";

export const SignatureConsent = () => {
  const { updateFormData, currentStep } = useFormContext();
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("");

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setChecked(newChecked);
    updateFormData(`${currentStep}_consent`, newChecked);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    updateFormData(`${currentStep}_signature`, newValue);
  };

  return (
    <Stack pt="48px" gap="12px" direction="column" display="flex">
      <Typography variant="h5">Electronic signature policy</Typography>
      <FormControlLabel
        sx={{ pl: "10px" }}
        control={<CheckBox onChange={handleCheckboxChange} checked={checked} />}
        label="I consent to using electronic signatures"
      />
      <FormControlAtom variant="outlined" fullWidth>
        <Input
          appearance="distinct"
          size="medium"
          label={
            "I agree to the electronic signature policy and I declare that I am the person signing this request"
          }
          value={value}
          onChange={handleInputChange}
          sx={{
            backgroundColor: "white",
            width: "100%",
          }}
        />
      </FormControlAtom>
    </Stack>
  );
};
