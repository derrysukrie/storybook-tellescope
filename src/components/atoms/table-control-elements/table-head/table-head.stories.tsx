import type { Meta, StoryObj } from '@storybook/react-vite';
import TableHead from './table-head';
import type { ComponentProps } from 'react';


type StoryProps = ComponentProps<typeof TableHead> & {
    hasValue: boolean;
}

const meta = {
    title: 'ATOMS/TableControlElements/TableHead',
    component: TableHead,
    parameters: {
        controls: {
            exclude: ["small", "children"],
        },
    },
    argTypes: {
        icon: {
            options: ["none", 'left', 'right'],
            control: { type: 'select' },
        },
        checkbox: {
            control: { type: "boolean" },
        },
        hasValue: {
            control: { type: 'boolean' },
        },
    },
} satisfies Meta<StoryProps>;

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
    args: {
        hasValue: true,
        icon: 'none',
        checkbox: false,
    },
    render: (args) => {
        const { hasValue, ...rest } = args as StoryProps;
        return (
            <TableHead {...rest}>
                {
                    hasValue ?
                        <>
                            Head
                        </>
                        : undefined
                }
            </TableHead>
        );
    },
};

