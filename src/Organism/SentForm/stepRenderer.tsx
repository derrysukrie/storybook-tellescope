import { SelectField } from "./Steps/SelectField";
import { MultipleSelectField } from "./Steps/MultipleSelectField";
import { MultipleChoice } from "./Steps/MultipleChoice";
import { TextField } from "./Steps/TextField";
import { EmailField } from "./Steps/EmailField";
import { PhoneNumber } from "./Steps/PhoneNumber";
import { NumberField } from "./Steps/NumberField";
import { LongTextField } from "./Steps/LongTextField";
import { CheckboxField } from "./Steps/CheckboxField";
import { FormIntro } from "./Steps/FormIntro";
import { Description } from "./Steps/Description";
import type { StepConfig } from "./types";

// Internal step renderer for the Organism
export const renderStep = (step: StepConfig) => {
  switch (step.type) {
    case "intro":
      return <FormIntro />;
      
    case "description":
      return <Description description={step.description} />;
      
    case "select":
      return (
        <SelectField
          title={step.title}
          options={step.options}
          placeholder={step.placeholder}
          helperText={step.helperText}
        />
      );
      
    case "multiSelect":
      return (
        <MultipleSelectField
          title={step.title}
          options={step.options}
          placeholder={step.placeholder}
          helperText={step.helperText}
        />
      );
      
    case "choice":
      return (
        <MultipleChoice
          label={step.label}
          options={step.options}
          helperText={step.helperText}
        />
      );
      
    case "text":
      return <TextField />;
      
    case "email":
      return <EmailField />;
      
    case "phone":
      return <PhoneNumber />;
      
    case "number":
      return <NumberField />;
      
    case "longText":
      return <LongTextField />;
      
    case "checkbox":
      return <CheckboxField />;
      
    default:
      throw new Error(`Unknown step type: ${(step as any).type}`);
  }
}; 