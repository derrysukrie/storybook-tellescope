import {
    TableCell as MuiTableCell,
    type TableCellProps as MuiTableCellProps,
    Stack,
} from '@mui/material'
import type { ComponentProps, FC, ReactNode } from 'react'

export interface TableCellProps extends Omit<MuiTableCellProps, 'children'> {
    iconPosition?: 'left' | 'right'
    children?: React.ReactNode
    StackProps?: ComponentProps<typeof Stack>
    icon?: ReactNode
}

const TableCell: FC<TableCellProps> = ({
    icon,
    iconPosition,
    children,
    StackProps,
    sx,
    ...rest
}) => {
    const { sx: stackSx, ...stackRest } = StackProps || {}

    return (
        <MuiTableCell
            align="right"
            sx={{ border: 0, padding: '4px 16px !important', ...sx }}
            {...rest}
        >
            <Stack
                sx={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                    // width: "100%",
                    ...stackSx,
                }}
                {...stackRest}
            >
                <Stack
                    sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1,
                        width: '100%',
                        svg: {
                            width: 20,
                            color: 'rgba(0, 0, 0, 0.56)',
                        },
                    }}
                >
                    {
                        iconPosition === 'left' && icon
                        // <StarIcon sx={{ width: 20, color: "rgba(0, 0, 0, 0.56)" }} />
                    }
                    {children}
                    {iconPosition === 'right' && icon}
                </Stack>
            </Stack>
        </MuiTableCell>
    )
}

export default TableCell
