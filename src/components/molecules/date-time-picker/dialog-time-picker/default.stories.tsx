import type { Meta, StoryObj } from '@storybook/react-vite';
import DateTimePicker from './dialog-time-picker';
import  { useState } from 'react';

const meta = {
    title: 'MOLECULES/Date And Time Elements/Dialog Time Picker',
    component: DateTimePicker,
    argTypes: {
        onChange: { action: 'changed' },
        onAccept: { action: 'accepted' },
        onCancel: { action: 'cancelled' },
    }
} satisfies Meta<typeof DateTimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: new Date(2024, 0, 1, 13, 0, 0, 0),
        ampm: true,
        timeStep: 30,
    },
    render: (args) => {
        const [value, setValue] = useState<Date>(args.value as Date ?? new Date());

        return (
            <DateTimePicker
                {...args}
                value={value}
                onChange={(d) => {
                    setValue(d);
                    // @ts-ignore
                    args.onChange?.(d);
                }}
                onAccept={(d) => {
                    // @ts-ignore
                    args.onAccept?.(d);
                }}
                onCancel={() => {
                    // @ts-ignore
                    args.onCancel?.();
                }}
            />
        );
    }
};

