import { Avatar, Stack } from '@mui/material'
import type { IMessage, MessageType } from '../../types'
import { MessageFailed } from '../MessageFailed'
import { MessageImage } from '../MessageImage'
import { MessageRole } from '../MessageRole'
import { MessageScheduled } from '../MessageScheduled'
import { MessageTranslated } from '../MessageTranslated'
import { Reactions } from '../Reactions/Reactions'
import { Container, MessageBubble, MessageContainer, MessageContent } from './styles/maps'

interface TextProps {
    messageType: MessageType
    message: IMessage
    onMessageRetry?: (messageId: string) => void
}

export const MessageText = ({ messageType, message, onMessageRetry }: TextProps) => {
    const showAvatar = messageType === 'OUTGOING' || messageType === 'TEAM_CHAT'

    const handleRetry = () => {
        onMessageRetry?.(message.id || String(Math.random()))
    }

    return (
        <Container messageType={messageType}>
            {showAvatar && <Avatar src={message.avatar} sx={{ width: 32, height: 32 }} />}
            <MessageContainer messageType={messageType}>
                <MessageBubble haveImage={!!message.image} messageType={messageType}>
                    <MessageImage image={message.image || null} messageType={messageType} />
                    <MessageContent variant="body1" messageType={messageType}>
                        {message.text}
                    </MessageContent>
                </MessageBubble>
                <Stack
                    display={'flex'}
                    flexDirection={'row'}
                    gap={1.4}
                    mt={0.5}
                    alignItems={'center'}
                >
                    <MessageTranslated isTranslated={message.isTranslated ?? false} />
                    <MessageScheduled scheduledTime={message.scheduledTime ?? null} />
                    {message.type === 'OUTGOING' && (
                        <MessageFailed
                            failedTime={message.failedTime ?? null}
                            onMessageRetry={handleRetry}
                        />
                    )}
                    <MessageRole
                        isTeamChatEnabled={message.type === 'TEAM_CHAT'}
                        role={message?.role}
                    />
                    <Reactions reactions={message.reactions} messageType={messageType} />
                </Stack>
            </MessageContainer>
        </Container>
    )
}
