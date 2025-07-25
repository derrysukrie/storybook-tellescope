import type { Meta, StoryObj } from "@storybook/react";
import { Chat } from "./Chat";
import { sampleMessages, reactions } from "./data";

const meta: Meta<typeof Chat> = {
  title: "Organism/ItemViewer/Chat",
  component: Chat,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A component that displays a message and a message input.",
      },
    },
  },
  argTypes: {
    setEnableTeamChat: { action: "setEnableTeamChat" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithMessages: Story = {
  args: {
    chatInterface: "CHAT",
    content: sampleMessages,
    reactions: reactions,
    enableTeamChat: false,
  },
  parameters: {
    docs: {
      description: {
        story: "A view showing the Message component.",
      },
    },
  },
};

export const Empty: Story = {
  args: {
    chatInterface: "CHAT",
    ...WithMessages.args,
    content: [],
  },
  parameters: {
    docs: {
      description: {
        story: "A view showing the Chat component with no messages.",
      },
    },
  },
};

export const TeamChatEnabled: Story = {
  args: {
    chatInterface: "CHAT",
    reactions: [],
    ...WithMessages.args,
    enableTeamChat: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "A view showing the Chat component with Team Chat switch enabled.",
      },
    },
  },
};
