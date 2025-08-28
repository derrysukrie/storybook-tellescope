import { Cancel } from '@mui/icons-material'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import type React from 'react'

export interface AttachedFileProps {
    /**
     * File name to display
     */
    fileName?: string
    /**
     * File extension/type to display
     */
    fileType?: string
    /**
     * Callback function when remove button is clicked
     */
    onRemove?: () => void
}

export const AttachedFile: React.FC<AttachedFileProps> = ({
    fileName = 'file...',
    fileType = 'jpeg',
    onRemove,
}) => {
    const theme = useTheme()

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        if (onRemove) {
            onRemove()
        }
    }

    return (
        <Box
            component="div"
            sx={{
                bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#F5F5F5',
                border: `solid 1px ${theme.palette.divider}`,
                borderRadius: '16px',
                maxWidth: '56px',
                height: '56px',
                position: 'relative',
                padding: '8px',
            }}
        >
            <Typography
                sx={{ fontSize: '0.875rem', color: theme.palette.text.primary }}
                noWrap
                title={fileName}
            >
                {fileName}
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: theme.palette.text.secondary }}>
                {fileType}
            </Typography>

            <IconButton
                size="small"
                sx={{ position: 'absolute', top: '-7px', right: '-7.5px' }}
                onClick={handleRemove}
                aria-label={`Remove ${fileName}`}
            >
                <Cancel sx={{ fontSize: '16px', color: 'rgba(0, 0, 0, 0.56)' }} />
            </IconButton>
        </Box>
    )
}
