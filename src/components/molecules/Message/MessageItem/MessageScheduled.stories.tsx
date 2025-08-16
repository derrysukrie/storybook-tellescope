import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { MessageScheduled } from './MessageScheduled';

const meta: Meta<typeof MessageScheduled> = {
  title: 'Molecules/Message/MessageItem/MessageScheduled',
  component: MessageScheduled,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component that displays scheduled message information with cancel option.',
      },
    },
  },
  argTypes: {
    scheduledTime: {
      control: 'date',
      description: 'The scheduled time for the message (null if not scheduled)',
    },
  },
  args: {
    scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 'fit-content' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
  },
};

