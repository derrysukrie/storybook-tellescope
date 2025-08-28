import type { Meta, StoryObj } from '@storybook/react'
import { ChatTopbar } from './ChatTopbar'

const meta: Meta<typeof ChatTopbar> = {
    title: 'Atoms/ChatTopBar',
    component: ChatTopbar,
}

export default meta
type Story = StoryObj<typeof ChatTopbar>

export const Default: Story = {
    render: () => <ChatTopbar onClose={() => console.log('close')} />,
}
