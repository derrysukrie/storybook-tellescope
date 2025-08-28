import InboxIcon from '@mui/icons-material/Inbox'
import { Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import ChipArray from './chip-array'

const meta = {
    title: 'ATOMS/FormInputs/ChipArray',
    component: ChipArray,
    parameters: {
        controls: {
            include: [''],
        },
    },
} satisfies Meta<typeof ChipArray>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: 'Label',
        data: [
            { key: '1', label: 'Chip' },
            { key: '2', label: 'Chip' },
            { key: '3', label: 'Chip' },
            { key: '4', label: 'Chip' },
            { key: '5', label: 'Chip' },
            { key: '6', label: 'Chip' },
        ],
        withDelete: true,
    },
}

export const SansLabel: Story = {
    args: {
        data: [
            { key: '1', label: 'Angular' },
            { key: '2', label: 'jQuery' },
            { key: '3', label: 'Polymer' },
            { key: '4', label: 'React' },
        ],
        withDelete: true,
    },
}

export const Filter: Story = {
    args: {
        label: (
            <Stack sx={{ flexDirection: 'row', gap: 1 }}>
                <InboxIcon /> Channel
            </Stack>
        ),
        data: [
            { key: '1', label: 'Chat' },
            { key: '2', label: 'SMS' },
            { key: '3', label: 'Email' },
            { key: '4', label: 'Form Response' },
            { key: '5', label: 'Group MMS' },
        ],
        withDelete: false,
        selectable: true,
        ListProps: {
            sx: {
                maxWidth: '500px',
            },
        },
    },
}
