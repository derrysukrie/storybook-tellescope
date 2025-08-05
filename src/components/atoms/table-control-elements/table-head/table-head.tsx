import { Stack, TableCell, type TableCellProps } from "@mui/material";
import CheckBox from "../../checkbox/checkbox";
import StarIcon from '@mui/icons-material/Star';
import type { FC } from "react";

interface TableHeadProps extends TableCellProps {
    icon?: 'none' | 'left' | 'right';
    checkbox?: boolean;
    small?: boolean;
    children?: React.ReactNode;
}

const TableHead: FC<TableHeadProps> = ({ icon, checkbox, small, children, sx, ...rest }) => {
    return (
        <TableCell {...rest} sx={{ fontWeight: 'bold', border: 0, ...sx }} variant="head" >
            <Stack sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
            }}>
                {
                    checkbox &&
                    <CheckBox
                        color="primary"
                        size={small ? "small" : "medium"}
                        sx={{
                            height: small ? "24px" : undefined,
                            width: small ? "24px" : undefined,
                        }}
                    />
                }

                <Stack sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1,
                }}>
                    {
                        icon === "left" &&
                        <StarIcon sx={{ width: 20, color: "rgba(0, 0, 0, 0.56)" }} />
                    }
                    {children}
                    {
                        icon === "right" &&
                        <StarIcon sx={{ width: 20, color: "rgba(0, 0, 0, 0.56)" }} />
                    }
                </Stack>
            </Stack>
        </TableCell>
    )
}

export default TableHead
