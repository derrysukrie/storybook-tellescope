import type { Meta, StoryObj } from "@storybook/react";
import { SuggestedAction } from "./SuggestedAction";

const meta: Meta<typeof SuggestedAction> = {
  title: "Atoms/Suggested Action",
  component: SuggestedAction,
  args: {
    truncated: false,
  },
  argTypes: {
    truncated: {
      control: "boolean",
    },
  },
};

export default meta;

interface Story extends StoryObj<typeof SuggestedAction> {}

export const Default: Story = {};
