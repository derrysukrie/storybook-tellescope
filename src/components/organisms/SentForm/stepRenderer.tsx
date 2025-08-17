import { lazy, Suspense } from 'react';
import type { StepConfig } from "./types/types";
import { StepSkeleton } from './Steps/StepSkeleton';

// Helper function to create lazy loaded components
const lazyLoad = (path: string, exportName: string) => 
  lazy(() => 
    import(`./Steps/${path}.tsx`)
      .then(module => ({ default: module[exportName] }))
      .catch(error => {
        console.error(`Error loading module ${path}:`, error);
        return import(`./Steps/StepSkeleton`).then(module => ({ default: module.StepSkeleton }));
      })
  );

// Lazy load step components
const FormIntro = lazyLoad('FormIntro', 'FormIntro');
const QuestionsGroup = lazyLoad('QuestionsGroup', 'QuestionsGroup');
const SelectField = lazyLoad('SelectField', 'SelectField');
const MultipleSelectField = lazyLoad('MultipleSelectField', 'MultipleSelectField');
const MultipleChoice = lazyLoad('MultipleChoice', 'MultipleChoice');
const TextField = lazyLoad('TextField', 'TextField');
const EmailField = lazyLoad('EmailField', 'EmailField');
const PhoneNumber = lazyLoad('PhoneNumber', 'PhoneNumber');
const NumberField = lazyLoad('NumberField', 'NumberField');
const LongTextField = lazyLoad('LongTextField', 'LongTextField');
const CheckboxField = lazyLoad('CheckboxField', 'CheckboxField');
const Description = lazyLoad('Description', 'Description');
const SignatureConsent = lazyLoad('SignatureConsent', 'SignatureConsent');
const Date = lazyLoad('Date', 'Date');
const Rating = lazyLoad('Rating', 'Rating');
const Ranking = lazyLoad('Ranking', 'Ranking');
const DateTime = lazyLoad('DateTime', 'DateTime');
const Address = lazyLoad('Address', 'Address');
const Time = lazyLoad('Time', 'Time');
const Insurance = lazyLoad('Insurance', 'Insurance');
const Height = lazyLoad('Height', 'Height');
const FileUploader = lazyLoad('FileUploader', 'FileUploader');

// Generic wrapper for Suspense
const withSuspense = <T extends object>(Component: React.ComponentType<T>, props?: T) => (
  <Suspense fallback={<StepSkeleton />}>
    {props ? <Component {...props} /> : <Component {...({} as T)} />}
  </Suspense>
);

// Helper function for steps with title and helperText
const renderTextStep = (Component: any, step: any) => withSuspense(Component, {
  title: step.title,
  helperText: step.helperText
});

// Helper function for steps with title and placeholder
const renderDateStep = (Component: any, step: any) => withSuspense(Component, {
  title: step.title,
  placeholder: step.placeholder
});

// Simplified step renderer with better organization
export const renderStep = (step: StepConfig) => {
  const { type } = step;

  // Steps with no props
  if (type === "intro") return withSuspense(FormIntro);
  if (type === "signatureConsent") return withSuspense(SignatureConsent);
  if (type === "fileUpload") return withSuspense(FileUploader);
  if (type === "address") return withSuspense(Address);
  if (type === "time") return withSuspense(Time);
  if (type === "insurance") return withSuspense(Insurance);
  if (type === "height") return withSuspense(Height);
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
    return withSuspense(Rating, {
      min: step.min,
      max: step.max,
      step: step.step,
      shiftStep: step.shiftStep,
      marks: step.marks
    });
  }

  if (type === "ranking") {
    return withSuspense(Ranking, { items: step.items });
  }

  if (type === "questionsGroup") {
    return withSuspense(QuestionsGroup, {
      questions: step.questions,
      title: step.title,
      description: step.description
    });
  }

  if (type === "description") {
    return withSuspense(Description, { description: step.description });
  }

  if (type === "select") {
    return withSuspense(SelectField, {
      title: step.title,
      options: step.options,
      placeholder: step.placeholder,
      helperText: step.helperText
    });
  }

  if (type === "multiSelect") {
    return withSuspense(MultipleSelectField, {
      title: step.title,
      options: step.options,
      placeholder: step.placeholder,
      helperText: step.helperText
    });
  }

  if (type === "choice") {
    return withSuspense(MultipleChoice, {
      label: step.label,
      options: step.options,
      helperText: step.helperText
    });
  }

  if (type === "checkbox") {
    return withSuspense(CheckboxField, {
      title: step.title,
      helperText: step.helperText,
      options: step.options
    });
  }

  // Unknown step type
  console.warn(`Unknown step type: ${type}`);
  return null;
};
