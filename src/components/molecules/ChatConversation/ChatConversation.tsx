import { Box, Typography } from "@mui/material";
import type React from "react";
import { Page } from "../../atoms/Page/Page";
import SentChat from "../../atoms/SentChat/SentChat";
import { ChatFeedback } from "../../atoms/ChatFeedback/ChatFeedback";

export const ChatConversation: React.FC = () => {
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

        <SentChat message={"How many messages am I assigned to currently"} />

        <Typography variant="body1" component="span">
          You're currently assigned to 10 messages. <br />
          <ChatFeedback type="default" />
        </Typography>
      </Box>
    </Box>
  );
};
