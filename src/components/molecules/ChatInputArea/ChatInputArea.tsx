import { Box } from '@mui/material'
import type React from 'react'
import { useState } from 'react'
import ChatInput from '../../atoms/ChatInput/ChatInput'
import { FileArray } from '../FileArray/FileArray'
import { SuggestedActions } from '../SuggestedActions/SuggestedActions'

export const ChatInputArea: React.FC = () => {
    const [message, setMessage] = useState('')

    const handleSend = () => {
        alert(`Sending message: ${message}`)
        setMessage('')
    }

    return (
        <Box component="section">
            <Box component="div" sx={{ mb: 1 }}>
                <SuggestedActions expanded={false} />
            </Box>
            <Box component="div" sx={{ mb: 1 }}>
                <FileArray />
            </Box>
            <ChatInput
                value={message}
                onChange={e => setMessage(e.target.value)}
                onSend={handleSend}
            />
        </Box>
    )
}
