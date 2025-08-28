import { CheckCircle } from '@mui/icons-material'
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
            options: ['standard', 'filled', 'outlined', 'patientForm', 'table'],
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

export const CheckMarks: Story = {
    args: {
        label: 'Label',
        appearance: 'standard',
        multiple: true,
        size: 'medium',
        value: [],
        onChange: () => {},
        children: [],
    },
    render: args => {
        const [value, setValue] = useState<string | string[]>([])

        return (
            <Select {...args} value={value} onChange={e => setValue(e.target.value)}>
                <MenuItem value="Oliver Hansen" key="Oliver Hansen">
                    Oliver Hansen
                    {value.includes('Oliver Hansen') && <CheckCircle />}
                </MenuItem>
                ,
                <MenuItem value="Van Henry" key="Van Henry">
                    Van Henry
                    {value.includes('Van Henry') && <CheckCircle />}
                </MenuItem>
                ,
                <MenuItem value="April Tucker" key="April Tucker">
                    April Tucker
                    {value.includes('April Tucker') && <CheckCircle />}
                </MenuItem>
                ,
                <MenuItem value="Ralph Hubbard" key="Ralph Hubbard">
                    Ralph Hubbard
                    {value.includes('Ralph Hubbard') && <CheckCircle />}
                </MenuItem>
                ,
                <MenuItem value="Omar Alexander" key="Omar Alexander">
                    Omar Alexander
                    {value.includes('Omar Alexander') && <CheckCircle />}
                </MenuItem>
            </Select>
        )
    },
}
