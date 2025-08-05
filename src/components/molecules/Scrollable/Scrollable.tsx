import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const activities = [
  {
    icon: (
      <ConfirmationNumberOutlinedIcon
        sx={{ color: "#1F1F1F", fontSize: "24px" }}
      />
    ),
    title: "Ticket assigned",
    timestamp: "3/5/2025 at 1:00 PM",
    name: "John Doe",
  },
  {
    icon: (
      <ConfirmationNumberOutlinedIcon
        sx={{ color: "#1F1F1F", fontSize: "24px" }}
      />
    ),
    title: "Ticket completed",
    timestamp: "3/5/2025 at 2:15 PM",
    name: "Jane Smith",
  },
  {
    icon: (
      <CheckCircleOutlineIcon sx={{ color: "#1F1F1F", fontSize: "24px" }} />
    ),
    title: "Chat resolved",
    timestamp: "3/5/2025 at 3:30 PM",
    name: "Alice Johnson",
  },
  {
    icon: (
      <ConfirmationNumberOutlinedIcon
        sx={{ color: "#1F1F1F", fontSize: "24px" }}
      />
    ),
    title: "Ticket reassigned",
    timestamp: "3/6/2025 at 10:45 AM",
    name: "Robert Brown",
  },
  {
    icon: (
      <CheckCircleOutlineIcon sx={{ color: "#1F1F1F", fontSize: "24px" }} />
    ),
    title: "Chat escalated",
    timestamp: "3/6/2025 at 11:20 AM",
    name: "Emily Davis",
  },
  {
    icon: (
      <ConfirmationNumberOutlinedIcon
        sx={{ color: "#1F1F1F", fontSize: "24px" }}
      />
    ),
    title: "Ticket opened",
    timestamp: "3/6/2025 at 12:05 PM",
    name: "Chris Wilson",
  },
  {
    icon: (
      <CheckCircleOutlineIcon sx={{ color: "#1F1F1F", fontSize: "24px" }} />
    ),
    title: "Feedback received",
    timestamp: "3/6/2025 at 1:00 PM",
    name: "Patricia Miller",
  },
  {
    icon: (
      <ConfirmationNumberOutlinedIcon
        sx={{ color: "#1F1F1F", fontSize: "24px" }}
      />
    ),
    title: "Ticket closed",
    timestamp: "3/6/2025 at 2:30 PM",
    name: "David Martinez",
  },
  {
    icon: (
      <CheckCircleOutlineIcon sx={{ color: "#1F1F1F", fontSize: "24px" }} />
    ),
    title: "Customer replied",
    timestamp: "3/7/2025 at 9:50 AM",
    name: "Jennifer Garcia",
  },
  {
    icon: (
      <ConfirmationNumberOutlinedIcon
        sx={{ color: "#1F1F1F", fontSize: "24px" }}
      />
    ),
    title: "Ticket in progress",
    timestamp: "3/7/2025 at 10:00 AM",
    name: "Daniel Rodriguez",
  },
  {
    icon: (
      <CheckCircleOutlineIcon sx={{ color: "#1F1F1F", fontSize: "24px" }} />
    ),
    title: "Chat started",
    timestamp: "3/7/2025 at 11:00 AM",
    name: "Sarah Lee",
  },
  {
    icon: (
      <ConfirmationNumberOutlinedIcon
        sx={{ color: "#1F1F1F", fontSize: "24px" }}
      />
    ),
    title: "Ticket updated",
    timestamp: "3/7/2025 at 12:30 PM",
    name: "Michael White",
  },
  {
    icon: (
      <CheckCircleOutlineIcon sx={{ color: "#1F1F1F", fontSize: "24px" }} />
    ),
    title: "Chat transferred",
    timestamp: "3/7/2025 at 1:10 PM",
    name: "Laura Harris",
  },
  {
    icon: (
      <ConfirmationNumberOutlinedIcon
        sx={{ color: "#1F1F1F", fontSize: "24px" }}
      />
    ),
    title: "Ticket reopened",
    timestamp: "3/7/2025 at 2:00 PM",
    name: "James Clark",
  },
  {
    icon: (
      <CheckCircleOutlineIcon sx={{ color: "#1F1F1F", fontSize: "24px" }} />
    ),
    title: "Survey submitted",
    timestamp: "3/7/2025 at 3:00 PM",
    name: "Linda Lewis",
  },
];

const ScrollableSection: React.FC<any> = () => (
  <Paper
    sx={{
      width: "450px",
      borderRadius: "16px",
      padding: "24px",
      backgroundColor: "#fff",
      boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.05)",
      border: "solid 1px rgb(226, 232, 240)",
    }}
  >
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      mb={2}
      gap={"10px"}
    >
      <DragIndicatorIcon sx={{ color: "#9CA3AF", fontSize: "24px" }} />
      <Typography fontWeight="bold" fontSize="medium">
        Recent activity
      </Typography>
    </Box>

    <Box
      sx={{
        overflowY: "auto",
        maxHeight: "204px",
        px: 1.1,
      }}
      component="div"
      tabIndex={0}
    >
      {activities.map((activity, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            borderRadius: "6px",
            p: "10px",
            backgroundColor: "rgba(249, 250, 251, 1)",
            mb: 1.2,
            gap: 1.5,
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",

            "&:hover": {
              bgcolor: "#ECEFF2",
            },
          }}
        >
          {activity.icon}

          <Box component="div" flexGrow={1}>
            <Typography
              fontWeight={500}
              fontSize="small"
              color="rgba(0, 0, 0, 1)"
            >
              {activity.title}
            </Typography>
            <Typography
              variant="caption"
              fontSize="small"
              fontWeight="500"
              sx={{ color: "rgba(98, 91, 113, 1)" }}
            >
              {activity.timestamp} &nbsp; {activity.name}
            </Typography>
          </Box>

          <ArrowForwardIosIcon
            sx={{ fontSize: "14px", color: "rgba(31, 31, 31, 1)" }}
          />
        </Box>
      ))}
    </Box>
  </Paper>
);

export default ScrollableSection;
