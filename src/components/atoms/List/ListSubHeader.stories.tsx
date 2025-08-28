import { List, ListItem } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'
import ListSubheader from './ListSubHeader'

const meta: Meta<typeof ListSubheader> = {
    title: 'Atoms/ListSubHeader',
    component: ListSubheader,
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ListSubheader>

export const Default: Story = {
    render: args => (
        <List>
            <ListItem>
                <ListSubheader {...args}>Subheader</ListSubheader>
            </ListItem>
        </List>
    ),
}
