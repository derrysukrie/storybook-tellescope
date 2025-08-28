import { Alert, Box, Button, Snackbar as MuiSnackbar } from '@mui/material'
import type React from 'react'
import { useState } from 'react'

export interface SnackbarProps {
    open: boolean
    message?: string
    asAlert?: boolean
    action?: React.ReactNode
}

// Demo trigger button component
const DemoTriggerButton: React.FC<{
    onShowSnackbar: (severity: 'success' | 'info' | 'warning' | 'error') => void
}> = ({ onShowSnackbar }) => (
    <Box
        sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
            flexWrap: 'wrap',
        }}
    >
        <Button variant="contained" onClick={() => onShowSnackbar('success')}>
            Show
        </Button>
    </Box>
)

export const Snackbar: React.FC<SnackbarProps> = ({
    open,
    message = 'This is a snackbar message',
    action,
    asAlert = false,
}) => {
    const [isOpen, setIsOpen] = useState(open)

    const handleShowSnackbar = () => {
        setIsOpen(true)
    }

    return (
        <>
            <DemoTriggerButton onShowSnackbar={handleShowSnackbar} />
            <MuiSnackbar
                open={isOpen}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                sx={{
                    '& .MuiPaper-root': {
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.25)',
                    },
                }}
            >
                <Alert
                    onClose={() => setIsOpen(false)}
                    variant="filled"
                    icon={false}
                    sx={{
                        width: '100%',
                        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.22)',
                        borderRadius: '4px',
                        backgroundColor: asAlert ? '#BA1A1A' : '#151B2C',
                        '& .MuiAlert-action': {
                            '& .MuiButton-root': {
                                color: '#DDE1F9',
                            },
                        },
                    }}
                    action={action}
                >
                    {message}
                </Alert>
            </MuiSnackbar>
        </>
    )
}

export default Snackbar
