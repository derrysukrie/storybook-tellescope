import type { Meta, StoryObj } from '@storybook/react-vite';
import Select from './select';
import { useState } from 'react';
import { MenuItem } from '@mui/material';

const meta = {
    title: 'ATOMS/FormInputs/Select',
    component: Select,
    parameters: {
        controls: {
            include: ["appearance"],
        }
    },
    argTypes: {
        appearance: {
            control: 'select',
            options: ['standard', 'filled', 'outlined', 'patientForm', 'table'],
        },
        multiple: { control: 'boolean' },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 250 }}>
                <Story />
            </div>
        )
    ]
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {
    args: {
        label: 'Label',
        children: [],
        appearance: 'standard',
        multiple: false,
        value: '',
        onChange: () => { },
        size: 'medium',
    },
    render: (args) => {
        const [value, setValue] = useState<string | string[]>(args.multiple ? [] : '');

        return (
            <Select
                {...args}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                error={true}
            >
                <MenuItem value="Menu Item 1" key="Menu Item 1">Menu Item 1</MenuItem>
                <MenuItem value="Menu Item 2" key="Menu Item 2">Menu Item 2</MenuItem>
                <MenuItem value="Menu Item 3" key="Menu Item 3">Menu Item 3</MenuItem>
                <MenuItem value="Menu Item 4" key="Menu Item 4">Menu Item 4</MenuItem>
            </Select>
        );
    }
};