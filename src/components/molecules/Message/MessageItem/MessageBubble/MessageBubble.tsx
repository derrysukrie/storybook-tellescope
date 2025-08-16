import { Box } from "@mui/material";
import { useMessageItemStyles } from "./styles/maps";
import { MessageOptions } from "../../MessageOptions";
import type { IMessage } from "../../types";
import { MessageText } from "./MessageText";

interface MessageBubbleProps {
  message: IMessage;
  messageId: string;
  isEmojiPickerActive: boolean;
  onAddReactionClick: (messageId: string, buttonElement: HTMLElement, messageType: string) => void;
  onMessageRetry?: (messageId: string) => void;
}

export const MessageBubble = ({ 
  message, 
  messageId, 
  isEmojiPickerActive, 
  onAddReactionClick,
  onMessageRetry  
}: MessageBubbleProps) => {
  const styles = useMessageItemStyles({ messageType: message.type });

  return (
    <Box sx={styles.root}>
      <MessageText onMessageRetry={onMessageRetry} messageType={message.type} message={message} />
      <Box className="message-options" sx={styles.messageOptions}>
        <MessageOptions 
          createdAt={message.createdAt || new Date()} 
          messageType={message.type}
          messageId={messageId}
          isEmojiPickerActive={isEmojiPickerActive}
          onAddReactionClick={onAddReactionClick}
        />
      </Box>
    </Box>
  );
};
