// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { useState } from "react";
import { ItemViewer } from "./components";

import type { ChatInterface } from "./components/molecules/Message/types";
import { mockMessages } from "./data/mock";

function App() {
  // const { state, actions } = useMessageState({
  //   onMessageSubmit: async (content: string) => {
  //     setLoading({ isSubmitting: true });
  //     setError(null);

  //     try {
  //       // Simulate API call
  //       await new Promise((resolve) => setTimeout(resolve, 1000));

  //       // Add new outgoing message with various props
  //       const newOutgoingMessage: IMessage = {
  //         type: "OUTGOING",
  //         text: content,
  //         createdAt: new Date(),
  //         avatar: "https://avatar.iran.liara.run/public",
  //         reactions: [
  //           {
  //             icon: "👍",
  //             count: 2,
  //           },
  //           {
  //             icon: "❤️",
  //             count: 1,
  //           },
  //         ],
  //         scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
  //         role: "User",
  //       };

  //       // Random incoming message templates
  //       const incomingMessageTemplates: IMessage[] = [
  //         {
  //           type: "INCOMING",
  //           text: "Thanks for your message! Here's a sample response with different features.",
  //           createdAt: new Date(),
  //           avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  //           isTranslated: true,
  //           link: "https://example.com/help",
  //           image: {
  //             fileName: "sample-image.jpg",
  //             url: "https://picsum.photos/400/300",
  //           },
  //           reactions: [
  //             {
  //               icon: "🎉",
  //               count: 3,
  //             },
  //             {
  //               icon: "🔥",
  //               count: 1,
  //             },
  //           ],
  //         },
  //         {
  //           type: "INCOMING",
  //           text: "Great question! Let me share some helpful information with you.",
  //           createdAt: new Date(),
  //           avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  //           isTranslated: false,
  //           image: {
  //             fileName: "document.pdf",
  //             url: "https://picsum.photos/300/400",
  //           },
  //           reactions: [
  //             {
  //               icon: "📚",
  //               count: 2,
  //             },
  //             {
  //               icon: "💡",
  //               count: 1,
  //             },
  //           ],
  //         },
  //         {
  //           type: "INCOMING",
  //           text: "I understand your concern. Here's what I found for you.",
  //           createdAt: new Date(),
  //           avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  //           isTranslated: true,
  //           link: "https://docs.example.com/solution",
  //           reactions: [
  //             {
  //               icon: "✅",
  //               count: 4,
  //             },
  //             {
  //               icon: "🎯",
  //               count: 2,
  //             },
  //           ],
  //         },
  //         {
  //           type: "INCOMING",
  //           text: "That's interesting! Here's a visual example of what you're asking about.",
  //           createdAt: new Date(),
  //           avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  //           isTranslated: false,
  //           image: {
  //             fileName: "diagram.png",
  //             url: "https://picsum.photos/500/300",
  //           },
  //           reactions: [
  //             {
  //               icon: "👀",
  //               count: 1,
  //             },
  //             {
  //               icon: "🤔",
  //               count: 1,
  //             },
  //           ],
  //         },
  //         {
  //           type: "INCOMING",
  //           text: "Perfect! I've processed your request and here are the results.",
  //           createdAt: new Date(),
  //           avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  //           isTranslated: true,
  //           link: "https://results.example.com/analysis",
  //           reactions: [
  //             {
  //               icon: "🚀",
  //               count: 3,
  //             },
  //             {
  //               icon: "⚡",
  //               count: 1,
  //             },
  //           ],
  //         },
  //       ];

  //       // Randomly select an incoming message template
  //       const randomIndex = Math.floor(Math.random() * incomingMessageTemplates.length);
  //       const sampleIncomingMessage = incomingMessageTemplates[randomIndex];

  //       setMessages((prev) => [...prev, newOutgoingMessage, sampleIncomingMessage]);
  //       console.log("Message sent:", content);

  //       // Call external callback if provided
  //       externalCallbacks?.onMessageSubmit?.(content);
  //     } catch (err) {
  //       const errorMessage = err instanceof Error ? err.message : "Failed to send message";
  //       setError(errorMessage);
  //       console.error("API Error:", errorMessage);
  //     } finally {
  //       setLoading({ isSubmitting: false });
  //     }
  //   },
  //   onMessageRetry: (messageId: string) => {
  //     externalCallbacks?.onMessageRetry?.(messageId);
  //   },
  //   onInputChange: (value: string) => {
  //     externalCallbacks?.onInputChange?.(value);
  //   },
  //   onHeaderFormChange: (field, value) => {
  //     externalCallbacks?.onHeaderFormChange?.(field, value);
  //   },
  //   onChatInterfaceChange: (newInterface) => {
  //     externalCallbacks?.onChatInterfaceChange?.(newInterface);
  //   },
  //   onTeamChatToggle: (enabled) => {
  //     externalCallbacks?.onTeamChatToggle?.(enabled);
  //   },
  //   onMessageReaction: (messageId, reaction) => {
  //     externalCallbacks?.onMessageReaction?.(messageId, reaction);
  //   },
  //   onMessageOptions: (messageId, action) => {
  //     externalCallbacks?.onMessageOptions?.(messageId, action);
  //   },
  // });

  const [enableTeamChat, setEnableTeamChat] = useState(false);
  const [chatInterface, setChatInterface] = useState<ChatInterface>("CHAT");

  return (
    <>
      <ItemViewer
        config={{
          enableTeamChat,
          chatInterface,
          input: {
            placeholder: "Type a message...",
          },
        }}
        // state={state}
        // actions={{

        // }}
        messages={mockMessages}
        callbacks={{
          onMessageSubmit: (content) => {
            console.log("awdwdwa", content);
          },
        }}
      />
    </>
  );
}

export default App;
