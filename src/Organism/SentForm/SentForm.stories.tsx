import type { Meta, StoryObj } from "@storybook/react";
import { SentForm } from "./SentForm";
import {
  FormIntro,
  Description,
  TextField,
  QuestionsGroup,
  LongTextField,
  NumberField,
  EmailField,
  PhoneNumber,
  MultipleChoice,
  CheckboxField,
  SelectField,
  MultipleSelectField,
} from "./Steps";
import Graphic from "./Steps/Graphic";

const meta = {
  title: "Organisms/SentForm/CompleteExample",
  component: SentForm,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof SentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CompleteFormExample: Story = {
  args: {
    steps: [
      {
        id: "intro",
        content: <FormIntro />,
      },
      {
        id: "description",
        content: (
          <Description description="Great, we have a variety of plans to fit your needs. Let's start with some questions about you, after that we'll find the plan that's a perfect fit!" />
        ),
      },
      {
        id: "graphic",
        content: (
          <Graphic
            image="https://dummyimage.com/wuxga"
            description="a longer label and will displayed at a smaller size in order to conserve valuable space. This can be used to display some disclaimer about terms or conditions that might be a bit too long for a normal label area"
          />
        ),
      },
      {
        id: "name",
        content: <TextField />,
      },
      {
        id: "questions_group",
        content: <QuestionsGroup />,
      },
      {
        id: "long_text",
        content: <LongTextField />,
      },
      {
        id: "number",
        content: <NumberField />,
      },
      {
        id: "email",
        content: <EmailField />,
      },
      {
        id: "phone",
        content: <PhoneNumber />,
      },
      {
        id: "multiple_choice",
        content: <MultipleChoice />,
      },
      {
        id: "checkbox",
        content: <CheckboxField />,
      },
      {
        id: "select",
        content: <SelectField />,
      },
      {
        id: "multiple_select",
        content: <MultipleSelectField />,
      },
    ],
    onFormDataChange: (formData) => {
      console.log("Form data updated:", formData);
      // This will show all collected form data in real-time
      // Example output:
      // {
      //   name: "John Doe",
      //   questions_group_question1: "Answer 1",
      //   questions_group_question2: "Answer 2",
      //   long_text: "Long text content",
      //   number: "5",
      //   email: "john@example.com",
      //   phone: "123-456-7890",
      //   multiple_choice: "2",
      //   checkbox: ["1", "3"],
      //   select: "2",
      //   multiple_select: ["1", "2"]
      // }
    },
    onComplete: () => {
      console.log("Form completed! All data collected successfully.");
    },
  },
}; 