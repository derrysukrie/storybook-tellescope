import type { SxProps, Theme } from "@mui/material";

export const sentFormStyles = {
  container: {
    bgcolor: "#F4F3FA",
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    px: { xs: "24px", sm: "24px" },
    py: { xs: 2, sm: 0 },
  } as SxProps<Theme>,

  contentWrapper: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    width: { xs: "100%", sm: "100%  ", md: 600, lg: 720 },
    minHeight: "100vh",
    mx: { xs: 0, sm: "auto" },
  } as SxProps<Theme>,

  progressBar: {
    mt: { xs: "16px", sm: "24px" },
    height: { xs: "8px", sm: "16px" },
    width: "100%",
    borderRadius: "8px",
    backgroundColor: "#bbc6e9",
    "& .MuiLinearProgress-bar": {
      backgroundColor: "#798ED0",
    },
  } as SxProps<Theme>,

  logoContainer: {
    pt: { xs: "24px", sm: "48px" },
    display: "flex",
  } as SxProps<Theme>,

  logo: {
    maxWidth: "160px",
    width: "100%",
    height: "auto",
  } as React.CSSProperties,

  contentContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  } as SxProps<Theme>,

  contentBox: {
    height: "100%",
  } as SxProps<Theme>,

  bottomContainer: {
    display: "flex",
    flexDirection: "column",
  } as SxProps<Theme>,

  checkboxContainer: {
    px: { xs: "0px", sm: "10px" },
    width: "100%",
  } as SxProps<Theme>,

  formControlLabel: {
    gap: 0,
    alignItems: "flex-start",
  } as SxProps<Theme>,

  checkbox: {
    "&.Mui-checked": {
      color: "#798ED0",
    },
  } as SxProps<Theme>,

  buttonContainer: {
    py: { xs: "24px", sm: "48px" },
    width: "100%",
  } as SxProps<Theme>,

  continueButton: {
    boxShadow: "none",
    backgroundColor: "#585E72",
    "&:disabled": {
      backgroundColor: "#E5E7EB",
      color: "#9CA3AF",
    },
  } as SxProps<Theme>,
}; 