import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Dialog } from './Dialog';
import React from 'react';
import { Typography } from '@mui/material';

const meta = {
  title: 'MOLECULES/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile dialog component built with Material UI that supports various configurations including different sizes, actions, and content types.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the dialog',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
      description: 'The size of the dialog',
    },
    actions: {
      control: 'select',
      options: ['none', 'one', 'two', 'three'],
      description: 'Number of action buttons',
      mapping: {
        none: [],
        one: [
          { label: 'Confirm', onClick: fn(), variant: 'contained' },
        ],
        two: [
          { label: 'Cancel', onClick: fn(), variant: 'text' },
          { label: 'Confirm', onClick: fn(), variant: 'contained' },
        ],
        three: [
          { label: 'Cancel', onClick: fn(), variant: 'text' },
          { label: 'Save Draft', onClick: fn(), variant: 'outlined' },
          { label: 'Publish', onClick: fn(), variant: 'contained' },
        ],
      },
    },
    background: {
      control: 'boolean',
      description: 'Whether to show the background scrim/backdrop',
    },
    closeButton: {
      control: 'boolean',
      description: 'Whether to show the close button in the top-right corner',
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether the dialog can be collapsed/expanded',
    },
  },
  args: {
    open: false,
    title: 'Dialog Title',
    // description: 'This is a dialog with configurable options.',
    size: 'sm',
    background: true,
    closeButton: true,
    collapsible: false,
    actions: 'two',
  },
} satisfies Meta<typeof Dialog>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: React.createElement(Typography, {}, 'This is a sample dialog description that explains what the dialog is for and provides context to the user.'),
    background: false,
    title: 'Dialog Title',
  },
};

export const Collapsed: Story = {
  args: {
    collapsible: true,
    background: true,
    children: React.createElement(Typography, {}, 'This dialog starts in collapsed state and can be expanded to show this content.'),
  },
};
