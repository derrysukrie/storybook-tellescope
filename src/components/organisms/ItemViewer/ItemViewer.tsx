import React, { useState } from "react";
import { Box } from "@mui/material";

import { MessageContainer, MessageInput, Messages, useMessageState, MessageHeader } from "../../molecules";

import type { MessageProps, IMessage } from "../../molecules/Message";
import { mockMessages } from "../../../data/mock";

/**
 * Unified Message component for displaying and composing chat messages
 *
 * @example
 * ```tsx
 * <ItemViewer
 *   messages={messages}
 *   config={{ enableTeamChat: true }}
 *   callbacks={{ onMessageSubmit: handleSubmit }}
 * />
 * ```
 */

export const ItemViewer: React.FC<MessageProps> = React.memo(
  ({
    messages: externalMessages,
    config = {},
    callbacks: externalCallbacks,
    loading: externalLoading,
    error: externalError,
    className,
    "data-testid": dataTestId,
  }) => {
    // Internal state management
    const [messages, setMessages] = useState<IMessage[]>(externalMessages || mockMessages);
    const [loading, setLoading] = useState({ isSubmitting: false });
    const [error, setError] = useState<string | null>(null);

    // Use the centralized state management hook
    const { state, actions } = useMessageState(config, {
      onMessageSubmit: async (content: string) => {
        setLoading({ isSubmitting: true });
        setError(null);

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Add new outgoing message with various props
          const newOutgoingMessage: IMessage = {
            type: "OUTGOING",
            text: content,
            createdAt: new Date(),
            avatar: "https://avatar.iran.liara.run/public",
            reactions: [
              {
                icon: "👍",
                count: 2,
              },
              {
                icon: "❤️",
                count: 1,
              },
            ],
            scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
            role: "User",
          };

          // Random incoming message templates
          const incomingMessageTemplates: IMessage[] = [
            {
              type: "INCOMING",
              text: "Thanks for your message! Here's a sample response with different features.",
              createdAt: new Date(),
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
              isTranslated: true,
              link: "https://example.com/help",
              image: {
                fileName: "sample-image.jpg",
                url: "https://picsum.photos/400/300",
              },
              reactions: [
                {
                  icon: "🎉",
                  count: 3,
                },
                {
                  icon: "🔥",
                  count: 1,
                },
              ],
            },
            {
              type: "INCOMING",
              text: "Great question! Let me share some helpful information with you.",
              createdAt: new Date(),
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
              isTranslated: false,
              image: {
                fileName: "document.pdf",
                url: "https://picsum.photos/300/400",
              },
              reactions: [
                {
                  icon: "📚",
                  count: 2,
                },
                {
                  icon: "💡",
                  count: 1,
                },
              ],
            },
            {
              type: "INCOMING",
              text: "I understand your concern. Here's what I found for you.",
              createdAt: new Date(),
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
              isTranslated: true,
              link: "https://docs.example.com/solution",
              reactions: [
                {
                  icon: "✅",
                  count: 4,
                },
                {
                  icon: "🎯",
                  count: 2,
                },
              ],
            },
            {
              type: "INCOMING",
              text: "That's interesting! Here's a visual example of what you're asking about.",
              createdAt: new Date(),
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
              isTranslated: false,
              image: {
                fileName: "diagram.png",
                url: "https://picsum.photos/500/300",
              },
              reactions: [
                {
                  icon: "👀",
                  count: 1,
                },
                {
                  icon: "🤔",
                  count: 1,
                },
              ],
            },
            {
              type: "INCOMING",
              text: "Perfect! I've processed your request and here are the results.",
              createdAt: new Date(),
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
              isTranslated: true,
              link: "https://results.example.com/analysis",
              reactions: [
                {
                  icon: "🚀",
                  count: 3,
                },
                {
                  icon: "⚡",
                  count: 1,
                },
              ],
            },
          ];

          // Randomly select an incoming message template
          const randomIndex = Math.floor(Math.random() * incomingMessageTemplates.length);
          const sampleIncomingMessage = incomingMessageTemplates[randomIndex];

          setMessages((prev) => [...prev, newOutgoingMessage, sampleIncomingMessage]);
          console.log("Message sent:", content);

          // Call external callback if provided
          externalCallbacks?.onMessageSubmit?.(content);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "Failed to send message";
          setError(errorMessage);
          console.error("API Error:", errorMessage);
        } finally {
          setLoading({ isSubmitting: false });
        }
      },
      onMessageRetry: (messageId: string) => {
        externalCallbacks?.onMessageRetry?.(messageId);
      },
      onInputChange: (value: string) => {
        externalCallbacks?.onInputChange?.(value);
      },
      onHeaderFormChange: (field, value) => {
        externalCallbacks?.onHeaderFormChange?.(field, value);
      },
      onChatInterfaceChange: (newInterface) => {
        externalCallbacks?.onChatInterfaceChange?.(newInterface);
      },
      onTeamChatToggle: (enabled) => {
        externalCallbacks?.onTeamChatToggle?.(enabled);
      },
      onMessageReaction: (messageId, reaction) => {
        externalCallbacks?.onMessageReaction?.(messageId, reaction);
      },
      onMessageOptions: (messageId, action) => {
        externalCallbacks?.onMessageOptions?.(messageId, action);
      },
    });

    // Merge external loading and error states with internal state
    const combinedLoading = {
      ...state.loading,
      ...loading,
      ...externalLoading,
    };
    const combinedError = error || state.error || externalError;

    return (
      <Box
        className={className}
        data-testid={dataTestId}
        sx={{
          width: config.container?.width || "100%",
          height: config.container?.height || "auto",
          maxWidth: config.container?.maxWidth,
          minHeight: config.container?.minHeight,
        }}
      >
        <MessageContainer>
          {/* Header */}
          <MessageHeader
            chatInterface={state.chatInterface}
            content={messages}
            enableTeamChat={state.enableTeamChat}
            setEnableTeamChat={actions.setEnableTeamChat}
            headerFormData={state.headerFormData}
            onHeaderFormChange={actions.setHeaderFormData}
          />

          {/* Messages List */}
          <Messages content={messages} onMessageRetry={externalCallbacks?.onMessageRetry} />

          {/* Input */}
          <MessageInput
            enableTeamChat={state.enableTeamChat}
            chatInterface={state.chatInterface}
            setChatInterface={actions.setChatInterface}
            onSubmit={actions.submitMessage}
            onInputChange={actions.setInputValue}
            config={{
              ...config.input,
              error: !!combinedError,
              disabled: combinedLoading.isSubmitting,
            }}
          />
        </MessageContainer>
      </Box>
    );
  }
);

ItemViewer.displayName = "ItemViewer";
