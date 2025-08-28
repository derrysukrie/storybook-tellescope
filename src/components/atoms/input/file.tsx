// FileUpload.tsx

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { Box, LinearProgress, Stack, Typography } from '@mui/material'
import type React from 'react'
import { useRef } from 'react'
import { IconButton } from '../button/icon-button'

export type UploadStatus = 'pre-upload' | 'uploading' | 'error' | 'complete'

export interface FileItem {
    name: string
    size: number
    status: UploadStatus
    progress?: number
    errorMessage?: string
}

export interface FileUploadProps {
    files: FileItem[]
    onDelete?: (name: string) => void
    onSelectFiles?: (files: FileList) => void
    error?: boolean
    errorMsg?: string
}

const formatSize = (size: number) => {
    return size >= 1024 * 1024
        ? `${(size / 1024 / 1024).toFixed(1)}mb`
        : `${Math.round(size / 1024)}kb`
}

const FileUpload: React.FC<FileUploadProps> = ({
    files,
    onDelete,
    onSelectFiles,
    error = false,
    errorMsg,
}) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && onSelectFiles) {
            onSelectFiles(event.target.files)
        }
    }

    const triggerFileInput = () => {
        inputRef.current?.click()
    }

    return (
        <Stack
            sx={{
                maxWidth: 500,
                gap: 3,
            }}
        >
            <Box
                sx={{
                    borderWidth: '1px',
                    borderStyle: error ? 'solid' : 'dashed',
                    borderColor: error ? 'error.main' : '#DADCE0',
                    bgcolor: error ? 'rgba(186, 26, 26, 0.04) !important' : 'transparent',
                    borderRadius: 1,
                    p: 3,
                    maxWidth: 500,
                    '&:hover': {
                        borderColor: error ? 'rgba(186, 26, 26, 1)' : 'primary.main',
                        bgcolor: 'rgba(74, 92, 146, 0.08)',
                    },
                }}
            >
                <Stack spacing={2} alignItems="center" textAlign="center" mb={2}>
                    <UploadFileIcon fontSize="large" color={error ? 'error' : 'primary'} />
                    <Typography>
                        <Typography
                            component="span"
                            color="primary"
                            sx={{
                                position: 'relative',
                                cursor: 'pointer',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    left: 0,
                                    bottom: 0,
                                    width: '100%',
                                    height: '1px',
                                    background: '#4A5C9240',
                                },
                            }}
                            onClick={triggerFileInput}
                        >
                            Link
                        </Typography>{' '}
                        or drag and drop
                    </Typography>
                    {error && errorMsg ? (
                        <Typography variant="caption" color="error">
                            {errorMsg}
                        </Typography>
                    ) : (
                        <Typography variant="caption" color="textSecondary">
                            SVG, PNG, JPG or GIF (max. 3MB)
                        </Typography>
                    )}

                    <input type="file" hidden multiple onChange={handleFileChange} ref={inputRef} />
                </Stack>
            </Box>
            <Stack spacing={3} sx={{ px: 2 }}>
                {files.map(file => (
                    <Stack
                        key={file.name + file.status}
                        sx={{
                            gap: 2,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                        }}
                    >
                        <Stack
                            sx={{
                                gap: 2,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                width: '50%',
                            }}
                        >
                            {file.status === 'error' ? (
                                <UploadFileIcon color="error" />
                            ) : (
                                <UploadFileIcon color="primary" />
                            )}

                            <Box
                                sx={{
                                    width: '100%',
                                }}
                            >
                                {file.status === 'error' ? (
                                    <>
                                        <Typography variant="body1" color="error">
                                            Upload failed.
                                        </Typography>
                                        <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                                            {file.errorMessage || 'Error'} • Failed
                                        </Typography>
                                        <LinearProgress
                                            color="error"
                                            variant="determinate"
                                            value={100}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="body1">{file.name}</Typography>
                                        <Typography
                                            variant="caption"
                                            color="textSecondary"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                mt: 0.5,
                                            }}
                                        >
                                            {formatSize(file.size)} •{' '}
                                            {file.status === 'uploading'
                                                ? 'Loading'
                                                : file.status === 'complete'
                                                  ? 'Complete'
                                                  : 'Pending'}
                                        </Typography>
                                        {(file.status === 'uploading' ||
                                            file.status === 'complete') && (
                                            <LinearProgress
                                                variant="determinate"
                                                value={file.progress ?? 100}
                                            />
                                        )}
                                    </>
                                )}
                            </Box>
                        </Stack>

                        {file.status === 'complete' ? (
                            <Stack
                                sx={{
                                    gap: 2,
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                }}
                            >
                                <IconButton
                                    color="secondary"
                                    onClick={() => onDelete?.(file.name)}
                                    size="small"
                                    sx={{ mt: 0.5 }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                                <CheckCircleIcon color="success" />
                            </Stack>
                        ) : (
                            <IconButton
                                onClick={() => onDelete?.(file.name)}
                                size="small"
                                sx={{ mt: 0.5 }}
                                color="secondary"
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Stack>
                ))}
            </Stack>
        </Stack>
    )
}

export default FileUpload
