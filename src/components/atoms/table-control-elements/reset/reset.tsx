import { Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";

interface ResetProps {
  onClick?: () => void;
}

const Reset: FC<ResetProps> = ({ onClick }) => {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
        width: "fit-content",
        borderRadius: "4px",
        padding: "2px 8px",
        cursor: "pointer",
        "&:hover": {
          background: "#EEEDF4",
          ".MuiTypography-root": {
            color: "#0000008F",
          },
        },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          background: "#C85A15",
          width: "8px",
          height: "8px",
          borderRadius: "100%",
        }}
      ></Box>
      <Typography variant="body2" sx={{ color: "#00000040" }}>
        Reset
      </Typography>
    </Stack>
  );
};

export default Reset;
