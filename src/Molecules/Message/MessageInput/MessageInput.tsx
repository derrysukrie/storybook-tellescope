import { Box, InputBase, Stack } from "@mui/material";
import { useCallback, useEffect, memo } from "react";
import { IconButton } from "../../../components/atoms/button/icon-button";
import { Icon } from "../../../Atoms";
import { AddCircleOutline, EmojiEmotionsOutlined, Mic } from "@mui/icons-material";
import { Toolbar } from "../MessageToolbar/MessageToolbar";
import { styles, useMessageInputStyles } from "./styles/maps";
import { Send } from "../Icons";
import { useMessageInput, type MessageInputProps } from "../hooks/useMessageInput";

/**
 * MessageInput component for composing and sending messages
 * 
 * @example
 * ```tsx
 * <MessageInput
 *   enableTeamChat={false}
 *   chatInterface="CHAT"
 *   setChatInterface={setChatInterface}
 *   onSubmit={handleSubmit}
 *   config={{ placeholder: "Type a message...", maxLength: 500 }}
 * />
 * ```
 */
export const MessageInput = memo(({ 
  enableTeamChat, 
  chatInterface, 
  setChatInterface, 
  onSubmit,
  onInputChange,
  config = {}
}: MessageInputProps) => {
  const {
    placeholder = "Type a message...",
    maxLength = 1000,
    autoFocus = false,
    disabled = false,
    error = false,
    showCharacterCount = false,
    multiline = false
  } = config;

  const inputStyles = useMessageInputStyles({ disabled, error });
  const {
    value,
    setValue,
    handleSubmit,
    canSubmit,
    inputRef,
    isComposing,
    setIsComposing,
    // characterCount,
    // remainingChars
  } = useMessageInput({ onSubmit, onInputChange, config });

  // Auto-focus on mount if specified
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  }, [setValue]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit, isComposing]);

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, [setIsComposing]);

  const handleCompositionEnd = useCallback(() => {
    setIsComposing(false);
  }, [setIsComposing]);

  // Memoize the input props to prevent unnecessary re-renders
  const inputProps = useCallback(() => ({
    "aria-label": "Type a message",
    maxLength: maxLength,
    "aria-describedby": showCharacterCount ? "character-count" : undefined
  }), [maxLength, showCharacterCount]);

  // Memoize the send button styles
  const sendButtonStyles = useCallback(() => ({
    ...inputStyles.sendButton,
    opacity: canSubmit ? 1 : 0.5,
    transition: 'opacity 0.2s ease'
  }), [inputStyles.sendButton, canSubmit]);

  return (
    <Box sx={styles.inputContainer(enableTeamChat)}>
      {enableTeamChat && (
        <Box sx={{ display: "flex" }}>
          <IconButton 
            color="secondary"
            aria-label="Add attachment"
            disabled={disabled}
          >
            <Icon icon={AddCircleOutline} size="medium" />
          </IconButton>
          <IconButton 
            color="secondary"
            aria-label="Add emoji"
            disabled={disabled}
          >
            <Icon icon={EmojiEmotionsOutlined} size="medium" />
          </IconButton>
        </Box>
      )}
      <Stack display={"flex"} flexDirection={"column"} width={"100%"} gap={2}>
        {!enableTeamChat && (
          <Toolbar 
            chatInterface={chatInterface} 
            setChatInterface={setChatInterface} 
          />
        )}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
          <Box sx={inputStyles.root}>
            <IconButton 
              disabled={disabled} 
              sx={inputStyles.textFieldsButton}
              aria-label="Format text"
            >
              {/* <TextFieldsIcon /> */}
            </IconButton>
            <InputBase
              ref={inputRef}
              disabled={disabled}
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              sx={inputStyles.inputBase}
              placeholder={placeholder}
              multiline={multiline}
              minRows={multiline ? 2 : 1}
              maxRows={multiline ? 4 : 1}
              inputProps={inputProps()}
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton 
                disabled={disabled} 
                sx={inputStyles.micButton}
                aria-label="Voice message"
              >
                <Mic />
              </IconButton>
              <IconButton
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="send-button"
                sx={sendButtonStyles()}
                aria-label="Send message"
              >
                <Send />
              </IconButton>
            </Box>
          </Box>
          {/* Character counter for better UX */}
          {/* {showCharacterCount && maxLength && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              fontSize: '0.75rem', 
              color: remainingChars < 50 ? 'error.main' : 'text.secondary',
              px: 1
            }}>
              <Typography 
                variant="caption" 
                id="character-count"
                color={remainingChars < 50 ? 'error' : 'textSecondary'}
              >
                {characterCount}/{maxLength}
              </Typography>
            </Box>
          )} */}
        </Box>
      </Stack>
    </Box>
  );
});

MessageInput.displayName = 'MessageInput';
