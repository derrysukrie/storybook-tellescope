import { CallOutlined, CloseOutlined, VideocamOutlined } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'

export const HeaderActions = () => {
    return (
        <Box display="flex" gap={2} alignItems="center">
            <IconButton>
                <CallOutlined />
            </IconButton>
            <IconButton>
                <VideocamOutlined />
            </IconButton>
            <IconButton>
                <CloseOutlined />
            </IconButton>
        </Box>
    )
}
