import React from "react";
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  PushPin,
  PushPinOutlined,
  EditOutlined,
  DeleteOutline,
  Add,
} from "@mui/icons-material";
import { Box, Typography, IconButton, Button } from "@mui/material";

export const DisplayFields: React.FC<{
  state: "edit" | "view";
  label: string;
  value: string;
  isPinned: boolean;
  hidden: boolean;
  onTogglePin: () => void;
  onToggleHidden: () => void;
}> = ({
  state = "view",
  label,
  value,
  isPinned,
  hidden,
  onTogglePin,
  onToggleHidden,
}) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <Typography fontSize="small" color="#49454F">
          {hidden ? "Hidden Field" : label}
        </Typography>
        <Typography fontSize="medium" color="#1D1B20">
          {hidden ? "Field" : value}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        {state == "edit" && (
          <IconButton onClick={onToggleHidden} size="small">
            {!hidden ? (
              <VisibilityOutlined
                color="primary"
                sx={{ fontSize: 18, color: "rgba(0, 0, 0)" }}
              />
            ) : (
              <VisibilityOffOutlined
                sx={{ fontSize: 18, color: "rgba(0, 0, 0)" }}
              />
            )}
          </IconButton>
        )}
        {state == "edit" && (
          <IconButton onClick={onTogglePin} size="small">
            {isPinned ? (
              <PushPin
                color="primary"
                sx={{ fontSize: 18, color: "rgba(0, 0, 0)" }}
              />
            ) : (
              <PushPinOutlined sx={{ fontSize: 18, color: "rgba(0, 0, 0)" }} />
            )}
          </IconButton>
        )}
        <IconButton size="small">
          <EditOutlined
            fontSize="small"
            sx={{ fontSize: 18, color: "rgba(0, 0, 0)" }}
          />
        </IconButton>
        <IconButton size="small">
          <DeleteOutline
            fontSize="small"
            sx={{ fontSize: 18, color: "rgba(0, 0, 0)" }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export const AddFieldButton = () => (
  <Button
    variant="contained"
    startIcon={<Add />}
    sx={{
      width: "100%!important",
      borderRadius: "200px",
      textTransform: "none",
      boxShadow: "none!important",
      color: "rgba(70, 68, 89, 1)!important",
      mt: 0,
      backgroundColor: "rgba(222, 229, 248, 1)!important",
      "&:hover": {
        backgroundColor: "#155CAD",
      },
    }}
  >
    Add Field
  </Button>
);
