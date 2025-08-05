import type { Meta, StoryObj } from "@storybook/react";
import { AttachedFile } from "./AttachedFile";

const meta: Meta<typeof AttachedFile> = {
  title: "Atoms/Attached File",
  component: AttachedFile,
};

export default meta;

interface Story extends StoryObj<typeof AttachedFile> {}

export const Default: Story = {};
