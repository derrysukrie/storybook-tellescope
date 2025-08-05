import { Badge, Box } from "@mui/material";
import { Page } from "../../atoms/Page/Page";
import { SuggestedAction } from "../../atoms/SuggestedAction/SuggestedAction";
import BulbActiveIcon from "../../../assets/bulb-active.svg";
import BulbIcon from "../../../assets/bulb.svg";

export interface SuggestedActionsProps {
  expanded: boolean;
}

export const SuggestedActions: React.FC<SuggestedActionsProps> = ({
  expanded = false,
}) => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "16px",
        maxWidth: "700px",
        overflowX: "auto",
        paddingBottom: "8px",
      }}
    >
      {!expanded ? (
        <Badge color="error" variant="dot">
          <img src={BulbIcon} />
        </Badge>
      ) : (
        <img src={BulbActiveIcon} />
      )}

      <Page truncated={true} />

      {expanded && (
        <>
          <SuggestedAction truncated={true} />
          <SuggestedAction truncated={true} />
        </>
      )}
    </Box>
  );
};
