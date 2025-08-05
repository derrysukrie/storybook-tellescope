import type { Meta, StoryObj } from '@storybook/react-vite';
import TableCell from './table-cell';
import type { ComponentProps } from 'react';
import { Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

type StoryProps = ComponentProps<typeof TableCell> & {
    hasValue: boolean;
}


const meta = {
    title: 'ATOMS/TableControlElements/TableCell',
    component: TableCell,
    parameters: {
        controls: {
            exclude: ["children", "StackProps", "Icon"]
        },
    },
    argTypes: {
        iconPosition: {
            options: ["none", 'left', 'right'],
            control: { type: 'select' },
            name: 'icon',
        },
        hasValue: {
            control: { type: 'boolean' },
        },
        icon: {
            name: 'Icon',
        }
    },
} satisfies Meta<StoryProps>;

export default meta;
type Story = StoryObj<StoryProps>;

export const Number: Story = {
    args: {
        iconPosition: 'none',
        hasValue: true,
    },
    render: (args) => {
        const { hasValue, ...rest } = args as StoryProps;
        return (
            <TableCell {...rest} icon={<StarIcon />} StackProps={{ sx: { justifyContent: "flex-end" } }} sx={{ minWidth: "300px" }}>
                {
                    hasValue ?
                        <Typography variant="body2" sx={{ textAlign: "right", width: "100%" }}>091387408374140</Typography>
                        : undefined
                }
            </TableCell>
        );
    },
};
