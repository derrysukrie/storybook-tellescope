import {
  FormControlLabel,
  RadioGroup as MuiRadioGroup,

} from "@mui/material";
import {
  FormControlAtom,
  FormGroupLabel,
  FormHelperText,
} from "../../../../components/atoms";
import { Radio } from "../../../atoms/radio/radio";

type Option = {
  label: string;
  value: string;
};

export const RadioGroup = ({
  label,
  helperText,
  labelSize,
  onChange,
  options,
}: {
  label: string;
  labelSize?: "default" | "large";
  helperText: string;
  options: Option[];
  onChange: (value: string) => void;
}) => {
  return (
    <FormControlAtom variant="standard">
      <FormGroupLabel labelSize={labelSize}>{label}</FormGroupLabel>
      <MuiRadioGroup onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </MuiRadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControlAtom>
  );
};
