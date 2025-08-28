import { ListItemText, MenuItem } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import CheckBox from '../checkbox/checkbox'
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

export const CheckBoxes: Story = {
    args: {
        label: 'Label',
        appearance: 'standard',
        multiple: true,
        value: '',
        onChange: () => {},
        size: 'medium',
        optionStyle: 'checkbox',
        children: [],
    },
    render: args => {
        const [value, setValue] = useState<string | string[]>(args.multiple ? [] : '')

        return (
            <Select {...args} value={value} onChange={e => setValue(e.target.value)}>
                <MenuItem value="Oliver Hansen" key="Oliver Hansen">
                    <CheckBox checked={(value as string[]).includes('Oliver Hansen')} />
                    <ListItemText primary="Oliver Hansen" />
                </MenuItem>
                ,
                <MenuItem value="Van Henry" key="Van Henry">
                    <CheckBox checked={(value as string[]).includes('Van Henry')} />
                    <ListItemText primary="Van Henry" />
                </MenuItem>
                ,
                <MenuItem value="April Tucker" key="April Tucker">
                    <CheckBox checked={(value as string[]).includes('April Tucker')} />
                    <ListItemText primary="April Tucker" />
                </MenuItem>
                ,
                <MenuItem value="Ralph Hubbard" key="Ralph Hubbard">
                    <CheckBox checked={(value as string[]).includes('Ralph Hubbard')} />
                    <ListItemText primary="Ralph Hubbard" />
                </MenuItem>
                ,
                <MenuItem value="Omar Alexander" key="Omar Alexander">
                    <CheckBox checked={(value as string[]).includes('Omar Alexander')} />
                    <ListItemText primary="Omar Alexander" />
                </MenuItem>
            </Select>
        )
    },
}
