import { Box, Typography } from "@mui/material";

import { ReactionItem, ReactionsContainer, ReactionsWrapper } from "./styles/maps";
import type { MessageType, Reaction } from "../../types";

interface ReactionsProps {
  reactions: Reaction[] | undefined;
  messageType: MessageType;
}

export const Reactions = ({ reactions, messageType }: ReactionsProps) => {

  if (!reactions) {
    return null;
  }

  return (
    <ReactionsContainer messageType={messageType}>
      <ReactionsWrapper>
        {reactions?.map((reaction) => (
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
