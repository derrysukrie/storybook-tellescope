import { FormGroup } from "../../../molecules";
import { StepWrapper, useStepField } from "./shared";
import type { CheckboxFieldStepProps } from "./types";

export const CheckboxField = ({ 
  title, 
  helperText, 
  options, 
  stepId,
  required = false,
}: CheckboxFieldStepProps) => {
  const { value, error, handleChange } = useStepField({
    stepId,
    required,
    defaultValue: [],
    validations: []
  });

  const selectedValues = Array.isArray(value) ? value : [];

  return (
    <StepWrapper title={title} helperText={helperText} error={error || undefined}>
      <FormGroup.Checkbox
        options={options}
        onChange={handleChange}
        value={selectedValues}
      />
    </StepWrapper>
  );
};
