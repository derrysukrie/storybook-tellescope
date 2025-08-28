import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Switch from './switch'

const meta = {
    title: 'ATOMS/Switch/Switch',
    component: Switch,
    parameters: {
        controls: {
            include: ['label', 'value', 'checked', 'name', 'color', 'size', 'disabled'],
        },
    },
    argTypes: {
        color: {
            options: ['default', 'primary', 'secondary', 'info'],
            control: { type: 'select' },
        },
        size: {
            control: { type: 'select' },
            options: ['medium', 'small'],
        },
        checked: {
            control: { type: 'boolean' },
        },
        disabled: {
            control: { type: 'boolean' },
        },
        onChange: {
            action: 'changed',
        },
    },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        color: 'primary',
        size: 'medium',
        label: 'Enable notifications',
        value: 'notifications',
        name: 'notifications',
    },
}

export const Interactive: Story = {
    render: () => {
        const [isChecked, setIsChecked] = useState(false)

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Switch
                    label="Enable notifications"
                    value="notifications"
                    name="notifications"
                    checked={isChecked}
                    onChange={(_, checked) => setIsChecked(checked)}
                    color="primary"
                />

                <Switch
                    label="Auto-save drafts"
                    value="autoSave"
                    name="autoSave"
                    checked={!isChecked}
                    onChange={(_, checked) => setIsChecked(!checked)}
                    color="secondary"
                />

                <div
                    style={{
                        marginTop: '16px',
                        padding: '8px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '4px',
                    }}
                >
                    <strong>Notifications:</strong> {isChecked ? 'Enabled' : 'Disabled'}
                    <br />
                    <strong>Auto-save:</strong> {!isChecked ? 'Enabled' : 'Disabled'}
                </div>
            </div>
        )
    },
}

export const LabelLeft: Story = {
    args: {
        color: 'primary',
        size: 'medium',
        label: 'Start',
        value: 'start',
        name: 'start',
        formlabelProps: {
            labelPlacement: 'start',
        },
    },
}

export const LabelRight: Story = {
    args: {
        color: 'primary',
        size: 'medium',
        label: 'End',
        value: 'end',
        name: 'end',
        formlabelProps: {
            labelPlacement: 'end',
        },
    },
}

export const Disabled: Story = {
    args: {
        color: 'primary',
        size: 'medium',
        label: 'Disabled switch',
        value: 'disabled',
        name: 'disabled',
        disabled: true,
    },
}

export const DisabledChecked: Story = {
    args: {
        color: 'primary',
        size: 'medium',
        label: 'Disabled checked switch',
        value: 'disabledChecked',
        name: 'disabledChecked',
        disabled: true,
        checked: true,
    },
}
