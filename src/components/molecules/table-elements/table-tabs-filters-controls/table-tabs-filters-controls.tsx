import CalendarViewMonthRoundedIcon from '@mui/icons-material/CalendarViewMonthRounded'
import FilterListIcon from '@mui/icons-material/FilterList'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import SearchIcon from '@mui/icons-material/Search'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import TagIcon from '@mui/icons-material/Tag'
import { Badge, Box, Stack } from '@mui/material'
import { createContext, type FC, type ReactNode, useContext, useEffect, useState } from 'react'
import { IconButton } from '../../../atoms/button/icon-button'
import Reset from '../../../atoms/table-control-elements/reset/reset'
import TabBar from '../../tabs/tab-bar'
import DetailSelect from '../detail-select/detail-select-default'
import DetailSelectPending from '../detail-select/detail-select-pending'

// Context
type FilterContextType = {
    filterSelected: { field: string; value: string | number | boolean; filterOption: string }[]
    setFilterSelected: React.Dispatch<
        React.SetStateAction<
            { field: string; value: string | number | boolean; filterOption: string }[]
        >
    >
    sortSelected: { field: string; order: 'ascending' | 'descending' }[]
    setSortSelected: React.Dispatch<
        React.SetStateAction<{ field: string; order: 'ascending' | 'descending' }[]>
    >
    openSortMenu: boolean
    setOpenSortMenu: React.Dispatch<React.SetStateAction<boolean>>
    handleAddFilter: (field: string) => void
    reset: boolean
    setReset: React.Dispatch<React.SetStateAction<boolean>>
    openDetailSelectSort?: boolean
    openDetailSelectFilter?: {
        open: boolean
        index: number
    }
    setOpenDetailSelectSort: React.Dispatch<React.SetStateAction<boolean>>
    setOpenDetailSelectFilter: React.Dispatch<
        React.SetStateAction<{ open: boolean; index: number } | undefined>
    >
    hide: boolean
    setHide: React.Dispatch<React.SetStateAction<boolean>>
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

// Hook to use context
export const useFilterContext = (): FilterContextType => {
    const ctx = useContext(FilterContext)
    if (!ctx) throw new Error('useFilterContext must be used within FilterContext.Provider')
    return ctx
}

const getTabPanels = (newContent?: { content: ReactNode }[]) => {
    const panels = newContent ?? []
    return [
        {
            content: <Box sx={{ p: 1 }}>{panels[0]?.content ?? <div />}</Box>,
        },
        {
            content: (
                <Stack sx={{ p: 1 }}>
                    <FilterSelected />
                    {panels[1]?.content ?? <div />}
                </Stack>
            ),
        },
        ...panels.slice(2).map(panel => ({
            content: panel.content ? <div>{panel.content}</div> : <div />,
        })),
    ]
}

const getTabsTable = (
    newContent?: {
        label: string
        icon?: React.ReactElement
    }[]
): { label: string; icon: React.ReactElement }[] => {
    const tabsArr = newContent ?? []
    return [
        {
            label: tabsArr[0]?.label || 'All Contacts',
            icon: tabsArr[0]?.icon ?? <CalendarViewMonthRoundedIcon />,
        },
        {
            label: tabsArr[1]?.label || 'Patients',
            icon: tabsArr[1]?.icon ?? <CalendarViewMonthRoundedIcon />,
        },
        ...tabsArr.slice(2).map(panel => ({
            label: panel.label,
            icon: panel.icon ?? <CalendarViewMonthRoundedIcon />,
        })),
    ]
}

interface TableTabsFiltersControlsProps {
    selectedFilters?: { field: string; value: string | number | boolean; filterOption: string }[]
    selectedSorts?: { field: string; order: 'ascending' | 'descending' }[]
    openSortMenu?: boolean
    tabs?: { label: string; icon?: React.ReactElement }[]
    tabPanels?: { content: React.ReactNode }[]
    reset?: boolean
    openDetailSelectSort?: boolean
    openDetailSelectFilter?: {
        open: boolean
        index: number
    }
}

// Main component
const TableTabsFiltersControls: FC<TableTabsFiltersControlsProps> = ({
    tabs,
    tabPanels,
    selectedFilters,
    selectedSorts,
    openSortMenu: openSort,
    reset: resetFilter,
    openDetailSelectSort: oDSS,
    openDetailSelectFilter: oDSF,
}) => {
    const [filterSelected, setFilterSelected] = useState<
        { field: string; value: string | number | boolean; filterOption: string }[]
    >(selectedFilters || [])
    const [sortSelected, setSortSelected] = useState<
        { field: string; order: 'ascending' | 'descending' }[]
    >(selectedSorts || [])
    const [openSortMenu, setOpenSortMenu] = useState<boolean>(openSort || false)
    const [reset, setReset] = useState<boolean>(resetFilter || false)
    const [hide, setHide] = useState<boolean>(true)
    const [openDSSort, setOpenDSSort] = useState<boolean>(oDSS || false)
    const [openDSFilter, setOpenDSFilter] = useState<{ open: boolean; index: number } | undefined>(
        oDSF || { open: false, index: -1 }
    )

    const handleAddFilter = (field: string) => {
        setFilterSelected(prev => [...prev, { field, value: '', filterOption: 'contains' }])
        setOpenDSFilter({ open: true, index: filterSelected.length })
        if (hide) {
            setHide(false)
        }
    }

    const contextValue: FilterContextType = {
        filterSelected,
        setFilterSelected,
        sortSelected,
        setSortSelected,
        setOpenSortMenu,
        openSortMenu,
        handleAddFilter,
        reset: reset,
        setReset: setReset,
        openDetailSelectSort: openDSSort,
        openDetailSelectFilter: openDSFilter,
        setOpenDetailSelectSort: setOpenDSSort,
        setOpenDetailSelectFilter: setOpenDSFilter,
        hide,
        setHide,
    }

    const handleAddSort = (field: string) => {
        setSortSelected(prev => [...prev, { field, order: 'ascending' }])
        setOpenDSSort(true)
    }

    const usedFields = filterSelected.map(filter => filter.field)
    const availableFilterFields = availableSortFields.filter(
        field => !usedFields.includes(field.value)
    )

    useEffect(() => {
        if (hide && sortSelected.length > 0) {
            setHide(false)
        }
    }, [sortSelected.length])

    return (
        <FilterContext.Provider value={contextValue}>
            <TabBar
                tabs={getTabsTable(tabs)}
                tabPanels={getTabPanels(tabPanels)}
                defaultTab={1}
                tableControls={
                    <>
                        {filterSelected.length > 0 || reset ? (
                            <IconButton
                                color="default"
                                size="small"
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        color: usedFields.length > 0 ? 'info.main' : undefined,
                                    },
                                }}
                                onClick={() => {
                                    // if (hide) {
                                    //     setReset(false);
                                    //     setHide(false);
                                    // } else {
                                    //     setHide(true);
                                    // }
                                    if (!hide) {
                                        setReset(false)
                                        setHide(true)
                                    } else {
                                        setHide(!hide)
                                        // setReset(false);
                                    }
                                }}
                            >
                                {usedFields.length > 0 ? (
                                    <Badge
                                        sx={{ '& .MuiBadge-dot': { bgcolor: '#C85A15' } }}
                                        variant="dot"
                                    >
                                        <FilterListIcon />
                                    </Badge>
                                ) : (
                                    <FilterListIcon />
                                )}
                            </IconButton>
                        ) : (
                            <DetailSelectPending
                                availableFilterFields={availableFilterFields}
                                placeholder="Filter By..."
                                onChangeFilter={handleAddFilter}
                                buttonContent={
                                    <IconButton
                                        color="default"
                                        size="small"
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                color:
                                                    usedFields.length > 0 ? 'info.main' : undefined,
                                            },
                                        }}
                                    >
                                        {usedFields.length > 0 ? (
                                            <Badge
                                                sx={{ '& .MuiBadge-dot': { bgcolor: '#C85A15' } }}
                                                variant="dot"
                                            >
                                                <FilterListIcon />
                                            </Badge>
                                        ) : (
                                            <FilterListIcon />
                                        )}
                                    </IconButton>
                                }
                            />
                        )}

                        {sortSelected.length === 0 ? (
                            <DetailSelectPending
                                availableFilterFields={availableSortFields}
                                placeholder="Sort By..."
                                onChangeFilter={handleAddSort}
                                onClose={() => {
                                    setOpenSortMenu(false)
                                }}
                                open={openSortMenu}
                                buttonContent={
                                    <IconButton
                                        color="default"
                                        size="small"
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                color:
                                                    sortSelected.length > 0
                                                        ? 'info.main'
                                                        : undefined,
                                            },
                                        }}
                                        onClick={() => {
                                            if (!hide && reset) {
                                                setReset(false)
                                                setHide(true)
                                            }
                                        }}
                                    >
                                        {sortSelected.length > 0 ? (
                                            <Badge
                                                sx={{ '& .MuiBadge-dot': { bgcolor: '#C85A15' } }}
                                                variant="dot"
                                            >
                                                <SwapVertIcon />
                                            </Badge>
                                        ) : (
                                            <SwapVertIcon />
                                        )}
                                    </IconButton>
                                }
                            />
                        ) : (
                            <IconButton
                                color="default"
                                size="small"
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        color: sortSelected.length > 0 ? 'info.main' : undefined,
                                    },
                                }}
                                onClick={() => {
                                    setHide(!hide)
                                    if (hide) {
                                        setOpenDSSort(true)
                                        // setOpenSortMenu(true);
                                    }
                                }}
                            >
                                {sortSelected.length > 0 ? (
                                    <Badge
                                        sx={{ '& .MuiBadge-dot': { bgcolor: '#C85A15' } }}
                                        variant="dot"
                                    >
                                        <SwapVertIcon />
                                    </Badge>
                                ) : (
                                    <SwapVertIcon />
                                )}
                            </IconButton>
                        )}
                        <IconButton color="default" size="small">
                            <MoreVertIcon />
                        </IconButton>
                        <IconButton color="default" size="small">
                            <SearchIcon />
                        </IconButton>
                    </>
                }
            />
        </FilterContext.Provider>
    )
}

export default TableTabsFiltersControls

const filterOptions = [
    { label: 'is', value: 'is' },
    { label: 'is not', value: 'is not' },
    { label: 'contains', value: 'contains' },
    { label: 'does not contain', value: 'does not contain' },
    { label: 'starts with', value: 'starts with' },
    { label: 'ends with', value: 'ends with' },
    { label: 'is empty', value: 'is empty' },
    { label: 'is not empty', value: 'is not empty' },
]

const availableSortFields = [
    { label: 'Name', value: 'name', icon: <PersonOutlineOutlinedIcon /> },
    { label: 'Care Team', value: 'care team', icon: <GroupOutlinedIcon /> },
    { label: 'Share Team', value: 'share team', icon: <GroupOutlinedIcon /> },
    { label: 'Journeys', value: 'journeys', icon: <ShowChartIcon /> },
    { label: 'Tags', value: 'tags', icon: <TagIcon /> },
]

const FilterSelected = () => {
    const {
        filterSelected,
        setFilterSelected,
        sortSelected,
        setSortSelected,
        handleAddFilter,
        reset,
        setReset,
        openDetailSelectSort,
        openDetailSelectFilter,
        hide,
        setOpenDetailSelectSort,
        setOpenDetailSelectFilter,
    } = useFilterContext()

    const usedFields = filterSelected.map(filter => filter.field)
    const availableFilterFields = availableSortFields.filter(
        field => !usedFields.includes(field.value)
    )

    return (
        <Stack
            sx={{
                flexDirection: 'row',
                gap: 1,
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                display: hide ? 'none' : 'flex',
            }}
        >
            <Stack sx={{ flexDirection: 'row', gap: 1, flexWrap: 'wrap' }}>
                {sortSelected.length > 0 ? (
                    <DetailSelect
                        appearance="sort"
                        availableSortFields={availableSortFields}
                        value={sortSelected}
                        onAddSort={field => {
                            const newSort = [...sortSelected]
                            if (!newSort.find(s => s.field === field)) {
                                newSort.push({ field, order: 'ascending' })
                            }
                            setSortSelected(newSort)
                        }}
                        onChangeSort={(field, _, replaced) => {
                            const newSort = [...sortSelected]
                            const existingIndex = newSort.findIndex(s => s.field === replaced)
                            newSort[existingIndex].field = field
                        }}
                        onChangeSortOrder={(field, order) => {
                            const newSort = [...sortSelected]
                            const existingIndex = newSort.findIndex(s => s.field === field)
                            newSort[existingIndex].order = order
                            setSortSelected(newSort)
                        }}
                        onDeleteSort={() => {
                            setSortSelected([])
                        }}
                        onClose={() => {
                            setOpenDetailSelectSort(false)
                        }}
                        open={openDetailSelectSort}
                    />
                ) : null}
                {filterSelected.map((filter, index) => (
                    <DetailSelect
                        key={index.toString()}
                        appearance="filter"
                        filterOptions={filterOptions}
                        field={filter.field}
                        value={{
                            value: filter.value.toString(),
                            filterOption: filter.filterOption.toString(),
                        }}
                        onSetFilterOption={value => {
                            const newFilter = [...filterSelected]
                            newFilter[index].filterOption = value
                            setFilterSelected([...newFilter])
                        }}
                        onSetFilterValue={value => {
                            const newFilter = [...filterSelected]
                            newFilter[index].value = value
                            setFilterSelected([...newFilter])
                        }}
                        open={
                            index === openDetailSelectFilter?.index && openDetailSelectFilter?.open
                        }
                        onClose={() => setOpenDetailSelectFilter(undefined)}
                    />
                ))}

                {reset || filterSelected.length > 0 || sortSelected.length > 0 ? (
                    <DetailSelectPending
                        placeholder="Filter By..."
                        availableFilterFields={availableFilterFields}
                        onChangeFilter={handleAddFilter}
                    />
                ) : null}
            </Stack>
            {filterSelected.length > 0 || sortSelected.length > 0 ? (
                <Reset
                    onClick={() => {
                        setReset(true)
                        setFilterSelected([])
                        if (sortSelected.length > 0) {
                            setSortSelected([])
                        }
                    }}
                />
            ) : null}
        </Stack>
    )
}
