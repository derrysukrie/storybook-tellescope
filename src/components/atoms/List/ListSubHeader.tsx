import React from "react";
import {
  ListSubheader as MuiListSubheader,
  type ListSubheaderProps,
  type SxProps,
  type Theme,
} from "@mui/material";

interface CustomListSubheaderProps extends ListSubheaderProps {
  sx?: SxProps<Theme>;
}

const ListSubheader: React.FC<CustomListSubheaderProps> = ({
  sx,
  ...props
}) => {
  return <MuiListSubheader sx={{ ...sx }} {...props} />;
};

export default ListSubheader;
