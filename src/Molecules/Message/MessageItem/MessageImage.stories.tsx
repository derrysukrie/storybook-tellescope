import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { MessageImage } from './MessageImage';

const meta: Meta<typeof MessageImage> = {
  title: 'Molecules/Message/MessageItem/MessageImage',
  component: MessageImage,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A message image component that displays images with download functionality.',
      },
    },
  },
  argTypes: {
    image: {
      control: 'object',
      description: 'The image object containing url and fileName',
    },
    messageType: {
      control: 'select',
      options: ['INCOMING', 'OUTGOING', 'TEAM_CHAT'],
      description: 'The type of message (affects styling)',
    },
  },
  args: {
    image: {
      url: "https://picsum.photos/300/200",
      fileName: "sample-image.jpg",
    },
    messageType: "OUTGOING",
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 300, height: 300 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: {
      url: "https://picsum.photos/350/200",
      fileName: "landscape.jpg",
    },
    messageType: "INCOMING",
  },
};
