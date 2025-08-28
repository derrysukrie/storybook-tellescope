import { ConfirmationNumberOutlined, DragIndicator, ModeEdit } from '@mui/icons-material'
import { Box, Divider, List, ListItem, Stack, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import { CloudDownload } from '../../../assets'
import { Button } from '../../atoms/button/button'
import { IconButton } from '../../atoms/button/icon-button'

type ListItemType = {
    id: number
    title: string
    description: string
}

interface OrderedListProps {
    list: ListItemType[]
    setList: (list: ListItemType[] | ((prev: ListItemType[]) => ListItemType[])) => void
    title: string
}

export const OrderedList = ({ list, setList }: OrderedListProps) => {
    const [draggedItem, setDraggedItem] = useState<ListItemType | null>(null)

    const onDragStart = useCallback(
        (e: React.DragEvent<HTMLLIElement>, item: ListItemType) => {
            e.dataTransfer.effectAllowed = 'move'
            setDraggedItem(item)
        },
        [setDraggedItem]
    )

    const handleDrop = useCallback(
        (e: React.DragEvent, targetItem: ListItemType) => {
            e.preventDefault()

            if (!draggedItem || draggedItem.id === targetItem.id) return

            setList((prevItems: ListItemType[]) => {
                const draggedIndex = prevItems.findIndex(item => item.id === draggedItem.id)
                const targetIndex = prevItems.findIndex(item => item.id === targetItem.id)

                const newItems = [...prevItems]
                const [removed] = newItems.splice(draggedIndex, 1)
                newItems.splice(targetIndex, 0, removed)

                return newItems
            })

            setDraggedItem(null)
        },
        [draggedItem]
    )

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }, [])

    return (
        <Box>
            <Stack px={2} direction="row" alignItems="center" gap={1}>
                <img src={CloudDownload} width={16} height={16} alt="Cloud Download" />
                <Typography variant="body2" fontWeight={600}>
                    Queue Title
                </Typography>
            </Stack>
            <Divider sx={{ my: 1 }} />
            <List>
                {list.map(item => (
                    <ListItem
                        sx={{
                            gap: 3,
                            my: 2,
                            backgroundColor:
                                draggedItem?.id === item.id ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                        }}
                        draggable
                        onDragOver={handleDragOver}
                        onDrop={e => handleDrop(e, item)}
                        onDragStart={e => onDragStart(e, item)}
                        key={item.id}
                    >
                        <Stack
                            width="100%"
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Stack direction="row" gap={3} alignItems="center">
                                <DragIndicator style={{ cursor: 'grab' }} />
                                <Stack direction="column" gap={0.5}>
                                    <Typography variant="body2" fontWeight={500}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack gap={3} direction="row" alignItems="center">
                                <Button
                                    sx={{ px: 2, py: 1, borderRadius: 10 }}
                                    appearance="outlined"
                                    size="small"
                                >
                                    GET NEXT TICKET
                                </Button>
                                <IconButton>
                                    <ConfirmationNumberOutlined color="action" />
                                </IconButton>
                                <IconButton>
                                    <ModeEdit color="action" />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}
