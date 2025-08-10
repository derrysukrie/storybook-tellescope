import { FormControlAtom } from "../../../Atoms/Form";
import { Input } from "../../../components/atoms/input/input";
import { useCallback } from "react";
import { StepWrapper, useStepField, commonValidations } from "./shared";
import type { TextFieldStepProps } from "./types";

export const EmailField = ({ 
  title, 
  helperText, 
  placeholder = "Your email",
  required = false,
  disabled = false,
  stepId
}: TextFieldStepProps) => {
  const { value, error, handleChange, handleBlur } = useStepField({
    stepId,
    required,
    validations: [commonValidations.email()]
  });

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value);
  }, [handleChange]);

  return (
    <StepWrapper title={title} helperText={helperText} error={error || undefined}>
      <FormControlAtom variant="outlined" fullWidth>
        <Input
          appearance="distinct"
          size="medium"
          type="email"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={disabled}
          error={!!error}
          sx={{
            backgroundColor: "white",
            width: "100%",
          }}

        />
      </FormControlAtom>
    </StepWrapper>
  );
};
