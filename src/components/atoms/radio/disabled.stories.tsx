import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio } from './radio'

const meta = {
    title: 'ATOMS/FormInputs/Radio',
    component: Radio,
    parameters: {
        controls: {
            exclude: [''],
        },
    },
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['large', 'medium', 'small'],
        },
        checked: {
            control: { type: 'boolean' },
        },
    },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Disabled: Story = {
    args: {
        color: 'default',
        size: 'medium',
        disabled: true,
    },
}
