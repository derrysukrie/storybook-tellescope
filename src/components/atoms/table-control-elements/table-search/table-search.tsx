import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import type { FC } from 'react'
import { IconButton } from '../../button/icon-button'
import { Input } from '../../input/input'

interface TableSearchProps {
    expanded?: boolean
    value?: string
    onChange?: (value: string) => void
}

const TableSearch: FC<TableSearchProps> = ({ expanded, value, onChange }) => {
    return expanded ? (
        <Input
            placeholder="Search"
            value={value}
            onChange={onChange ? e => onChange(e.target.value) : undefined}
            InputProps={{
                disableUnderline: true,
            }}
            hiddenLabel
            startIcon={<SearchIcon sx={{ width: 20, height: 20 }} />}
            endIcon={
                <IconButton
                    color="default"
                    size="small"
                    onClick={() => onChange?.('')}
                    disabled={!value}
                >
                    <ClearIcon sx={{ width: 20, height: 20 }} />
                </IconButton>
            }
        />
    ) : !value ? (
        <IconButton color="default" size="table">
            <SearchIcon sx={{ width: 20, height: 20 }} />
        </IconButton>
    ) : null
}

export default TableSearch
