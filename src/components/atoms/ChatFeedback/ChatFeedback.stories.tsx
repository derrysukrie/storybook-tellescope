import type { Meta, StoryObj } from '@storybook/react'
import type { ChatFeedback } from './ChatFeedback'

const meta: Meta = {
    title: 'Atoms/Chat Feedback',
}

export default meta

type Story = StoryObj<typeof ChatFeedback>

export const Default: Story = {
    args: { type: 'default' },
    argTypes: {
        type: {
            control: {
                disable: true,
            },
        },
    },
}

export const Return: StoryObj = {
    args: { type: 'return' },
    argTypes: {
        type: {
            control: {
                disable: true,
            },
        },
    },
}

export const Use: StoryObj = {
    args: { type: 'use' },
    argTypes: {
        type: {
            control: {
                disable: true,
            },
        },
    },
}
