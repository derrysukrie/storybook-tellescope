import * as React from "react";
import { Chip as MuiChip, type ChipProps } from "@mui/material";

interface CustomChipProps extends Omit<ChipProps, "appearance" | "selected"> {
  selected?: boolean;
  appearance?: "filled" | "outlined" | "square";
}

const getHoverStyles = (appearance: any, color: any) => {
  switch (appearance) {
    case "filled": {
      switch (color) {
        case "primary":
          return {
            backgroundColor: "var(--primary-dark)",
            color: "var(--primary-contrastText)",
          };
        case "secondary":
          return {
            backgroundColor: "var(--secondary-dark)",
            color: "var(--secondary-contrastText)",
          };
        case "tertiary":
          return {
            backgroundColor: "var(--tertiary-dark)",
            color: "var(--tertiary-contrastText)",
          };
        default:
          return {
            backgroundColor: "rgba(0, 0, 0, 0.12)",
          };
      }
    }
    case "outlined": {
      switch (color) {
        case "primary":
          return {
            backgroundColor: "rgba(74, 92, 146, 0.04)",
            color: "var(--primary-dark)",
            borderColor: "var(--primary-dark)",
          };
        case "secondary":
          return {
            backgroundColor: "rgba(88, 94, 114, 0.04)",
            color: "var(--secondary-dark)",
            borderColor: "var(--secondary-dark)",
          };
        case "tertiary":
          return {
            backgroundColor: "rgba(116, 84, 113, 0.04)",
            color: "var(--tertiary-dark)",
            borderColor: "var(--tertiary-dark)",
          };
        case "default":
          return {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            color: "rgba(0, 0, 0, 0.87)",
            borderColor: "rgba(189, 189, 189, 1)",
          };
      }
    }
    case "square": {
      switch (color) {
        case "primary":
          return {
            backgroundColor: "rgba(74, 92, 146, 0.04)",
            color: "var(--primary-dark)",
            borderColor: "var(--primary-dark)",
          };
        case "secondary":
          return {
            backgroundColor: "rgba(88, 94, 114, 0.04)",
            color: "var(--secondary-dark)",
            borderColor: "var(--secondary-dark)",
          };
        case "tertiary":
          return {
            backgroundColor: "rgba(116, 84, 113, 0.04)",
            color: "var(--tertiary-dark)",
            borderColor: "var(--tertiary-dark)",
          };
        case "default":
          return {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            color: "rgba(0, 0, 0, 0.87)",
            borderColor: "rgba(189, 189, 189, 1)",
          };
      }
    }
  }
};

const getSelectedStyles = (color: any, selected: boolean) => {
  if (selected) {
    return {
      backgroundColor: "rgba(222, 234, 248, 1)",
      color: "rgba(73, 69, 79, 1)",
      borderColor: "rgba(202, 196, 208, 1)",
    };
    // switch (color) {
    //   case "primary":
    //     return {
    //       backgroundColor: "rgba(74, 92, 146, 0.3)",
    //       color: "var(--primary-main)",
    //       borderColor: "var(--primary-main)",
    //     };
    //   case "secondary":
    //     return {
    //       backgroundColor: "rgba(88, 94, 114, 0.3)",
    //       color: "var(--secondary-main)",
    //       borderColor: "var(--secondary-main)",
    //     };
    //   case "tertiary":
    //     return {
    //       backgroundColor: "rgba(116, 84, 113, 0.3)",
    //       color: "var(--tertiary-main)",
    //       borderColor: "var(--tertiary-dark)",
    //     };
    //   case "default":
    //     return {
    //       backgroundColor: "rgba(0, 0, 0, 0.12)",
    //       color: "rgba(0, 0, 0, 0.87)",
    //       borderColor: "rgba(189, 189, 189, 1)",
    //     };
    // }
  } else {
    return {};
  }
};

const Chip: React.FC<CustomChipProps> = ({
  size = "medium",
  appearance = "filled",
  color,
  sx,
  selected = false,
  ...props
}) => {
  const hoverStyle = getHoverStyles(appearance, color);
  const selectedStyle = getSelectedStyles(color, selected);

  return (
    <MuiChip
      {...props}
      color={color}
      size={size}
      variant={appearance == "square" ? "outlined" : appearance}
      sx={{
        borderRadius: appearance == "square" ? "8px" : undefined,
        transition: "all 0.2s",
        "&:hover": {
          ...hoverStyle,
          cursor: "pointer",
        },
        ...selectedStyle,
        ...sx,
      }}
    />
  );
};

export default Chip;
