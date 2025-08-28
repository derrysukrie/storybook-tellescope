import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import PushPinIcon from '@mui/icons-material/PushPin'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined'
import { Box, Stack, Typography } from '@mui/material'
import type { FC, ReactNode } from 'react'
import { IconButton } from '../../atoms/button/icon-button'

interface ThreadItemProps {
    icon: ReactNode
    title: string
    date?: string
    content?: string
    name?: string
    details?: string
    unread?: boolean
    current?: boolean
    pinned?: boolean
    archived?: boolean
}

const ThreadItem: FC<ThreadItemProps> = ({
    icon,
    title,
    date,
    content,
    name,
    details,
    unread = false,
    current = true,
    archived = false,
    pinned = false,
}) => {
    return (
        <Stack
            sx={{
                gap: 2,
                flexDirection: 'row',
                width: 400,
                px: 2,
                py: 1,
                borderLeft: current && !unread ? '5px solid rgba(60, 130, 246, 1)' : 'none',
                backgroundColor:
                    unread && !current && !pinned && !archived
                        ? 'rgba(239, 246, 255, 1)'
                        : 'transparent',
                borderTop:
                    current || pinned || archived || (!content && !name && !details)
                        ? 'none'
                        : unread
                          ? '1px solid rgba(226, 232, 240, 1)'
                          : '1px solid rgba(226, 232, 240, 1)',
                '&:hover': {
                    backgroundColor: !unread ? 'rgba(249, 250, 251, 1)' : undefined,
                },
                alignItems: !content && !name && !details ? 'center' : undefined,
            }}
        >
            <Stack>{icon}</Stack>
            <Stack
                sx={{
                    flex: 1,
                    width: 'calc(100% - 40px)',
                }}
            >
                <Stack
                    sx={{
                        gap: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Stack
                        sx={{
                            fontWeight: 600,
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            maxWidth: !archived ? 'calc(100% - 145.5px)' : '90%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
                        }}
                    >
                        {unread && !current && !pinned && !archived && (
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(60, 130, 246, 1)',
                                    mr: 1,
                                }}
                            />
                        )}
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                width: unread ? 'calc(100% - 10px)' : undefined,
                            }}
                        >
                            {title}
                        </Typography>
                    </Stack>
                    <Stack
                        sx={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        {
                            <Typography
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                }}
                            >
                                {archived ? 'Archived' : date}
                            </Typography>
                        }
                        {!content && !name && !details ? (
                            <Stack
                                sx={{
                                    // gap: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <IconButton color="default" size="small">
                                    {pinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
                                </IconButton>
                                <IconButton color="default" size="small">
                                    {archived ? <UnarchiveOutlinedIcon /> : <ArchiveOutlinedIcon />}
                                </IconButton>
                            </Stack>
                        ) : null}
                    </Stack>
                </Stack>
                <Stack>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 400,
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            maxWidth: '90%',
                        }}
                    >
                        {content}
                    </Typography>
                </Stack>
                {content && name && details ? (
                    <Stack
                        sx={{
                            gap: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 2,
                        }}
                    >
                        <Stack
                            sx={{
                                gap: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'rgba(0, 0, 0, 0.56)',
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                }}
                            >
                                {name}
                            </Typography>
                            <Typography
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                }}
                            >
                                {details}
                            </Typography>
                        </Stack>
                        <Stack
                            sx={{
                                // gap: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <IconButton color="default" size="small">
                                {pinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
                            </IconButton>
                            <IconButton color="default" size="small">
                                {archived ? <UnarchiveOutlinedIcon /> : <ArchiveOutlinedIcon />}
                            </IconButton>
                        </Stack>
                    </Stack>
                ) : null}
            </Stack>
        </Stack>
    )
}

export default ThreadItem
