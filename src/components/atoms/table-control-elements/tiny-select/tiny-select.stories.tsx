import type { Meta, StoryObj } from '@storybook/react-vite';
import TinySelect from './tiny-select';
import { useState, type ComponentProps } from 'react';
import { MenuItem } from '@mui/material';

type StoryProps = ComponentProps<typeof TinySelect>

const meta = {
    title: 'ATOMS/TableControlElements/TinySelect',
    component: TinySelect,
    parameters: {
        controls: {
            exclude: ["small", "children", "value", "onChange"],
        },
    },
} satisfies Meta<StoryProps>;

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState<string>("")
        const handleChange = (newValue: string) => {
            setValue(newValue);
        };
        return (
            <TinySelect value={value} onChange={handleChange}>
                <MenuItem value="Value">value</MenuItem>
                <MenuItem value="Option">option</MenuItem>
            </TinySelect>
        )
    }
}