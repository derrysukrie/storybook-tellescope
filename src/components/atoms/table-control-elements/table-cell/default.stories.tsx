import StarIcon from '@mui/icons-material/Star'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import TableCell from './table-cell'

type StoryProps = ComponentProps<typeof TableCell> & {
    hasValue: boolean
}

const meta = {
    title: 'ATOMS/TableControlElements/TableCell',
    component: TableCell,
    parameters: {
        controls: {
            exclude: ['children', 'StackProps', 'Icon'],
        },
    },
    argTypes: {
        iconPosition: {
            options: ['none', 'left', 'right'],
            control: { type: 'select' },
            name: 'icon',
        },
        hasValue: {
            control: { type: 'boolean' },
        },
        icon: {
            name: 'Icon',
        },
    },
} satisfies Meta<StoryProps>

export default meta
type Story = StoryObj<StoryProps>

export const Default: Story = {
    args: {
        iconPosition: 'none',
        hasValue: true,
    },
    render: args => {
        const { hasValue, ...rest } = args as StoryProps
        return (
            <TableCell {...rest} icon={<StarIcon />}>
                {hasValue ? 'Has Value' : undefined}
            </TableCell>
        )
    },
}
