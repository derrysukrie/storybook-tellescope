import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio } from './radio'

const meta = {
    title: 'ATOMS/FormInputs/Radio',
    component: Radio,
    parameters: {
        controls: {
            exclude: ['color'],
        },
    },
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['large', 'medium', 'small'],
        },
    },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        size: 'medium',
        color: 'default',
    },
}
