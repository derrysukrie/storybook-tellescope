import { type SxProps } from "@mui/material";
import { useMemo } from "react";

interface MessageInputStyleProps {
  disabled?: boolean;
  error?: boolean;
}

const getBorderColor = ({ disabled, error }: MessageInputStyleProps) => {
  if (disabled) return "1px solid rgb(172, 172, 172)";
  if (error) return "1px solid #DC2626";
  return "1px solid #E2E8F0";
};

const getFocusStyles = ({ disabled, error }: MessageInputStyleProps) => {
  if (disabled || error) {
    return {};
  }

  return {
    borderColor: "#1C7AE0",
    "& .send-button": {
      backgroundColor: "#1C7AE0",
      color: "white",
      "& svg": {
        color: "white",
        fill: "white",
      },
    },
  };
};

export const useMessageInputStyles = ({
  disabled,
  error,
}: MessageInputStyleProps) => {
  return useMemo(() => {
    const root = {
      borderRadius: 28,
      border: getBorderColor({ disabled, error }),
      display: "flex",
      alignItems: "center",
      padding: 0.8,
      justifyContent: "space-between",
      transition: "border-color 0.2s ease-in-out",
      "&:focus-within": getFocusStyles({ disabled, error }),
    };

    const textFieldsButton = {
      color: "black",
      ":disabled": { color: "rgb(163, 163, 163)" },
    };

    const inputBase = {
      flex: 1,
      marginLeft: 1,
    };

    const micButton = {
      color: "black",
      ":disabled": {
        color: "rgb(163, 163, 163)",
      },
      transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
    };

    const sendButton = {
      color: "black",
      ":disabled": {
        color: "rgb(163, 163, 163)",
      },
      transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
    };

    return { root, textFieldsButton, inputBase, micButton, sendButton };
  }, [disabled, error]);
};

interface IChatStyles {
  container: SxProps;
  messagesContainer: (
    messagesLength: number,
    enableTeamChat: boolean
  ) => SxProps;
  emptyContainer: SxProps;
  emptyMessageBox: SxProps;
  inputContainer: (enableTeamChat: boolean) => SxProps;
}

export const styles: IChatStyles = {
  container: {
    width: 800,
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    height: 800,
  },
  messagesContainer: (messagesLength: number, enableTeamChat: boolean) => ({
    py: 2,
    overflow: "auto",
    flex: 1,
    bgcolor: enableTeamChat ? "#EFF0F2" : "#FFF",
    display: "flex",
    flexDirection: "column",
    justifyContent: messagesLength === 0 ? "center" : "flex-start",
    gap: messagesLength > 0 ? 2 : 0,
  }),
  emptyContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessageBox: {
    bgcolor: "#EFF0F2",
    borderRadius: 20,
    px: 1.4,
    py: 0.5,
  },
  inputContainer: (enableTeamChat: boolean) => ({
    p: 3,
    alignItems: "center",
    gap: 2,
    display: enableTeamChat ? "flex" : "block",
    bgcolor: enableTeamChat ? "#F4F0FF" : "",
    transition: "all 0.3s ease-in-out",
  }),
};
