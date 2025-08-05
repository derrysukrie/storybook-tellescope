import { Box, MenuItem, Stack, Typography } from "@mui/material";
import { InfoOutlined, PersonAddAlt, ChatBubbleOutline, MailOutline, TextsmsOutlined, GroupOutlined, AddOutlined, GroupAddOutlined } from "@mui/icons-material";
import { Icon } from "../../../../Atoms";
import { Button } from "../../../../components/atoms/button/button";
import Select from "../../../../components/atoms/select/select";
import { TeamChatSwitch } from "../TeamChatSwitch";
import { HeaderActions } from "./HeaderActions";
import { HeaderForm } from "./HeaderForm";
import type { HeaderContentProps } from "./types";
import TranslateIcon from "@mui/icons-material/Translate";

const CHAT_ICONS = {
  CHAT: { icon: ChatBubbleOutline, color: "#1C7AE0" },
  EMAIL: { icon: MailOutline, color: "#6466F1" },
  SMS: { icon: TextsmsOutlined, color: "#A754F5" },
  MMS: { icon: GroupOutlined, color: "#15B8A6" },
};

const getDisplayText = (chatInterface: string) => {
  switch (chatInterface) {
    case "EMAIL":
      return "Email subject example";
    case "SMS":
      return "+123 456 7890";
    case "MMS":
      return "Chat Subject example";
    case "CHAT":
      return "Email subject example";
    default:
      return "";
  }
};

const transition = "all 0.3s ease-in-out";

export const HeaderContent = ({ chatInterface, enableTeamChat, setEnableTeamChat, isEmpty, headerFormData, onHeaderFormChange }: HeaderContentProps) => {
  const { icon: IconComponent, color } = CHAT_ICONS[chatInterface as keyof typeof CHAT_ICONS] || CHAT_ICONS.CHAT;

  return (
    <Box>
      {/* Top section with patient info and actions - only show when not empty */}
      {isEmpty && (
        <Box display="flex" bgcolor={enableTeamChat ? "#F4F0FF" : "#E2E8F0"} justifyContent="space-between" alignItems="center" p={2} sx={{ transition }}>
          <Box display="flex" gap={2} alignItems="center">
            <Typography variant="h5">Patient Name</Typography>
            <InfoOutlined />
            <Typography variant="caption" color="#1C7AE0">
              Show all threads
            </Typography>
          </Box>
          <HeaderActions />
        </Box>
      )}

      {/* Chat interface section */}
      <Box p={3} bgcolor={enableTeamChat ? "#F4F0FF" : ""} sx={{ transition }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Stack direction="row" gap={3} alignItems="center">
            <Icon icon={IconComponent} size="medium" sx={{ color }} />
            {isEmpty ? (
              <Button
                appearance="outlined"
                size="small"
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  borderColor: "#CAC4D0",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "transparent",
                    borderColor: "#CAC4D0",
                  },
                }}
                endIcon={<PersonAddAlt />}
              >
                Assign
              </Button>
            ) : (
              <>
                <TranslateIcon />
                <Typography variant="h5">{getDisplayText(chatInterface)}</Typography>
                <Button
                  appearance="outlined"
                  size="small"
                  sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    borderColor: "#CAC4D0",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "transparent",
                      borderColor: "#CAC4D0",
                    },
                  }}
                  endIcon={<PersonAddAlt />}
                >
                  Assign
                </Button>
              </>
            )}
          </Stack>

          {/* Show actions for empty state */}
          {isEmpty && <HeaderActions />}

          {/* Show team chat switch for non-empty state */}
          {!isEmpty && <TeamChatSwitch checked={enableTeamChat} setChecked={setEnableTeamChat} />}
        </Box>

        {/* Show additional form fields for non-empty SMS/EMAIL when team chat is disabled */}
        {!isEmpty && !enableTeamChat && (
          <Box display="flex" flexDirection="column" sx={{ mt: 2 }}>
            {chatInterface === "SMS" && (
              <Select
                value={headerFormData?.from || ""}
                label="From: +123 456 7890"
                sx={{ margin: 0 }}
                onChange={(e) => onHeaderFormChange?.("from", e.target.value as string)}
              >
                <MenuItem value="Option 1">Option 1</MenuItem>
                <MenuItem value="Option 2">Option 2</MenuItem>
                <MenuItem value="Option 3">Option 3</MenuItem>
              </Select>
            )}
            {chatInterface === "EMAIL" && (
              <Select
                value={headerFormData?.cc || ""}
                label="CC"
                sx={{ margin: 0 }}
                onChange={(e) => onHeaderFormChange?.("cc", e.target.value as string)}
              >
                <MenuItem value="Option 1">Option 1</MenuItem>
                <MenuItem value="Option 2">Option 2</MenuItem>
                <MenuItem value="Option 3">Option 3</MenuItem>
              </Select>
            )}
            {chatInterface === "MMS" && (
              <Select
                value={Array.isArray(headerFormData?.cc) ? headerFormData.cc : []}
                label="CC"
                sx={{ margin: 0 }}
                multiple
                onChange={(e) => onHeaderFormChange?.("cc", e.target.value as string[])}
              >
                <MenuItem value="Option 1">Option 1</MenuItem>
                <MenuItem value="Option 2">Option 2</MenuItem>
                <MenuItem value="Option 3">Option 3</MenuItem>
              </Select>
            )}
          </Box>
        )}

        {/* Show form for empty state */}
        {isEmpty && headerFormData && onHeaderFormChange && (
          <HeaderForm headerFormData={headerFormData} onHeaderFormChange={onHeaderFormChange} chatInterface={chatInterface} enableTeamChat={enableTeamChat} />
        )}
        {!enableTeamChat && (
          <Box mt={chatInterface == "SMS" && !isEmpty ? 2 : 1}>
            <Stack display={"flex"} flexDirection={"row"} gap={2} alignItems={"center"}>
              <Icon icon={GroupAddOutlined} size="medium" />
              <Button
                appearance="outlined"
                size="small"
                color="secondary"
                sx={{
                  textTransform: "none",
                  borderRadius: "100px",
                }}
                startIcon={<AddOutlined />}
              >
                Tag
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
};
