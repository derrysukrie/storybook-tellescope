import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { BaseStepProps } from "../types";

interface StepWrapperProps extends BaseStepProps {
  children: ReactNode;
  className?: string;
}

export const StepWrapper = ({ 
  children, 
  title, 
  helperText, 
  error, 
  className 
}: StepWrapperProps) => {
  return (
    <Box width="100%" className={className}>
      <Box pt="48px">
        <Stack gap="12px">
          {title && (
            <Typography variant="h5" color={error ? "error.main" : "text.primary"}>
              {title}
            </Typography>
          )}
          {children}
          {(helperText || error) && (
            <Typography 
              color={error ? "error.main" : "text.secondary"} 
              variant="caption"
            >
              {error || helperText}
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
}; 