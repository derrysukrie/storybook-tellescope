import { Stack, TableCell, Typography, type TableCellProps } from "@mui/material";
import type { FC } from "react";
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';

interface TableFooterProps extends TableCellProps {
    children?: React.ReactNode;
}

const TableFooter: FC<TableFooterProps> = ({ children, sx, ...rest }) => {
    return (
        <TableCell {...rest} sx={{
            border: 0,
            borderRadius: "4px",
            "&:hover": {
                backgroundColor: "#EEEDF4",
                "& .MuiTypography-root": {
                    color: "#00000099"
                }
            },
            ...sx
        }} >
            <Stack sx={{
                flexDirection: 'row',
                gap: "8px",
                justifyContent: children ? "flex-end" : "center",
            }}>
                {
                    children ? (
                        <>
                            <Typography variant="body2" sx={{ color: "#8C90A1" }}>COUNT ALL</Typography>
                            <Typography variant="body2">{children}</Typography>
                        </>
                    ) : (
                        <CalculateOutlinedIcon sx={{ color: "#00000099" }} />
                    )
                }
            </Stack>
        </TableCell>
    )
}

export default TableFooter
