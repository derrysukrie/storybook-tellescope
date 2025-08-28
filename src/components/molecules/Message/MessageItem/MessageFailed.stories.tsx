import { Box } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'
import { MessageFailed } from './MessageFailed'

const meta: Meta<typeof MessageFailed> = {
    title: 'Molecules/Message/MessageItem/MessageFailed',
    component: MessageFailed,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'A component that displays failed message information.',
            },
        },
    },
    argTypes: {
        failedTime: {
            control: 'date',
            description: 'The failed time for the message (null if not failed)',
        },
        onMessageRetry: {
            action: 'clicked',
        },
    },
    args: {
        failedTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    },
    decorators: [
        Story => (
            <Box sx={{ maxWidth: 'fit-content' }}>
                <Story />
            </Box>
        ),
    ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        failedTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
        onMessageRetry: () => {
            console.log('clicked')
        },
    },
}
