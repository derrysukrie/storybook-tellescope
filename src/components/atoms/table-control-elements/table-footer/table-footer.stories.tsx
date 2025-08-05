import type { Meta, StoryObj } from '@storybook/react-vite';
import TableFooter from './table-footer';
import type { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof TableFooter> & {
    hasValue: boolean;
}

const meta = {
    title: 'ATOMS/TableControlElements/TableFooter',
    component: TableFooter,
    parameters: {
        controls: {
            exclude: ["children", "StackProps"]
        },
    },
    argTypes: {
        hasValue: {
            control: { type: 'boolean' },
        },
    },
} satisfies Meta<StoryProps>;

export default meta;
type Story = StoryObj<StoryProps>;

export const Text: Story = {
    args: {
        hasValue: true,
    },
    render: (args) => {
        const { hasValue, ...rest } = args as StoryProps;
        return (
            <TableFooter  {...rest} sx={{ width: "300px" }} >
                {
                    hasValue ?
                        <>
                            100
                        </>
                        : undefined
                }
            </TableFooter>
        );
    },
};
