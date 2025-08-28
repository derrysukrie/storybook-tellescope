import { FormControlLabel, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import CheckBox from './checkbox'

const meta = {
    title: 'ATOMS/FormInputs/Checkbox',
    component: CheckBox,
    parameters: {
        controls: {
            exclude: ['onClick'],
        },
    },
    argTypes: {
        color: {
            options: ['primary', 'secondary', 'info'],
            control: { type: 'select' },
        },
        size: {
            control: { type: 'select' },
            options: ['large', 'medium', 'small'],
        },
    },
    args: { onClick: fn() },
} satisfies Meta<typeof CheckBox>

export default meta
type Story = StoryObj<typeof meta>

export const Mutliline: Story = {
    args: {
        color: 'primary',
        size: 'medium',
    },
    render: args => (
        <FormControlLabel
            sx={{ gap: 1, alignItems: 'flex-start' }}
            control={<CheckBox {...args} defaultChecked />}
            label={
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ userSelect: 'none', maxWidth: 450 }}
                >
                    a longer label and will displayed at a smaller size in order to conserve
                    valuable space. This can be used to display some disclaimer about terms or
                    conditions that might be a bit too long for a normal label area"
                </Typography>
            }
        />
    ),
}
