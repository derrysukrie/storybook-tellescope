import { Box } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'
import { ItemPortal } from './item'

const meta: Meta<typeof ItemPortal> = {
    title: 'Molecules/PatientPortal/Item',
    component: ItemPortal,
    parameters: {
        layout: 'padded',
    },
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['form', 'link', 'appointment', 'message'],
        },
        completed: {
            control: { type: 'boolean' },
        },
        badge: {
            control: { type: 'boolean' },
        },
        badgeCount: {
            control: { type: 'number' },
        },
        hasNewMessage: {
            control: { type: 'boolean' },
        },
        onClick: { action: 'clicked' },
    },
}

export default meta
type Story = StoryObj<typeof ItemPortal>

export const Form: Story = {
    args: {
        type: 'form',
        completed: false,
        title: 'Complete Registration',
    },
    render: args => (
        <Box
            px={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#f0f0f0"
            height="100vh"
        >
            <ItemPortal {...args} />
        </Box>
    ),
}

export const Link: Story = {
    args: {
        type: 'link',
        completed: true,
        title: 'Review care plan',
    },
    render: args => (
        <Box
            px={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#f0f0f0"
            height="100vh"
        >
            <ItemPortal {...args} />
        </Box>
    ),
}

export const Appointment: Story = {
    args: {
        type: 'appointment',
        completed: true,
        title: 'Schedule your appointment',
    },
    render: args => (
        <Box
            px={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#f0f0f0"
            height="100vh"
        >
            <ItemPortal {...args} />
        </Box>
    ),
}

export const Message: Story = {
    args: {
        type: 'message',
        completed: false,
        title: 'Message from your doctor',
        badge: true,
        badgeCount: 3,
        dateTime: '3/5/2025 1:00 PM',
        doctorName: 'Dr. John Doe',
        avatarSrc: 'https://via.placeholder.com/80',
        hasNewMessage: true,
    },
    render: args => (
        <Box
            px={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#f0f0f0"
            height="100vh"
        >
            <ItemPortal {...args} />
        </Box>
    ),
}

export const MessageWithoutNewIndicator: Story = {
    args: {
        type: 'message',
        completed: true,
        title: 'Read message from your doctor',
        badge: false,
        dateTime: 'Yesterday 3:00 PM',
        doctorName: 'Dr. Sarah Smith',
        avatarSrc: 'https://via.placeholder.com/80',
        hasNewMessage: false,
    },
    render: args => (
        <Box
            px={10}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#f0f0f0"
            height="100vh"
        >
            <ItemPortal {...args} />
        </Box>
    ),
}

export const AllVariants: Story = {
    render: () => (
        <Box
            px={10}
            display="flex"
            flexDirection="column"
            gap={2}
            bgcolor="#f0f0f0"
            height="100vh"
            py={4}
        >
            <ItemPortal type="form" completed={false} title="Complete Registration" />
            <ItemPortal type="link" completed={true} title="Review care plan" />
            <ItemPortal type="appointment" completed={true} title="Schedule your appointment" />
            <ItemPortal
                type="message"
                completed={false}
                title="New message from your doctor"
                badge={true}
                badgeCount={3}
                dateTime="3/5/2025 1:00 PM"
                doctorName="Dr. John Doe"
                avatarSrc="https://via.placeholder.com/80"
                hasNewMessage={true}
            />
            <ItemPortal
                type="message"
                completed={true}
                title="Read message from your doctor"
                badge={false}
                dateTime="Yesterday 3:00 PM"
                doctorName="Dr. Sarah Smith"
                avatarSrc="https://via.placeholder.com/80"
                hasNewMessage={false}
            />
        </Box>
    ),
}
