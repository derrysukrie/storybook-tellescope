import type { Meta, StoryObj } from '@storybook/react'
import { AvatarColorValues, AvatarSizeValues } from '../../../shared'
import Avatar from './Avatar'
import AvatarGroup from './AvatarGroup'

const meta: Meta<typeof Avatar> = {
    title: 'Atoms/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    args: {
        color: undefined,
        size: 'extra small',
        badge: false,
    },
    argTypes: {
        color: {
            control: 'select',
            options: Object.values(AvatarColorValues),
        },
        size: {
            control: 'radio',
            options: Object.values(AvatarSizeValues),
        },
        badge: {
            control: 'boolean',
        },
    },
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Primary: Story = {
    args: {
        color: 'primary',
        size: 'medium',
    },
    argTypes: {
        color: {
            table: { disable: false },
        },
    },
    render: args => <Avatar {...args}>OP</Avatar>,
}

export const Secondary: Story = {
    args: {
        color: 'secondary',
        size: 'medium',
    },
    argTypes: {
        color: {
            table: { disable: false },
        },
    },
    render: args => <Avatar {...args}>OP</Avatar>,
}

export const AvatarGroups: StoryObj<typeof AvatarGroup> = {
    args: {
        size: 'medium',
        max: 4,
        spacing: 'medium',
        sx: {
            justifyContent: 'flex-end',
        },
    },
    argTypes: {
        size: {
            control: 'radio',
            options: Object.values(AvatarSizeValues),
        },
        color: {
            table: { disable: true },
        },
        max: {
            table: { disable: true },
        },
        badge: {
            table: { disable: true },
        },
        spacing: {
            table: { disable: true },
        },
        sx: {
            table: { disable: true },
        },
    },
    render: args => (
        <AvatarGroup {...args}>
            <Avatar>OP</Avatar>
            <Avatar>OP</Avatar>
            <Avatar>OP</Avatar>
            <Avatar>OP</Avatar>
            <Avatar>OP</Avatar>
            <Avatar>OP</Avatar>
            <Avatar>OP</Avatar>
        </AvatarGroup>
    ),
}
