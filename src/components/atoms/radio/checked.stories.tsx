import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio } from './radio'

const meta = {
    title: 'ATOMS/FormInputs/Radio',
    component: Radio,
    parameters: {
        controls: {
            exclude: ['checked'],
        },
    },
    argTypes: {
        color: {
            options: ['primary', 'secondary', 'info', 'default'],
            control: { type: 'select' },
        },
        size: {
            control: { type: 'select' },
            options: ['large', 'medium', 'small'],
        },
    },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Checked: Story = {
    args: {
        color: 'primary',
        size: 'medium',
        checked: true,
    },
}
