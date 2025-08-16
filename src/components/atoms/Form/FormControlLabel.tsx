import { FormControlLabel as MuiFormControlLabel, type FormControlLabelProps } from "@mui/material";

export const FormControlLabel = ({
  control,
  label,
  labelPlacement = "end",
}: FormControlLabelProps) => {
  return (
    <MuiFormControlLabel
      control={control}
      label={label}
      labelPlacement={labelPlacement}
    />
  );
};