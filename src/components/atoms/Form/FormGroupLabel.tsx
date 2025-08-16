import React from "react";
import { InputLabel } from "@mui/material";
import type { SxProps } from "@mui/system";

export interface FormGroupLabelProps {
  children?: React.ReactNode;
  labelSize?: "default" | "large";
  error?: boolean;
  sx?: SxProps;
  disabled?: boolean;
}

export const FormGroupLabel: React.FC<FormGroupLabelProps> = ({
  children,
  labelSize = "default",
  error,
  disabled,
  sx,
}) => {
  return (
    <InputLabel
      disabled={disabled}
      error={error}
      sx={{
        fontSize: labelSize === "large" ? "1.25rem" : "1rem",
        lineHeight: labelSize === "large" ? 1.3 : 1.4,
        mb: 1,
        position: "static",
        transform: "none",
        ...sx,
      }}
    >
      {children}
    </InputLabel>
  );
};
