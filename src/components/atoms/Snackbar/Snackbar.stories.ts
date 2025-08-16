import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar } from './Snackbar';

const meta: Meta<typeof Snackbar> = {
  title: 'Atoms/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A basic Snackbar component for displaying brief messages to users.',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the snackbar is open (required)',
    },
    message: {
      control: 'text',
      description: 'The message to display in the snackbar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const handleClose = () => {
  console.log('Close action triggered');
};

export const Default: Story = {
  args: {
    open: false,
    message: 'This is a default snackbar message',
    asAlert: false,
  },
};

export const WithActions: Story = {
  args: {
    open: false,
    message: 'Message sent successfully',
    action: React.createElement(
      React.Fragment,
      {},
      React.createElement(Button, { 
        size: 'small',
        variant: 'text',
        color: 'inherit',
        onClick: handleClose 
      }, 'UNDO'),
      React.createElement(IconButton, {
        size: 'small',
        'aria-label': 'close',
        color: 'inherit',
        onClick: handleClose
      }, React.createElement(CloseIcon, { fontSize: 'small' }))
    ),
  },
};

export const Alert: Story = {
  args: {
    open: false,
    message: 'Warning! Please check your input',
    asAlert: true,
  },
}; 