import type { ChatInterface } from '../types'

export interface InputConfig {
    placeholder?: string
    maxLength?: number
    autoFocus?: boolean
    disabled?: boolean
    error?: boolean
    showCharacterCount?: boolean
    multiline?: boolean
}

export interface MessageInputProps {
    enableTeamChat?: boolean
    chatInterface: ChatInterface
    setChatInterface: (chatInterface: ChatInterface) => void
    onSubmit: (content: string) => void
    onInputChange?: (value: string) => void
    value?: string
    config?: InputConfig
}
