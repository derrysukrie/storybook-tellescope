import type { Meta, StoryObj } from "@storybook/react";
import { ChatFeedback } from "./ChatFeedback";

const meta: Meta<typeof ChatFeedback> = {
  title: "Atoms/Chat Feedback",
  component: ChatFeedback,
};

export default meta;

type Story = StoryObj<typeof ChatFeedback>;

export const Default: Story = {
  args: { type: "default" },
  argTypes: {
    type: {
      control: {
        disable: true,
      },
    },
  },
};

export const Return: Story = {
  args: { type: "return" },
  argTypes: {
    type: {
      control: {
        disable: true,
      },
    },
  },
};

export const Use: Story = {
  args: { type: "use" },
  argTypes: {
    type: {
      control: {
        disable: true,
      },
    },
  },
};
