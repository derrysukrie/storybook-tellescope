import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer } from './Drawer';
import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const meta = {
  title: 'ATOMS/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A versatile drawer component built with Material UI that can slide in from any direction. Supports both controlled and uncontrolled modes, customizable content, and various anchoring positions.',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the drawer is open or closed',
    },
    persistent: {
      control: 'boolean',
      description: 'Whether the drawer is persistent or not',
    },
    title: {
      control: 'text',
      description: 'Optional title displayed at the top of the drawer',
    },
  },
  args: {
    open: false,
    title: 'Drawer Title',
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content components
const SampleContent = React.createElement(
  Box,
  {},
  React.createElement(Typography, { variant: 'body1', sx: { mb: 2 } }, 'This is a sample drawer with some content.'),
  React.createElement(Typography, { variant: 'body2', color: 'text.secondary', sx: { mb: 3 } }, 'You can put any content inside the drawer.'),
  React.createElement(Button, { variant: 'contained', fullWidth: true }, 'Sample Action')
);

const PersistentContent = React.createElement(
  Box,
  {},
  React.createElement(Typography, { variant: 'body1', sx: { mb: 2 } }, 'This is a persistent drawer.'),
  React.createElement(Typography, { variant: 'body2', color: 'text.secondary', sx: { mb: 2 } }, 'It should push the main content to the left when open.'),
  React.createElement(Button, { variant: 'outlined', sx: { mb: 1 } }, 'Menu Item 1'),
  React.createElement(Button, { variant: 'outlined', sx: { mb: 1 } }, 'Menu Item 2'),
  React.createElement(Button, { variant: 'outlined', sx: { mb: 1 } }, 'Menu Item 3'),
);

// Main content to show if it gets pushed
const MainContentWithBackground = React.createElement(
  Box,
  {
    sx: {
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      position: 'relative',
    }
  },
  React.createElement(Typography, { variant: 'h3', sx: { mb: 3, textAlign: 'center' } }, 'Main Content Area'),
  React.createElement(Typography, { variant: 'h6', sx: { mb: 4, textAlign: 'center', opacity: 0.9 } }, 'This content should be pushed to the left when the persistent drawer is open'),
  React.createElement(
    Box,
    {
      sx: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 2,
        maxWidth: 800,
        width: '100%',
        px: 2,
      }
    },
    React.createElement(
      Box,
      { sx: { p: 3, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2 } },
      React.createElement(Typography, { variant: 'h6', sx: { mb: 1 } }, 'Card 1'),
      React.createElement(Typography, { variant: 'body2' }, 'Some content here to fill space')
    ),
    React.createElement(
      Box,
      { sx: { p: 3, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2 } },
      React.createElement(Typography, { variant: 'h6', sx: { mb: 1 } }, 'Card 2'),
      React.createElement(Typography, { variant: 'body2' }, 'More content to demonstrate layout')
    ),
    React.createElement(
      Box,
      { sx: { p: 3, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2 } },
      React.createElement(Typography, { variant: 'h6', sx: { mb: 1 } }, 'Card 3'),
      React.createElement(Typography, { variant: 'body2' }, 'Watch how this content moves when drawer opens')
    ),
  )
);

export const Default: Story = {
  args: {
    children: SampleContent,
  },
};

export const Fixed: Story = {
  args: {
    children: PersistentContent,
    persistent: true,
    mainContent: MainContentWithBackground,
  },
};


