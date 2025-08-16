import type { Meta, StoryObj } from "@storybook/react";
import { AttachedFile } from "./AttachedFile";

const meta: Meta<typeof AttachedFile> = {
  title: "Atoms/Attached File",
  component: AttachedFile,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    fileName: { control: 'text' },
    fileType: { control: 'text' },
    onRemove: { action: 'removed' },

  },
};

export default meta;

type Story = StoryObj<typeof AttachedFile>;

export const Default: Story = {
  args: {
    fileName: "file...",
    fileType: "jpeg",
  },
};
