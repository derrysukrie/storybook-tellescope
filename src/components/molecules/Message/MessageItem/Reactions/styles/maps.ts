import { Box, styled } from "@mui/material";
import type { MessageType } from "../../../types";

export const reactionsContainerJustifyContent: Record<MessageType, string> = {
  INCOMING: "flex-start",
  OUTGOING: "flex-end",
  TEAM_CHAT: "flex-end",
};

export const ReactionsContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "messageType",
  })<{ messageType: MessageType }>(({ messageType }) => ({
    display: "flex",
    justifyContent: reactionsContainerJustifyContent[messageType],
  }));
  
  export const ReactionsWrapper = styled(Box)({
    width: "fit-content",
    height: "28px",
    padding: "0 10px",
    borderRadius: "100px",
    backgroundColor: "#EFF0F2",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  });
  
  export const ReactionItem = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "3.2px",
  });