import { Box, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography } from "@mui/material";
import { createContext, useContext, useEffect, useState, type JSX, type ReactNode } from "react";
import { Button } from "../../../atoms/button/button";
import { Input } from "../../../atoms/input/input";
import AddIcon from '@mui/icons-material/Add';

type SortItem = string;


type DetailSelectContextType = {
    sort: SortItem;
    setSort: React.Dispatch<React.SetStateAction<SortItem>>;
    availableFilterFields: {
        label: string;
        value: string;
        icon: JSX.Element;
    }[],
    open?: boolean;
    onChangeFilter?: (field: string) => void;
    valueSort?: SortItem;
    buttonContent?: ReactNode;
    placeholder?: string;
    onClose?: (field: string) => void;
};

const DetailSelectContext = createContext<DetailSelectContextType | undefined>(undefined);


type StateProps = {
    availableFilterFields: {
        label: string;
        value: string;
        icon: JSX.Element;
    }[],
    open?: boolean;
    onChangeFilter?: (field: string) => void;
    value?: SortItem;
    buttonContent?: ReactNode;
    placeholder?: string;
    onClose?: (field: string) => void;
};


function ProviderWrapper({
    availableFilterFields,
    open,
    children,
    ...rest
}: Omit<StateProps, "appearance"> & { children: ReactNode }) {
    // Internal state if not provided
    const [internalSort, internalSetSort] = useState<SortItem>("name");

    const value = {
        sort: internalSort,
        setSort: internalSetSort,
        availableFilterFields: availableFilterFields,
        open,

        ...rest
    };

    return <DetailSelectContext.Provider value={value}>{children}</DetailSelectContext.Provider>;
}


// Final export
export default function DetailSelectPending({ ...rest }: StateProps) {
    return (
        <ProviderWrapper {...rest} >
            {/* <Box sx={{ display: 'flex', flexDirection: 'column', width: 240, gap: 1 }}> */}
            <DetailSelectFilter />
            {/* </Box> */}
        </ProviderWrapper>
    );
}

const randomStringId = () => {
    return Math.random().toString(36).substring(2, 15);
}


/* Pending Select Detail Variant */

const FilterMenuStyle = {
    padding: 0,
    maxHeight: "215px !important",
    "& .MuiTypography-root": { fontSize: "0.875rem" },
    "& .MuiListItemIcon-root": {
        minWidth: "28px !important",
        "svg": { width: "20px" }
    },
    "& .MuiButtonBase-root.MuiMenuItem-root ": {
        borderRadius: "4px"
    },
    "& .MuiMenuItem-root": {
        padding: "4px 8px",
    },

};


// Main menu component
function DetailSelectFilter() {
    const { sort, setSort, open, onChangeFilter, buttonContent, valueSort, placeholder, onClose } = useContext(DetailSelectContext)!;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => {
        setAnchorEl(null);
        onClose?.(sort);
    };

    const handleChangeValue = (field: string) => {
        setSort(() => field);
        onChangeFilter?.(field);
        handleClose();
    };

    const randomId = randomStringId();

    useEffect(() => {
        // Simulate a reference to a button
        const button = document.getElementById(randomId);
        if (open) {
            if (button) {
                setAnchorEl(button);
            }
        }
        else {
            setAnchorEl(null);
        }
    }, [open]);

    // when Provide a Value
    useEffect(() => {
        setSort(valueSort || "")
    }, [valueSort]);


    return (
        <>
            {
                !buttonContent ?
                    <Button
                        id={randomId}
                        appearance="text"
                        sx={{
                            // backgroundColor: '#0288D114',
                            background: anchorEl ? "#EEEDF4" : undefined,
                            color: anchorEl ? "#0000008F" : "#00000040",
                            borderRadius: '16px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            px: 1, py: 0.5, width: 'fit-content',
                            textTransform: "capitalize",
                            "&:hover": {
                                backgroundColor: '#EEEDF4',
                                color: "#0000008F",
                            },
                            boxShadow: "none !important"

                        }}
                        onClick={handleClick}
                    >
                        <AddIcon sx={{ fontSize: 18, }} />
                        <Typography sx={{ fontWeight: 500, ml: 0.5 }} variant="body2">Filter</Typography>
                    </Button>
                    :
                    <Box id={randomId} sx={{ width: "fit-content" }} onClick={handleClick}>
                        {
                            buttonContent
                        }
                    </Box>
            }

            <FilterMenu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                onChange={handleChangeValue}
                usedFields={sort}
                placeholder={placeholder}
            />
        </>
    );
}


// Filter menu component
function FilterMenu({ open, anchorEl, onClose, onChange, usedFields, placeholder = "Search For Property" }: {
    open: boolean;
    anchorEl: null | HTMLElement;
    onClose: () => void;
    onChange: (field: string) => void;
    usedFields: string;
    placeholder?: string;
}) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { availableFilterFields } = useContext(DetailSelectContext)!;
    const search = availableFilterFields.filter(f => f.label.toLowerCase().includes(searchTerm.toLowerCase()));
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
    useEffect(() => {
        setHoveredIndex(0); // Reset hovered index when search term changes
    }, [])

    const handleClose = () => {
        onClose()
        const timeOut = setTimeout(() => {
            setSearchTerm("");
            clearTimeout(timeOut)
        }, 150);
    }


    return (
        <Menu
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            MenuListProps={{
                disablePadding: true,
                sx: { px: "4px", py: "8px" },

            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{
                vertical: -5,
                horizontal: 'left',
            }}
            sx={{
                "& .MuiPaper-root": {
                    width: "220px !important",
                    border: "1px solid #0000001F",
                    borderRadius: "5px"
                }
            }}
            elevation={1}
        // disableAutoFocusItem={true}

        >
            <MenuList sx={FilterMenuStyle}
            // autoFocusItem={false}
            >
                <Input
                    autoFocus
                    appearance="distinct"
                    placeholder={placeholder}
                    size="small"
                    sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                            padding: "4px 8px"
                        }
                    }}
                    FormControlProps={{
                        sx: {
                            width: "100%",
                            mb: "4px",
                        }
                    }}
                    onKeyDown={(e) => {
                        e.stopPropagation(); // prevent key events from being captured by the menu
                    }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
                {search.map((f, index) => (
                    <MenuItem
                        key={f.value}
                        onClick={() => onChange(f.value)}
                        selected={usedFields.includes(f.value)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        // sx={{ "&:first-of-type": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }}
                        sx={{
                            backgroundColor: hoveredIndex === index ? "rgba(0, 0, 0, 0.04)" : "transparent",
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                            },
                        }}
                    >
                        <ListItemIcon>{f.icon}</ListItemIcon>
                        <ListItemText>{f.label}</ListItemText>
                    </MenuItem>
                ))}
                {
                    availableFilterFields.length === 0 ? (
                        <MenuItem disabled>
                            <ListItemText>All Fields Are Applied</ListItemText>
                        </MenuItem>
                    ) : null
                }
                {
                    search.length === 0 && searchTerm !== "" && availableFilterFields.length > 0 && (
                        <MenuItem disabled>
                            <ListItemText>No fields found</ListItemText>
                        </MenuItem>
                    )
                }
            </MenuList>
        </Menu>
    );
}
