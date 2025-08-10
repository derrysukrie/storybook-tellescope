import type { StepConfig } from "./types";
import {
  FileUploader,
  QuestionsGroup,
  SelectField,
  MultipleSelectField,
  MultipleChoice,
  TextField,
  EmailField,
  PhoneNumber,
  NumberField,
  LongTextField,
  CheckboxField,
  FormIntro,
  Description,
} from "./Steps";

// Internal step renderer for the Organism
export const renderStep = (step: StepConfig) => {
  switch (step.type) {
    
    case "intro":
      return <FormIntro />;

    case "questionsGroup":
      return <QuestionsGroup questions={step.questions} title={step.title} description={step.description} />;

    case "description":
      return <Description description={step.description} />;

    case "select":
      return <SelectField title={step.title} options={step.options} placeholder={step.placeholder} helperText={step.helperText} />;

    case "multiSelect":
      return <MultipleSelectField title={step.title} options={step.options} placeholder={step.placeholder} helperText={step.helperText} />;

    case "choice":
      return <MultipleChoice label={step.label} options={step.options} helperText={step.helperText} />;

    case "text":
      return <TextField title={step.title} helperText={step.helperText} />;

    case "email":
      return <EmailField title={step.title} helperText={step.helperText} />;

    case "phone":
      return <PhoneNumber title={step.title} helperText={step.helperText} />;

    case "number":
      return <NumberField title={step.title} helperText={step.helperText} />;

    case "longText":
      return <LongTextField />;

    case "checkbox":
      return <CheckboxField />;

    case "fileUpload":
      return <FileUploader />;



    default:
      return null;
  }
};
