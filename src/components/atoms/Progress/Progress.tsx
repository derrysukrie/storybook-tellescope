import { type LinearProgressProps, LinearProgress as MuiProgress } from '@mui/material'
import type * as React from 'react'

interface CustomProgressProps extends LinearProgressProps {}

const LinearProgress: React.FC<CustomProgressProps> = ({ sx, ...props }) => {
    return (
        <MuiProgress
            {...props}
            sx={{
                ...sx,
            }}
        />
    )
}

export default LinearProgress
