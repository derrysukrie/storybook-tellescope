import type { Meta, StoryObj } from '@storybook/react-vite'
import { HorizontalAmPmToggle, type HorizontalAmPmToggleProps } from './horizontal-am-pm-selector'

const meta = {
    title: 'ATOMS/Date time elements/Horizontal AM PM Selector',
    component: HorizontalAmPmToggle,
} satisfies Meta<HorizontalAmPmToggleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
