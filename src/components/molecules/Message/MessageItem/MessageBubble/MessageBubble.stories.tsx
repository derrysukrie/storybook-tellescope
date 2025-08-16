import type { Meta, StoryObj } from '@storybook/react';
import { MessageBubble } from './MessageBubble';

const meta: Meta<typeof MessageBubble> = {
  title: 'Molecules/Message/MessageItem/MessageBubble',
  component: MessageBubble,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A message bubble component that displays message content with options.',
      },
    },
  },
  argTypes: {
    message: {
      control: 'object',
      description: 'The message object containing all message data',
    },
  },
  args: {
    message: {
      type: "OUTGOING",
      text: "Hello! This is a sample message.",
      avatar: "https://avatar.iran.liara.run/public",
      createdAt: new Date(),
      role: "User",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: {
      type: "OUTGOING",
      text: "Hello! This is a sample message.",
      avatar: "https://avatar.iran.liara.run/public",
      createdAt: new Date(),
      role: "User",
    },
  },
};

export const IncomingMessage: Story = {
  args: {
    message: {
      type: "INCOMING",
      text: "Hi there! This is an incoming message.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      createdAt: new Date(),
    },
  },
};

export const TeamChatMessage: Story = {
  args: {
    message: {
      type: "TEAM_CHAT",
      text: "This is a team chat message from a specialist.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      createdAt: new Date(),
      role: "Nutritionist",
    },
  },
};

export const MessageWithImage: Story = {
  args: {
    message: {
      type: "OUTGOING",
      text: "Check out this image!",
      avatar: "https://avatar.iran.liara.run/public",
      createdAt: new Date(),
      image: {
        fileName: "sample-image.jpg",
        url: "https://picsum.photos/400/300",
      },
    },
  },
};

export const MessageWithReactions: Story = {
  args: {
    message: {
      type: "INCOMING",
      text: "This message has reactions!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      createdAt: new Date(),
      reactions: [
        {
          icon: "👍",
          count: 3,
        },
        {
          icon: "❤️",
          count: 2,
        },
        {
          icon: "🎉",
          count: 1,
        },
      ],
    },
  },
};

export const TranslatedMessage: Story = {
  args: {
    message: {
      type: "INCOMING",
      text: "This message has been translated from another language.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      createdAt: new Date(),
      isTranslated: true,
    },
  },
};

export const ScheduledMessage: Story = {
  args: {
    message: {
      type: "OUTGOING",
      text: "This message is scheduled for later.",
      avatar: "https://avatar.iran.liara.run/public",
      createdAt: new Date(),
      scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      role: "User",
    },
  },
}; 