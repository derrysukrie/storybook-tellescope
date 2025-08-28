import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import CheckBox from './checkbox'

const meta = {
    title: 'ATOMS/FormInputs/Checkbox',
    component: CheckBox,
    parameters: {
        controls: {
            exclude: ['onClick'],
        },
    },
    argTypes: {
        color: {
            options: ['primary', 'secondary', 'info'],
            control: { type: 'select' },
        },
        size: {
            control: { type: 'select' },
            options: ['large', 'medium', 'small'],
        },
    },
    args: { onClick: fn() },
} satisfies Meta<typeof CheckBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        color: 'primary',
        size: 'medium',
    },
}
