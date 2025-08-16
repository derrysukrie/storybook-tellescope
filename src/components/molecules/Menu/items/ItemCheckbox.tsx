import React from "react";
import {
  MenuItem as MuiMenuItem,
  ListItemText,
  Checkbox,
  type MenuItemProps,
} from "@mui/material";
import { useDensity } from "../Menu";

type Props = Omit<MenuItemProps, "checked"> & {
  checked?: boolean;
  searchableText?: string;
  dense?: boolean;
};

export const ItemCheckbox: React.FC<Props> = ({
  checked,
  children,

  ...props
}) => {
  const { dense } = useDensity();
  
  return (
    <MuiMenuItem
      selected={checked}
      sx={{
        // p: dense ? "4px 8px" : "8px",
        borderRadius: "6px",
        mx: 1,
        minHeight: dense ? "32px" : "auto",
        "&.Mui-selected": {
          backgroundColor: "#DDE1F9",
          "&:hover": {
            backgroundColor: "#DDE1F9",
          },
        },
      }}
      {...props}
    >
      <Checkbox 
        edge="start" 
        checked={checked} 
        tabIndex={-1} 
        disableRipple 
        size={dense ? "small" : "medium"}
        sx={{ 
          padding: dense ? "4px" : "7px",
          marginRight: dense ? "8px" : "12px"
        }}
      />
      <ListItemText sx={{ "& .MuiListItemText-primary": { fontSize: dense ? "14px" : "inherit" } }}>
        {children}
      </ListItemText>
    </MuiMenuItem>
  );
}; 