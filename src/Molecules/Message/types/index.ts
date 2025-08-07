export type MessageType = "INCOMING" | "OUTGOING" | "TEAM_CHAT";
export type ChatInterface = "CHAT" | "SMS" | "EMAIL" | "MMS";

export interface IMessage {
  id?: string;
  type: MessageType;
  text: string;
  avatar?: string;
  createdAt?: Date;
  role?: string;
  image?: {
    url: string;
    fileName: string;
  };
  link?: string;
  reactions?: Reaction[];
  scheduledTime?: Date | null;
  isTranslated?: boolean;
}

export interface Reaction {
  icon: string;
  count: number;
}

// Enhanced configuration types for better DX
export interface InputConfig {
  placeholder?: string;
  maxLength?: number;
  autoFocus?: boolean;
  disabled?: boolean;
  error?: boolean;
  showCharacterCount?: boolean;
  multiline?: boolean;
}

export interface HeaderConfig {
  showForm?: boolean;
  formData?: HeaderFormData;
  showTeamChatToggle?: boolean;
  showInterfaceSelector?: boolean;
}

export interface ContainerConfig {
  width?: string | number;
  height?: string | number;
  maxWidth?: string | number;
  minHeight?: string | number;
}

export interface MessageConfig {
  enableTeamChat?: boolean;
  chatInterface?: ChatInterface;
  input?: InputConfig;
  header?: HeaderConfig;
  container?: ContainerConfig;
}

export interface MessageCallbacks {
  onMessageSubmit: (content: string) => void;
  onInputChange?: (value: string) => void;
  onHeaderFormChange?: (field: keyof HeaderFormData, value: string | string[]) => void;
  onChatInterfaceChange?: (chatInterface: ChatInterface) => void;
  onTeamChatToggle?: (enabled: boolean) => void;
  onMessageReaction?: (messageId: string, reaction: Reaction) => void;
  onMessageOptions?: (messageId: string, action: string) => void;
}

// Error handling types
export interface MessageError {
  type: 'VALIDATION' | 'SUBMISSION' | 'NETWORK';
  message: string;
  field?: string;
  code?: string;
}

// Loading states
export interface MessageLoadingState {
  isSubmitting?: boolean;
  isTyping?: boolean;
  isUploading?: boolean;
}

// Main component props
export interface MessageProps {
  messages: IMessage[];
  config?: MessageConfig;
  callbacks: MessageCallbacks;
  loading?: MessageLoadingState;
  error?: MessageError | null;
  className?: string;
  'data-testid'?: string;
}

// Header form data interface
export interface HeaderFormData {
  to?: string;
  cc?: string;
  from?: string;
  subject?: string;
  tags?: string[];
}

