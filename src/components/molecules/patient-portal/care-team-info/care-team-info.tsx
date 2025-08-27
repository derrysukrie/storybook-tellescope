import { ChatBubbleOutline, EmailOutlined, Phone } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography, Button, Divider } from "@mui/material";

export interface CareTeamInfoProps {
  actions?: 1 | 2 | 3;
}

// Constants for better maintainability
const ACTION_CONFIGS = [
  { icon: ChatBubbleOutline, label: "CHAT" },
  { icon: Phone, label: "CALL" },
  { icon: EmailOutlined, label: "EMAIL" },
] as const;

const BUTTON_STYLES = {
  base: {
    textTransform: "none" as const,
    fontWeight: 600,
    color: "inherit",
    px: 1,
  },
  width: {
    single: "100px",
    double: "152px", 
    triple: "100%",
  },
  padding: {
    triple: 0.5,
    default: 1,
  },
} as const;

const DIVIDER_STYLES = {
  borderColor: "#E5E7EB",
} as const;

export const CareTeamInfo = ({ actions = 1 }: CareTeamInfoProps) => {
  // Helper function to get action buttons based on count
  const getActionButtons = () => {
    if (actions === 2) {
      return [
        { icon: EmailOutlined, label: "EMAIL" },
        { icon: ChatBubbleOutline, label: "CHAT" },
      ];
    }

    if (actions === 3) {
      return [
        { icon: EmailOutlined, label: "EMAIL" },
        { icon: Phone, label: "CALL" },
        { icon: ChatBubbleOutline, label: "CHAT" },
      ];
    }

    // Default: 1 action
    return ACTION_CONFIGS.slice(0, 1);
  };

  // Helper function to get button width
  const getButtonWidth = () => {
    switch (actions) {
      case 2: return BUTTON_STYLES.width.double;
      case 3: return BUTTON_STYLES.width.triple;
      default: return BUTTON_STYLES.width.single;
    }
  };

  // Helper function to get button padding
  const getButtonPadding = () => {
    return actions === 3 ? BUTTON_STYLES.padding.triple : BUTTON_STYLES.padding.default;
  };

  // Helper function to get container justification
  const getContainerJustification = () => {
    return actions === 1 ? "center" : "space-between";
  };

  const actionButtons = getActionButtons();

  return (
    <Box height={"120px"} width={"305px"}>
      {/* Header Section */}
      <Box
        p={1}
        bgcolor={"#F9FAFB"}
        pl={"18px"}
        py="20px"
        sx={{ borderTopLeftRadius: "6px", borderTopRightRadius: "6px" }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack gap={"4px"}>
            <Typography variant="body1" fontWeight={600}>
              Bok
            </Typography>
            <Typography variant="body2" fontWeight={500} color={"#6B7280"}>
              Care Team
            </Typography>
          </Stack>
          <Stack>
            <Avatar
              src="https://via.placeholder.com/150"
              sx={{ width: "40px", height: "40px" }}
            />
          </Stack>
        </Stack>
      </Box>

      {/* Actions Section */}
      <Box
        borderTop={"1px solid #E5E7EB"}
        bgcolor={"white"}
        sx={{ borderBottomLeftRadius: "6px", borderBottomRightRadius: "6px" }}
      >
        <Box display="flex">
          <Stack
            direction={"row"}
            width="100%"
            justifyContent={getContainerJustification()}
          >
            {actionButtons.map((action, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                sx={{ flex: actions === 3 ? 1 : "none" }}
              >
                <Button
                  disableRipple
                  variant="text"
                  startIcon={
                    <action.icon sx={{ width: "20px", height: "20px" }} />
                  }
                  sx={{
                    ...BUTTON_STYLES.base,
                    width: getButtonWidth(),
                    px: getButtonPadding(),
                  }}
                >
                  {action.label}
                </Button>
                {index < actionButtons.length - 1 && (
                  <Divider 
                    orientation="vertical" 
                    flexItem 
                    sx={DIVIDER_STYLES} 
                  />
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
