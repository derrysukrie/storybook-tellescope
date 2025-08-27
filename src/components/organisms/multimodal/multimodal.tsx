import React, { useState } from "react";
import { Box, IconButton, type SxProps } from "@mui/material";

import TicketIcon from "../../../assets/ticket.svg";
import EventIcon from "../../../assets/event.svg";
import EligibilityIcon from "../../../assets/eligibility.svg";
import DeviceOrderIcon from "../../../assets/device-order.svg";
import EncounterIcon from "../../../assets/encounter.svg";
import FileIcon from "../../../assets/file.svg";
import FormIcon from "../../../assets/form.svg";
import FileOutlinedIcon from "../../../assets/file-outlined.svg";
import MedicationIcon from "../../../assets/medication.svg";
import PaymentIcon from "../../../assets/payment.svg";
import AddTicketIcon from "../../../assets/add-ticket.svg";
import SortingIcon from "../../../assets/sorting.svg";
import {
  ContentMultimodalTabContent,
  DeviceorderMultimodalTabContent,
  EligibilityMultimodalTabContent,
  EncountersMultimodalTabContent,
  EventMultimodalTabContent,
  FilesMultimodalTabContent,
  FormsMultimodalTabContent,
  MedicationMultimodalTabContent,
  PaymentsMultimodalTabContent,
  TicketMultimodalTabContent,
} from "./multimodal-tab";

type MultimodalIconType =
  | typeof TicketIcon
  | typeof EventIcon
  | typeof EligibilityIcon
  | typeof DeviceOrderIcon
  | typeof EncounterIcon
  | typeof FileIcon
  | typeof FormIcon
  | typeof FileOutlinedIcon
  | typeof MedicationIcon
  | typeof PaymentIcon
  | typeof AddTicketIcon
  | typeof SortingIcon;

const tabs = [
  {
    name: "ticket",
    iconName: TicketIcon,
  },
  {
    name: "event",
    iconName: EventIcon,
  },
  {
    name: "eligibility",
    iconName: EligibilityIcon,
  },
  {
    name: "deviceOrder",
    iconName: DeviceOrderIcon,
  },
  {
    name: "encounter",
    iconName: EncounterIcon,
  },
  {
    name: "file",
    iconName: FileIcon,
  },
  {
    name: "form",
    iconName: FormIcon,
  },
  {
    name: "content",
    iconName: FileOutlinedIcon,
  },
  {
    name: "medications",
    iconName: MedicationIcon,
  },
  {
    name: "payment",
    iconName: PaymentIcon,
  },
];

export const MultimodalIcons: React.FC<{ IconName: MultimodalIconType }> = ({
  IconName,
}) => {
  return <img alt="multimodal icon" src={IconName} width={24} height={24} />;
};

export const MultimodalTab: React.FC<{
  activeTab: boolean;
  ticketIcon: MultimodalIconType;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ activeTab, ticketIcon, onClick }) => {
  const styling: SxProps = {
    position: "relative",
    display: "flex",
    alignItems: "center",
  };

  if (activeTab) {
    Object.assign(styling, {
      "&::before": {
        content: "''",
        position: "absolute",
        bottom: "-14.5px",
        width: "20px",
        height: "3px",
        borderRadius: "100px",
        background: "var(--primary-main)",
      },
    });
  }

  return (
    <IconButton
      size="small"
      sx={{
        ...styling,
      }}
      onClick={onClick}
    >
      <MultimodalIcons IconName={ticketIcon} />
    </IconButton>
  );
};

export const TicketMultimodalComponent: React.FC<{
  snoozed: boolean;
  nameSorted: boolean;
}> = ({ snoozed, nameSorted }) => {
  const [activeTab] = useState("ticket");

  return (
    <>
      <Box
        component="div"
        sx={{
          background: "#f9fafb",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "16px",
          alignItems: "center",
          height: "64px",
          gap: 1,
          p: 1,
        }}
      >
        {tabs?.map((tab) => (
          <>
            <MultimodalTab
              key={tab.name}
              ticketIcon={tab.iconName}
              activeTab={tab.name == activeTab}
            ></MultimodalTab>
          </>
        ))}
      </Box>

      <TicketMultimodalTabContent snoozed={snoozed} nameSorted={nameSorted} />
    </>
  );
};

export const EventMultimodalComponent: React.FC<{
  nameSorted: boolean;
}> = ({ nameSorted }) => {
  const [activeTab] = useState("event");

  return (
    <>
      <Box
        component="div"
        sx={{
          background: "#f9fafb",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "16px",
          alignItems: "center",
          height: "64px",
          gap: 1,
          p: 1,
        }}
      >
        {tabs?.map((tab) => (
          <>
            <MultimodalTab
              key={tab.name}
              ticketIcon={tab.iconName}
              activeTab={tab.name == activeTab}
            ></MultimodalTab>
          </>
        ))}
      </Box>

      <EventMultimodalTabContent nameSorted={nameSorted} />
    </>
  );
};

export const EligibilityMultimodalComponent: React.FC<{
  nameSorted: boolean;
}> = ({ nameSorted }) => {
  const [activeTab] = useState("eligibility");

  return (
    <>
      <Box
        component="div"
        sx={{
          background: "#f9fafb",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "16px",
          alignItems: "center",
          height: "64px",
          gap: 1,
          p: 1,
        }}
      >
        {tabs?.map((tab) => (
          <>
            <MultimodalTab
              key={tab.name}
              ticketIcon={tab.iconName}
              activeTab={tab.name == activeTab}
            ></MultimodalTab>
          </>
        ))}
      </Box>

      <EligibilityMultimodalTabContent nameSorted={nameSorted} />
    </>
  );
};

export const DeviceOrdersMultimodalComponent: React.FC<{
  nameSorted: boolean;
}> = ({ nameSorted }) => {
  const [activeTab] = useState("deviceOrder");

  return (
    <>
      <Box
        component="div"
        sx={{
          background: "#f9fafb",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "16px",
          alignItems: "center",
          height: "64px",
          gap: 1,
          p: 1,
        }}
      >
        {tabs?.map((tab) => (
          <>
            <MultimodalTab
              key={tab.name}
              ticketIcon={tab.iconName}
              activeTab={tab.name == activeTab}
            ></MultimodalTab>
          </>
        ))}
      </Box>

      <DeviceorderMultimodalTabContent nameSorted={nameSorted} />
    </>
  );
};

export const EncountersMultimodalComponent: React.FC<{
  nameSorted: boolean;
}> = ({ nameSorted }) => {
  const [activeTab] = useState("encounter");

  return (
    <>
      <Box
        component="div"
        sx={{
          background: "#f9fafb",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "16px",
          alignItems: "center",
          height: "64px",
          gap: 1,
          p: 1,
        }}
      >
        {tabs?.map((tab) => (
          <>
            <MultimodalTab
              key={tab.name}
              ticketIcon={tab.iconName}
              activeTab={tab.name == activeTab}
            ></MultimodalTab>
          </>
        ))}
      </Box>

      <EncountersMultimodalTabContent nameSorted={nameSorted} />
    </>
  );
};

export const FilesMultimodalComponent: React.FC<{
  nameSorted: boolean;
}> = ({ nameSorted }) => {
  const [activeTab] = useState("file");

  return (
    <>
      <Box
        component="div"
        sx={{
          background: "#f9fafb",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "16px",
          alignItems: "center",
          height: "64px",
          gap: 1,
          p: 1,
        }}
      >
        {tabs?.map((tab) => (
          <>
            <MultimodalTab
              key={tab.name}
              ticketIcon={tab.iconName}
              activeTab={tab.name == activeTab}
            ></MultimodalTab>
          </>
        ))}
      </Box>

      <FilesMultimodalTabContent nameSorted={nameSorted} />
    </>
  );
};

export const FormsMultimodalComponent: React.FC<{
  nameSorted: boolean;
}> = ({ nameSorted }) => {
  const [activeTab] = useState("form");

  return (
    <>
      <Box
        component="div"
        sx={{
          background: "#f9fafb",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "16px",
          alignItems: "center",
          height: "64px",
          gap: 1,
          p: 1,
        }}
      >
        {tabs?.map((tab) => (
          <>
            <MultimodalTab
              key={tab.name}
              ticketIcon={tab.iconName}
              activeTab={tab.name == activeTab}
            ></MultimodalTab>
          </>
        ))}
      </Box>

      <FormsMultimodalTabContent nameSorted={nameSorted} />
    </>
  );
};

export const ContentMultimodalComponent: React.FC<{
  nameSorted: boolean;
}> = ({ nameSorted }) => {
  const [activeTab] = useState("content");

  return (
    <>
      <Box
        component="div"
        sx={{
          background: "#f9fafb",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "16px",
          alignItems: "center",
          height: "64px",
          gap: 1,
          p: 1,
        }}
      >
        {tabs?.map((tab) => (
          <>
            <MultimodalTab
              key={tab.name}
              ticketIcon={tab.iconName}
              activeTab={tab.name == activeTab}
            ></MultimodalTab>
          </>
        ))}
      </Box>

      <ContentMultimodalTabContent nameSorted={nameSorted} />
    </>
  );
};

export const MedicationsMultimodalComponent: React.FC<{
  nameSorted: boolean;
}> = ({ nameSorted }) => {
  const [activeTab] = useState("medications");

  return (
    <>
      <Box
        component="div"
        sx={{
          background: "#f9fafb",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "16px",
          alignItems: "center",
          height: "64px",
          gap: 1,
          p: 1,
        }}
      >
        {tabs?.map((tab) => (
          <>
            <MultimodalTab
              key={tab.name}
              ticketIcon={tab.iconName}
              activeTab={tab.name == activeTab}
            ></MultimodalTab>
          </>
        ))}
      </Box>

      <MedicationMultimodalTabContent nameSorted={nameSorted} />
    </>
  );
};

export const PaymentsMultimodalComponent: React.FC<{
  nameSorted: boolean;
}> = ({ nameSorted }) => {
  const [activeTab] = useState("payment");

  return (
    <>
      <Box
        component="div"
        sx={{
          background: "#f9fafb",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "16px",
          alignItems: "center",
          height: "64px",
          gap: 1,
          p: 1,
        }}
      >
        {tabs?.map((tab) => (
          <>
            <MultimodalTab
              key={tab.name}
              ticketIcon={tab.iconName}
              activeTab={tab.name == activeTab}
            ></MultimodalTab>
          </>
        ))}
      </Box>

      <PaymentsMultimodalTabContent nameSorted={nameSorted} />
    </>
  );
};
