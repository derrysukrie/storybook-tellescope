import type { Meta, StoryObj } from '@storybook/react-vite';
import Select from './select';
import { useState } from 'react';

const meta = {
    title: 'ATOMS/FormInputs/Select',
    component: Select,
    parameters: {
        controls: {
            include: [""],
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

export const CheckBoxes: Story = {
    args: {
        label: 'Label',
        options: ['Oliver Hansen', 'Van Henry', 'April Tucker', 'Ralph Hubbard', 'Omar Alexander'],
        appearance: 'standard',
        multiple: true,
        value: '',
        onChange: () => { },
        size: 'medium',
        optionStyle: "checkbox",
    },
    render: (args) => {
        const [value, setValue] = useState<string | string[]>(args.multiple ? [] : '');

        return (
            <Select
                {...args}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        );
    }
};