import { Stack } from "@mui/material";

interface SingleSelectProps {
    children?: React.ReactNode;
    appearance?: "enabled" | "hovered" | "selected";
}

const SingleSelect = ({ children, appearance = "enabled" }: SingleSelectProps) => {
    return (
        <Stack sx={{
            border: '1px solid #4A5C9280',
            borderRadius: '4px',
            padding: "8px 24px",
            height: "80px",
            color: "primary.main",
            alignItems: "center",
            flexDirection: "row",
            maxWidth: "456px",
            ...(appearance === "enabled" && {
                backgroundColor: "transparent",
                '&:hover': {
                    backgroundColor: '#4A5C920A',
                    borderColor: "primary.main",
                },
            }),
            ...(appearance === "hovered" && {
                backgroundColor: '#4A5C920A',
                borderColor: "primary.main",
            }),
            ...(appearance === "selected" && {
                borderColor: "primary.main",
            }),
        }}>
            {children}
        </Stack>
    )
}

export default SingleSelect
