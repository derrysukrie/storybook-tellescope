import {
  ArrowForwardIos,
  Snooze,
  TaskAltOutlined,
  MoreVert,
  InfoOutlined,
  EventOutlined,
  AlarmOffOutlined,
} from "@mui/icons-material";
import { Avatar, Badge, Box, IconButton, Typography } from "@mui/material";
import type React from "react";

import DumplingIcon from "../../../assets/dumpling.svg";
import TicketIcon from "../../../assets/ticket.svg";
import EventIcon from "../../../assets/event.svg";
import PrescriptionIcon from "../../../assets/prescription.svg";
import FileIcon from "../../../assets/file.svg";
import MedicationIcon from "../../../assets/medication.svg";
import PaymentIcon from "../../../assets/payment.svg";
import ContentIcon from "../../../assets/content.svg";
import FormIcon from "../../../assets/form.svg";
import DeviceOrderIcon from "../../../assets/device-order.svg";
import EncounterIcon from "../../../assets/encounter.svg";
import JourneyIcon from "../../../assets/journey.svg";
import ChatResolvedIcon from "../../../assets/chat-resolved.svg";
import { useState } from "react";

/** Section item container */
const SectionItemContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "16px",
        borderRadius: "6px",
        p: "10px",
        bgcolor: "#F9FAFB",
        mb: 1.2,
        cursor: "pointer",

        "&:hover": {
          bgcolor: "#ECEFF2",
        },
      }}
    >
      {children}
    </Box>
  );
};

/** Section Item title */
const SectionItemTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Typography
      component="h6"
      fontWeight={500}
      fontSize="14px"
      color="#000000"
      letterSpacing="small"
    >
      {children}
    </Typography>
  );
};

/** Section Item Sub title */
const SectionItemSubTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Typography
      component="label"
      fontSize="12px"
      fontWeight="500"
      letterSpacing="small"
      sx={{ color: "#625B71" }}
    >
      {children}
    </Typography>
  );
};

/** Ticket Section Item Starts */
interface TicketSectionItemProps {
  snoozed: boolean;
  resolved: boolean;
  assigned: boolean;
  badge: boolean;
  name?: string;
}

export const TicketSectionItem: React.FC<TicketSectionItemProps> = ({
  snoozed = false,
  resolved = false,
  assigned = false,
  badge = false,
  name = "",
}) => {
  const [selected, setSelected] = useState(false);

  const handleSelectedState = () => {
    setSelected(!selected);
  };

  return (
    <SectionItemContainer>
      <Badge color="error" variant="dot" invisible={!badge}>
        {<img alt="ticket" src={TicketIcon} width={24} height={24} />}
      </Badge>

      <Box component="div" flexGrow={1}>
        <SectionItemTitle>
          {name ? name : snoozed ? "Snoozy Dumplings" : "Ticket Name"}
        </SectionItemTitle>
        <SectionItemSubTitle>3/5/2025 at 1:00 PM PST</SectionItemSubTitle>
      </Box>

      {assigned && !snoozed && (
        <Avatar
          sx={{
            width: "24px",
            height: "24px",
            fontSize: "12px",
            lineHeight: "0px",
            cursor: "pointer",
          }}
        >
          OP
        </Avatar>
      )}

      {!snoozed && (
        <Snooze sx={{ fontSize: "24px", color: "#49454F" }}></Snooze>
      )}

      {assigned && snoozed && <img alt="dumpling" src={DumplingIcon} width={24} height={24} />}

      {snoozed && (
        <AlarmOffOutlined sx={{ fontSize: "24px", color: "#49454F" }} />
      )}

      {resolved && (
        <IconButton size="small" color="default" onClick={handleSelectedState}>
          <TaskAltOutlined
            sx={{
              fontSize: "24px",
              color: selected ? "green" : "#49454F",
              "&:hover": { color: "green" },
            }}
          />
        </IconButton>
      )}

      <ArrowForwardIos sx={{ fontSize: "14px", color: "#49454F" }} />
    </SectionItemContainer>
  );
};
/** Ticket Section Items ends */

/** Event Section Item starts */
interface EventSectionItemProps {
  resolved: boolean;
  name?: string;
}

export const EventSectionItem: React.FC<EventSectionItemProps> = ({
  resolved = false,
  name = "",
}) => {
  const [selected, setSelected] = useState(false);

  const handleSelectedState = () => {
    setSelected(!selected);
  };

  return (
    <SectionItemContainer>
      {<img alt="event" src={EventIcon} width={24} height={24} />}

      <Box component="div" flexGrow={1}>
        <SectionItemTitle>{name ? name : "Event Name"}</SectionItemTitle>
        <SectionItemSubTitle>3/5/2025 1:00 PM PST</SectionItemSubTitle>
      </Box>

      {resolved && <MoreVert sx={{ fontSize: "24px", color: "#49454F" }} />}

      {resolved && (
        <IconButton size="small" color="default" onClick={handleSelectedState}>
          <TaskAltOutlined
            sx={{
              fontSize: "24px",
              color: selected ? "green" : "#49454F",
              "&:hover": { color: "green" },
            }}
          />
        </IconButton>
      )}

      <ArrowForwardIos sx={{ fontSize: "14px", color: "#49454F" }} />
    </SectionItemContainer>
  );
};
/** Event Section Item ends */

/** Prescription Section Item */
interface PrescriptionSectionItemProps {
  status: "Pending" | "Approved" | "Denied";
  name?: string;
}

export const PrescriptionSectionItem: React.FC<
  PrescriptionSectionItemProps
> = ({ status = "Pending", name = "" }) => {
  return (
    <SectionItemContainer>
      {<img alt="prescription" src={PrescriptionIcon} width={24} height={24} />}

      <Box component="div" flexGrow={1}>
        <SectionItemTitle>{name || "tropfungin"}</SectionItemTitle>
        <SectionItemSubTitle>0.1 mg 3 month {status}</SectionItemSubTitle>
      </Box>

      {<MoreVert sx={{ fontSize: "24px", color: "#49454F" }} />}

      <ArrowForwardIos sx={{ fontSize: "14px", color: "#49454F" }} />
    </SectionItemContainer>
  );
};
/** Prescription Section Item ends */

/** File section item starts */
export const FileSectionItem: React.FC<{ name?: string }> = ({ name }) => {
  return (
    <SectionItemContainer>
      {<img alt="file" src={FileIcon} width={24} height={24} />}

      <Box component="div" flexGrow={1}>
        <SectionItemTitle>{name || "file"}</SectionItemTitle>
        <SectionItemSubTitle>JPEG 1.7 MB March 5, 2025</SectionItemSubTitle>
      </Box>

      {<MoreVert sx={{ fontSize: "24px", color: "#49454F" }} />}

      <ArrowForwardIos sx={{ fontSize: "14px", color: "#49454F" }} />
    </SectionItemContainer>
  );
};
/** File section item ends */

/** Medication section item starts */
export const MedicationSectionItem: React.FC<{ name?: string }> = ({
  name,
}) => {
  return (
    <SectionItemContainer>
      {<img alt="medication" src={MedicationIcon} width={24} height={24} />}
      <Box component="div" flexGrow={1}>
        <SectionItemTitle>{name || "tropfugin"}</SectionItemTitle>
        <SectionItemSubTitle>0.1 mg 3 month March 5, 2025</SectionItemSubTitle>
      </Box>

      {<MoreVert sx={{ fontSize: "24px", color: "#49454F" }} />}

      <ArrowForwardIos sx={{ fontSize: "14px", color: "#49454F" }} />
    </SectionItemContainer>
  );
};
/**Medication Section item ends */

/** Payment Section Item starts */
export const PaymentSectionItem: React.FC<{ name?: string }> = ({ name }) => {
  return (
    <SectionItemContainer>
      {<img alt="payment" src={PaymentIcon} width={24} height={24} />}

      <Box component="div" flexGrow={1}>
        <SectionItemTitle>{name || "Payment"}</SectionItemTitle>
        <SectionItemSubTitle>
          $100 March 5, 2025 A descriptive expl...
        </SectionItemSubTitle>
      </Box>

      {<MoreVert sx={{ fontSize: "24px", color: "#49454F" }} />}

      <ArrowForwardIos sx={{ fontSize: "14px", color: "#49454F" }} />
    </SectionItemContainer>
  );
};

/** Content Section Item starts */
export const ContentSectionItem: React.FC<{ name?: string; icon?: string }> = ({
  name,
  icon,
}) => {
  return (
    <SectionItemContainer>
      {<img alt="content" src={icon || ContentIcon} width={24} height={24} />}

      <Box component="div" flexGrow={1}>
        <SectionItemTitle>{name || "Content title"}</SectionItemTitle>
        <SectionItemSubTitle>March 5, 2025</SectionItemSubTitle>
      </Box>

      {<MoreVert sx={{ fontSize: "24px", color: "#49454F" }} />}

      <ArrowForwardIos sx={{ fontSize: "14px", color: "#49454F" }} />
    </SectionItemContainer>
  );
};
/** Content section item ends */

/** Form Section Item starts */
export const FormSectionItem: React.FC<{ name?: string }> = ({ name }) => {
  return (
    <SectionItemContainer>
      {<img alt="form" src={FormIcon} width={24} height={24} />}
      <Box component="div" flexGrow={1}>
        <SectionItemTitle>{name || "Form title"}</SectionItemTitle>
        <SectionItemSubTitle>3/5/2025 1 response</SectionItemSubTitle>
      </Box>

      {<MoreVert sx={{ fontSize: "24px", color: "#49454F" }} />}

      <ArrowForwardIos sx={{ fontSize: "14px", color: "#49454F" }} />
    </SectionItemContainer>
  );
};
/** Form section item ends */

/** Device order Section Item starts */
export const DeviceOrderSectionItem: React.FC<{ name?: string }> = ({
  name,
}) => {
  return (
    <SectionItemContainer>
      {<img alt="device order" src={DeviceOrderIcon} width={24} height={24} />}
      <Box component="div" flexGrow={1}>
        <SectionItemTitle>
          {name ? name : "Open Stock iBlood Pressure Cuff"}
        </SectionItemTitle>
        <SectionItemSubTitle>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            3/5/2025 at 1:15 PM PST &nbsp;
            <InfoOutlined sx={{ fontSize: "12px", color: "#625B71" }} />
          </Box>
        </SectionItemSubTitle>
      </Box>

      {<MoreVert sx={{ fontSize: "24px", color: "#49454F" }} />}

      <ArrowForwardIos sx={{ fontSize: "14px", color: "#49454F" }} />
    </SectionItemContainer>
  );
};
/** Device order item ends */

/** Encounter Section Item starts */
export const EncounterSectionItem: React.FC<{ name?: string }> = ({ name }) => {
  return (
    <SectionItemContainer>
      {<img alt="encounter" src={EncounterIcon} width={24} height={24} />}

      <Box component="div" flexGrow={1}>
        <SectionItemTitle>{name || "Title"}</SectionItemTitle>
        <SectionItemSubTitle>
          3/5/2025 at 1:15 PM PST &nbsp; In Candid
        </SectionItemSubTitle>
      </Box>

      {<MoreVert sx={{ fontSize: "24px", color: "#49454F" }} />}
    </SectionItemContainer>
  );
};

/**Encounter Section Item ends */

/**Ticket assigned Setion Item starts */
export const TicketassignedSectionItem: React.FC<{ name?: string }> = ({
  name,
}) => {
  return (
    <SectionItemContainer>
      {<img alt="ticket" src={TicketIcon} width={24} height={24} />}
      <Box component="div" flexGrow={1}>
        <SectionItemTitle>{name || "Ticket assigned"}</SectionItemTitle>
        <SectionItemSubTitle> 3/5/2025 at 1:00 PM Name</SectionItemSubTitle>
      </Box>
      {<MoreVert sx={{ fontSize: "24px", color: "#49454F" }} />}

      <ArrowForwardIos sx={{ fontSize: "14px", color: "#49454F" }} />
    </SectionItemContainer>
  );
};
/**Ticket assigned Section Item ends */

/**Ticket completed Section Item Starts */
export const TicketcompletedSectionItem: React.FC<{ name?: string }> = ({
  name,
}) => (
  <SectionItemContainer>
    {<img alt="ticket" src={TicketIcon} width={24} height={24} />}
    <Box component="div" flexGrow={1}>
      <SectionItemTitle>{name || "Ticket completed"}</SectionItemTitle>
      <SectionItemSubTitle>3/5/2025 at 1:00 PM Name</SectionItemSubTitle>
    </Box>
    {<MoreVert sx={{ fontSize: "24px", color: "#49454F" }} />}

    <ArrowForwardIos sx={{ fontSize: "14px", color: "#49454F" }} />
  </SectionItemContainer>
);
/**Ticket completed Section Item ends */

/** Event Scheduled Section Item starts */
export const EventScheduledSectionItem: React.FC<{ name?: string }> = ({
  name,
}) => {
  return (
    <SectionItemContainer>
      {<img alt="event" src={EventIcon} width={24} height={24} />}

      <Box component="div" flexGrow={1}>
        <SectionItemTitle>{name || "Event scheduled"}</SectionItemTitle>
        <SectionItemSubTitle>3/5/2025 at 1:00 PM Name</SectionItemSubTitle>
      </Box>

      <ArrowForwardIos sx={{ fontSize: "14px", color: "#49454F" }} />
    </SectionItemContainer>
  );
};
/** Event scheduled section item ends */

/** Event cancelled section item starts */
export const EventCancelledSectionItem: React.FC<{ name?: string }> = ({
  name,
}) => {
  return (
    <SectionItemContainer>
      <EventOutlined sx={{ color: "#1F1F1F", fontSize: "24px" }} />

      <Box component="div" flexGrow={1}>
        <SectionItemTitle>{name || "Event cancelled"}</SectionItemTitle>
        <SectionItemSubTitle>3/5/2025 at 1:00 PM Name</SectionItemSubTitle>
      </Box>

      <ArrowForwardIos sx={{ fontSize: "14px", color: "#49454F" }} />
    </SectionItemContainer>
  );
};

/** Inbox item resolved Section item starts */
export const ChatResolvedSectionItem: React.FC<{ name?: string }> = ({
  name,
}) => {
  return (
    <SectionItemContainer>
      {<img alt="chat resolved" src={ChatResolvedIcon} width={24} height={24} />}
      <Box component="div" flexGrow={1}>
        <SectionItemTitle>{name || "Chat resolved"}</SectionItemTitle>
        <SectionItemSubTitle>3/5/2025 at 1:00 PM Name</SectionItemSubTitle>
      </Box>

      <ArrowForwardIos sx={{ fontSize: "14px", color: "#49454F" }} />
    </SectionItemContainer>
  );
};
/** Inbox item resolved Section item */

/** Added journey to section item  starts */
export const AddedToJourneySectionItem: React.FC<{ name?: string }> = ({
  name,
}) => {
  return (
    <SectionItemContainer>
      {<img alt="journey" src={JourneyIcon} width={24} height={24} />}
      <Box component="div" flexGrow={1}>
        <SectionItemTitle>{name || "Added to journey"}</SectionItemTitle>
        <SectionItemSubTitle>3/5/2025 at 1:00 PM Journey</SectionItemSubTitle>
      </Box>

      <ArrowForwardIos sx={{ fontSize: "14px", color: "#49454F" }} />
    </SectionItemContainer>
  );
};
/** Added journey to section item ends */

/** Removed journey to section item starts */
export const RemovedFromJourneySectionItem: React.FC<{ name?: string }> = ({
  name,
}) => {
  return (
    <SectionItemContainer>
      {<img alt="journey" src={JourneyIcon} width={24} height={24} />}

      <Box component="div" flexGrow={1}>
        <SectionItemTitle>{name || "Removed from journey"}</SectionItemTitle>
        <SectionItemSubTitle> 3/5/2025 at 1:00 PM Journey</SectionItemSubTitle>
      </Box>

      <ArrowForwardIos sx={{ fontSize: "14px", color: "#49454F" }} />
    </SectionItemContainer>
  );
};
/** Removed journey to section item ends */
