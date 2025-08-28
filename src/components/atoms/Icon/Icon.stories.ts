import HomeIcon from '@mui/icons-material/Home'
import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'

const meta = {
    title: 'Atoms/Icon',
    component: Icon,
    parameters: {
        layout: 'centered',
    },

    argTypes: {
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Size of the icon',
            defaultValue: 'small',
        },
    },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        icon: HomeIcon,
        size: 'medium',
    },
}
