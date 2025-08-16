import React from "react";
import {
  MenuItem as MuiMenuItem,
  ListItemIcon,
  ListItemText,
  type MenuItemProps,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useDensity } from "../Menu";

type Props = MenuItemProps & {
  icon?: React.ReactNode;
  searchableText?: string;
  dense?: boolean;
};

export const Item: React.FC<Props> = ({
  icon,
  children,
  selected,

  ...props
}) => {
  const { dense } = useDensity();

  return (
    <MuiMenuItem
      selected={selected}
      sx={{
        p: dense ? "4px 8px" : "8px",
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
      {icon && (
        <ListItemIcon sx={{ minWidth: dense ? "24px" : "auto" }}>
          {icon}
        </ListItemIcon>
      )}
      <ListItemText
        sx={{
          "& .MuiListItemText-primary": {
            fontSize: dense ? "14px" : "inherit",
          },
        }}
      >
        {children}
      </ListItemText>
      {selected && <CheckIcon sx={{ marginLeft: 4 }} fontSize="small" />}
    </MuiMenuItem>
  );
};
