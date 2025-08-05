import type { Meta, StoryObj } from "@storybook/react";
import { SentForm } from "./SentForm";
import { Description, FormIntro, TextField, QuestionsGroup, LongTextField, NumberField, EmailField, PhoneNumber, MultipleChoice, CheckboxField, SelectField, MultipleSelectField } from "./Steps";
import Graphic from "./Steps/Graphic";

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

export const Default: Story = {
  args: {
    steps: [
      {
        content: <FormIntro />,
      },
      {
        content: <Description />,
      },
      {
        content: <Graphic />,
      },
      {
        content: <TextField />,
      },
      {
        content: <QuestionsGroup />,
      },
      {
        content: <LongTextField />,
      },
      {
        content: <NumberField />,
      },
      {
        content: <EmailField />,
      },
      {
        content: <PhoneNumber />,
      },
      {
        content: <MultipleChoice />,
      },
      {
        content: <CheckboxField />,
      },
      {
        content: <SelectField />,
      },
      {
        content: <MultipleSelectField />,
      },
    ],
  },
};
