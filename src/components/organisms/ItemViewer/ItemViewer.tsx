import React from "react";
import { Box } from "@mui/material";

import { MessageContainer, MessageInput, Messages, MessageHeader } from "../../molecules";

import type { ChatInterface, MessageProps } from "../../molecules/Message";

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
    
    return (
      <Box
        className={className}
        data-testid={dataTestId}
        sx={{
          width: config?.container?.width || "100%",
          height: config?.container?.height || "auto",
          maxWidth: config?.container?.maxWidth,
          minHeight: config?.container?.minHeight,
        }}
      >
        <MessageContainer>
          {/* Header */}
          <MessageHeader
            chatInterface={config?.chatInterface as ChatInterface}
            content={externalMessages}
            enableTeamChat={config?.enableTeamChat}
            setEnableTeamChat={externalCallbacks?.onTeamChatToggle as (enabled: boolean) => void}
            headerFormData={config.header?.formData}
            onHeaderFormChange={externalCallbacks?.onHeaderFormChange}
          />

          {/* Messages List */}
          <Messages content={externalMessages} onMessageRetry={externalCallbacks?.onMessageRetry} />

          {/* Input */}
          <MessageInput
            enableTeamChat={config?.enableTeamChat}
            chatInterface={config?.chatInterface as ChatInterface}
            setChatInterface={externalCallbacks?.onChatInterfaceChange as (chatInterface: ChatInterface) => void}
            onSubmit={externalCallbacks?.onMessageSubmit}
            onInputChange={externalCallbacks?.onInputChange}
            config={{
              ...config.input,
              error: !!externalError,
              disabled: !!externalLoading?.isSubmitting,
            }}
          />
        </MessageContainer>
      </Box>
    );
  }
);

ItemViewer.displayName = "ItemViewer";
