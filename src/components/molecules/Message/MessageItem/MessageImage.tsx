import {  Stack, Typography } from "@mui/material";
import type { MessageType } from "../types";
import { Icon } from "../../../../Atoms";
import { Download } from "@mui/icons-material";
import { messageTextColors } from "./MessageBubble/styles/maps";

interface ImageProps {
  image: {
    url: string;
    fileName: string;
  } | null;
  messageType: MessageType;
}

export const MessageImage = ({ image, messageType }: ImageProps) => {
  if (!image) {
    return null;
  }
  return (
    <Stack display={"flex"} pb={1} flexDirection={"column"} gap={1}>
      <img
        src={image.url}
        style={{
          borderRadius: "10px",
          width: "100%",
          height: 140,
          objectFit: "cover",
        }}
        alt="message-image"
      />
      <Stack display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Typography variant="caption" sx={{ color: messageTextColors[messageType] }}>
          {image.fileName}
        </Typography>
        <Icon
          onClick={() => alert("download action will be fired inside Image component")}
          icon={Download}
          sx={{ cursor: "pointer", color: messageTextColors[messageType] }}
        />
      </Stack>
    </Stack>
  );
};
