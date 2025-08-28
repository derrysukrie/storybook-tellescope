import { AddReactionOutlined, MarkEmailUnreadOutlined } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { Checkmark, Eye, HandsUp } from '../Icons'
import type { MessageType } from '../types'

interface MessageOptionsProps {
    haveUnreadMessages?: boolean
    messageType: MessageType
    createdAt: Date
    messageId: string
    isEmojiPickerActive: boolean
    onAddReactionClick: (messageId: string, buttonElement: HTMLElement, messageType: string) => void
}

const ButttonIcon = ({
    icon,
    onClick,
}: {
    icon: React.ReactNode
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}) => {
    return (
        <IconButton
            onClick={onClick}
            sx={{
                padding: '8px',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    backgroundColor: '#F9FAFB',
                },
            }}
        >
            {icon}
        </IconButton>
    )
}

export const MessageOptions = ({
    haveUnreadMessages,
    messageType,
    createdAt,
    messageId,
    onAddReactionClick,
}: MessageOptionsProps) => {
    const handleAddReactionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onAddReactionClick(messageId, event.currentTarget, messageType)
    }

    return (
        <Box>
            <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={messageType === 'INCOMING' ? 'flex-end' : 'flex-start'}
                justifyContent={'center'}
            >
                <Box
                    mr={messageType === 'INCOMING' ? 1 : 0}
                    ml={messageType === 'OUTGOING' ? 1 : 0}
                    display={'flex'}
                    alignItems={'center'}
                    gap={1.4}
                    flexDirection={messageType === 'INCOMING' ? 'row' : 'row-reverse'}
                    mb={1}
                    justifyContent={'flex-end'}
                >
                    <Typography color={'black'} variant="caption">
                        {new Date(createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </Typography>
                    <Box
                        bgcolor={haveUnreadMessages ? '#EFF0F2' : 'transparent'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        width={'24px'}
                        height={'24px'}
                        p={haveUnreadMessages ? 1 : 0}
                        borderRadius={'100px'}
                        sx={{
                            '&:hover': {
                                cursor: 'pointer',
                            },
                        }}
                    >
                        <MarkEmailUnreadOutlined sx={{ color: '#3C82F6' }} />
                    </Box>
                </Box>
                <Box position="relative">
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        bgcolor={'#EFF0F2'}
                        borderRadius={'100px'}
                        padding={'0'}
                    >
                        <ButttonIcon icon={<Checkmark />} />
                        <ButttonIcon icon={<HandsUp />} />
                        <ButttonIcon icon={<Eye />} />
                        <ButttonIcon
                            icon={<AddReactionOutlined />}
                            onClick={handleAddReactionClick}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
