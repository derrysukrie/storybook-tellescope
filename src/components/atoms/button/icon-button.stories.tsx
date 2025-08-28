import StarIcon from '@mui/icons-material/Star'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { IconButton as Comp } from './icon-button'

const meta = {
    title: 'ATOMS/Button',
    component: Comp,
    parameters: {
        controls: {
            exclude: ['onClick', 'children'],
        },
    },
    argTypes: {
        color: {
            options: ['primary', 'secondary', 'info', 'default'],
            control: { type: 'select' },
        },
        size: {
            control: { type: 'select' },
            options: ['large', 'medium', 'small', 'table'],
        },
    },
    args: { onClick: fn() },
} satisfies Meta<typeof Comp>

export default meta
type Story = StoryObj<typeof meta>

export const IconButton: Story = {
    args: {
        color: 'primary',
        children: <StarIcon />,
        size: 'medium',
        disabled: false,
    },
}
