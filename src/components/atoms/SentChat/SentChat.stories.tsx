import type { Meta, StoryObj } from "@storybook/react";
import SentChat from "./SentChat";

const meta: Meta<typeof SentChat> = {
  title: "Atoms/Sent Chat",
  component: SentChat,
};

export default meta;

type Story = StoryObj<typeof SentChat>;

export const Default: Story = {
  args: {
    message: "How many patients are in the sync to healthie journey?",
  },
  argTypes: {
    message: {
      control: {
        table: {
          disable: true,
        },
      },
    },
  },
  render: (args) => {
    return <SentChat {...args} />;
  },
};
