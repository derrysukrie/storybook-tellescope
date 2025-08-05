import type { Meta, StoryObj } from "@storybook/react";
import ScrollableSection from "./Scrollable";

export default {
  title: "Molecules/Scrollable Section",
  component: ScrollableSection,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof ScrollableSection>;

type Story = StoryObj<typeof ScrollableSection>;

export const Default: Story = {
  render: () => <ScrollableSection />,
};
