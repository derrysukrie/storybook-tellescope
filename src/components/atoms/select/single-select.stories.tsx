import { MenuItem } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Select from './select'

const meta = {
    title: 'ATOMS/FormInputs/Select',
    component: Select,
    parameters: {
        controls: {
            include: ['appearance'],
        },
    },
    argTypes: {
        appearance: {
            control: 'select',
            options: ['standard', 'filled', 'outlined', 'table', 'patientForm'],
        },
        multiple: { control: 'boolean' },
    },
    decorators: [
        Story => (
            <div style={{ width: 250 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const SingleSelect: Story = {
    args: {
        label: 'Label',
        value: '',
        onChange: () => {},
        appearance: 'standard',
        multiple: false,
        size: 'medium',
        children: [],
    },
    render: args => {
        const [value, setValue] = useState<string | string[]>(
            args.multiple || args.appearance === 'table' ? [] : ''
        )
        return (
            <Select
                {...args}
                multiple={args.multiple || args.appearance === 'table'}
                value={value}
                onChange={e => setValue(e.target.value)}
            >
                <MenuItem value="Synt to health" key="Synt to health">
                    Synt to health
                </MenuItem>
                <MenuItem value="Content capsqd" key="Content capsqd">
                    Content capsqd
                </MenuItem>
                <MenuItem value="Chip 3" key="Chip 3">
                    Chip 3
                </MenuItem>
                <MenuItem value="Chip 4" key="Chip 4">
                    Chip 4
                </MenuItem>
            </Select>
        )
    },
}
