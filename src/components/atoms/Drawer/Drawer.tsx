import { Box, Button, Drawer as MuiDrawer, styled, Typography } from '@mui/material'
import type React from 'react'
import { useState } from 'react'

// Constants
const DRAWER_WIDTH = 240
const DRAWER_MARGIN = 16
const DRAWER_BORDER_RADIUS = 28
const DRAWER_BACKGROUND_COLOR = '#F4F3FA'

// Styled Components
const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
    open?: boolean
}>(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -DRAWER_WIDTH,
    position: 'relative',
    variants: [
        {
            props: ({ open }) => open,
            style: {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginRight: 0,
            },
        },
    ],
}))

// Types
export interface DrawerProps {
    open?: boolean
    title?: string
    children?: React.ReactNode
    persistent?: boolean
    hugContents?: boolean
    mainContent?: React.ReactNode
}

interface DemoTriggerButtonProps {
    isOpen: boolean
    onToggle: () => void
}

// Demo Trigger Button Component
const DemoTriggerButton: React.FC<DemoTriggerButtonProps> = ({ isOpen, onToggle }) => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
            minHeight: '100px',
        }}
    >
        <Button variant="contained" onClick={onToggle} size="large">
            {isOpen ? 'Close' : 'Open'} Drawer
        </Button>
    </Box>
)

// Style Helpers
const getBaseDrawerStyles = (hugContents: boolean) => ({
    backgroundColor: DRAWER_BACKGROUND_COLOR,
    height: hugContents ? 'fit-content' : 'calc(100vh - 32px)',
})

const getFloatingDrawerStyles = (hugContents: boolean) => ({
    ...getBaseDrawerStyles(hugContents),
    borderRadius: `${DRAWER_BORDER_RADIUS}px`,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    margin: `${DRAWER_MARGIN}px`,
    marginLeft: '0',
    width: 'fit-content',
    ...(hugContents && {
        position: 'fixed',
        bottom: `${DRAWER_MARGIN}px`,
        top: 'auto',
    }),
})

const getPersistentDrawerStyles = (hugContents: boolean) => ({
    ...getBaseDrawerStyles(hugContents),
    width: DRAWER_WIDTH,
    height: hugContents ? 'fit-content' : '100vh',
})

const getDrawerPaperStyles = (persistent: boolean, hugContents: boolean) => {
    return persistent
        ? getPersistentDrawerStyles(hugContents)
        : getFloatingDrawerStyles(hugContents)
}

// Drawer Content Component
const DrawerContent: React.FC<{
    title?: string
    children?: React.ReactNode
}> = ({ title, children }) => (
    <Box
        sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            boxSizing: 'border-box',
        }}
    >
        {title && (
            <Typography variant="subtitle2" component="h4" sx={{ mb: 2 }}>
                {title}
            </Typography>
        )}
        <Box
            sx={{
                '& *': {
                    boxSizing: 'border-box',
                },
            }}
        >
            {children}
        </Box>
    </Box>
)

// Persistent Drawer Component
const PersistentDrawer: React.FC<{
    isOpen: boolean
    onToggle: () => void
    title?: string
    children?: React.ReactNode
    mainContent?: React.ReactNode
}> = ({ isOpen, onToggle, title, children, mainContent }) => (
    <Box sx={{ display: 'flex' }}>
        <Main open={isOpen}>
            <DemoTriggerButton isOpen={isOpen} onToggle={onToggle} />
            {mainContent}
        </Main>
        <MuiDrawer
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: DRAWER_WIDTH,
                    backgroundColor: DRAWER_BACKGROUND_COLOR,
                },
            }}
            variant="persistent"
            anchor="right"
            open={isOpen}
        >
            <DrawerContent title={title}>{children}</DrawerContent>
        </MuiDrawer>
    </Box>
)

// Temporary Drawer Component
const TemporaryDrawer: React.FC<{
    isOpen: boolean
    onToggle: () => void
    onClose: () => void
    title?: string
    children?: React.ReactNode
    hugContents?: boolean
}> = ({ isOpen, onToggle, onClose, title, children, hugContents = false }) => (
    <>
        <DemoTriggerButton isOpen={isOpen} onToggle={onToggle} />
        <MuiDrawer
            anchor="right"
            open={isOpen}
            onClose={onClose}
            variant="temporary"
            sx={{
                zIndex: 1300,
                '& .MuiDrawer-paper': {
                    ...getDrawerPaperStyles(false, hugContents),
                    zIndex: 1300,
                },
            }}
        >
            <DrawerContent title={title}>{children}</DrawerContent>
        </MuiDrawer>
    </>
)

// Main Drawer Component
export const Drawer: React.FC<DrawerProps> = ({
    open = false,
    title,
    children,
    persistent = false,
    hugContents = false,
    mainContent,
}) => {
    const [isOpen, setIsOpen] = useState(open)

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    const handleClose = () => {
        if (!persistent) {
            setIsOpen(false)
        }
    }

    return persistent ? (
        <PersistentDrawer
            isOpen={isOpen}
            onToggle={handleToggle}
            title={title}
            mainContent={mainContent}
        >
            {children}
        </PersistentDrawer>
    ) : (
        <TemporaryDrawer
            isOpen={isOpen}
            onToggle={handleToggle}
            onClose={handleClose}
            title={title}
            hugContents={hugContents}
        >
            {children}
        </TemporaryDrawer>
    )
}
