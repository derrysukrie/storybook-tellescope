import { Star } from '@mui/icons-material'
import {
    Box,
    type ListItemButtonProps,
    ListItemIcon,
    ListItem as MuiListItem,
    ListItemButton as MuiListItemButton,
    ListItemText as MuiListItemText,
} from '@mui/material'
import type React from 'react'

interface CustomListItemProps
    extends Omit<
        ListItemButtonProps,
        | 'iconLeft'
        | 'iconRight'
        | 'primary'
        | 'secondaryText'
        | 'disableGutters'
        | 'dense'
        | 'selected'
    > {
    iconLeft?: boolean
    iconRight?: '1' | '2' | '3'
    primary?: string
    secondaryText?: boolean
    disableGutters?: boolean
    dense?: boolean
    selected?: boolean
}

const CustomListItem: React.FC<CustomListItemProps> = ({
    iconLeft = false,
    iconRight = undefined,
    primary,
    secondaryText = '',
    disableGutters = false,
    dense = false,
    selected = false,
    sx,
    ...props
}) => {
    const rightStarCount =
        iconRight === '1' || iconRight === '2' || iconRight === '3' ? Number(iconRight) : 0
    return (
        <MuiListItem
            disablePadding
            dense={dense}
            disableGutters={disableGutters}
            sx={{
                ...sx,
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 'fit-content',
                px: 2,
            }}
        >
            <MuiListItemButton
                {...props}
                sx={{
                    ...sx,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 'fit-content',
                    px: disableGutters ? 0 : 2,
                    borderRadius: '4px',
                }}
                selected={selected}
                dense={dense}
                disableGutters={disableGutters}
            >
                {/* Icon Left Icon */}
                {iconLeft && (
                    <ListItemIcon
                        sx={{
                            minWidth: '30px',
                        }}
                    >
                        <Star fontSize="small" />
                    </ListItemIcon>
                )}
                {/* Icon Left Icon */}

                {/* List Item Text */}
                <MuiListItemText
                    primary={primary || (primary === '' ? primary : 'List Item')}
                    secondary={secondaryText ? 'Secondary' : null}
                />

                {rightStarCount > 0 && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px',
                            marginLeft: '8px',
                        }}
                    >
                        {Array.from({ length: rightStarCount }).map((_, i) => (
                            <Star key={i.toString()} fontSize="small" sx={{ color: '#0000008a' }} />
                        ))}
                    </Box>
                )}
            </MuiListItemButton>
        </MuiListItem>
    )
}

const ListItem: React.FC<CustomListItemProps> = props => {
    return <CustomListItem {...props} />
}

// const ListItem: React.FC<CustomListItemProps> = ({
//   iconLeft = false,
//   iconRight = "1",
//   secondaryText = "",
//   disableGutters = false,
//   dense = false,
//   selected = false,
//   sx,
//   ...props
// }) => {
//   return (
//     <CustomListItem
//       iconLeft={iconLeft}
//       iconRight={iconRight}
//       secondaryText={secondaryText}
//       disableGutters={disableGutters}
//       dense={dense}
//       selected={selected}
//       sx={sx}
//       {...props}
//     />
//   );
// };

export default ListItem
