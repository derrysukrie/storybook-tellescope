import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MessageInput } from './MessageInput';
import type { ChatInterface } from '../types';
import type { MessageInputProps } from '../hooks/useMessageInput';

const meta: Meta<typeof MessageInput> = {
  title: 'Molecules/Message/MessageInput',
  component: MessageInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive message input component with support for different chat interfaces, team chat mode, and various configuration options.',
      },
    },
  },
  argTypes: {
    enableTeamChat: {
      control: 'boolean',
      description: 'Enables team chat mode with additional action buttons',
    },
    chatInterface: {
      control: 'select',
      options: ['CHAT', 'SMS', 'EMAIL', 'MMS'],
      description: 'The type of chat interface being used',
    },
    onSubmit: {
      action: 'submitted',
      description: 'Callback fired when a message is submitted',
    },
    onInputChange: {
      action: 'input changed',
      description: 'Callback fired when input value changes',
    },
    config: {
      control: 'object',
      description: 'Configuration object for input behavior and appearance',
    },
  },
  args: {
    enableTeamChat: false,
    chatInterface: 'CHAT',
    onSubmit: (content: string) => console.log('Message submitted:', content),
    onInputChange: (value: string) => console.log('Input changed:', value),
    config: {
      placeholder: 'Type a message...',
      maxLength: 1000,
      autoFocus: false,
      disabled: false,
      error: false,
      showCharacterCount: false,
      multiline: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component for stories that need state management
const MessageInputWithState = (props: MessageInputProps) => {
  const [chatInterface, setChatInterface] = useState<ChatInterface>(props.chatInterface);
  
  return (
    <MessageInput
      {...props}
      chatInterface={chatInterface}
      setChatInterface={setChatInterface}
    />
  );
};

export const Default: Story = {
  render: (args) => <MessageInputWithState {...args} />,
  args: {
    chatInterface: 'CHAT',
  },
};

export const SMSInterface: Story = {
  render: (args) => <MessageInputWithState {...args} />,
  args: {
    chatInterface: 'SMS',
  },
};

export const EmailInterface: Story = {
  render: (args) => <MessageInputWithState {...args} />,
  args: {
    chatInterface: 'EMAIL',
  },
};



export const MMSInterface: Story = {
  render: (args) => <MessageInputWithState {...args} />,
  args: {
    chatInterface: 'MMS',
  },
};

export const Disabled: Story = {
  args: {
    config: {
      disabled: true,
      placeholder: 'Input is disabled',
    },
  },
};

export const WithError: Story = {
  args: {
    config: {
      error: true,
      placeholder: 'Error state',
    },
  },
};

