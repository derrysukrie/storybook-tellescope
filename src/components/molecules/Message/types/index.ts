export type MessageType = 'INCOMING' | 'OUTGOING' | 'TEAM_CHAT'
export type ChatInterface = 'CHAT' | 'SMS' | 'EMAIL' | 'MMS'

export interface IMessage {
    id?: string
    type: MessageType
    text: string
    avatar?: string
    createdAt?: Date
    role?: string
    image?: {
        url: string
        fileName: string
    }
    link?: string
    reactions?: Reaction[]
    scheduledTime?: Date | null
    isTranslated?: boolean
    failedTime?: Date | null
}

export interface Reaction {
    icon: string
    count: number
}

// Enhanced configuration types for better DX
export interface InputConfig {
    placeholder?: string
    maxLength?: number
    autoFocus?: boolean
    disabled?: boolean
    error?: boolean
    showCharacterCount?: boolean
    multiline?: boolean
}

export interface HeaderConfig {
    showForm?: boolean
    formData?: HeaderFormData
    showTeamChatToggle?: boolean
    showInterfaceSelector?: boolean
}

export interface ContainerConfig {
    width?: string | number
    height?: string | number
    maxWidth?: string | number
    minHeight?: string | number
}

export interface MessageConfig {
    enableTeamChat?: boolean
    chatInterface?: ChatInterface
    input?: InputConfig
    header?: HeaderConfig
    container?: ContainerConfig
    setEnableTeamChat?: (enabled: boolean) => void
    setChatInterface?: (chatInterface: ChatInterface) => void
    setHeaderFormData?: (field: keyof HeaderFormData, value: string | string[]) => void
}

export interface MessageCallbacks {
    onMessageSubmit: (content: string) => void | Promise<void>
    onReceiveMessage?: (message: IMessage) => void
    onHeaderFormChange?: (field: keyof HeaderFormData, value: string | string[]) => void
    onChatInterfaceChange?: (chatInterface: ChatInterface) => void
    onTeamChatToggle?: (enabled: boolean) => void
    onMessageReaction?: (messageId: string, reaction: Reaction) => void
    onMessageOptions?: (messageId: string, action: string) => void
    onMessageRetry?: (messageId: string) => void
}

// Error handling types
export interface MessageError {
    type: 'VALIDATION' | 'SUBMISSION' | 'NETWORK'
    message: string
    field?: string
    code?: string
}

// Loading states
export interface MessageLoadingState {
    isSubmitting?: boolean
    isTyping?: boolean
    isUploading?: boolean
}

// Public state/actions contracts for container-level usage
export interface MessageState {
    chatInterface: ChatInterface
    enableTeamChat: boolean
    headerFormData: HeaderFormData
    inputValue: string
    error: MessageError | null
    loading: MessageLoadingState
}

export interface MessageActions {
    setChatInterface: (chatInterface: ChatInterface) => void
    setEnableTeamChat: (enabled: boolean) => void
    setInputValue: (value: string) => void
    setHeaderFormData: (field: keyof HeaderFormData, value: string | string[]) => void
    submitMessage: (content: string) => void | Promise<void>
    setMessageReaction: (messageId: string, reaction: Reaction) => void
    setMessageOptions: (messageId: string, action: string) => void
    setError: (error: MessageError | null) => void
    setLoading: (loading: MessageLoadingState) => void
}

// Main component props
export interface MessageProps {
    messages: IMessage[]
    config?: MessageConfig
    callbacks: MessageCallbacks
    loading?: MessageLoadingState
    error?: MessageError | null
    className?: string
}

// Header form data interface
export interface HeaderFormData {
    to?: string
    cc?: string
    from?: string
    subject?: string
    tags?: string[]
}
