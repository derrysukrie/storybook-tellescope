import type { IMessage, MessageType } from "../../../types";
import { Box, styled, Typography } from "@mui/material";


interface MessageItemStyleProps {
  messageType: IMessage["type"];
}

export const useMessageItemStyles = ({
  messageType,
}: MessageItemStyleProps) => {
  const root = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: messageType === "INCOMING" ? "row" : "row-reverse",
    px: 3,
    py: 1,
    my: 2,
    alignItems: "flex-start",
    bgcolor: "transparent",
    transition: "background-color 0.2s ease-in-out",
    "&:hover": {
      bgcolor: "#EFF0F24D",
      "& .message-options": {
        opacity: 1,
        visibility: "visible",
        transform: "translateX(0)",
      },
    },
  };

  const messageOptions = {
    opacity: 0,
    visibility: "hidden",
    transform: "translateX(10px)",
    transition:
      "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out, transform 0.3s ease-in-out",
  };

  return { root, messageOptions };
};

export const messageContainerWidth: Record<MessageType, string> = {
  INCOMING: "100%",
  OUTGOING: "fit-content",
  TEAM_CHAT: "fit-content",
};

export const messageBubbleBorderBottomLeftRadius: Record<MessageType, string> =
  {
    INCOMING: "8px",
    OUTGOING: "20px",
    TEAM_CHAT: "20px",
  };

export const messageBubbleBorderBottomRightRadius: Record<MessageType, string> =
  {
    INCOMING: "20px",
    OUTGOING: "8px",
    TEAM_CHAT: "8px",
  };

export const bubbleBackgroundColors: Record<MessageType, string> = {
  INCOMING: "#EFF0F2",
  OUTGOING: "#1C7AE0",
  TEAM_CHAT: "#8B5CF2",
};

export const messageTextColors: Record<MessageType, string> = {
  INCOMING: "#1D1B20",
  OUTGOING: "#FFFFFF",
  TEAM_CHAT: "#FFFFFF",
};

export const reactionsContainerJustifyContent: Record<MessageType, string> = {
  INCOMING: "flex-start",
  OUTGOING: "flex-end",
  TEAM_CHAT: "flex-end",
};

export const Container = styled(Box, {
  shouldForwardProp: (prop) => prop !== "messageType",
})<{ messageType: MessageType }>(({ messageType }) => ({
  display: "flex",
  gap: "8px",
  width: "100%",
  justifyContent: "flex-start",
  flexDirection: messageType === "INCOMING" ? "row" : "row-reverse",
  alignItems: "flex-start",
}));

export const MessageContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "messageType",
})<{ messageType: MessageType }>(({ messageType }) => ({
  width: messageContainerWidth[messageType],
  display: "flex",
  flexDirection: "column",
  alignItems: messageType === "INCOMING" ? "flex-start" : "flex-end",
}));

export const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "messageType" && prop !== "haveImage",
})<{ messageType: MessageType; haveImage: boolean }>(({ messageType, haveImage }) => ({
  padding: "12px 12px 10px 12px",
  maxWidth: "fit-content",
  backgroundColor: bubbleBackgroundColors[messageType],
  borderTopRightRadius: "20px",
  display: "flex",
  flexDirection: haveImage ? "column" : "row",
  borderTopLeftRadius: "20px",
  borderBottomLeftRadius: messageBubbleBorderBottomLeftRadius[messageType],
  borderBottomRightRadius: messageBubbleBorderBottomRightRadius[messageType],
}));

export const MessageContent = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "messageType",
})<{ messageType: MessageType }>(({ messageType }) => ({
  color: messageTextColors[messageType],
  fontSize: "16px",
  maxWidth: 300,
}));
