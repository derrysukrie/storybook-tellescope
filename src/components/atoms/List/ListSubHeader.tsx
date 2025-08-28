import {
    type ListSubheaderProps,
    ListSubheader as MuiListSubheader,
    type SxProps,
    type Theme,
} from '@mui/material'
import type React from 'react'

interface CustomListSubheaderProps extends ListSubheaderProps {
    sx?: SxProps<Theme>
}

const ListSubheader: React.FC<CustomListSubheaderProps> = ({ sx, ...props }) => {
    return <MuiListSubheader sx={{ ...sx }} {...props} />
}

export default ListSubheader
