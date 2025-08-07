import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// import { fn } from 'storybook/test';

import { ItemViewer } from "./ItemViewer";
import { generateSampleMessages } from "../../data/mock";

const meta: Meta<typeof ItemViewer> = {
  title: "Organisms/ItemViewer",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# API Integration Examples

This section demonstrates how to extract all input data from the ItemViewer component and send it to APIs.

## Key Features
- **Complete Data Extraction**: Extract messages, form data, interface settings, and metadata
- **Multiple API Types**: Support for Chat, Email, SMS, and Form APIs
- **Validation**: Built-in data validation before submission
- **Error Handling**: Comprehensive error management
- **Type Safety**: Full TypeScript support
- **Auto-scroll**: Smooth auto-scroll to bottom when new messages are added

## Data Structure
When you submit a message, the API receives:
\`\`\`json
{
  "messages": [...],
  "headerForm": { "to": "...", "subject": "..." },
  "chatInterface": "EMAIL",
  "teamChatEnabled": false,
  "inputValue": "Message content",
  "timestamp": "2024-01-15T10:32:00.000Z",
  "metadata": {
    "userAgent": "...",
    "sessionId": "...",
    "deviceInfo": { ... }
  }
}
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic API Integration Story
export const Default: Story = {
  render: () => (
    <ItemViewer
      messages={generateSampleMessages(10)}
      config={{
        enableTeamChat: false,
        chatInterface: "CHAT",
        input: {
          placeholder: "Type a message...",
          maxLength: 1000,
          autoFocus: true,
          showCharacterCount: false,
        },
      }}
      callbacks={{
        onMessageSubmit: (content) => console.log('Message submitted:', content),
        onInputChange: (value) => console.log('Input changed:', value),
        onHeaderFormChange: (field, value) => console.log('Header form changed:', field, value),
        onChatInterfaceChange: (chatInterface) => console.log('Interface changed:', chatInterface),
        onTeamChatToggle: (enabled) => console.log('Team chat toggled:', enabled),
        onMessageReaction: (messageId, reaction) => console.log('Message reaction:', messageId, reaction),
        onMessageOptions: (messageId, action) => console.log('Message options:', messageId, action),
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Basic API Integration

Simple example showing how to extract message data and send it to a basic chat API.

### Key Features:
- Extracts message content and basic metadata
- Sends to mock API endpoint
- Handles success/error states
- Updates message list on success
- Auto-scroll to bottom when new messages are added

### API Endpoint: \`/api/chat/messages\`
        `,
      },
    },
  },
};