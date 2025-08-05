import type { Meta, StoryObj } from '@storybook/react-vite';
import TableCell from './table-cell';
import type { ComponentProps } from 'react';
import CheckBox from '../../checkbox/checkbox';
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

export const Checkbox: Story = {
    args: {
        iconPosition: 'none',
        hasValue: true,
    },
    render: (args) => {
        const { hasValue, ...rest } = args as StoryProps;
        return (
            <TableCell {...rest} icon={<StarIcon />} sx={{ padding: 0, width: '150px' }} StackProps={{ sx: { justifyContent: 'center' } }}>
                {
                    hasValue ?
                        <CheckBox size="small" />
                        : undefined
                }
            </TableCell>
        );
    },
};
