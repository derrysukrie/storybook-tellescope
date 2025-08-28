import CloseIcon from '@mui/icons-material/Close'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Dialog as MuiDialog,
    type SxProps,
    type Theme,
    Typography,
} from '@mui/material'
import type React from 'react'
import { useState } from 'react'

export interface DialogAction {
    label: string
    onClick: () => void
    color?: 'primary' | 'error' | 'secondary' | 'success' | 'info' | 'warning'
    variant?: 'contained' | 'outlined' | 'text'
    disabled?: boolean
    title?: string
    closeButton?: boolean
}

export interface DialogProps {
    open: boolean
    actions?: DialogAction[] | 'none' | 'one' | 'two' | 'three'
    size?: 'xs' | 'sm' | 'md'
    collapsible?: boolean
    title?: string
    children?: React.ReactNode
    sx?: SxProps<Theme>
    background?: boolean
    closeButton?: boolean
}

const sizeMap = {
    xs: { maxWidth: 'xs' as const },
    sm: { maxWidth: 'sm' as const },
    md: { maxWidth: 'md' as const },
}

export const Dialog: React.FC<DialogProps> = ({
    open,
    actions = [],
    size = 'sm',
    collapsible = false,
    title,
    children,
    sx,
    background = false,
    closeButton = false,
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isOpen, setIsOpen] = useState(open)

    // Handle actions mapping
    const getActionsArray = (): DialogAction[] => {
        if (Array.isArray(actions)) {
            return actions
        }

        const actionMappings = {
            none: [],
            one: [{ label: 'Confirm', onClick: () => {}, variant: 'contained' as const }],
            two: [
                { label: 'Cancel', onClick: () => {}, variant: 'text' as const },
                { label: 'Confirm', onClick: () => {}, variant: 'contained' as const },
            ],
            three: [
                { label: 'Cancel', onClick: () => {}, variant: 'text' as const },
                { label: 'Save Draft', onClick: () => {}, variant: 'outlined' as const },
                { label: 'Publish', onClick: () => {}, variant: 'contained' as const },
            ],
        }

        return actionMappings[actions] || []
    }

    const actionsArray = getActionsArray()

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)}>Open Dialog</Button>
            <MuiDialog
                open={isOpen}
                {...(isCollapsed ? {} : sizeMap[size])}
                fullWidth={!isCollapsed}
                hideBackdrop={!background}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: '#E8E7EF',
                        borderRadius: '16px',
                        ...(isCollapsed && {
                            minWidth: '300px',
                            maxWidth: '500px',
                            width: 'auto',
                        }),
                    },
                    ...sx,
                }}
            >
                <DialogTitle
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pb: isCollapsed ? 1.5 : 2,
                        pt: isCollapsed ? 1.5 : 2,
                        px: isCollapsed ? 2 : 3,
                    }}
                >
                    {title && <Typography variant="h6">{title}</Typography>}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {collapsible && (
                            <IconButton
                                aria-label={isCollapsed ? 'expand' : 'collapse'}
                                onClick={handleToggleCollapse}
                                sx={{
                                    color: theme => theme.palette.grey[500],
                                }}
                            >
                                {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                            </IconButton>
                        )}

                        {closeButton && (
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                    color: theme => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        )}
                    </Box>
                </DialogTitle>

                {!isCollapsed && (
                    <div>
                        <DialogContent sx={{ pb: actions.length > 0 ? 2 : 3 }}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: children ? 2 : 0 }}
                            >
                                {children}
                            </Typography>
                        </DialogContent>
                    </div>
                )}

                {!isCollapsed && actions.length > 0 && (
                    <DialogActions
                        sx={{
                            px: 3,
                            pb: 3,
                            flexDirection: 'row',
                            gap: 1,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                width: '100%',
                                justifyContent: 'flex-end',
                            }}
                        >
                            {actionsArray.map((action, index) => (
                                <Button
                                    key={index.toString()}
                                    variant={
                                        action.variant ||
                                        (index === actions.length - 1 ? 'contained' : 'text')
                                    }
                                    color={action.color || 'primary'}
                                    onClick={action.onClick}
                                    disabled={action.disabled}
                                    sx={{ flex: 'none' }}
                                >
                                    {action.label}
                                </Button>
                            ))}
                        </Box>
                    </DialogActions>
                )}
            </MuiDialog>
        </>
    )
}
