import type { Meta, StoryObj } from '@storybook/react-vite'
import { VerticalAmPmToggle, type VerticalAmPmToggleProps } from './vertical-am-pm-selector'

const meta = {
    title: 'ATOMS/Date time elements/Vertical AM PM Selector',
    component: VerticalAmPmToggle,
} satisfies Meta<VerticalAmPmToggleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
