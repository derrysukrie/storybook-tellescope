import { TableRow as MuiTableRow, type TableRowProps as MuiTableRowProps } from '@mui/material'
import type { FC } from 'react'

interface TableRowProps extends MuiTableRowProps {
    children?: React.ReactNode
}

const TableCellRow: FC<TableRowProps> = ({ children, sx, ...rest }) => {
    return (
        <MuiTableRow
            {...rest}
            sx={{
                '& td': {
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                },
                ...sx,
            }}
        >
            {children}
        </MuiTableRow>
    )
}

export default TableCellRow
