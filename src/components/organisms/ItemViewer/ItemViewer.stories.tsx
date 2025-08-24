import { useState, useCallback } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { ItemViewer } from "./ItemViewer";
import { generateSampleMessages, sampleAvatars, sampleReactions } from "../../../data/mock";
import type { IMessage, ChatInterface } from "../../molecules/Message/types";

const meta: Meta<typeof ItemViewer> = {
  title: "Organisms/ItemViewer",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# ItemViewer Component

A versatile messaging interface component that supports multiple chat interfaces (Chat, Email, SMS) with rich features.

## Key Features
- **Multiple Chat Interfaces**: Switch between Chat, Email, SMS, and MMS modes
- **Team Chat Support**: Toggle between personal and team chat modes
- **Rich Message Features**: Support for reactions, images, links, and more
- **Form Integration**: Header forms for Email interface
- **Validation**: Built-in data validation before submission
- **Error Handling**: Comprehensive error management
- **Auto-scroll**: Smooth auto-scroll to bottom when new messages are added

## Usage Example
\`\`\`jsx
import { useState, useCallback } from "react";
import { ItemViewer } from "./components";
import type { IMessage, ChatInterface } from "./components/molecules/Message/types";

function App() {
  // UI state
  const [enableTeamChat, setEnableTeamChat] = useState(false);
  const [chatInterface, setChatInterface] = useState<ChatInterface>("CHAT");
  
  // Messages state
  const [messages, setMessages] = useState<IMessage[]>([]);
  
  // Handle message submission
  const handleMessageSubmit = useCallback(async (content) => {
    // Create new message
    const newMessage = {
      id: \`msg-\${Date.now()}\`,
      type: "OUTGOING",
      text: content,
      createdAt: new Date()
    };
    
    // Add to messages
    setMessages(prev => [...prev, newMessage]);
    
    // Call your API here
  }, []);

  return (
    <ItemViewer
      messages={messages}
      config={{
        enableTeamChat,
        chatInterface,
        input: { placeholder: "Type a message..." }
      }}
      callbacks={{
        onMessageSubmit: handleMessageSubmit,
        onChatInterfaceChange: setChatInterface,
        onTeamChatToggle: setEnableTeamChat
      }}
    />
  );
}
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive example with state management
export const Interactive: Story = {
  render: () => {
    // State for messages and UI
    const [messages, setMessages] = useState<IMessage[]>(generateSampleMessages(5));
    const [enableTeamChat, setEnableTeamChat] = useState(false);
    const [chatInterface, setChatInterface] = useState<ChatInterface>("CHAT");
    const [loading, setLoading] = useState({ isSubmitting: false });
    const [error, setError] = useState<{ type: 'VALIDATION' | 'SUBMISSION' | 'NETWORK', message: string } | null>(null);
    
    // Generate message ID
    const generateMessageId = () => `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Handle message submission
    const handleMessageSubmit = useCallback(async (content: string) => {
      if (!content.trim()) return;
      
      // Set loading state
      setLoading({ isSubmitting: true });
      setError(null);
      
      try {
        // Create new outgoing message
        const newOutgoingMessage: IMessage = {
          id: generateMessageId(),
          type: "OUTGOING",
          text: content,
          createdAt: new Date(),
          avatar: "https://avatar.iran.liara.run/public",
          role: "User",
        };
        
        // Add to messages immediately
        setMessages(prev => [...prev, newOutgoingMessage]);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create sample response message
        const responseMessage: IMessage = {
          id: generateMessageId(),
          type: "INCOMING",
          text: `Thanks for your message: "${content}". This is an automated response.`,
          createdAt: new Date(),
          avatar: sampleAvatars[Math.floor(Math.random() * sampleAvatars.length)],
          reactions: [
            sampleReactions[Math.floor(Math.random() * sampleReactions.length)]
          ],
        };
        
        // Add response message
        setMessages(prev => [...prev, responseMessage]);
        
      } catch (err) {
        console.error("Error sending message:", err);
        setError({ type: 'SUBMISSION', message: "Failed to send message" });
      } finally {
        setLoading({ isSubmitting: false });
      }
    }, []);
    
    return (
      <ItemViewer
        messages={messages}
        loading={loading}
        error={error}
        config={{
          enableTeamChat,
          chatInterface,
          input: {
            placeholder: "Type a message and press Enter...",
            showCharacterCount: true,
          },
        }}
        callbacks={{
          onMessageSubmit: handleMessageSubmit,
          onChatInterfaceChange: setChatInterface,
          onTeamChatToggle: setEnableTeamChat,
          onHeaderFormChange: (field, value) => {
            console.log("Header form changed:", field, value);
          },
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
## Interactive Example

This example demonstrates a fully interactive ItemViewer with state management and simulated API responses.

### Features Demonstrated:
- Real-time message updates
- Loading states during message submission
- Error handling
- Auto-response after a delay
- Interface switching
- Team chat toggling
        `,
      },
    },
  },
};
