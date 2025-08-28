import SentIcon from '@mui/icons-material/Send'
import { IconButton, InputBase, Paper } from '@mui/material'
import type React from 'react'

interface ChatInputProps {
    value?: string
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSend?: () => void
    disabled?: boolean
}

const ChatInput: React.FC<ChatInputProps> = ({
    value,
    onChange,
    onSend,
    placeholder = 'Ask a question about this chat...',
    disabled = false,
}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (onSend) {
            e.preventDefault()
            onSend()
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Paper
                sx={{
                    p: '4px, 8px',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 2,
                    boxShadow: 'none',
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1, caretColor: '#FF5722' }}
                    placeholder={placeholder}
                    inputProps={{ 'aria-label': 'chat input' }}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />

                <IconButton
                    type="submit"
                    sx={{ p: '10px' }}
                    aria-label="send"
                    disabled={disabled || !value?.trim()}
                >
                    <SentIcon color={value?.trim() ? 'primary' : 'disabled'} />
                </IconButton>
            </Paper>
        </form>
    )
}

export default ChatInput
