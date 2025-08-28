import {
    CheckCircle as CheckCircleIcon,
    Delete as DeleteIcon,
    Error as ErrorIcon,
    UploadFile,
} from '@mui/icons-material'
import { Box, IconButton, LinearProgress, Link, Paper, Stack, Typography } from '@mui/material'
import type React from 'react'
import { useCallback, useRef, useState } from 'react'
import { useFormContext } from '../FormContext'

interface FileItem {
    id: string
    name: string
    size: number
    type: string
    status: 'uploading' | 'completed' | 'error'
    progress?: number
    errorMessage?: string
}

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
}

export const FileUploader = () => {
    const { updateFormData, currentStep } = useFormContext()
    const [files, setFiles] = useState<FileItem[]>([])
    const [isDragOver, setIsDragOver] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = useCallback(
        (selectedFiles: FileList) => {
            const newFiles: FileItem[] = Array.from(selectedFiles).map((file, index) => ({
                id: `${Date.now()}-${index}`,
                name: file.name,
                size: file.size,
                type: file.type,
                status: 'uploading' as const,
                progress: 0,
            }))

            setFiles(prev => [...prev, ...newFiles])
            setUploadError(null)

            // Simulate upload progress
            newFiles.forEach(file => {
                const interval = setInterval(() => {
                    setFiles(prev =>
                        prev.map(f => {
                            if (f.id === file.id && (f.progress ?? 0) < 100) {
                                const newProgress = Math.min(
                                    (f.progress ?? 0) + Math.random() * 30,
                                    100
                                )
                                const newStatus = newProgress >= 100 ? 'completed' : 'uploading'

                                // If upload is completed, push to form context
                                if (newStatus === 'completed') {
                                    const completedFiles = prev
                                        .map(f =>
                                            f.id === file.id
                                                ? { ...f, progress: newProgress, status: newStatus }
                                                : f
                                        )
                                        .filter(f => f.status === 'completed')

                                    // Push only completed files to form context
                                    updateFormData(currentStep, completedFiles)
                                }

                                return {
                                    ...f,
                                    progress: newProgress,
                                    status: newStatus,
                                }
                            }
                            return f
                        })
                    )
                }, 200)

                setTimeout(() => clearInterval(interval), 3000)
            })
        },
        [updateFormData, currentStep]
    )

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            handleFileSelect(event.target.files)
        }
    }

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = (event: React.DragEvent) => {
        event.preventDefault()
        setIsDragOver(false)
    }

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault()
        setIsDragOver(false)

        if (event.dataTransfer.files) {
            handleFileSelect(event.dataTransfer.files)
        }
    }

    const handleDeleteFile = (fileId: string) => {
        setFiles(prev => {
            const updatedFiles = prev.filter(file => file.id !== fileId)

            // Update form context with only completed files
            const completedFiles = updatedFiles.filter(f => f.status === 'completed')
            updateFormData(currentStep, completedFiles)

            return updatedFiles
        })
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Typography
                variant="h5"
                color="text.primary"
                pt={'48px'}
                sx={{
                    mb: 1,
                }}
            >
                File Uploader
            </Typography>

            {/* Upload Area */}
            <Paper
                elevation={0}
                sx={{
                    border: isDragOver ? '2px dashed #4A5C92' : '2px dashed #DADCE0',
                    borderRadius: 2,
                    py: 3,
                    textAlign: 'center',
                    backgroundColor: isDragOver ? 'rgba(74, 92, 146, 0.04)' : 'transparent',
                    transition: 'all 0.2s ease-in-out',
                    cursor: 'pointer',
                    '&:hover': {
                        borderColor: '#4A5C92',
                        backgroundColor: 'rgba(74, 92, 146, 0.04)',
                    },
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileInput}
            >
                <Stack spacing={1.5} alignItems="center">
                    <UploadFile
                        sx={{
                            fontSize: 32,
                            color: 'primary.main',
                            mb: 1,
                        }}
                    />
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h6" sx={{ fontWeight: 500, color: 'text.primary' }}>
                            <Link href="#">Link</Link>
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 500, color: 'text.primary' }}>
                            or drag and drop
                        </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 300 }}>
                        SVG, PNG, JPG or GIF (max. 3MB)
                    </Typography>

                    {uploadError && (
                        <Typography variant="body2" sx={{ color: 'error.main', mt: 1 }}>
                            {uploadError}
                        </Typography>
                    )}
                </Stack>

                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                    accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                />
            </Paper>

            {/* File List */}
            {files.length > 0 && (
                <Box sx={{ mt: 3 }}>
                    <Stack spacing={2}>
                        {files.map(file => (
                            <Box key={file.id}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    {/* File Icon */}
                                    <Box
                                        sx={{
                                            color:
                                                file.status === 'error'
                                                    ? 'error.main'
                                                    : file.status === 'completed'
                                                      ? 'success.main'
                                                      : 'primary.main',
                                        }}
                                    >
                                        <UploadFile />
                                    </Box>

                                    {/* File Info */}
                                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 500,
                                                color:
                                                    file.status === 'error'
                                                        ? 'error.main'
                                                        : 'text.primary',
                                                mb: 0.5,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {file.name}
                                            {/* {file.name.length > 25 
                        ? `${file.name.substring(0, 20)}...${file.name.split('.').pop()}`
                        : file.name
                      } */}
                                        </Typography>

                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Typography variant="caption" color={'text.primary'}>
                                                {formatFileSize(file.size)}
                                            </Typography>
                                            <Box>•</Box>
                                            <Typography variant="caption" color={'text.primary'}>
                                                {file.status === 'uploading'
                                                    ? `Loading`
                                                    : 'Completed'}
                                            </Typography>
                                        </Stack>

                                        {/* Progress Bar */}
                                        {file.status === 'uploading' && (
                                            <Box sx={{ mt: 1 }}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={file.progress || 0}
                                                    sx={{
                                                        height: 4,
                                                        borderRadius: 2,
                                                        backgroundColor: '#F4F3FA',
                                                        '& .MuiLinearProgress-bar': {
                                                            backgroundColor: '#4A5C92',
                                                            borderRadius: 2,
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        )}
                                    </Box>

                                    {/* Status Icon */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {file.status === 'completed' && (
                                            <CheckCircleIcon
                                                sx={{ color: 'success.main', fontSize: 20 }}
                                            />
                                        )}
                                        {file.status === 'error' && (
                                            <ErrorIcon sx={{ color: 'error.main', fontSize: 20 }} />
                                        )}

                                        <IconButton
                                            size="small"
                                            onClick={() => handleDeleteFile(file.id)}
                                            sx={{
                                                color: 'text.secondary',
                                                '&:hover': {
                                                    color: 'error.main',
                                                    backgroundColor: 'rgba(244, 67, 54, 0.08)',
                                                },
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            )}
        </Box>
    )
}
