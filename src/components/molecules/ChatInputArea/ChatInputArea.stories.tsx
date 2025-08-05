import type { Meta, StoryObj } from "@storybook/react";
import { ChatInputArea } from "./ChatInputArea";

const meta: Meta<typeof ChatInputArea> = {
  title: "Molecules/Chat Input Area",
  component: ChatInputArea,
};

export default meta;

type Story = StoryObj<typeof ChatInputArea>;

export const Default: Story = {};
