import { Home, Settings } from '@mui/icons-material'
import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumbs } from './Breadcrumbs'

interface ExtendedArgs {
    levels: 1 | 2 | 3
    leftIcon: 0 | 1 | 2
    rightIcon: 0 | 1 | 2
}

const meta: Meta<typeof Breadcrumbs> = {
    title: 'Molecules/Breadcrumbs',
    component: Breadcrumbs,
    parameters: {
        layout: 'padded',
    },
    argTypes: {
        levels: {
            control: {
                type: 'select',
            },
            options: [1, 2, 3],
            description: 'Number of breadcrumb levels to display (maximum 3)',
        },
    },
}

export default meta
type Story = StoryObj<ExtendedArgs>

const renderWithIcons = (levels: 1 | 2 | 3, leftIcon: 0 | 1 | 2, rightIcon: 0 | 1 | 2) => {
    const leftIconComponents = [<Home key="home" />, <Settings key="settings" />]
    const rightIconComponents = [<Home key="home" />, <Settings key="settings" />]
    return (
        <Breadcrumbs
            levels={levels}
            leftIcon={leftIconComponents.slice(0, leftIcon)}
            rightIcon={rightIconComponents.slice(0, rightIcon)}
        />
    )
}

export const Default: Story = {
    args: {
        levels: 3,
        leftIcon: 0,
        rightIcon: 0,
    },
    render: args => renderWithIcons(args.levels, args.leftIcon, args.rightIcon),
    argTypes: {
        leftIcon: {
            control: {
                type: 'select',
            },
            options: [0, 1, 2],
            description: 'Number of icons to display after breadcrumbs (maximum 2)',
        },
        rightIcon: {
            control: {
                type: 'select',
            },
            options: [0, 1, 2],
            description: 'Number of icons to display after breadcrumbs (maximum 2)',
        },
    },
}
