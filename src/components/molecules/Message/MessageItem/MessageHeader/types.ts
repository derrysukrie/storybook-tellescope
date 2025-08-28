import type { ChatInterface } from '../../types'

export interface HeaderFormData {
    to?: string
    cc?: string
    from?: string
    subject?: string
    tags?: string[]
}

export interface HeaderFormProps {
    headerFormData: HeaderFormData
    onHeaderFormChange: (field: keyof HeaderFormData, value: string | string[]) => void
    chatInterface: string
    enableTeamChat: boolean
}

export interface HeaderContentProps {
    chatInterface: ChatInterface
    enableTeamChat?: boolean
    setEnableTeamChat: (value: boolean) => void
    isEmpty: boolean
    headerFormData?: HeaderFormData
    onHeaderFormChange?: (field: keyof HeaderFormData, value: string | string[]) => void
}
