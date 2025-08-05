import type { Meta } from "@storybook/react";
import { ChatConversation } from "./ChatConversation";

const meta: Meta<typeof ChatConversation> = {
  title: "Molecules/Chat conversations",
  component: ChatConversation,
};

export default meta;

export const Default: Meta<typeof ChatConversation> = {};
