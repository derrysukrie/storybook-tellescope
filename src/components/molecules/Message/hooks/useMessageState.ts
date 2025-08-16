import { useState, useCallback, useMemo } from 'react';
import type { 
  MessageConfig, 
  MessageCallbacks, 
  ChatInterface, 
  HeaderFormData,
  MessageError,
  MessageLoadingState 
} from '../types';

/**
 * Unified state management hook for Message component
 * Provides centralized state management and validation
 */
export const useMessageState = (
  config: MessageConfig = {},
  callbacks?: MessageCallbacks
) => {
  // Core state
  const [chatInterface, setChatInterface] = useState<ChatInterface>(
    config.chatInterface || "CHAT"
  );
  const [enableTeamChat, setEnableTeamChat] = useState(
    config.enableTeamChat || false
  );
  const [headerFormData, setHeaderFormData] = useState<HeaderFormData>(
    config.header?.formData || {}
  );
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<MessageError | null>(null);
  const [loading, setLoading] = useState<MessageLoadingState>({});

  // Memoized state object
  const state = useMemo(() => ({
    chatInterface,
    enableTeamChat,
    headerFormData,
    inputValue,
    error,
    loading
  }), [chatInterface, enableTeamChat, headerFormData, inputValue, error, loading]);

  // Validation helpers
  const validateInput = useCallback((value: string): MessageError | null => {
    const inputConfig = config.input;
    
    if (!value.trim()) {
      return { type: 'VALIDATION', message: 'Message cannot be empty', field: 'input' };
    }
    
    if (inputConfig?.maxLength && value.length > inputConfig.maxLength) {
      return { 
        type: 'VALIDATION', 
        message: `Message exceeds ${inputConfig.maxLength} characters`, 
        field: 'input' 
      };
    }
    
    return null;
  }, [config.input]);

  const validateHeaderForm = useCallback((formData: HeaderFormData): MessageError | null => {
    if (config.header?.showForm) {
      if (!formData.subject?.trim()) {
        return { type: 'VALIDATION', message: 'Subject is required', field: 'subject' };
      }
      if (!formData.to?.trim()) {
        return { type: 'VALIDATION', message: 'Recipient is required', field: 'to' };
      }
    }
    return null;
  }, [config.header]);

  // Action handlers
  const handleChatInterfaceChange = useCallback((newInterface: ChatInterface) => {
    setChatInterface(newInterface);
    setError(null);
    setHeaderFormData({});
    callbacks?.onChatInterfaceChange?.(newInterface);
  }, [callbacks]);

  const handleTeamChatToggle = useCallback((enabled: boolean) => {
    setEnableTeamChat(enabled);
    setError(null);
    callbacks?.onTeamChatToggle?.(enabled);
  }, [callbacks]);

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    setError(null);
    callbacks?.onInputChange?.(value);
  }, [callbacks]);

  const handleHeaderFormChange = useCallback((
    field: keyof HeaderFormData, 
    value: string | string[]
  ) => {
    const newFormData = { ...headerFormData, [field]: value };
    setHeaderFormData(newFormData);
    setError(null);
    callbacks?.onHeaderFormChange?.(field, value);
  }, [headerFormData, callbacks]);

  const handleMessageSubmit = useCallback(async (content: string) => {
    // Validate input
    const inputError = validateInput(content);
    if (inputError) {
      setError(inputError);
      return;
    }

    // Validate header form if needed
    const headerError = validateHeaderForm(headerFormData);
    if (headerError) {
      setError(headerError);
      return;
    }

    // Set loading state
    setLoading(prev => ({ ...prev, isSubmitting: true }));
    setError(null);

    try {
      await callbacks?.onMessageSubmit(content);
      setInputValue("");
    } catch (err) {
      setError({
        type: 'SUBMISSION',
        message: err instanceof Error ? err.message : 'Failed to send message',
        code: 'SUBMISSION_ERROR'
      });
    } finally {
      setLoading(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [validateInput, validateHeaderForm, headerFormData, callbacks]);

  const handleMessageReaction = useCallback((messageId: string, reaction: any) => {
    callbacks?.onMessageReaction?.(messageId, reaction);
  }, [callbacks]);

  const handleMessageOptions = useCallback((messageId: string, action: string) => {
    callbacks?.onMessageOptions?.(messageId, action);
  }, [callbacks]);

  // Memoized actions object
  const actions = useMemo(() => ({
    setChatInterface: handleChatInterfaceChange,
    setEnableTeamChat: handleTeamChatToggle,
    setInputValue: handleInputChange,
    setHeaderFormData: handleHeaderFormChange,
    submitMessage: handleMessageSubmit,
    setMessageReaction: handleMessageReaction,
    setMessageOptions: handleMessageOptions,
    setError,
    setLoading
  }), [
    handleChatInterfaceChange,
    handleTeamChatToggle,
    handleInputChange,
    handleHeaderFormChange,
    handleMessageSubmit,
    handleMessageReaction,
    handleMessageOptions
  ]);

  return {
    state,
    actions,
    validation: {
      validateInput,
      validateHeaderForm
    }
  };
}; 