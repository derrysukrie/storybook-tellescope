import type { Meta, StoryObj } from '@storybook/react-vite'
import TimeInput from './time-input'

const meta = {
    title: 'ATOMS/Date time elements/Time Input',
    component: TimeInput,
    args: {
        label: false,
    },
} satisfies Meta<typeof TimeInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: false,
    },
}
