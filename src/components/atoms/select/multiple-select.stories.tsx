import { MenuItem } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Select from './select'

const meta = {
    title: 'ATOMS/FormInputs/Select',
    component: Select,
    parameters: {
        controls: {
            include: [''],
        },
    },
    argTypes: {
        appearance: {
            control: 'select',
            options: ['standard', 'filled', 'outlined', 'table'],
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

export const MultipleSelect: Story = {
    args: {
        label: 'Label',
        children: [],
        appearance: 'standard',
        multiple: true,
        value: '',
        onChange: () => {},
        size: 'medium',
    },
    render: args => {
        const [value, setValue] = useState<string | string[]>(args.multiple ? [] : '')
        return (
            <Select {...args} value={value} onChange={e => setValue(e.target.value)}>
                <MenuItem value="Option 1" key="Option 1">
                    Option 1
                </MenuItem>
                <MenuItem value="Option 2" key="Option 2">
                    Option 2
                </MenuItem>
                <MenuItem value="Option 3" key="Option 3">
                    Option 3
                </MenuItem>
                <MenuItem value="Option 4" key="Option 4">
                    Option 4
                </MenuItem>
            </Select>
        )
    },
}
