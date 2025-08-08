import React, { useEffect, useRef } from "react";
import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import type { IMessage } from "../types";
import { MessageBubble } from "../MessageItem/MessageBubble/MessageBubble";
import { DateSeparator } from "../MessageItem/DateSeparator";
import { styles } from "../MessageInput/styles/maps";
import { useVirtualizer } from "@tanstack/react-virtual";
import { EmojiPicker } from "../../EmojiPicker/EmojiPicker";
import { useEstimateMessageHeight } from "./hooks";

interface MessagesProps {
  content: IMessage[];
  onMessageRetry?: (messageId: string) => void;
}

const stylesMessageList = {
  container: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  } as const,
  scrollBox: {
    height: "100%",
    overflowY: "auto",
    contain: "strict",
  } as const,
  spacer: {
    width: "100%",
    position: "relative",
  } as const,
  loadingSpinner: {
    position: "absolute" as const,
    left: 0,
    width: "100%",
    bottom: 16,
    display: "flex",
    justifyContent: "center",
    pointerEvents: "none" as const,
  },
};

export const Messages = ({ content, onMessageRetry }: MessagesProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const [isAtBottom, setIsAtBottom] = React.useState(false);

  // Emoji picker state and refs
  const [activeEmojiPicker, setActiveEmojiPicker] = React.useState<
    string | null
  >(null);
  const [emojiPickerPosition, setEmojiPickerPosition] = React.useState<{
    x: number;
    y: number;
    messageType: string;
  } | null>(null);
  const emojiPickerRef = React.useRef<HTMLDivElement>(null);

  // Handler for selecting an emoji
  const handleEmojiSelect = (emoji: any) => {
    // TODO: handle emoji selection logic
    console.log("Selected emoji:", emoji);
    setActiveEmojiPicker(null);
    setEmojiPickerPosition(null);
  };

  // Handler for add reaction button click
  const handleAddReactionClick = (
    messageId: string,
    buttonElement: HTMLElement,
    messageType: string
  ) => {
    if (activeEmojiPicker === messageId) {
      setActiveEmojiPicker(null);
      setEmojiPickerPosition(null);
    } else {
      setActiveEmojiPicker(messageId);
      // Calculate position for the emoji picker
      const rect = buttonElement.getBoundingClientRect();
      const pickerHeight = 400; // Approximate height of emoji picker
      const spaceBelow = window.innerHeight - rect.bottom;

      // If not enough space below, position above the button
      const y =
        spaceBelow >= pickerHeight + 10
          ? rect.bottom + 10
          : rect.top - pickerHeight - 10;
      // For x, you may want to adjust based on message type (left/right)
      const x = messageType === "INCOMING" ? rect.right - 350 : rect.left;
      setEmojiPickerPosition({ x, y, messageType });
    }
  };

  // Handle click outside to close emoji picker
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setActiveEmojiPicker(null);
        setEmojiPickerPosition(null);
      }
    };
    if (activeEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeEmojiPicker]);

  const virtualizer = useVirtualizer({
    count: content.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => {
      const message = content[index];
      const prevMessage = index > 0 ? content[index - 1] : null;
      const prevDate = prevMessage?.createdAt
        ? new Date(prevMessage.createdAt)
        : null;
      return useEstimateMessageHeight(message, prevDate);
    },
    overscan: 10,
  });

  useEffect(() => {
    if (content.length > 0) {
      virtualizer.scrollToIndex(content.length - 1, {
        align: "end",
        behavior: "smooth",
      });
    }
  }, [content.length, virtualizer]);

  const virtualItems = virtualizer.getVirtualItems();

  React.useEffect(() => {
    if (!content.length) {
      setIsAtBottom(true);
      return;
    }
    const lastIndex = content.length - 1;
    const isLastVisible = virtualItems.some((item) => item.index === lastIndex);
    setIsAtBottom(isLastVisible);
  }, [virtualItems, content.length]);

  return (
    <Box sx={stylesMessageList.container}>
      <Box ref={parentRef} sx={stylesMessageList.scrollBox}>
        {content?.length > 0 ? (
          <Box
            sx={{
              height: `${virtualizer.getTotalSize()}px`,
              ...stylesMessageList.spacer,
            }}
          >
            {virtualItems.map((virtualItem) => {
              const message = content[virtualItem.index];
              const previousMessage =
                virtualItem.index > 0 ? content[virtualItem.index - 1] : null;
              const previousDate = previousMessage?.createdAt
                ? new Date(previousMessage.createdAt)
                : null;
              const currentDate = message.createdAt
                ? new Date(message.createdAt)
                : null;
              const showDateSeparator =
                currentDate &&
                (!previousDate ||
                  previousDate.toDateString() !== currentDate.toDateString());

              return (
                <Box
                  key={virtualItem.key}
                  ref={virtualizer.measureElement}
                  data-index={virtualItem.index}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  {showDateSeparator && currentDate && (
                    <DateSeparator date={currentDate} />
                  )}
                  <MessageBubble
                    message={message}
                    onMessageRetry={() =>
                      onMessageRetry?.(message.id || String(Math.random()))
                    }
                    messageId={message.id || String(Math.random())}
                    isEmojiPickerActive={false}
                    onAddReactionClick={handleAddReactionClick}
                  />
                </Box>
              );
            })}

            {!isAtBottom && (
              <Box sx={stylesMessageList.loadingSpinner}>
                <CircularProgress size={32} />
              </Box>
            )}
          </Box>
        ) : (
          <Stack
            sx={{
              ...styles.emptyContainer,
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box sx={styles.emptyMessageBox}>
              <Typography
                variant="body2"
                fontWeight={600}
                color="text.secondary"
              >
                You must specify a subject to send a chat
              </Typography>
            </Box>
          </Stack>
        )}
      </Box>
      {/* Render EmojiPicker at the top level, positioned absolutely */}
      {activeEmojiPicker && emojiPickerPosition && (
        <Box
          ref={emojiPickerRef}
          sx={{
            position: "fixed",
            left: emojiPickerPosition.x,
            top: emojiPickerPosition.y,
            zIndex: 1000,
          }}
        >
          <EmojiPicker onEmojiSelect={handleEmojiSelect} />
        </Box>
      )}
    </Box>
  );
};
