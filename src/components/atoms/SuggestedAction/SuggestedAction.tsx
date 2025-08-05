import { ChatBubbleOutline } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export interface SuggestedActionProps {
  truncated: boolean;
}

export const SuggestedAction: React.FC<SuggestedActionProps> = ({
  truncated = false,
}) => {
  return (
    <Box
      component="div"
      sx={{
        bgcolor: "rgba(200, 90, 21, 0.02)",
        border: "solid 1px rgba(200, 90, 21, 1)",
        borderRadius: "16px",
        padding: "8px 16px 8px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "10px",
        width: "fit-content",
      }}
    >
      <ChatBubbleOutline sx={{ color: "rgba(200, 90, 21, 1)" }} />

      <Box component="div">
        <Typography
          sx={{ fontSize: "0.875rem", color: "rgba(26, 27, 33, 0.87)" }}
        >
          Chat
        </Typography>
        <Typography sx={{ fontSize: "0.875rem", color: "rgba(0, 0, 0, 0.38)" }}>
          {"Generate Reply"?.slice(0, truncated ? 6 : undefined)}
          {truncated ? "..." : ""}
        </Typography>
      </Box>
    </Box>
  );
};
