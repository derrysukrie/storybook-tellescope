import type { Meta, StoryObj } from "@storybook/react";
import { SentForm } from "./SentForm";

const meta = {
  title: "Organisms/SentForm",
  component: SentForm,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof SentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Common options for better DX
const commonOptions = {
  countries: [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "other", label: "Other" },
  ],
  
  interests: [
    { value: "tech", label: "Technology" },
    { value: "health", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "education", label: "Education" },
    { value: "sports", label: "Sports" },
    { value: "travel", label: "Travel" },
  ],
  
  contactMethods: [
    { id: "email", label: "Email", value: "email" },
    { id: "phone", label: "Phone call", value: "phone" },
    { id: "sms", label: "Text message", value: "sms" },
    { id: "mail", label: "Postal mail", value: "mail" },
  ],
  
  planTypes: [
    { id: "basic", label: "Basic Plan", value: "basic" },
    { id: "premium", label: "Premium Plan", value: "premium" },
    { id: "enterprise", label: "Enterprise Plan", value: "enterprise" },
    { id: "custom", label: "Custom Solution", value: "custom" },
  ],
};

export const Default: Story = {
  args: {
    steps: [
      // ✅ Proper form structure with intro first
      {
        type: "intro",
        id: "welcome",
      },
      {
        type: "fileUpload",
        id: "fileUpload",
      },
      {
        type: "description",
        id: "description",
        description: "Great, we have a variety of plans to fit your needs. Let's start with some questions about you, after that we'll find the plan that's a perfect fit!",
      },
      {
        type: "select",
        id: "location",
        title: "Where are you located?",
        options: commonOptions.countries,
        placeholder: "Choose your country",
        helperText: "This helps us provide location-specific services",
      },
      {
        type: "multiSelect",
        id: "interests",
        title: "What are your interests?",
        options: commonOptions.interests,
        placeholder: "Select multiple interests",
        helperText: "Choose all that apply to help personalize your experience",
      },
      {
        type: "choice",
        id: "plan_type",
        label: "What type of plan are you looking for?",
        options: commonOptions.planTypes,
        helperText: "Choose the plan that best fits your needs",
      },
      {
        type: "text",
        id: "name",
      },
      {
        type: "email",
        id: "email",
      },
      {
        type: "phone",
        id: "phone",
      },
      {
        type: "number",
        id: "age",
      },
      {
        type: "longText",
        id: "description",
      },
      {
        type: "checkbox",
        id: "preferences",
        title: "What are your preferences?",
        options: [
          { value: "newsletter", label: "Receive newsletter" },
          { value: "updates", label: "Product updates" },
          { value: "marketing", label: "Marketing emails" },
        ],
        helperText: "Select all that apply",
      },
    ],
    onFormDataChange: (formData) => {
      console.log("Form data updated:", formData);
    },
    onComplete: (formData) => {
      console.log("Form completed with data:", formData);
    },
  },
};
