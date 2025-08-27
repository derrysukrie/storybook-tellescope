import { Box } from "@mui/material";
import type React from "react";
import { AttachedFile } from "../../atoms/AttachedFile/AttachedFile";

export const FileArray: React.FC = () => {
  const attachedFile = Array.from({ length: 5 });

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "16px",
        width: "100%",
        overflowX: "auto",
        paddingBottom: "8px",
      }}
    >
      {attachedFile?.map((_, index) => (
        <AttachedFile key={index} />
      ))}
    </Box>
  );
};
