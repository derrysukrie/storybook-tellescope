import { useState, useCallback } from "react";
import { ItemViewer } from "./components";

import type { ChatInterface, IMessage } from "./components/molecules/Message/types";
import { mockMessages, sampleAvatars, sampleReactions } from "./data/mock";

function App() {
  // UI state
  const [enableTeamChat, setEnableTeamChat] = useState(false);
  const [chatInterface, setChatInterface] = useState<ChatInterface>("CHAT");
  
  // Messages state
  const [messages, setMessages] = useState<IMessage[]>(mockMessages);
  const [loading, setLoading] = useState({ isSubmitting: false });
  const [error, setError] = useState<{ type: 'VALIDATION' | 'SUBMISSION' | 'NETWORK', message: string } | null>(null);
  
  // Generate a unique ID for messages
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
  
  // Handle receiving a message (from external source)
  const handleReceiveMessage = useCallback((message: IMessage) => {
    // Ensure the message has an ID
    const messageWithId = {
      ...message,
      id: message.id || generateMessageId(),
      createdAt: message.createdAt || new Date()
    };
    
    // Add to messages
    setMessages(prev => [...prev, messageWithId]);
  }, []);

  return (
    <>
      <ItemViewer
        messages={messages}
        loading={loading}
        error={error}
        callbacks={{
          onMessageSubmit: handleMessageSubmit,
          onReceiveMessage: handleReceiveMessage,
          onChatInterfaceChange: setChatInterface,
          onTeamChatToggle: setEnableTeamChat,
          onHeaderFormChange: (field, value) => {
            console.log("Header form changed:", field, value);
          },
        }}
        config={{
          enableTeamChat,
          chatInterface,
          input: {
            placeholder: "Type a message...",
          }
        }}
      />
    </>
  );
}

export default App;
