import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./Page";

const meta: Meta<typeof Page> = {
  title: "Atoms/Page",
  component: Page,
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

interface Story extends StoryObj<typeof Page> {}

export const Default: Story = {};
