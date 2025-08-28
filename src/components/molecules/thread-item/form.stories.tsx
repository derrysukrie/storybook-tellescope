import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined'
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined'
import TagOutlinedIcon from '@mui/icons-material/TagOutlined'
import type { Meta, StoryObj } from '@storybook/react-vite'
import ThreadItem from './thread-item'

const meta = {
    title: 'MOLECULES/Messaging/Thread Item',
    component: ThreadItem,
    parameters: {
        controls: {
            include: ['current', 'archived', 'unread', 'pinned'],
        },
    },
    argTypes: {
        current: {
            control: { type: 'boolean' },
        },
        archived: {
            control: { type: 'boolean' },
        },
        unread: {
            control: { type: 'boolean' },
        },
        pinned: {
            control: { type: 'boolean' },
        },
    },
} satisfies Meta<typeof ThreadItem>

export default meta
type Story = StoryObj<typeof meta>

export const Form: Story = {
    args: {
        title: 'Form title response example',
        date: '3/5/2025 at 1:00 PM PST',
        content: 'Q1: example of the first question in a form showing truncation',
        name: 'Patient name',
        details: '5 responses',
        icon: <AssignmentOutlinedIcon />,
        current: false,
        archived: false,
        unread: false,
        pinned: false,
    },
}

export const Email: Story = {
    args: {
        title: 'Email Subject example  ',
        date: '3/5/2025 at 1:00 PM PST',
        content: 'Most recent email message preview example to show truncation',
        name: 'Patient name',
        details: '5',
        icon: <EmailOutlinedIcon />,
        current: false,
        archived: false,
        unread: false,
        pinned: false,
    },
}

export const Event: Story = {
    args: {
        title: 'An example event with a example title',
        date: '3/5/2025 at 1:00 PM PST',
        content: 'Event description example with at least one line to show truncation',
        icon: <CalendarMonthOutlinedIcon />,
        current: false,
        archived: false,
        unread: false,
        pinned: false,
    },
}

export const Chat: Story = {
    args: {
        title: 'Chat Subject example ',
        date: '3/5/2025 at 1:00 PM PST',
        content: 'Most recent chat message example to show truncation',
        name: 'Patient name',
        details: '1',
        icon: <ChatBubbleOutlineOutlinedIcon />,
        current: false,
        archived: false,
        unread: false,
        pinned: false,
    },
}

export const Phone: Story = {
    args: {
        title: '+123 456 7890 ',
        date: '3/5/2025 at 1:00 PM PST',
        content:
            'Message text lorem ipsum dolor sit amet, consectetur. lorem ipsum dolor sit amet, consectetur.lorem ipsum dolor sit amet, consectetur.lorem ipsum dolor sit amet, consectetur.lorem ipsum dolor sit amet, consectetur.lorem ipsum dolor sit amet, consectetur.lorem ipsum dolor sit amet, consectetur.',
        name: 'Patient name',
        details: '1',
        icon: <LocalPhoneIcon />,
        current: false,
        archived: false,
        unread: false,
        pinned: false,
    },
}

export const GroupMMS: Story = {
    args: {
        title: 'Group MMS Subject example',
        date: '3/5/2025 at 1:00 PM PST',
        content:
            'Message text lorem ipsum dolor sit amet, consectetur. lorem ipsum dolor sit amet, consectetur.lorem ipsum dolor sit amet, consectetur.lorem ipsum dolor sit amet, consectetur.lorem ipsum dolor sit amet, consectetur.lorem ipsum dolor sit amet, consectetur.lorem ipsum dolor sit amet, consectetur.',
        name: 'Patient name',
        details: '5 responses',
        icon: <GroupOutlinedIcon />,
        current: false,
        archived: false,
        unread: false,
        pinned: false,
    },
}

export const Note: Story = {
    args: {
        title: 'Note template title example',
        date: '3/5/2025 at 1:00 PM PST',
        content:
            'Message text lorem ipsum dolor sit amet, consectetur. lorem ipsum dolor sit amet, consectetur.lorem ipsum dolor sit amet, consectetur.lorem ipsum dolor sit amet, consectetur.lorem ipsum dolor sit amet, consectetur.lorem ipsum dolor sit amet, consectetur.lorem ipsum dolor sit amet, consectetur.',
        name: 'Patient name',
        details: '5 responses',
        icon: <StickyNote2OutlinedIcon />,
        current: false,
        archived: false,
        unread: false,
        pinned: false,
    },
}

export const SMS: Story = {
    args: {
        title: '+123 456 7890 ',
        date: '3/5/2025 at 1:00 PM PST',
        content: 'Most recent SMS message example to show truncation',
        name: 'Patient name',
        details: '5 responses',
        icon: <SmsOutlinedIcon />,
        current: false,
        archived: false,
        unread: false,
        pinned: false,
    },
}

export const TeamChatItem: Story = {
    args: {
        title: 'Team Chat 😁',
        icon: <TagOutlinedIcon />,
        current: false,
        archived: false,
        unread: false,
        pinned: false,
    },
}
