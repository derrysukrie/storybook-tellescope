import { FormHelperText as MuiFormHelperText } from "@mui/material";

interface FormHelperTextProps {
  children: React.ReactNode;
  error?: boolean;
}

export const FormHelperText = ({ children, error = false }: FormHelperTextProps) => {
  return (
    <MuiFormHelperText
      error={error}
      sx={{
        mr: 0,
        ml: 0,
        mb: 4,
        pt: 1,
        color: error ? "error.main" : "text.secondary",
      }}
    >
      {children}
    </MuiFormHelperText>
  );
};
