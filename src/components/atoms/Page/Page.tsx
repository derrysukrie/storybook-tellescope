import { ChatBubbleOutline } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export interface PageProps {
  truncated: boolean;
}

export const Page: React.FC<PageProps> = ({ truncated = false }) => {
  return (
    <Box
      component="div"
      sx={{
        bgcolor: "rgba(245, 245, 245, 1)",
        border: "solid 1px rgba(0, 0, 0, 0.12)",
        borderRadius: "16px",
        padding: "8px 16px 8px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "10px",
        width: "fit-content"
      }}
    >
      <ChatBubbleOutline sx={{ color: "rgba(0, 0, 0, 0.56)" }} />

      <Box component="div">
        <Typography
          sx={{ fontSize: "0.875rem", color: "rgba(26, 27, 33, 0.87)" }}
        >
          Chat
        </Typography>
        <Typography sx={{ fontSize: "0.875rem", color: "rgba(0, 0, 0, 0.38)" }}>
          {"Patient name"?.slice(0, truncated ? 6 : undefined)}
          {truncated ? "..." : ""}
        </Typography>
      </Box>
    </Box>
  );
};
