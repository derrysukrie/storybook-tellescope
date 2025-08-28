import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from './button'

const meta = {
    title: 'ATOMS/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        controls: {
            exclude: ['onClick', 'children'],
        },
    },
    argTypes: {
        color: {
            options: ['primary', 'secondary', 'info'],
            control: { type: 'select' },
        },
        appearance: {
            control: { type: 'select' },
            options: ['contained', 'outlined', 'text'],
        },
        size: {
            control: { type: 'select' },
            options: ['large', 'medium', 'small'],
        },
    },
    args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: 'LABEL',
        color: 'primary',
        appearance: 'contained',
        size: 'medium',
        disabled: false,
    },
}
