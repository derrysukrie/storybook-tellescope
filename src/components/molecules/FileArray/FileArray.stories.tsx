import type { Meta, StoryObj } from "@storybook/react";
import { FileArray } from "./FileArray";

const meta: Meta<typeof FileArray> = {
  title: "Molecules/FileArray",
  component: FileArray,
};

export default meta;

interface Story extends StoryObj<typeof FileArray> {}

export const Default: Story = {};
