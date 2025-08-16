import { Box, Stack, Typography } from "@mui/material";

type MessageScheduledProps = {
  scheduledTime: Date | null;
};
export const MessageScheduled = ({ scheduledTime }: MessageScheduledProps) => {
  if (!scheduledTime) {
    return null;
  }
  return (
    <Stack
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      gap={1.4}
      height={"28px"}
      px={1.4}
      borderRadius={10}
      bgcolor={"#1C7AE01A"}
    >
      <Typography fontWeight={500} variant="caption">
        {scheduledTime.toLocaleString()}
      </Typography>

      <Box sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
        <Typography fontWeight={600} color={"#1C7AE0"} variant="caption">
          Cancel
        </Typography>
      </Box>
    </Stack>
  );
};
