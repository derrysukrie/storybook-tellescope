import React, { useEffect, useRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { IMessage } from "../types";

import { MessageBubble } from "../MessageItem/MessageBubble/MessageBubble";
import { styles } from "../MessageInput/styles/maps";
import { DateSeparator } from "../MessageItem/DateSeparator";
import List from "rc-virtual-list";

export interface ChatProps {
  content: IMessage[];
  enableTeamChat: boolean;
}

export const Messages = ({ content, enableTeamChat }: ChatProps) => {
  const messagesRef = useRef<HTMLDivElement>(null);
  let lastDate: Date | null = null;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesRef.current && content && content.length > 0) {
      const scrollToBottom = () => {
        if (messagesRef.current) {
          messagesRef.current.scrollTo({
            top: messagesRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      };

      // Use setTimeout to ensure DOM is updated
      setTimeout(scrollToBottom, 100);
    }
  }, [content]);

  // Initial scroll to bottom when component mounts
  useEffect(() => {
    if (messagesRef.current) {
      const scrollToBottom = () => {
        if (messagesRef.current) {
          messagesRef.current.scrollTo({
            top: messagesRef.current.scrollHeight,
            behavior: "auto",
          });
        }
      };

      // Initial scroll to bottom
      setTimeout(scrollToBottom, 50);
    }
  }, []);

  return (
    <Box
      ref={messagesRef}
      sx={{
        ...styles.messagesContainer(content?.length, enableTeamChat),
        flex: 1, // Take remaining space
        overflowY: "auto", // Enable scrolling
        display: "flex",
        flexDirection: "column", // Normal column direction

        maxHeight: "100vh", // Set a max height to enable scrolling
        // Hide scrollbar for cleaner look
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "-ms-overflow-style": "none", // IE and Edge
        scrollbarWidth: "none", // Firefox
      }}
    >
      <List data={content} fullHeight itemKey="id">
        {(message,index) => <MessageBubble message={message} />}
      </List>

      {/* {content?.length > 0 ? (
        content.map((message, index) => {
          const showDateSeparator = message.createdAt && (!lastDate || lastDate.toDateString() !== message.createdAt.toDateString());
          lastDate = message.createdAt ? new Date(message.createdAt) : lastDate;

          return (
            <React.Fragment key={index}>
              {showDateSeparator && message.createdAt && <DateSeparator date={message.createdAt} />}
              <List data={content} height={200} itemHeight={30} itemKey="id">
                {(index) => <MessageBubble message={message} />}
              </List>
            </React.Fragment>
          );
        })
      ) : (
        <Stack
          sx={{
            ...styles.emptyContainer,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            minHeight: "200px",
          }}
        >
          <Box sx={styles.emptyMessageBox}>
            <Typography variant="body2" fontWeight={600} color="text.secondary">
              You must specify a subject to send a chat
            </Typography>
          </Box>
        </Stack>
      )} */}
    </Box>
  );
};
