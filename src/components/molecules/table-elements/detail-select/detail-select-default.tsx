import { Badge, Box, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, MenuList, Paper, Stack, Typography } from "@mui/material";
import { createContext, useContext, useEffect, useState, type JSX, type ReactNode } from "react";
import { Button } from "../../../atoms/button/button";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Input } from "../../../atoms/input/input";
import TinySelect from "../../../atoms/table-control-elements/tiny-select/tiny-select";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapVertIcon from '@mui/icons-material/SwapVert';

type SortItem = { field: string, order: string };

type DetailSelectContextType = {
  filter: { value: string; filterOption: string } | null;
  sort: SortItem[];
  setFilter: React.Dispatch<React.SetStateAction<{ value: string; filterOption: string } | null>>;
  setSort: React.Dispatch<React.SetStateAction<SortItem[]>>;
  availableSortFields: {
    label: string;
    value: string;
    icon: JSX.Element;
  }[],
  filterOptions: {
    label: string;
    value: string;
  }[];
  open?: boolean;
  valueSort?: SortItem[];
  valueFilter?: { value: string; filterOption: string } | null;
  filterField?: string;

  onAddSort?: (field: string) => void;
  onDeleteSort?: () => void;
  onChangeSort?: (field: string, order: "ascending" | "descending", oldField: string) => void;
  onChangeSortOrder?: (field: string, order: "ascending" | "descending") => void;
  onCloseSort?: () => void;

  onSetFilterOption?: (option: string) => void;
  onSetFilterValue?: (value: string) => void;
  onClearFilter?: () => void;
  onCloseFilter?: () => void;
};

const DetailSelectContext = createContext<DetailSelectContextType | undefined>(undefined);

type Sortprops = {
  appearance: 'sort';
  availableSortFields: {
    label: string;
    value: string;
    icon: JSX.Element;
  }[],
  open?: boolean;
  value?: SortItem[];

  onAddSort?: (field: string) => void;
  onDeleteSort?: () => void;
  onChangeSort?: (field: string, order: "ascending" | "descending", oldField: string) => void;
  onChangeSortOrder?: (field: string, order: "ascending" | "descending") => void;
  onClose?: () => void;
}

type FilterProps = {
  appearance: 'filter';
  filterOptions: {
    label: string;
    value: string;
  }[],
  open?: boolean;
  value?: { value: string; filterOption: string } | null;
  field: string;

  onSetFilterOption?: (option: string) => void;
  onSetFilterValue?: (value: string) => void;
  onClearFilter?: () => void;
  onClose?: () => void;
};

type StateProps = (FilterProps | Sortprops);

function ProviderWrapper(props: StateProps & { children?: ReactNode }) {
  // Internal state if not provided
  const [internalFilter, internalSetFilter] = useState<{ value: string; filterOption: string } | null>(
    'value' in props && props.appearance === 'filter' && props.value
      ? props.value as { value: string; filterOption: string }
      : null
  );
  const [internalSort, internalSetSort] = useState<SortItem[]>('value' in props && props.appearance === 'sort' && props.value
    ? props.value as SortItem[]
    : []);

  const value = {
    ...props,
    filter: internalFilter,
    setFilter: internalSetFilter,
    sort: internalSort,
    setSort: internalSetSort,
    availableSortFields: 'availableSortFields' in props ? props.availableSortFields : [],
    filterOptions: 'filterOptions' in props ? props.filterOptions : [],
    open: props.open,
    valueSort: 'value' in props && props.appearance === 'sort' ? props.value : undefined,
    valueFilter: 'value' in props && props.appearance === 'filter' ? props.value : undefined,
    filterField: 'field' in props && props.appearance === 'filter' ? props.field : undefined,
    onCloseSort: 'onClose' in props && props.appearance === 'sort' ? props.onClose : undefined,
    onCloseFilter: 'onClose' in props && props.appearance === 'filter' ? props.onClose : undefined,
  };

  return <DetailSelectContext.Provider value={value}>{props.children}</DetailSelectContext.Provider>;
}

// Final export
export default function DetailSelect(props: StateProps) {
  return (
    <ProviderWrapper {...props} >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <DetailSelectContent appearance={props.appearance} />
      </Box>
    </ProviderWrapper>
  );
}

const DetailSelectContent = ({ appearance }: { appearance: 'sort' | 'filter' }) => {
  return (
    appearance === "filter" ? <DetailSelectPending /> : <DetailSelectSort />
  )
}

const randomStringId = () => {
  return Math.random().toString(36).substring(2, 15);
}

/* Default Select Detail Variant */

const menuStyle = {
  sx: {
    maxHeight: "233px !important",
    "& .MuiTypography-root": { fontSize: "0.875rem" },
    "& .MuiListItemIcon-root": {
      minWidth: "28px !important",
      "svg": { width: "20px" }
    },
    "& .MuiButtonBase-root.MuiMenuItem-root ": {
      borderRadius: "4px"
    },
  }
};

const addSortStyle = {
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
  "&": {
    padding: "8px 0"
  }
};

// Main menu component
function DetailSelectSort() {
  const { sort, setSort, open, onChangeSort, onAddSort, onDeleteSort, onChangeSortOrder, availableSortFields, onCloseSort, valueSort } = useContext(DetailSelectContext)!;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
  const [anchorAddSort, setAnchorAddSort] = useState<null | HTMLElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    onCloseSort?.();
  };

  const handleClickOnAddSort = (e: React.MouseEvent<HTMLLIElement>) => setAnchorAddSort(e.currentTarget);
  const handleCloseAdd = () => {
    setAnchorAddSort(null);
  };


  const handleSetSortField = (field: string, replaced: string) => {
    setSort(prev => prev.map((item) => {
      // Replace the field if it matches the replaced one
      // This ensures that the field is updated correctly without mutating the original array
      if (item.field === replaced) {
        return { ...item, field };
      }
      return item;
    }));
    onChangeSort?.(field, (sort.find(item => item.field === replaced)?.order as "ascending" | "descending") || 'ascending', replaced);
  };

  const handleSetSortOrder = (order: "ascending" | "descending", field: string) => {
    setSort(prev => prev.map((item) => item.field === field ? { ...item, order } : item));
    onChangeSortOrder?.(field, order);
  };

  const handleAddSort = (field: string) => {
    setSort(prev => {
      return [...prev, { field, order: 'ascending' }]
    });
    onAddSort?.(field);
    handleCloseAdd();
    // if (sort.length === availableSortFields.length - 1) {
    //   handleCloseAdd();
    // }
  };


  const handleDeleteSort = () => {
    setSort([]);
    onDeleteSort?.();
  };

  const usedFields = sort.map(s => s.field);



  const randomId = randomStringId()

  useEffect(() => {
    // Simulate a reference to a button
    const menu = document.getElementById(randomId);
    if (open) {
      if (menu) {
        setAnchorEl(menu);
      }
    }
    else {
      setAnchorEl(null);
    }
  }, [open]);


  // when Provide a Value
  useEffect(() => {
    if (valueSort) {
      setSort(valueSort || [])
    }
  }, [setSort, valueSort])




  return (
    <>
      <Button
        color="info"
        id={randomId}
        sx={{
          backgroundColor: '#0288D114',
          borderRadius: '16px',
          display: 'inline-flex',
          alignItems: 'center',
          px: 1.5, py: 0.5, width: 'fit-content',
          textTransform: "capitalize",
          "&:hover": {
            backgroundColor: '#0288D129'
          },
          boxShadow: "none !important"
        }}
        onClick={handleClick}
      >
        {
          sort.length > 1 ? (
            <SwapVertIcon sx={{ fontSize: 22, color: '#0288D1' }} />
          ) : (
            <ArrowUpwardIcon sx={{ fontSize: 18, color: '#0288D1' }} />
          )
        }
        <Typography sx={{ color: '#0288D1', fontWeight: 500, ml: 0.5 }} variant="body2">
          {
            sort.length === 0 ?
              "Value"
              :
              sort.length === 1
                ? `${sort[0].field}`
                : `${sort.length} Sorts`
          }
        </Typography>
        <KeyboardArrowDownIcon sx={{ color: '#0288D1', ml: 0.5 }} />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{
          vertical: -5,
          horizontal: 'left',
        }}
        elevation={1}
        MenuListProps={{ sx: { padding: 0 }, 'aria-labelledby': 'menu-button', }}
      >
        <Paper
          elevation={0}
          sx={{
            p: "8px",
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: 220,
            border: "1px solid #0000001F",
            borderRadius: "5px"
          }}
        >
          {sort.map((item, index) => (
            <SortRow
              key={index}
              index={index}
              field={item.field}
              order={item.order}
              onSetField={handleSetSortField}
              onSetOrder={handleSetSortOrder}
              usedFields={usedFields}
            />
          ))}

          <MenuList
            dense
            sx={{
              padding: 0,
              "& .MuiMenuItem-root": {
                padding: "4px 8px",
                borderRadius: "4px",
              },
            }}
          >
            {/* Remove the add sort option if all fields are used */}
            {
              sort.length !== availableSortFields.length ? (
                <MenuItem onClick={handleClickOnAddSort} sx={{ color: 'text.disabled' }}>
                  <ListItemIcon sx={{ color: 'text.disabled' }}><AddIcon fontSize="small" /></ListItemIcon>
                  <ListItemText><Typography variant="body2">Add sort</Typography></ListItemText>
                </MenuItem>
              ) : null
            }
            {/* Remove the add sort option if not all fields are used */}
            {
              sort.length > 0 ? (
                <MenuItem sx={{ color: 'text.disabled' }} onClick={handleDeleteSort} disabled={sort.length === 0}>
                  <ListItemIcon sx={{ color: 'text.disabled' }}><DeleteIcon fontSize="small" /></ListItemIcon>
                  <ListItemText><Typography variant="body2">Delete sort</Typography></ListItemText>
                </MenuItem>
              ) : null
            }
          </MenuList>
        </Paper>
      </Menu>

      <AddSortMenu
        open={Boolean(anchorAddSort)}
        anchorEl={anchorAddSort}
        onClose={handleCloseAdd}
        onAddSort={handleAddSort}
        usedFields={usedFields}
      />
    </>
  );
}

// Sort row component
function SortRow({ field, order, onSetField, onSetOrder, usedFields }: {
  index: number;
  field: string;
  order: string;
  usedFields: string[];
  onSetField: (field: string, replaced: string) => void;
  onSetOrder: (order: "ascending" | "descending", field: string) => void;
}) {
  const { availableSortFields } = useContext(DetailSelectContext)!;
  const [localField, setLocalField] = useState(field);
  const [localOrder, setLocalOrder] = useState(order);

  useEffect(() => {
    setLocalField(field);
    setLocalOrder(order);
  }, [field, order])

  const handleSetLocalField = (field: string) => {
    setLocalField(field);
    onSetField(field, localField);
  }

  const handleSetLocalOrder = (order: string) => {
    if (order === "ascending" || order === "descending") {
      setLocalOrder(order);
      onSetOrder(order, localField);
    }
  }
  const [searchTerm, setSearchTerm] = useState<string>("");

  // useEffect(() => {
  //   if (searchTerm === "") return;
  //   setSearchTerm("");
  // }, []);

  const handleClose = () => {
    const timeOut = setTimeout(() => {
      setSearchTerm("");
      clearTimeout(timeOut)
    }, 150);
  }

  const search = availableSortFields.filter(f => f.label.toLowerCase().includes(searchTerm.toLowerCase()) && !usedFields.includes(f.value));

  const isEqual = usedFields.length === availableSortFields.length;

  return (
    <Box sx={{ display: 'flex', gap: "2px" }}>
      <TinySelect
        value={localField}
        onChange={handleSetLocalField}
        onClose={handleClose}
        FormControlProps={{ sx: { width: "auto" } }}
        MenuProps={{
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          transformOrigin: {
            vertical: "top",
            horizontal: 8,
          },
          MenuListProps: {
            sx: {
              padding: "8px 0"
            },
            autoFocusItem: false,
          },
          PaperProps: {
            sx: {
              ...menuStyle.sx,
              border: "1px solid #0000001F",
              borderRadius: "5px"
            },
            elevation: 1
          }
        }}
        sx={{
          fontSize: "12px !important",
          textTransform: "capitalize",

        }}
      >
        {
          isEqual ? null : (
            <ListSubheader disableGutters sx={{ lineHeight: "normal" }}>
              <Input
                autoFocus
                appearance="distinct"
                placeholder="Search For Property"
                size="small"
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": {
                    padding: "4px 8px"
                  }
                }}
                FormControlProps={{
                  sx: { width: "100%", mb: "4px", }
                }}
                onKeyDown={(e) => {
                  e.stopPropagation(); // prevent key events from being captured by the menu
                }}
                // elevation={1}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </ListSubheader>
          )
        }
        {/* </ListSubheader> */}
        {search.map(f => (
          usedFields.includes(f.value) ? null : // Skip if the field is already used
            <MenuItem key={f.value} value={f.value} disabled={usedFields.includes(f.value) && f.value !== field}>
              <ListItemIcon>{f.icon}</ListItemIcon>
              <ListItemText>{f.label}</ListItemText>
            </MenuItem>
        ))}
        {
          search.length === 0 && searchTerm !== "" && availableSortFields.length > 0 && (
            <MenuItem disabled>
              <ListItemText>No fields found</ListItemText>
            </MenuItem>
          )
        }
        {
          isEqual && (
            <MenuItem disabled>
              <ListItemText>All Sorts are Applied</ListItemText>
            </MenuItem>
          )
        }
      </TinySelect>

      <TinySelect
        value={localOrder}
        onChange={handleSetLocalOrder}
        FormControlProps={{ sx: { width: "auto" } }}
        MenuProps={{
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          transformOrigin: {
            vertical: "top",
            horizontal: 78,
          },
          PaperProps: {
            sx: {
              ...menuStyle.sx,
              border: "1px solid #0000001F",
              borderRadius: "5px"
            },
            elevation: 1
          }
        }}
        sx={{
          fontSize: "12px !important",
          width: "88px !important",
          textTransform: "capitalize"
        }}
      >
        <MenuItem value="ascending">Ascending</MenuItem>
        <MenuItem value="descending">Descending</MenuItem>
      </TinySelect>
    </Box>
  );
}

// Add sort popup
function AddSortMenu({ open, anchorEl, onClose, onAddSort, usedFields }: {
  open: boolean;
  anchorEl: null | HTMLElement;
  onClose: () => void;
  onAddSort: (field: string) => void;
  usedFields: string[];
}) {
  const { availableSortFields } = useContext(DetailSelectContext)!;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const search = availableSortFields.filter(f => f.label.toLowerCase().includes(searchTerm.toLowerCase()) && !usedFields.includes(f.value));


  const handleClose = () => {
    onClose()
    const timeOut = setTimeout(() => {
      setSearchTerm("");
      clearTimeout(timeOut)
    }, 150);
  }

  // const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     // console.log(inputRef.current?.focus());
  //     if (inputRef.current) {
  //       inputRef.current.autofocus = true;
  //     }
  //   }, 100); // wait for visibility/transition
  //   return () => clearTimeout(timeout);
  // }, []);



  return (
    <Menu
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      MenuListProps={{
        disablePadding: true,
        sx: { px: "4px" },
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: -10 }}
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
      <MenuList
        sx={addSortStyle}
      // autoFocusItem={false}
      >
        <ListSubheader disableGutters sx={{ lineHeight: "normal" }}>
          <Input
            // inputRef={inputRef}
            appearance="distinct"
            placeholder="Search For Property"
            size="small"
            sx={{

              width: "100%",
              "& .MuiInputBase-input": {
                padding: "4px 8px"
              }
            }}
            FormControlProps={{
              sx: { width: "100%", mb: "4px", }
            }}
            onKeyDown={(e) => {
              e.stopPropagation(); // prevent key events from being captured by the menu
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </ListSubheader>
        {search.map(f => (
          usedFields.includes(f.value) ? null : // Skip if the field is already used
            <MenuItem key={f.value} onClick={() => onAddSort(f.value)} disabled={usedFields.includes(f.value)}>
              <ListItemIcon>{f.icon}</ListItemIcon>
              <ListItemText>{f.label}</ListItemText>
            </MenuItem>
        ))}
        {
          search.length === 0 && searchTerm !== "" && availableSortFields.length > 0 && (
            <MenuItem disabled>
              <ListItemText>No fields found</ListItemText>
            </MenuItem>
          )
        }
      </MenuList>
    </Menu>
  );
}

/* Filter Select Detail Variant */
const DetailSelectFilterMenuStyle = {
  sx: {
    maxHeight: "242px !important",
    "& .MuiTypography-root": { fontSize: "0.875rem" },
    "& .MuiListItemIcon-root": {
      minWidth: "28px !important",
      "svg": { width: "20px" }
    },
    "& .MuiButtonBase-root.MuiMenuItem-root ": {
      borderRadius: "4px"
    },
  }
};

const DetailSelectPending = () => {
  const { filter, setFilter, open, onSetFilterValue, onClearFilter, onSetFilterOption, valueFilter, filterField, onCloseFilter } = useContext(DetailSelectContext)!;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    onCloseFilter?.();
  };

  const handleSetFilter = (field: string) => {
    if (field === "is empty" || field === "is not empty") {
      // console.log(field);
      setFilter({
        value: "",
        filterOption: field ? field : "contains"
      });
      setSearchTerm("");
    }
    else {
      setFilter(() => ({
        value: filter?.value ?? "",
        filterOption: field ? field : "contains"
      }));
    }
    onSetFilterOption?.(field);
  };




  const [searchTerm, setSearchTerm] = useState<string>(valueFilter?.value || "");
  const [debouncedQuery, setDebouncedQuery] = useState(searchTerm);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchTerm);
    }, 500); // Delay: 500ms

    return () => clearTimeout(handler); // Cleanup
  }, [searchTerm]);


  //  debounce value when searchTerm changes 
  useEffect(() => {
    if (debouncedQuery === "") {
      setFilter((prev) => ({
        value: "",
        filterOption: prev?.filterOption ? prev?.filterOption : "contains"
      }));

      onClearFilter?.();
    } else {
      setFilter((prev) => ({
        value: debouncedQuery || "",
        filterOption: prev?.filterOption ?? "contains"
      }));
      onSetFilterValue?.(debouncedQuery);
    }
  }, [debouncedQuery])

  const handleChangeFilterValue = (value: string) => {
    setSearchTerm(value);
  }


  const randomId = randomStringId();

  useEffect(() => {
    // Simulate a reference to a button
    const menu = document.getElementById(randomId);
    if (open) {
      if (menu) {
        setAnchorEl(menu);
      }
    }
    else {
      setAnchorEl(null);
    }
  }, [open]);


  // useEffect(() => {
  //   console.log("Re rendering Value Sort...");
  //   if (valueFilter !== filter) {
  //     setFilter(valueFilter || null);
  //   }
  // }, [valueFilter, filter, setFilter]);


  const isEmptyOrNotEmpty = filter?.filterOption === "is empty" || filter?.filterOption === "is not empty";

  return (
    <>
      <Button
        color="info"
        id={randomId}
        sx={{
          backgroundColor: filter?.value || isEmptyOrNotEmpty ? '#0288D114' : "transparent",
          borderRadius: '16px',
          display: 'inline-flex',
          alignItems: 'center',
          px: 1.5, py: 0.5, width: 'fit-content',

          textTransform: "capitalize",
          "&:hover": {
            backgroundColor: filter?.value || isEmptyOrNotEmpty ? '#0288D129' : "#EEEDF4"
          },
          boxShadow: "none !important"

        }}
        onClick={handleClick}
      >
        <Badge
          sx={{
            alignItems: "center",
            "& .MuiBadge-dot": { bgcolor: "#C85A15" }
          }}
          variant="dot">
          <Typography
            sx={{ color: filter?.value || isEmptyOrNotEmpty ? '#0288D1' : "#0000008F", fontWeight: 500, ml: 0.5 }} variant="body2"
          >
            <Typography
              sx={{
                fontWeight: 600,
                mr: 0.5,
                color: filter?.value || isEmptyOrNotEmpty ? undefined : "#0000008F",
                fontSize: "0.875rem"
              }}
              component={"span"}
            >
              Aa
            </Typography>
            <Typography
              sx={{
                mr: 0.5,
                display: "inline-flex",
                fontSize: "0.875rem",
                "&::first-letter": {
                  textTransform: "uppercase",
                }
              }}>
              {/* {filterField} {filter?.filterOption ? `${filter?.filterOption} :` : ""} */}
              {/* {filterField} {filter?.value || isEmptyOrNotEmpty ? ":" : ""} */}
              {
                renderValues({
                  value: filter?.value ?? "",
                  filterOption: filter?.filterOption ?? "",
                  field: filterField
                })
              }
            </Typography>
            <Box sx={{
              maxWidth: "120px",
              display: "inline-flex",
            }}>
              <Typography
                sx={{
                  mr: 0.5,
                  fontSize: "0.875rem",
                  maxWidth: "120px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  // textTransform: filter?.value && filter?.filterOption !== "is empty" && filter?.filterOption !== "is not empty" ? "none" : "capitalize",
                  "&::first-letter": {
                    textTransform: filter?.value && filter?.filterOption !== "is empty" && filter?.filterOption !== "is not empty" ? "none" : "uppercase ",
                  }
                }}
                component="span"
                noWrap={true}
              >
                {
                  // filter?.value || "Value"
                  filter?.filterOption && isEmptyOrNotEmpty ? `${filter?.filterOption}` : filter?.value && filter?.value.length > 0 ? filter.value : ""
                }

              </Typography>
            </Box>
          </Typography>
          <KeyboardArrowDownIcon sx={{ color: !filter?.value ? "#0000001F" : '#0288D1', ml: 0.5 }} />
        </Badge>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        elevation={1}
        MenuListProps={{ sx: { padding: 0 } }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: 220,
            border: "1px solid #0000001F",
            borderRadius: "5px",
          }}
        >
          <FilterRow
            filterField={filterField || undefined}
            field={filter?.filterOption || "contains"}
            onSetField={handleSetFilter}
          />
          {
            isEmptyOrNotEmpty ? null : (
              <Input
                autoFocus
                appearance="distinct"
                placeholder="Type a value..."
                size="small"
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": {
                    padding: "4px 8px"
                  },
                }}
                FormControlProps={{
                  sx: { width: "100%" }
                }}
                // elevation={1}
                onChange={(e) => handleChangeFilterValue(e.target.value)}
                value={searchTerm}
              />
            )
          }
        </Paper>
      </Menu>
    </>
  );
}

// Filter row component
function FilterRow({ field, onSetField, filterField }: {
  field: string;
  onSetField: (field: string) => void;
  filterField?: string
}) {
  const { filterOptions } = useContext(DetailSelectContext)!;
  const [localField, setLocalField] = useState<string>(field);

  useEffect(() => {
    setLocalField(field);
  }, [field])

  const handleSetLocalField = (field: string) => {
    setLocalField(field);
    onSetField(field);
  }

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Get initial selected index
  const selectedIndex = filterOptions.findIndex(opt => opt.value === localField);

  return (
    <Stack sx={{
      flexDirection: "row",
      gap: 1,
      alignItems: "center",
    }}>
      <Typography
        sx={{ fontSize: "12px", color: "#0000001F", textTransform: "capitalize" }}
        component={"span"}
      >
        {filterField}
      </Typography>
      <TinySelect
        value={localField}
        onChange={handleSetLocalField}
        onOpen={() => setHoveredIndex(selectedIndex)} // 👈 Highlight selected when menu opens

        FormControlProps={{ sx: { width: "auto" } }}
        MenuProps={{
          anchorOrigin: { vertical: 30 as const, horizontal: 'center' as const },
          // transformOrigin: {
          //   vertical: -30 as const,
          //   horizontal: 'center' as const
          // },
          PaperProps: {

            sx: {
              ...DetailSelectFilterMenuStyle.sx,
              border: "1px solid #0000001F",
              borderRadius: "5px",
              "&:hover li.Mui-selected": {
                backgroundColor: "transparent",
              },
            },
            elevation: 1,
          },
        }}
        sx={{
          fontSize: "12px !important",
          textTransform: "capitalize",
          minWidth: "80px !important",
          maxWidth: "130px !important",
          width: "auto !important"
        }}
      >
        {filterOptions.map((f, index) => (
          <MenuItem
            key={f.value}
            value={f.value}
            // sx={{ "&.Mui-selected, &.Mui-selected:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" }, "&.Mui-selected:hover": { background: "rgba(0, 0, 0, 0.04) !important" } }}
            onMouseEnter={() => setHoveredIndex(index)}
            sx={{
              backgroundColor:
                hoveredIndex === index ? "rgba(0, 0, 0, 0.04)" : "transparent",
              "&.Mui-selected": {
                backgroundColor: hoveredIndex === index ? "rgba(0, 0, 0, 0.04)" : "transparent",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04) !important",
              },
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <ListItemText sx={{ textTransform: "capitalize" }}>{f.label}</ListItemText>
          </MenuItem>
        ))}
      </TinySelect>
    </Stack>
  );
}


const renderValues = (filter: {
  value: string;
  filterOption: string;
  field: string | undefined;
} | null) => {

  // console.log(filter, isEmptyOrNotEmpty);

  let displayedFilterOption = ""

  switch (filter?.filterOption) {
    case "starts with":
      displayedFilterOption = `starts with `;
      break;
    case "ends with":
      displayedFilterOption = `ends with `;
      break;
    case "does not contain":
    case "is not":
      displayedFilterOption = `not `;
      break;
    default:
      displayedFilterOption = ``;
      break;
  }

  return (
    <>
      {filter?.field}
      {
        filter?.value ? filter?.filterOption ? ` : ${displayedFilterOption}` : "" : ""
      }
    </>
  );
}