import { Box, IconButton } from "@mui/material";
import {
  CallOutlined,
  VideocamOutlined,
  CloseOutlined,
} from "@mui/icons-material";

export const HeaderActions = () => {
  return (
    <Box display="flex" gap={2} alignItems="center">
      <IconButton>
        <CallOutlined />
      </IconButton>
      <IconButton>
        <VideocamOutlined />
      </IconButton>
      <IconButton>
        <CloseOutlined />
      </IconButton>
    </Box>
  );
};