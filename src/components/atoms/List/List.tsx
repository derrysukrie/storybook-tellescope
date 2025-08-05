import { List as MuiList, type ListProps } from "@mui/material";
import React from "react";

interface CustomListProps extends Omit<ListProps, "density"> {
  density?: "dense" | "normal";
}

const List: React.FC<CustomListProps> = ({
  sx,
  density = "normal",
  ...props
}) => {
  return (
    <MuiList
      dense={density == "dense" ? true : false}
      sx={{ ...sx }}
      {...props}
    />
  );
};

export default List;
