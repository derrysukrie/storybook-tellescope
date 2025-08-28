import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Autocomplete } from './autocomplete'

const meta = {
    title: 'ATOMS/FormInputs/Select',
    component: Autocomplete,
    parameters: {
        controls: {
            include: ['appearance'],
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
} satisfies Meta<typeof Autocomplete>

export default meta
type Story = StoryObj<typeof meta>

export const AutoComplete: Story = {
    args: {
        label: 'Label',
        options: ['Chip 1', 'Chip 2', 'Chip 3'],
        appearance: 'standard',
        multiple: true,
        value: '',
        onChange: () => {},
        size: 'medium',
    },
    render: args => {
        const [value, setValue] = useState<string | string[] | null>(args.multiple ? [] : null)
        return <Autocomplete {...args} value={value} disableCloseOnSelect onChange={setValue} />
    },
}
