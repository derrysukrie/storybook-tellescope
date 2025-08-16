import {
  FormControlAtom,
  FormGroupLabel,
  FormHelperText,
} from "../../../../Atoms";
import { Stack } from "@mui/material";
import { useState } from "react";
import Textarea from "../../../atoms/textarea/textarea";

type Option = {
  label: string;
  value: string;
};

export const TextAreaGroup = ({
  label,
  labelSize,
  helperText,
  options,
  value: controlledValue,
  onChange,
}: {
  label: string;
  labelSize?: "default" | "large";
  helperText?: string;
  options: Option[];
  value?: Record<string, string>;
  onChange?: (value: Record<string, string>) => void;
}) => {
  const [internalValue, setInternalValue] = useState<Record<string, string>>(
    () => {
      const initialValue: Record<string, string> = {};
      for (const option of options) {
        initialValue[option.value] = "";
      }
      return initialValue;
    }
  );

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (optionValue: string, text: string) => {
    const newValue = { ...value, [optionValue]: text };
    if (onChange) {
      onChange(newValue);
    }
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

  return (
    <FormControlAtom variant="standard">
      <FormGroupLabel labelSize={labelSize}>{label}</FormGroupLabel>
      <Stack direction="column" gap={2}>
        {options.map((option) => (
          <Textarea
            appearance="outlined"
            key={option.value}
            // label={option.label}
            hiddenLabel
            value={value[option.value] || ""}
            onChange={(e) => handleChange(option.value, e.target.value)}
            // sx={{
            //     "& .MuiOutlinedInput-root": {
            //         // Jangan ubah border saat hover dan focus
            //         "&:hover .MuiOutlinedInput-notchedOutline": {
            //             // borderColor: "inherit", // atau biarkan kosong
            //         },
            //         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            //             borderColor: "inherit", // atau biarkan kosong
            //             boxShadow: "none",
            //         },
            //     },
            // }}
          />
        ))}
      </Stack>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControlAtom>
  );
};
