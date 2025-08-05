import { Stack, Table as MuiTable, TableRow, MenuItem, TableContainer, TableFooter as MuiTableFooter, } from '@mui/material';
import TableTabsFiltersControls, { useFilterContext } from "../../molecules/table-elements/table-tabs-filters-controls/table-tabs-filters-controls";
import AppbarSidebar from "../appbar-sidebar/appbar-sidebar";
import TableCellRow from "../../molecules/table-elements/table-cell-row/table-cell-row";
import TableHead from "../../atoms/table-control-elements/table-head/table-head";
import TableCell, { type TableCellProps } from "../../atoms/table-control-elements/table-cell/table-cell";
import CheckBox from "../../atoms/checkbox/checkbox";
import { useState, type FC } from "react";
import Select from "../../atoms/select/select";
import TableFooter from '../../atoms/table-control-elements/table-footer/table-footer';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { data } from './data';


interface TableProps {
    color?: "standard" | "transitional";
    expanded?: boolean;
}

const Table: FC<TableProps> = (props) => {
    return (
        <AppbarSidebar {...props}>
            <TableTabsFiltersControls
                tabPanels={[
                    {
                        content: <div>Contacts Content</div>
                    },
                    {
                        content: <TableContent />
                    }
                ]}
            />
        </AppbarSidebar>
    )
}

export default Table



export const TableContent = () => {
    const { hide } = useFilterContext();
    console.log(hide, "hide : hide...");
    return (
        <Stack>
            <TableContainer sx={{
                maxHeight: `calc(100vh - 64px - 48px - 36px - 16px - 16px - ${hide ? 0 : 32}px)`,
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
                msOverflowStyle: "none",
                overflowX: "auto",
            }}>
                <MuiTable stickyHeader aria-label="sticky table">
                    <TableRow>
                        <TableHead checkbox small sx={{
                            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                        }}>Name</TableHead>
                        <TableHead sx={{
                            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                        }}>Care Team</TableHead>
                        <TableHead sx={{
                            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                        }}>Share with</TableHead>
                        <TableHead sx={{
                            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                        }}>Journeys</TableHead>
                        <TableHead sx={{
                            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                        }}>Tags</TableHead>
                    </TableRow>
                    {
                        data.map((row, index) => (
                            <TableCellRow key={index}>
                                <TableCell width={"20%"} sx={{ minWidth: 200, textTransform: "capitalize" }}>
                                    <CheckBox size="small" sx={{
                                        height: "24px",
                                        width: "24px",
                                    }} /> {row.name}
                                </TableCell>
                                {
                                    Object.entries(row).map(ele => ele).slice(1).map((ele, idx) => {
                                        if (idx === 2) {
                                            return <TableCellWithSelect key={idx} withIcon data={ele[1]} name={ele[0]} />;
                                        }
                                        return <TableCellWithSelect key={idx} data={ele[1]} name={ele[0]} />;
                                    })
                                }
                            </TableCellRow>
                        ))
                    }
                    <MuiTableFooter
                        sx={{
                            position: "sticky",
                            bottom: 0,
                            backgroundColor: "#fff",
                            zIndex: 10,
                            borderTop: "1px solid rgba(0,0,0,0.12)"
                        }}
                    >
                        <TableRow>
                            <TableFooter>
                                100
                            </TableFooter>
                            <TableCell />
                            <TableCell />
                            <TableCell />
                            <TableCell />
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{
                                justifyContent: "center",
                                display: "flex",
                                border: 0,
                                paddingY: "0 !important",
                                borderRadius: "4px",
                                backgroundColor: "#EEEDF4",
                                "& .MuiTypography-root": {
                                    color: "#00000099"
                                }
                            }}>
                                <AddIcon />
                            </TableCell>
                            <TableCell />
                            <TableCell />
                            <TableCell />
                            <TableCell />
                        </TableRow>
                    </MuiTableFooter>
                </MuiTable>
            </TableContainer>
        </Stack>
    )
}

const TableCellWithSelect = ({ withIcon, data, name }: { withIcon?: boolean, data: string | string[], name: string }) => {
    const props: Partial<TableCellProps> = {
        iconPosition: "left",
        icon: <CalendarMonthIcon />,
        sx: {
            "& .MuiFormControl-root": {
                // This is to ensure the select takes full width without icon
                minWidth: "calc(100% - 50px) !important",
            },
            paddingRight: "0 !important",
            minWidth: "200px",
        }
    };

    return (
        <TableCell  {...(withIcon ? props : { sx: { minWidth: 200, paddingRight: "0 !important", "& .MuiSelect-select.MuiSelect-standard.MuiSelect-multiple.MuiInputBase-input": { paddingRight: "16px !important" } } })} width={"20%"} >
            <SelectMenubasedOnCols name={name} data={data} />
        </TableCell>
    );
};


const SelectMenubasedOnCols = ({ name, data }: { name: string, data: string | string[] }) => {
    const [value, setValue] = useState<string | string[]>(data);
    return (
        <>
            {
                name === "careTeam" ? (
                    <Select
                        multiple
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        size="medium"
                        sx={{
                            width: `100%`,
                            "& .MuiInputBase-root ": {
                                width: "100% !important",
                            }
                        }}
                        appearance="table"
                        FormControlProps={{
                            sx: {
                                minWidth: "auto !important",
                            }
                        }}
                    >
                        <MenuItem value="rice">Rice</MenuItem>
                        <MenuItem value="nom">Nom</MenuItem>
                        <MenuItem value="bobba">Bobba</MenuItem>
                        <MenuItem value="chompy">Chompy</MenuItem>
                        <MenuItem value="fungi">Fungi</MenuItem>
                        <MenuItem value="bok">Bok</MenuItem>
                        <MenuItem value="choy">Choy</MenuItem>
                    </Select>
                ) : null
            }
            {
                name === "shareWith" ? (
                    <Select
                        multiple
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        size="medium"
                        sx={{
                            width: `100%`,
                            "& .MuiInputBase-root ": {
                                width: "100% !important",
                            }
                        }}
                        appearance="table"
                        FormControlProps={{
                            sx: {
                                minWidth: "auto !important",
                            }
                        }}
                    >
                        <MenuItem value="organization">Organization</MenuItem>
                    </Select>
                ) : null
            }
            {
                name === "journeys" ? (
                    <Select
                        multiple
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        size="medium"
                        sx={{
                            width: `100%`,
                            "& .MuiInputBase-root ": {
                                width: "100% !important",
                            }
                        }}
                        appearance="table"
                        FormControlProps={{
                            sx: {
                                minWidth: "auto !important",
                            }
                        }}
                    >
                        <MenuItem value="synt to healthie">Synt to Healthie</MenuItem>
                        <MenuItem value="content campaign">Content campaign</MenuItem>
                    </Select>
                ) : null
            }
            {
                name === "tags" ? (
                    <Select
                        multiple
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        size="medium"
                        sx={{
                            width: `100%`,
                            "& .MuiInputBase-root ": {
                                width: "100% !important",
                            }
                        }}
                        appearance="table"
                        FormControlProps={{
                            sx: {
                                minWidth: "auto !important",
                            }
                        }}
                    >
                        <MenuItem value="added to tellescope">Added to Tellescope</MenuItem>

                    </Select>
                ) : null
            }
        </>
    )
}