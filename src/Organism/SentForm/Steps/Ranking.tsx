import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { DragIndicator } from "@mui/icons-material";
import { useFormContext } from "../FormContext";
import { useState, useCallback, useMemo } from "react";

interface RankingItem {
  id: string;
  text: string;
}

interface RankingProps {
  title?: string;
  items?: RankingItem[];
}

export const Ranking = ({ title = "Ranking", items = [] }: RankingProps) => {
  const { updateFormData, currentStep } = useFormContext();
  const [rankingItems, setRankingItems] = useState<RankingItem[]>(items);
  const [draggedItem, setDraggedItem] = useState<RankingItem | null>(null);

  // Memoize the form key to prevent unnecessary re-renders
  const rankingKey = useMemo(() => `${currentStep}_ranking`, [currentStep]);

  // Memoize the initial order to prevent unnecessary updates
  const initialOrder = useMemo(() => items.map((item) => item.id), [items]);

  // Initialize form data only once when component mounts
  useState(() => {
    updateFormData(rankingKey, initialOrder);
  });

  // Optimized drag handlers with useCallback
  const handleDragStart = useCallback((e: React.DragEvent, item: RankingItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetItem: RankingItem) => {
      e.preventDefault();

      if (!draggedItem || draggedItem.id === targetItem.id) return;

      setRankingItems((prevItems) => {
        const draggedIndex = prevItems.findIndex((item) => item.id === draggedItem.id);
        const targetIndex = prevItems.findIndex((item) => item.id === targetItem.id);

        const newItems = [...prevItems];
        const [removed] = newItems.splice(draggedIndex, 1);
        newItems.splice(targetIndex, 0, removed);

        // Update form data with new order
        const newOrder = newItems.map((item) => item.id);
        updateFormData(rankingKey, newOrder);

        return newItems;
      });

      setDraggedItem(null);
    },
    [draggedItem, updateFormData, rankingKey]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
  }, []);

  // Memoize the list items to prevent unnecessary re-renders
  const listItems = useMemo(
    () =>
      rankingItems.map((item) => (
        <ListItem
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, item)}
          onDragEnd={handleDragEnd}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
            px: 2,
            mb: 1,
            cursor: "grab",
            "&:active": {
              cursor: "grabbing",
            },
          }}
        >
          <ListItemText
            primary={item.text}
            sx={{
              flexGrow: 1,
              "& .MuiListItemText-primary": {
                fontWeight: "normal",
              },
            }}
          />
          <DragIndicator
            sx={{
              color: "#666",
              fontSize: "20px",
              cursor: "grab",
            }}
          />
        </ListItem>
      )),
    [rankingItems, handleDragStart, handleDragOver, handleDrop, handleDragEnd]
  );

  return (
    <Box>
      <Typography pt={"48px"} variant="h5">
        {title}
      </Typography>

      <List sx={{ width: "100%" }}>{listItems}</List>
    </Box>
  );
};
