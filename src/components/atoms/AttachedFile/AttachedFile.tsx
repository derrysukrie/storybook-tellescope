import { Cancel } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import type React from "react";

export const AttachedFile: React.FC<any> = () => {
  return (
    <Box
      component="div"
      sx={{
        bgcolor: "#F5F5F5",
        border: "solid 1px rgba(0, 0, 0, 0.12)",
        borderRadius: "16px",
        maxWidth: "56px",
        height: "56px",
        position: "relative",
        padding: "8px",
      }}
    >
      <Typography
        sx={{ fontSize: "0.875rem", color: "rgba(26, 27, 33, 0.87)" }}
      >
        file...
      </Typography>
      <Typography sx={{ fontSize: "0.875rem", color: "rgba(0, 0, 0, 0.38)" }}>
        jpeg
      </Typography>

      <IconButton
        size="small"
        sx={{ position: "absolute", top: "-7px", right: "-7.5px" }}
      >
        <Cancel sx={{ fontSize: "16px", color: "rgba(0, 0, 0, 0.56)" }} />
      </IconButton>
    </Box>
  );
};
