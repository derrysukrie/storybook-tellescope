import { Box, Stack, Typography } from "@mui/material";
import { ErrorOutline, RefreshOutlined } from "@mui/icons-material";

type MessageFailedProps = {
  failedTime: Date | null;
  onMessageRetry: () => void;
};
export const MessageFailed = ({
  failedTime,
  onMessageRetry,
}: MessageFailedProps) => {
  if (!failedTime) {
    return null;
  }

  return (
    <Stack display="flex" flexDirection="row" alignItems="center" gap={0.5}>
      <Box
        onClick={onMessageRetry}
        sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        <RefreshOutlined color="action" fontSize="small" />
      </Box>
      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={0.5}
        height={"28px"}
        pr={1.4}
        pl={0.4}
        borderRadius={10}
        bgcolor={"error.main"}
      >
        <ErrorOutline sx={{ color: "white" }} />
        <Typography fontWeight={500} variant="caption" color={"white"}>
          Message not sent{" "}
          {`${failedTime.getHours() % 12 || 12}:00 ${
            failedTime.getHours() < 12 ? "AM" : "PM"
          }`}
        </Typography>
      </Stack>
    </Stack>
  );
};
