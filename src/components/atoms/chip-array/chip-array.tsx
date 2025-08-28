import CheckIcon from '@mui/icons-material/Check'
import { Chip, FormControl, FormLabel, List } from '@mui/material'
import { type ComponentProps, type FC, type ReactNode, useState } from 'react'
import { useWheel } from '../../../custom'

interface ChipData {
    key: string
    label: string
}

interface ChipArrayProps {
    data: ChipData[]
    label?: ReactNode
    withDelete?: boolean
    selectable?: boolean
    chipProps?: ComponentProps<typeof Chip>
    ListProps?: ComponentProps<typeof List>
}

const ChipArray: FC<ChipArrayProps> = ({
    data,
    label,
    withDelete = true,
    selectable = false,
    chipProps,
    ListProps,
}) => {
    const scrollElementRef = useWheel<HTMLUListElement>()
    const { sx: sxList, ...restListProps } = ListProps ?? {}
    const { sx: sxChip, ...restChipProps } = chipProps ?? {}
    const [chipData, setChipData] = useState<readonly ChipData[]>(data)
    const [selected, setSelected] = useState<Set<string>>(new Set())

    const handleDelete = (chipToDelete: ChipData) => () => {
        setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key))
    }

    const handleSelect = (key: string) => () => {
        setSelected(prev => {
            const next = new Set(prev)
            if (next.has(key)) {
                next.delete(key)
            } else {
                next.add(key)
            }
            return next
        })
    }

    return (
        <FormControl>
            {label && <FormLabel sx={{ color: 'black' }}>{label}</FormLabel>}
            <List
                ref={scrollElementRef}
                sx={{
                    gap: 1,
                    display: 'flex',
                    overflow: 'hidden',
                    maxWidth: '300px',
                    ...sxList,
                }}
                {...restListProps}
            >
                {chipData.map(item => {
                    const isSelected = selected.has(item.key)
                    return (
                        <Chip
                            key={item.key}
                            label={item.label}
                            variant={selectable ? (isSelected ? 'filled' : 'outlined') : 'filled'}
                            icon={isSelected ? <CheckIcon sx={{ fontSize: 16 }} /> : undefined}
                            onClick={selectable ? handleSelect(item.key) : undefined}
                            onDelete={!withDelete ? undefined : handleDelete(item)}
                            sx={{
                                borderRadius: selectable ? 2.5 : undefined,
                                '& .MuiSvgIcon-root.MuiChip-icon': {
                                    color: selectable && isSelected ? '#0000008F' : undefined,
                                },
                                backgroundColor: selectable && isSelected ? '#d3dee8' : undefined,
                                '&.MuiChip-root.MuiChip-filled.MuiChip-clickable.MuiChip-clickableColorDefault.MuiChip-filledDefault':
                                    {
                                        border: '1px solid #CAC4D0',
                                    },
                                '&.MuiChip-clickable:hover': {
                                    backgroundColor: selectable ? '#d3deeb' : undefined,
                                },
                                borderColor: selectable
                                    ? !isSelected
                                        ? '#CAC4D0'
                                        : ' #4A5C9280'
                                    : undefined,
                                ...sxChip,
                                // Disable the ripple via pointer-events style workaround
                                '& .MuiTouchRipple-root': {
                                    display: 'none',
                                },
                            }}
                            {...restChipProps}
                        />
                    )
                })}
            </List>
        </FormControl>
    )
}

export default ChipArray
