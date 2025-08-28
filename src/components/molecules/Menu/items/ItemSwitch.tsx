import { ListItemText, type MenuItemProps, MenuItem as MuiMenuItem, Switch } from '@mui/material'
import type React from 'react'
import { useDensity } from '../Menu'

type Props = Omit<MenuItemProps, 'checked'> & {
    checked?: boolean
    searchableText?: string
    dense?: boolean
}

export const ItemSwitch: React.FC<Props> = ({
    checked,
    children,

    ...props
}) => {
    const { dense } = useDensity()

    return (
        <MuiMenuItem
            selected={checked}
            sx={{
                p: dense ? '4px 8px' : '8px',
                borderRadius: '6px',
                mx: 1,
                minHeight: dense ? '32px' : 'auto',
                '&.Mui-selected': {
                    backgroundColor: '#DDE1F9',
                    '&:hover': {
                        backgroundColor: '#DDE1F9',
                    },
                },
            }}
            {...props}
        >
            <ListItemText
                sx={{
                    '& .MuiListItemText-primary': {
                        fontSize: dense ? '14px' : 'inherit',
                    },
                }}
            >
                {children}
            </ListItemText>
            <Switch
                sx={{
                    marginLeft: 'auto',
                    marginRight: dense ? '4px' : '8px',
                }}
                edge="end"
                checked={checked}
                size="small"
                tabIndex={-1}
                disableRipple
            />
        </MuiMenuItem>
    )
}
