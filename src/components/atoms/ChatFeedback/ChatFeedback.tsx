import { Box, Button, IconButton, Typography } from '@mui/material'
import type React from 'react'
import ArrowUpIcon from '../../../assets/arrow-up.svg'
import ReturnIcon from '../../../assets/back.svg'
import ThumbsDownIcon from '../../../assets/thumbs-down.svg'
import ThumbsUpIcon from '../../../assets/thumbs-up.svg'

interface ChatFeedbackProps {
    type: 'default' | 'return' | 'use'
}

export const ChatFeedback: React.FC<ChatFeedbackProps> = ({ type = 'default' }) => {
    return (
        <Box component="div" display="flex" alignItems="center" justifyContent="flex-start">
            <IconButton aria-label="like">
                <img src={ThumbsUpIcon} alt="thumbs-up" />
            </IconButton>
            <IconButton aria-label="unlike">
                <img src={ThumbsDownIcon} alt="thumbs-down" />
            </IconButton>
            {type === 'return' && (
                <IconButton aria-label="unlike">
                    <img src={ReturnIcon} alt="return" />
                </IconButton>
            )}
            {type === 'use' && (
                <Button
                    color="inherit"
                    sx={{
                        borderRadius: '8px',
                        height: '36px',
                        maxHeight: '36px',
                        marginLeft: '8px',
                        minWidth: '63px',
                        maxWidth: '63px',
                    }}
                >
                    <Typography
                        sx={{
                            color: 'rgba(0, 0, 0, 0.12)',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            textTransform: 'capitalize',
                            paddingRight: '8px',
                        }}
                    >
                        Use
                    </Typography>
                    <img src={ArrowUpIcon} alt="arrow" />
                </Button>
            )}
        </Box>
    )
}
