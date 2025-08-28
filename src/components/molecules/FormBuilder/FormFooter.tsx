import { Box } from '@mui/material'

export const FormFooter = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            sx={{
                padding: '15px 16px',
                borderTopWidth: 1,
                borderTopStyle: 'solid',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FFF',
                borderTopColor: '#E0E0E0',
                borderBottomLeftRadius: 28,
                borderBottomRightRadius: 28,
            }}
        >
            {children}
        </Box>
    )
}
