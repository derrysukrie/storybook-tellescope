import * as React from "react";
import {
  AvatarGroup as MuiAvatarGroup,
  type AvatarGroupProps,
} from "@mui/material";
import {
  AvatarSizeDimensions,
  AvatarSizeValues,
  type AvatarSize,
} from "../../../shared";

interface CustomAvatarGroupProps
  extends Omit<AvatarGroupProps, "size" | "badge"> {
  size?: AvatarSize;
  badge?: boolean; // Not in use - Added to overide the types error
}

const AvatarGroup: React.FC<CustomAvatarGroupProps> = ({
  sx,
  size,
  ...props
}) => {
  return (
    <MuiAvatarGroup
      sx={{
        ...sx,
        ".MuiAvatar-root": {
          height:
            AvatarSizeDimensions[size as string] ||
            AvatarSizeDimensions[AvatarSizeValues.medium],
          width:
            AvatarSizeDimensions[size as string] ||
            AvatarSizeDimensions[AvatarSizeValues.medium],
          fontSize: size == AvatarSizeValues.extraSmall ? 12 : undefined,
        },
      }}
      {...props}
    />
  );
};

export default AvatarGroup;
