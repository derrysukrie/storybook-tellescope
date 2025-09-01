import type { Meta, StoryObj } from "@storybook/react";
import { ChatConversation } from "./ChatConversation";

const meta: Meta<typeof ChatConversation> = {
  title: "Molecules/ChatConversation",
  component: ChatConversation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userMessage: "How many messages am I assigned to currently?",
    responseMessage: "You're currently assigned to 10 messages.",
  },
};
