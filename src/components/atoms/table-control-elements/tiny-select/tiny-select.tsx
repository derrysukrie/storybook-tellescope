import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Select from '../../select/select'

interface TinySelectProps
    extends Omit<ComponentProps<typeof Select>, 'value' | 'onChange' | 'children' | 'size'> {
    value?: string
    onChange?: (value: string) => void
    children: React.ReactNode
}

import type { SelectChangeEvent } from '@mui/material/Select'
import type { ComponentProps } from 'react'

const TinySelect = ({ value, onChange, children, MenuProps, sx, ...rest }: TinySelectProps) => {
    const handleChange = (event: SelectChangeEvent<string | string[]>) => {
        if (onChange) {
            onChange(event.target.value as string)
        }
    }

    // Extract sx from MenuProps.PaperProps and MenuProps.MenuListProps, then remove them from MenuProps
    const { sx: paperSx, ...restPaperProps } = MenuProps?.PaperProps ?? {}
    const { sx: menuListSx, ...restMenuListProps } = MenuProps?.MenuListProps ?? {}
    const mergedMenuProps = {
        ...MenuProps,

        PaperProps: {
            ...restPaperProps,
            sx: {
                padding: '4px',
                maxHeight: '200px',
                width: '220px',
                ...paperSx,
            },
        },
        MenuListProps: {
            ...restMenuListProps,
            sx: {
                padding: '0px',
                '& .MuiButtonBase-root': {
                    fontSize: '0.875rem',
                    padding: '4px 8px',
                },
                ...menuListSx,
            },
        },
    }
    return (
        <Select
            {...rest}
            value={value ?? ''}
            onChange={handleChange}
            appearance="outlined"
            sx={{
                '&:hover': {
                    background: '#EEEDF4',
                },
                '&': {
                    width: '67px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    fontSize: '0.875rem',
                    color: '#0000008F',
                },
                '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input':
                    {
                        padding: '1px 24px 1px 4px',
                    },
                '& .MuiSvgIcon-root.MuiSelect-icon': {
                    width: '16px',
                },
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '& svg': {
                    right: '3px',
                },
                ...sx,
            }}
            size="small"
            hiddenLabel
            IconComponent={KeyboardArrowDownIcon}
            MenuProps={{
                ...mergedMenuProps,
            }}
        >
            {children}
        </Select>
    )
}

export default TinySelect
