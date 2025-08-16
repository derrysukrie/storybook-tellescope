import { Box } from "@mui/material";

export const FormHeader = ({ children }: { children: React.ReactNode }) => {
    return (
      <Box
        sx={{
          padding: "22px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {children}
      </Box>
    );
  };
  