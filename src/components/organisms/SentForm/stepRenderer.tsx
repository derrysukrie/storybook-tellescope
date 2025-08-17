import type { StepConfig } from "./types/types";
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
  SignatureConsent,
  Date,
  Rating,
  Ranking,
  DateTime,
  Address,
  Time,
  Insurance,
  Height,
} from "./Steps";

// Helper function for steps with title and helperText
const renderTextStep = (Component: any, step: any) => (
  <Component title={step.title} helperText={step.helperText} />
);

// Helper function for steps with title and placeholder
const renderDateStep = (Component: any, step: any) => (
  <Component title={step.title} placeholder={step.placeholder} />
);

// Simplified step renderer with better organization
export const renderStep = (step: StepConfig) => {
  const { type } = step;

  // Steps with no props
  if (type === "intro") return <FormIntro />;
  if (type === "signatureConsent") return <SignatureConsent />;
  if (type === "fileUpload") return <FileUploader />;
  if (type === "address") return <Address />;
  if (type === "time") return <Time />;
  if (type === "insurance") return <Insurance />;
  if (type === "height") return <Height />;
  // Steps with title and helperText only
  if (type === "text") return renderTextStep(TextField, step);
  if (type === "email") return renderTextStep(EmailField, step);
  if (type === "phone") return renderTextStep(PhoneNumber, step);
  if (type === "number") return renderTextStep(NumberField, step);
  if (type === "longText") return renderTextStep(LongTextField, step);

  // Steps with title and placeholder
  if (type === "date") return renderDateStep(Date, step);
  if (type === "dateTime") return renderDateStep(DateTime, step);

  // Steps with specific props
  if (type === "rating") {
    return (
      <Rating
        min={step.min}
        max={step.max}
        step={step.step}
        shiftStep={step.shiftStep}
        marks={step.marks}
      />
    );
  }

  if (type === "ranking") {
    return <Ranking items={step.items} />;
  }

  if (type === "questionsGroup") {
    return (
      <QuestionsGroup
        questions={step.questions}
        title={step.title}
        description={step.description}
      />
    );
  }

  if (type === "description") {
    return <Description description={step.description} />;
  }

  if (type === "select") {
    return (
      <SelectField
        title={step.title}
        options={step.options}
        placeholder={step.placeholder}
        helperText={step.helperText}
      />
    );
  }

  if (type === "multiSelect") {
    return (
      <MultipleSelectField
        title={step.title}
        options={step.options}
        placeholder={step.placeholder}
        helperText={step.helperText}
      />
    );
  }

  if (type === "choice") {
    return (
      <MultipleChoice
        label={step.label}
        options={step.options}
        helperText={step.helperText}
      />
    );
  }

  if (type === "checkbox") {
    return (
      <CheckboxField
        title={step.title}
        helperText={step.helperText}
        options={step.options}
      />
    );
  }

  // Unknown step type
  console.warn(`Unknown step type: ${type}`);
  return null;
};
