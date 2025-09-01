import { Box, Typography } from "@mui/material";
import type React from "react";
import { Page } from "../../atoms/Page/Page";
import SentChat from "../../atoms/SentChat/SentChat";
import { ChatFeedback } from "../../atoms/ChatFeedback/ChatFeedback";

interface ChatConversationProps {
  userMessage: string;
  responseMessage: string;
}

export const ChatConversation: React.FC<ChatConversationProps> = ({
  userMessage,
  responseMessage,
}) => {
  return (
    <Box component="section">
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "16px",
        }}
      >
        <Page truncated={false} />

        <SentChat message={userMessage} />

        <Typography variant="body1" component="span">
          {responseMessage}
          <br />
          <ChatFeedback type="default" />
        </Typography>
      </Box>
    </Box>
  );
};
