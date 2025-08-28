import type { Meta, StoryObj } from '@storybook/react'
import { SuggestedActions } from './SuggestedActions'

const meta: Meta<typeof SuggestedActions> = {
    title: 'Molecules/SuggestedActions',
    component: SuggestedActions,
    args: {
        expanded: true,
    },
    argTypes: {
        expanded: {
            control: 'boolean',
        },
    },
}

export default meta

interface Story extends StoryObj<typeof SuggestedActions> {}

export const Default: Story = {}
