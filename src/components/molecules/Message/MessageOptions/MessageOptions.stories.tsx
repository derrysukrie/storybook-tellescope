import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { MessageOptions } from './MessageOptions';


const meta: Meta<typeof MessageOptions> = {
  title: 'Molecules/Message/MessageOptions',
  component: MessageOptions,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component that displays message options including time, unread status, and reaction buttons.',
      },
    },
  },
  argTypes: {
    haveUnreadMessages: {
      control: 'boolean',
      description: 'Whether the message has unread status',
    },
    messageType: {
      control: 'select',
      options: ['INCOMING', 'OUTGOING', 'TEAM_CHAT'],
      description: 'The type of message (affects layout and positioning)',
    },
  },
  args: {
    haveUnreadMessages: false,
    messageType: "OUTGOING",
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 'fit-content', p: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    haveUnreadMessages: false,
    messageType: "OUTGOING",
  },
};

export const IncomingMessage: Story = {
  args: {
    haveUnreadMessages: false,
    createdAt: new Date(),
    messageType: "INCOMING",
  },
};
