# SentForm - Step Value Extraction

This document explains how to extract values from every step in the SentForm component.

## Overview

The SentForm component now supports extracting form data from all steps using a centralized form state management system. Each step can contribute its data to the overall form state.

## How to Extract Step Values

### 1. Using the Form Context (Recommended)

Each step component can use the `useFormContext` hook to access form utilities:

```tsx
import { useFormContext } from "../FormContext";

export const MyStepComponent = () => {
  const { updateFormData, currentStep } = useFormContext();
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    // This automatically updates the form data
    updateFormData(currentStep, newValue);
  };

  return (
    <Input value={value} onChange={handleChange} />
  );
};
```

### 2. Step Configuration

When defining steps, add an `id` to track the step's data:

```tsx
const steps = [
  {
    id: "name",
    content: <TextFieldWithValue />,
  },
  {
    id: "email", 
    content: <EmailFieldWithValue />,
  },
  {
    id: "phone",
    content: <PhoneFieldWithValue />,
  }
];
```

### 3. Accessing All Form Data

The SentForm component provides callbacks to access form data:

```tsx
<SentForm
  steps={steps}
  onFormDataChange={(formData) => {
    console.log("Form data updated:", formData);
    // formData = { name: "John", email: "john@example.com", phone: "123-456-7890" }
  }}
  onComplete={() => {
    console.log("Form completed!");
  }}
/>
```

## Available Form Context Methods

- `updateFormData(stepId, value)` - Updates form data for a specific step
- `getFormData()` - Returns current form data
- `getAllStepValues()` - Returns all collected form values
- `currentStep` - Current step identifier

## Example Implementation

See `SentFormWithDataExtraction.stories.tsx` for a complete example showing how to:

1. Create step components that extract values
2. Configure steps with IDs
3. Handle form data changes
4. Access all form data on completion

## Data Flow

1. User interacts with a step component
2. Step component calls `updateFormData()` with its value
3. Form state is updated centrally
4. `onFormDataChange` callback is triggered with updated data
5. On form completion, all collected data is available via `getAllStepValues()`

## Benefits

- **Centralized State**: All form data is managed in one place
- **Real-time Updates**: Form data is updated as users interact
- **Type Safety**: Full TypeScript support
- **Flexible**: Works with any step component structure
- **Reusable**: Step components can be reused across different forms 