import {
    AssignmentOutlined,
    AttachFile,
    ChatBubbleOutline,
    GroupOutlined,
    Link,
    LocalPostOfficeOutlined,
    MessageOutlined,
    StickyNote2Outlined,
    TextsmsOutlined,
} from '@mui/icons-material'
import { Box, Divider, IconButton } from '@mui/material'
import { AddTicket, Lightbulb, OpenInFull } from '../Icons'

export type ChatInterface = 'CHAT' | 'SMS' | 'EMAIL' | 'MMS'

const ToolType = {
    CHAT: 'CHAT',
    SMS: 'SMS',
    EMAIL: 'EMAIL',
    MMS: 'MMS',
    ASSIGNMENT: 'ASSIGNMENT',
    NOTE: 'NOTE',
    LINK: 'LINK',
    ATTACH: 'ATTACH',
    MESSAGE: 'MESSAGE',
    TICKET: 'TICKET',
    LIGHTBULB: 'LIGHTBULB',
    EXPAND: 'EXPAND',
} as const

type ToolType = (typeof ToolType)[keyof typeof ToolType]

interface IconWrapperProps {
    children: React.ReactNode
    isSelected: boolean
    backgroundColor: string
    onClick: () => void
}

const IconWrapper = ({ children, isSelected, backgroundColor, onClick }: IconWrapperProps) => {
    return (
        <IconButton
            onClick={onClick}
            sx={{
                color: isSelected ? 'white' : 'black',
                backgroundColor: isSelected ? backgroundColor : 'transparent',
                transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
                '&:hover': isSelected
                    ? { backgroundColor, color: 'white' }
                    : { backgroundColor: 'transparent', color: 'black' },
                '&:focus': isSelected
                    ? { backgroundColor, color: 'white' }
                    : { backgroundColor: 'transparent', color: 'black' },
            }}
        >
            {children}
        </IconButton>
    )
}

export const Toolbar = ({
    chatInterface,
    setChatInterface,
}: {
    chatInterface: ChatInterface
    setChatInterface: (value: ChatInterface) => void
}) => {
    const toolColors: Partial<Record<ToolType, string>> = {
        [ToolType.CHAT]: '#1C7AE0', // Blue
        [ToolType.SMS]: '#8B5CF2', // Green
        [ToolType.EMAIL]: '#6466F1', // Orange
        [ToolType.MMS]: '#15B8A6', // Purple
        // Only first 4 tools have background colors
    }

    const tools = [
        { type: ToolType.CHAT, icon: <ChatBubbleOutline /> },
        { type: ToolType.SMS, icon: <TextsmsOutlined /> },
        { type: ToolType.EMAIL, icon: <LocalPostOfficeOutlined /> },
        { type: ToolType.MMS, icon: <GroupOutlined /> },
        { type: ToolType.ASSIGNMENT, icon: <AssignmentOutlined /> },
        { type: ToolType.NOTE, icon: <StickyNote2Outlined /> },
        { type: ToolType.LINK, icon: <Link /> },
        { type: ToolType.ATTACH, icon: <AttachFile /> },
        { type: ToolType.MESSAGE, icon: <MessageOutlined /> },
        { type: ToolType.TICKET, icon: <AddTicket /> },
        { type: ToolType.LIGHTBULB, icon: <Lightbulb /> },
        { type: ToolType.EXPAND, icon: <OpenInFull /> },
    ]

    return (
        <Box gap={1} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            {tools.slice(0, 6).map(({ type, icon }) => {
                const backgroundColor = toolColors[type]

                if (backgroundColor) {
                    return (
                        <IconWrapper
                            key={type}
                            isSelected={chatInterface === type}
                            backgroundColor={backgroundColor}
                            onClick={() => setChatInterface(type as ChatInterface)}
                        >
                            {icon}
                        </IconWrapper>
                    )
                } else {
                    return (
                        <IconButton
                            key={type}
                            // onClick={() => setChatInterface(type as ChatInterface)}
                            sx={{
                                color: 'black',
                                transition: 'color 0.2s ease-in-out',
                            }}
                        >
                            {icon}
                        </IconButton>
                    )
                }
            })}
            <Divider orientation="vertical" sx={{ height: 32, borderColor: '#E2E8F0' }} />
            {tools.slice(6).map(({ type, icon }) => (
                <IconButton
                    key={type}
                    // onClick={() => setChatInterface(type as ChatInterface)}
                    sx={{
                        color: 'black',
                        transition: 'color 0.2s ease-in-out',
                    }}
                >
                    {icon}
                </IconButton>
            ))}
        </Box>
    )
}
