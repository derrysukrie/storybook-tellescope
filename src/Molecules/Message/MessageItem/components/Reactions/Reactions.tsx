import { Box, Typography } from "@mui/material";
import type { MessageType, Reaction } from "../../../types";
import { ReactionItem, ReactionsContainer, ReactionsWrapper } from "./styles/maps";

interface ReactionsProps {
  reactions: Reaction[];
  messageType: MessageType;
}

export const Reactions = ({ reactions, messageType }: ReactionsProps) => {
  if (reactions.length === 0) {
    return null;
  }

  return (
    <ReactionsContainer messageType={messageType}>
      <ReactionsWrapper>
        {reactions.map((reaction) => (
          <ReactionItem key={reaction.icon}>
            <Box>{reaction.icon}</Box>
            <Typography variant="caption" color="black">
              {reaction.count}
            </Typography>
          </ReactionItem>
        ))}
      </ReactionsWrapper>
    </ReactionsContainer>
  );
};
