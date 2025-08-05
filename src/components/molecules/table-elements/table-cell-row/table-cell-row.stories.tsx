import type { Meta, StoryObj } from '@storybook/react-vite';
import TableCellRow from './table-cell-row';
import { useState, type ComponentProps } from 'react';
import { MenuItem, Typography } from '@mui/material';
import TableCell from '../../../atoms/table-control-elements/table-cell/table-cell';
import SelectBase from '../../../atoms/select/select';
import CheckBox from '../../../atoms/checkbox/checkbox';


type StoryProps = ComponentProps<typeof TableCellRow> & {
    column: string;
    checkbox?: boolean;
}

const meta = {
    title: 'MOLECULES/Table Elements/Table Cell Row',
    component: TableCellRow,
    parameters: {
        controls: {
            exclude: ["children", "StackProps"]
        },
    },
    argTypes: {
        column: {
            options: ['text', 'checkbox', 'select', 'number'],
            control: { type: 'select' },
        },
        checkbox: {
            control: { type: 'boolean' },
        },
    },
} satisfies Meta<StoryProps>;

export default meta;
type Story = StoryObj<StoryProps>;

export const Text: Story = {
    args: {
        checkbox: false,
        column: "text",
    },
    render: (args) => {
        const { column, checkbox } = args as StoryProps;
        const [value, setValue] = useState<string | string[]>([]);

        return (
            <>
                <TableCellRow>
                    {
                        column === "text" && (
                            <TableCell>
                                {
                                    checkbox ? (
                                        <CheckBox
                                            color="primary"
                                        />
                                    ) : null
                                }
                                <Typography variant="body2">Chompy</Typography>
                            </TableCell>
                        )
                    }
                    {
                        column === "select" && (
                            <TableCell>
                                {
                                    checkbox ? (
                                        <CheckBox
                                            color="primary"
                                        />
                                    ) : null
                                }
                                <SelectBase
                                    multiple={true}
                                    appearance="table"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    size="medium"
                                    sx={{
                                        width: "300px",
                                    }}
                                >
                                    <MenuItem value="Organization" key="Organization">Organization</MenuItem>
                                    <MenuItem value="Synt to Healthie" key="Synt to Healthie">Synt to Healthie</MenuItem>
                                    <MenuItem value="Content campaign" key="Content campaign">Content campaign</MenuItem>
                                    <MenuItem value="Chip 1" key="Chip 1">Chip 1</MenuItem>
                                    <MenuItem value="Chip 2" key="Chip 2">Chip 2</MenuItem>
                                    <MenuItem value="Chip 3" key="Chip 3">Chip 3</MenuItem>
                                </SelectBase>
                            </TableCell>
                        )
                    }
                    {
                        column === "checkbox" && (
                            <TableCell>
                                {
                                    checkbox ? (
                                        <CheckBox
                                            color="primary"
                                        />
                                    ) : null
                                }
                                <CheckBox size="small" />
                            </TableCell>
                        )
                    }

                    {
                        column === "number" && (
                            <TableCell StackProps={{ sx: { justifyContent: "flex-end" } }} sx={{ minWidth: "300px" }}>
                                {
                                    checkbox ? (
                                        <CheckBox
                                            color="primary"
                                        />
                                    ) : null
                                }
                                <Typography variant="body2" sx={{ textAlign: "right", width: "100%" }}>091387408374140</Typography>
                            </TableCell>
                        )
                    }
                </TableCellRow>
            </>
        );

    },
};
