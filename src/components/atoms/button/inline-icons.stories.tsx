import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from './button'

const meta = {
    title: 'ATOMS/Button',
    component: Button,
    parameters: {
        controls: { include: [] }, // disables all controls
        actions: { disable: true }, // disables all actions
    },
    args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const InlineIcons: Story = {
    args: {
        color: 'secondary',
        children: 'LABEL',
        appearance: 'contained',
        size: 'medium',
        disabled: false,
    },
    render: args => {
        return (
            <div style={{ display: 'flex', gap: 8 }}>
                <Button
                    {...args}
                    color="primary"
                    endIcon={<ArrowForwardIosIcon sx={{ width: 16 }} />}
                >
                    {args.children}
                </Button>
                <Button
                    {...args}
                    color="primary"
                    appearance="text"
                    startIcon={<ArrowBackIosNewIcon sx={{ width: 16 }} />}
                >
                    {args.children}
                </Button>
                <div>
                    <Button
                        {...args}
                        color="secondary"
                        startIcon={<FileCopyIcon sx={{ width: 16 }} />}
                        endIcon={<ArrowDropDownIcon sx={{ fontSize: 30 }} />}
                        size="small"
                    >
                        {args.children}
                    </Button>
                </div>
                <Button
                    {...args}
                    color="info"
                    appearance="outlined"
                    endIcon={<ArrowForwardIosIcon sx={{ width: 16 }} />}
                >
                    {args.children}
                </Button>
            </div>
        )
    },
}

InlineIcons.name = 'Inline Icons'
