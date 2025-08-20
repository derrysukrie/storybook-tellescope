import { useCallback, useRef, useState, useMemo, useEffect } from "react";
import type { ChatInterface } from "../types";

export interface InputConfig {
  placeholder?: string;
  maxLength?: number;
  autoFocus?: boolean;
  disabled?: boolean;
  error?: boolean;
  showCharacterCount?: boolean;
  multiline?: boolean;
}

export interface MessageInputProps {
  enableTeamChat?: boolean;
  chatInterface: ChatInterface;
  setChatInterface: (chatInterface: ChatInterface) => void;
  onSubmit: (content: string) => void;
  onInputChange?: (value: string) => void;
  config?: InputConfig;
}

export const useMessageInput = ({
  onSubmit,
  onInputChange,
  config = {},
}: Pick<MessageInputProps, "onSubmit" | "onInputChange"> & {
  config?: InputConfig;
}) => {
  const { disabled = false, maxLength = 1000 } = config;
  const [value, setValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // const handleChange = useCallback(
  //   (newValue: string) => {
  //     if (maxLength && newValue.length > maxLength) return;
  //     setValue(newValue);
      
  //     // Debounce the onInputChange callback to reduce parent component updates
  //     if (onInputChange) {
  //       if (debounceTimeoutRef.current) {
  //         clearTimeout(debounceTimeoutRef.current);
  //       }
  //       debounceTimeoutRef.current = setTimeout(() => {
  //         onInputChange(newValue);
  //       }, 100); // 100ms debounce
  //     }
  //   },
  //   [maxLength, onInputChange]
  // );

  // Cleanup timeout on unmount
  // useEffect(() => {
  //   return () => {
  //     if (debounceTimeoutRef.current) {
  //       clearTimeout(debounceTimeoutRef.current);
  //     }
  //   };
  // }, []);

  const handleSubmit = useCallback(() => {
    const trimmedValue = value.trim();
    if (!trimmedValue || disabled || isComposing) return;

    onSubmit(trimmedValue);
    setValue("");
    inputRef.current?.focus();
  }, [value, disabled, isComposing, onSubmit]);

  // Memoize canSubmit calculation to prevent unnecessary re-renders
  const canSubmit = useMemo(() => {
    return value.trim().length > 0 && !disabled && !isComposing;
  }, [value, disabled, isComposing]);

  // Memoize character count calculations
  const characterCount = useMemo(() => value.length, [value]);
  const remainingChars = useMemo(() => maxLength - value.length, [maxLength, value]);

  return {
    // value,
    // setValue: handleChange,
    handleSubmit,
    canSubmit,
    inputRef,
    isComposing,
    setIsComposing,
    characterCount,
    remainingChars,
  };
};
