import React, { useEffect, useState } from "react";

import PrescriptionIcon from "../../../assets/prescription.svg";
import AddEventIcon from "../../../assets/add-event.svg";
import AddTicketIcon from "../../../assets/add-ticket.svg";
import SortingIcon from "../../../assets/sorting.svg";
import CloudUploadIcon from "../../../assets/cloud-upload.svg";
import FileUploadIcon from "../../../assets/file-upload.svg";
import FileOutlinedIcon from "../../../assets/file-outlined.svg";

import {
  AddOutlined,
  AlarmOffOutlined,
  DragIndicator,
  FileUploadOutlined,
  FilterList,
  Snooze,
} from "@mui/icons-material";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { MultimodalIcons } from "./multimodal";
import {
  ContentSectionItem,
  DeviceOrderSectionItem,
  EncounterSectionItem,
  EventSectionItem,
  FileSectionItem,
  FormSectionItem,
  MedicationSectionItem,
  PaymentSectionItem,
  PrescriptionSectionItem,
  TicketSectionItem,
} from "../../molecules/SectionItem/SectionItem";

export const TicketMultimodalTabContent: React.FC<{
  snoozed: boolean;
  nameSorted: boolean;
}> = ({ snoozed, nameSorted }) => {
  const allTickets = [
    {
      name: "Ticket Name",
      snoozed: false,
      assigned: true,
      resolved: true,
      badge: true,
    },
    {
      name: "Ticket Name 2",
      snoozed: false,
      assigned: true,
      resolved: true,
      badge: true,
    },
    {
      name: "Ticket Name 3",
      snoozed: false,
      assigned: true,
      resolved: true,
      badge: true,
    },
    {
      name: "Snoozed Dumpling",
      snoozed: true,
      assigned: true,
      resolved: true,
      badge: true,
    },
    {
      name: "Snoozed Dumpling 2",
      snoozed: true,
      assigned: true,
      resolved: true,
      badge: true,
    },
    {
      name: "Snoozed Dumpling 3",
      snoozed: true,
      assigned: true,
      resolved: true,
      badge: true,
    },
  ];

  const [ticketsArray, setTicketsArray] = useState(allTickets);
  const [filterSnooze, setFilterSnooze] = useState(false);

  useEffect(() => {
    setFilterSnooze(filterSnooze);
    let filteredTickets = [...allTickets];

    if (snoozed) {
      filteredTickets = filteredTickets.filter((ticket) => ticket.snoozed);
    } else {
      filteredTickets = filteredTickets.filter((ticket) => !ticket.snoozed);
    }

    if (nameSorted) {
      filteredTickets.sort((a, b) => a.name.localeCompare(b.name));
    }

    setTicketsArray(filteredTickets);
  }, [snoozed, nameSorted]);

  const handleSnooze = () => {
    setFilterSnooze(!filterSnooze);

    let filteredTickets = [...allTickets];

    if (filterSnooze) {
      filteredTickets = filteredTickets.filter((ticket) => ticket.snoozed);
    } else {
      filteredTickets = filteredTickets.filter((ticket) => !ticket.snoozed);
    }

    setTicketsArray(filteredTickets);
  };

  return (
    <Box component="div" sx={{ mt: 2 }}>
      <Paper
        component="section"
        sx={{
          border: "solid 1px #E2E8F0",
          boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.05)",
          padding: "24px",
          borderRadius: "16px",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          mb={2}
          gap={"10px"}
        >
          <Box
            flexGrow={1}
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <DragIndicator sx={{ color: "#CAC4D0", fontSize: "24px" }} />
            <Typography fontWeight="bold" fontSize="medium">
              Tickets &nbsp; {ticketsArray?.length}
            </Typography>
            <FilterList sx={{ fontSize: "24px" }} />
          </Box>

          {filterSnooze && (
            <IconButton size="small" color="default" onClick={handleSnooze}>
              <AlarmOffOutlined sx={{ fontSize: "24px", color: "#1f1f1f" }} />
            </IconButton>
          )}

          {!filterSnooze && (
            <IconButton size="small" color="default" onClick={handleSnooze}>
              <Snooze sx={{ fontSize: "24px", color: "#1f1f1f" }} />
            </IconButton>
          )}

          <MultimodalIcons IconName={AddTicketIcon} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Name
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Due
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Owner
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>
        </Box>

        <Box
          component="div"
          sx={{
            mt: 2,
            maxHeight: "220px",
            height: "auto",
            overflowY: "auto",
            pr: 1,
          }}
        >
          {ticketsArray?.map((ticket) => (
            <TicketSectionItem
              name={ticket.name}
              snoozed={ticket.snoozed}
              assigned={ticket.assigned}
              resolved={ticket.resolved}
              badge={ticket.badge}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export const EventMultimodalTabContent: React.FC<{ nameSorted: boolean }> = ({
  nameSorted,
}) => {
  const allEvents = [
    { name: "Event name", resolved: true },
    { name: "Event name", resolved: true },
    { name: "Event name", resolved: true },
  ];

  const [events, setEvents] = useState(allEvents);

  useEffect(() => {
    const filteredEvents = [...allEvents];

    if (nameSorted) {
      filteredEvents.sort((a, b) => a.name.localeCompare(b.name));
    }

    setEvents(filteredEvents);
  }, [nameSorted]);

  return (
    <Box component="div" sx={{ mt: 2 }}>
      <Paper
        component="section"
        sx={{
          border: "solid 1px #E2E8F0",
          boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.05)",
          padding: "24px",
          borderRadius: "16px",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          mb={2}
          gap={"10px"}
        >
          <Box
            flexGrow={1}
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <DragIndicator sx={{ color: "#CAC4D0", fontSize: "24px" }} />
            <Typography fontWeight="bold" fontSize="medium">
              Events &nbsp; {events.length}
            </Typography>
            <FilterList sx={{ fontSize: "24px" }} />
          </Box>
          <MultimodalIcons IconName={AddEventIcon} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Name
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Due
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>
        </Box>

        <Box component="div" sx={{ mt: 2 }}>
          {events?.map((event) => (
            <EventSectionItem name={event.name} resolved={event.resolved} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export const EligibilityMultimodalTabContent: React.FC<{
  nameSorted: boolean;
}> = ({ nameSorted }) => {
  const allItems = [{ name: "tropfungin", resolved: true }];

  const [items, setItems] = useState(allItems);

  useEffect(() => {
    const filteredItems = [...allItems];

    if (nameSorted) {
      filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    setItems(filteredItems);
  }, [nameSorted]);

  return (
    <Box component="div" sx={{ mt: 2 }}>
      <Paper
        component="section"
        sx={{
          border: "solid 1px #E2E8F0",
          boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.05)",
          padding: "24px",
          borderRadius: "16px",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          mb={2}
          gap={"10px"}
        >
          <Box
            flexGrow={1}
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <DragIndicator sx={{ color: "#CAC4D0", fontSize: "24px" }} />
            <Typography fontWeight="bold" fontSize="medium">
              Eligibility &nbsp; 1
            </Typography>
            <FilterList sx={{ fontSize: "24px" }} />
          </Box>
          <MultimodalIcons IconName={PrescriptionIcon} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Name
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>
        </Box>

        <Box component="div" sx={{ mt: 2 }}>
          {items?.map((item) => (
            <PrescriptionSectionItem name={item.name} status="Approved" />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export const DeviceorderMultimodalTabContent: React.FC<{
  nameSorted: boolean;
}> = ({ nameSorted }) => {
  const allItems = [
    { name: "Open Stock iBlood Pressure Cuff" },
    { name: "Open Stock iBlood Pressure Cuff" },
    { name: "Open Stock iBlood Pressure Cuff" },
  ];

  const [items, setItems] = useState(allItems);

  useEffect(() => {
    const filteredItems = [...allItems];

    if (nameSorted) {
      filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    setItems(filteredItems);
  }, [nameSorted]);

  return (
    <Box component="div" sx={{ mt: 2 }}>
      <Paper
        component="section"
        sx={{
          border: "solid 1px #E2E8F0",
          boxShadow: "0px 1px 3px 1px rgba(0,0,0,0.05)",
          padding: "24px",
          borderRadius: "16px",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          mb={2}
          gap={"10px"}
        >
          <Box
            flexGrow={1}
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <DragIndicator sx={{ color: "#CAC4D0", fontSize: "24px" }} />
            <Typography fontWeight="bold" fontSize="medium">
              Device orders &nbsp; {items.length}
            </Typography>
            <FilterList sx={{ fontSize: "24px" }} />
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Date
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Status
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>
        </Box>

        <Box component="div" sx={{ mt: 2 }}>
          {items.map((item) => (
            <DeviceOrderSectionItem name={item.name} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export const EncountersMultimodalTabContent: React.FC<{
  nameSorted: boolean;
}> = ({ nameSorted }) => {
  const allItems = [{ name: "Title" }, { name: "Title" }, { name: "Title" }];

  const [items, setItems] = useState(allItems);

  useEffect(() => {
    const filteredItems = [...allItems];

    if (nameSorted) {
      filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    setItems(filteredItems);
  }, [nameSorted]);

  return (
    <Box component="div" sx={{ mt: 2 }}>
      <Paper
        component="section"
        sx={{
          border: "solid 1px #E2E8F0",
          boxShadow: "0px 1px 3px 1px rgba(0,0,0,0.05)",
          padding: "24px",
          borderRadius: "16px",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          mb={2}
          gap={"10px"}
        >
          <Box
            flexGrow={1}
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <DragIndicator sx={{ color: "#CAC4D0", fontSize: "24px" }} />
            <Typography fontWeight="bold" fontSize="medium">
              Encounters &nbsp; {items.length}
            </Typography>
            <FilterList sx={{ fontSize: "24" }} />
          </Box>
          <AddOutlined />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Name
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Date
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>
        </Box>

        <Box component="div" sx={{ mt: 2 }}>
          {items.map((item) => (
            <EncounterSectionItem name={item.name} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export const FilesMultimodalTabContent: React.FC<{
  nameSorted: boolean;
}> = ({ nameSorted }) => {
  const allItems = [{ name: "File" }];

  const [items, setItems] = useState(allItems);

  useEffect(() => {
    const filteredItems = [...allItems];

    if (nameSorted) {
      filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    setItems(filteredItems);
  }, [nameSorted]);

  return (
    <Box component="div" sx={{ mt: 2 }}>
      <Paper
        component="section"
        sx={{
          border: "solid 1px #E2E8F0",
          boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.05)",
          padding: "24px",
          borderRadius: "16px",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          mb={2}
          gap={"10px"}
        >
          <Box
            flexGrow={1}
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <DragIndicator sx={{ color: "#CAC4D0", fontSize: "24px" }} />
            <Typography fontWeight="bold" fontSize="medium">
              Files &nbsp; {items.length}
            </Typography>
            <FilterList sx={{ fontSize: "24px" }} />
          </Box>
          <FileUploadOutlined />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Name
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Date
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>
        </Box>

        <Box component="div" sx={{ mt: 2 }}>
          {items?.map((item) => (
            <FileSectionItem name={item.name} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export const FormsMultimodalTabContent: React.FC<{ nameSorted: boolean }> = ({
  nameSorted,
}) => {
  const allItems = [{ name: "Form title" }];

  const [items, setItems] = useState(allItems);

  useEffect(() => {
    const filteredItems = [...allItems];

    if (nameSorted) {
      filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    setItems(filteredItems);
  }, [nameSorted]);

  return (
    <Box component="div" sx={{ mt: 2 }}>
      <Paper
        component="section"
        sx={{
          border: "solid 1px #E2E8F0",
          boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.05)",
          padding: "24px",
          borderRadius: "16px",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          mb={2}
          gap={"10px"}
        >
          <Box
            flexGrow={1}
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <DragIndicator sx={{ color: "#CAC4D0", fontSize: "24px" }} />
            <Typography fontWeight="bold" fontSize="medium">
              Forms &nbsp; {items.length}
            </Typography>
            <FilterList sx={{ fontSize: "24px" }} />
          </Box>
          <AddOutlined />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Name
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Date
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>
        </Box>

        <Box component="div" sx={{ mt: 2 }}>
          {items.map((item) => (
            <FormSectionItem name={item.name} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export const ContentMultimodalTabContent: React.FC<{ nameSorted: boolean }> = ({
  nameSorted,
}) => {
  const allItems = [{ name: "Content title" }];

  const [items, setItems] = useState(allItems);

  useEffect(() => {
    const filteredItems = [...allItems];

    if (nameSorted) {
      filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    setItems(filteredItems);
  }, [nameSorted]);

  return (
    <Box component="div" sx={{ mt: 2 }}>
      <Paper
        component="section"
        sx={{
          border: "solid 1px #E2E8F0",
          boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.05)",
          padding: "24px",
          borderRadius: "16px",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          mb={2}
          gap={"10px"}
        >
          <Box
            flexGrow={1}
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <DragIndicator sx={{ color: "#CAC4D0", fontSize: "24px" }} />
            <Typography fontWeight="bold" fontSize="medium">
              Content &nbsp; {items.length}
            </Typography>
            <FilterList sx={{ fontSize: "24px" }} />
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Name
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Date
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>
        </Box>

        <Box component="div" sx={{ mt: 2 }}>
          {items.map((item) => (
            <ContentSectionItem icon={FileOutlinedIcon} name={item.name} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export const MedicationMultimodalTabContent: React.FC<{
  nameSorted: boolean;
}> = ({ nameSorted }) => {
  const allItems = [{ name: "tropfungin" }];

  const [items, setItems] = useState(allItems);

  useEffect(() => {
    const filteredItems = [...allItems];

    if (nameSorted) {
      filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    setItems(filteredItems);
  }, [nameSorted]);

  return (
    <Box component="div" sx={{ mt: 2 }}>
      <Paper
        component="section"
        sx={{
          border: "solid 1px #E2E8F0",
          boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.05)",
          padding: "24px",
          borderRadius: "16px",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          mb={2}
          gap={"10px"}
        >
          <Box
            flexGrow={1}
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <DragIndicator sx={{ color: "#CAC4D0", fontSize: "24px" }} />
            <Typography fontWeight="bold" fontSize="medium">
              Medications &nbsp; {items.length}
            </Typography>
            <FilterList sx={{ fontSize: "24px" }} />
          </Box>
          <MultimodalIcons IconName={CloudUploadIcon} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Name
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Date
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>
        </Box>

        <Box component="div" sx={{ mt: 2 }}>
          {items.map((item) => (
            <MedicationSectionItem name={item.name} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export const PaymentsMultimodalTabContent: React.FC<{
  nameSorted: boolean;
}> = ({ nameSorted }) => {
  const allItems = [
    { name: "Payment" },
    { name: "Credit" },
    { name: "Superbill" },
  ];

  const [items, setItems] = useState(allItems);

  useEffect(() => {
    const filteredItems = [...allItems];

    if (nameSorted) {
      filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    setItems(filteredItems);
  }, [nameSorted]);

  return (
    <Box component="div" sx={{ mt: 2 }}>
      <Paper
        component="section"
        sx={{
          border: "solid 1px #E2E8F0",
          boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.05)",
          padding: "24px",
          borderRadius: "16px",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          mb={2}
          gap={"10px"}
        >
          <Box
            flexGrow={1}
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <DragIndicator sx={{ color: "#CAC4D0", fontSize: "24px" }} />
            <Typography fontWeight="bold" fontSize="medium">
              Payments &nbsp; {items.length}
            </Typography>
            <FilterList sx={{ fontSize: "24px" }} />
          </Box>
          <MultimodalIcons IconName={FileUploadIcon} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Date
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography fontWeight="bold" fontSize="medium">
              Amount
            </Typography>
            <MultimodalIcons IconName={SortingIcon} />
          </Box>
        </Box>

        <Box component="div" sx={{ mt: 2 }}>
          {items.map((item) => (
            <PaymentSectionItem name={item.name} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};
