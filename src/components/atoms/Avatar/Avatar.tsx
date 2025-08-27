import {
  Badge,
  Avatar as MuiAvatar,
  styled,
  type AvatarProps,
} from "@mui/material";
import * as React from "react";
import {
  AvatarColorBorderValue,
  AvatarSizeDimensions,
  AvatarSizeValues,
  type AvatarColor,
  type AvatarSize,
} from "../../../shared";

interface CustomAvatarProps
  extends Omit<AvatarProps, "color" | "badge" | "size"> {
  color?: AvatarColor;
  size?: AvatarSize;
  badge?: boolean;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.success.dark,
    color: theme.palette.success.dark,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const CustomAvatar: React.FC<CustomAvatarProps> = ({
  sx,
  color,
  size,
  ...props
}) => {
  return (
    <MuiAvatar
      {...props}
      sx={{
        ...sx,
        height:
          AvatarSizeDimensions[size as string] ||
          AvatarSizeDimensions[AvatarSizeValues.medium],
        width:
          AvatarSizeDimensions[size as string] ||
          AvatarSizeDimensions[AvatarSizeValues.medium],
        fontSize: size == AvatarSizeValues.extraSmall ? 12 : undefined,
        border: AvatarColorBorderValue[color as string] || undefined,
      }}
    />
  );
};

const Avatar: React.FC<CustomAvatarProps> = ({
  sx,
  color,
  size,
  badge,
  ...props
}) => {
  return badge ? (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      <CustomAvatar
        sx={sx}
        color={color}
        size={size}
        badge={badge || false}
        {...props}
      />
    </StyledBadge>
  ) : (
    <CustomAvatar sx={sx} color={color} size={size} badge={badge || false} {...props} />
  );
};

export default Avatar;
