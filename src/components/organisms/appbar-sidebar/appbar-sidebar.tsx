import { Stack } from '@mui/material'
import type { FC, ReactNode } from 'react'
import Appbar from './appbar'
import { AppbarSidebarProvider, useAppbarSidebarContext } from './context'
import Sidebar from './sidebar'

export interface AppbarSidebarProps {
    color?: 'standard' | 'transitional'
    expanded?: boolean
    children?: React.ReactNode
}

const AppbarSidebar: FC<AppbarSidebarProps> = ({
    color = 'standard',
    expanded = false,
    children,
}) => {
    return (
        <AppbarSidebarProvider color={color} expanded={expanded}>
            <AppSidebarContent>{children}</AppSidebarContent>
        </AppbarSidebarProvider>
    )
}

export default AppbarSidebar

const COLLAPSED_WIDTH = 48
const EXPANDED_WIDTH = 205

const AppSidebarContent = ({ children }: { children: ReactNode }) => {
    const { bgColor: contextBgColor, expanded } = useAppbarSidebarContext()
    return (
        <Stack
            sx={{
                backgroundColor: contextBgColor,
                overflow: 'hidden',
                borderRadius: '28px',
            }}
        >
            <Appbar />
            <Stack
                sx={{
                    flexDirection: 'row',
                }}
            >
                <Sidebar />
                <Stack
                    sx={{
                        flexGrow: 1,
                        height: 'calc(100vh - 64px)',
                        paddingRight: '16px',
                        paddingBottom: '16px',
                        borderRadius: '8px 28px',
                        width: expanded
                            ? `calc(100% - ${EXPANDED_WIDTH}px)`
                            : `calc(100% - ${COLLAPSED_WIDTH}px)`,
                    }}
                >
                    <Stack
                        sx={{
                            borderRadius: '28px',
                            background: '#fff',
                            height: '100%',
                            padding: '24px',
                        }}
                    >
                        {children}
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
