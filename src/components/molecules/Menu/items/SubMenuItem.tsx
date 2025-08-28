import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {
    ListItemIcon,
    ListItemText,
    type MenuItemProps,
    Menu as MuiMenu,
    MenuItem as MuiMenuItem,
} from '@mui/material'
import type React from 'react'
import { useRef, useState } from 'react'
import { useDensity } from '../Menu'

type Props = Omit<MenuItemProps, 'children'> & {
    icon?: React.ReactNode
    text: React.ReactNode
    children: React.ReactNode
    dense?: boolean
}

export const SubMenuItem: React.FC<Props> = ({ icon, text, children, ...props }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const menuItemRef = useRef<HTMLLIElement>(null)
    const { dense } = useDensity()

    const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
        event.stopPropagation()
        if (anchorEl) {
            setAnchorEl(null)
        } else {
            setAnchorEl(event.currentTarget)
        }
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)

    return (
        <>
            <MuiMenuItem
                {...props}
                ref={menuItemRef}
                onClick={handleClick}
                sx={{
                    p: dense ? '4px 8px' : '8px',
                    mx: 1,
                    minHeight: dense ? '32px' : 'auto',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                }}
            >
                {icon && (
                    <ListItemIcon sx={{ minWidth: dense ? '24px' : 'auto' }}>{icon}</ListItemIcon>
                )}
                <ListItemText
                    sx={{ '& .MuiListItemText-primary': { fontSize: dense ? '14px' : 'inherit' } }}
                >
                    {text}
                </ListItemText>
                <ArrowRightIcon sx={{ marginLeft: 4 }} fontSize="small" />
            </MuiMenuItem>
            <MuiMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{
                    ml: 1.2,
                    mt: -1,
                }}
            >
                {children}
            </MuiMenu>
        </>
    )
}
