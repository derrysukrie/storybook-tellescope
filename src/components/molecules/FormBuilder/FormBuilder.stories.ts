import type { Meta, StoryObj } from '@storybook/react'
import { FormBuilder } from './FormBuilder'

const meta: Meta<typeof FormBuilder> = {
    title: 'Molecules/FormBuilder',
    component: FormBuilder,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A form builder component with three different color schemes: tellescope-soft (purple-blue), tellescope (blue), and agua (aqua/teal). The checkcirlce icon color changes based on the selected state - green when selected, grey when unselected.',
            },
        },
    },
    argTypes: {
        type: {
            control: 'select',
            options: ['tellescope-soft', 'tellescope', 'agua'],
            description: 'The type of form builder with different color schemes',
        },
        selected: {
            control: 'boolean',
            description:
                'Whether the component is in selected state (affects checkcirlce icon color)',
            defaultValue: false,
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        type: 'tellescope-soft',
        selected: false,
        onEdit: () => console.log('edit'),
    },
}
