import { type ListProps, List as MuiList } from '@mui/material'
import type React from 'react'

interface CustomListProps extends Omit<ListProps, 'density'> {
    density?: 'dense' | 'normal'
}

const List: React.FC<CustomListProps> = ({ sx, density = 'normal', ...props }) => {
    return <MuiList dense={density === 'dense'} sx={{ ...sx }} {...props} />
}

export default List
