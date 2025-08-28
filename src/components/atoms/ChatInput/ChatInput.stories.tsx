import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import ChatInput from './ChatInput'

const meta: Meta<typeof ChatInput> = {
    title: 'Atoms/Chat Input',
    component: ChatInput,
}

export default meta

type Story = StoryObj<typeof ChatInput>

export const Default: Story = {
    argTypes: {
        value: {
            table: {
                disable: true,
            },
        },
        placeholder: {
            table: {
                disable: true,
            },
        },
        disabled: {
            table: {
                disable: true,
            },
        },
        onChange: {
            table: {
                disable: true,
            },
        },
        onSend: {
            table: {
                disable: true,
            },
        },
    },
    render: () => {
        const [message, setMessage] = useState('')

        const handleSend = () => {
            alert(`Sending message: ${message}`)
            setMessage('')
        }

        return (
            <ChatInput
                value={message}
                onChange={e => setMessage(e.target.value)}
                onSend={handleSend}
            />
        )
    },
}
