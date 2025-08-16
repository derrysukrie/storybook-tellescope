import { Accordion, AccordionSummary, AccordionDetails, IconButton, Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { ReactNode } from "react";
import { useState } from "react";

interface CustomAccordionProps {
  title?: string;
  children?: ReactNode;
  expanded?: boolean;
  selected?: boolean;
}

export default function CustomAccordion({ title = "Tagged as", children, expanded = false, selected = false }: CustomAccordionProps) {
  const [expandedState, setExpandedState] = useState(expanded);

  const handleChange = () => {
    setExpandedState(!expandedState);
  };

  return (
    <Accordion
      expanded={expandedState}
      onChange={handleChange}
      elevation={0}
      sx={{
        backgroundColor: selected ? "#E2E8F0" : "transparent",
        borderRadius: "0 !important",
        "&:before": {
          display: "none",
        },
        "& .MuiAccordionSummary-root": {
          borderRadius: "0 !important",
        },
        "& .MuiAccordionDetails-root": {
          borderRadius: "0 !important",
        },
        "&:first-of-type": {
          borderRadius: "0 !important",
        },
        "&:last-of-type": {
          borderRadius: "0 !important",
        },
      }}
    >
      <AccordionSummary
        sx={{
          "& .MuiAccordionSummary-content": {
            margin: 0,
          },
          "& .MuiAccordionSummary-content.Mui-expanded": {
            margin: 0,
          },
          "&:hover .hover-chevron": {
            opacity: 1,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <ArrowRightIcon
              fontSize="medium"
              sx={{
                transform: expandedState ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            />
            <Box
              // @ might be used for another accordion
              onClick={(event) => event.stopPropagation()}
              sx={{
                display: "flex",
                alignItems: "center",
                height: 32,
                px: 1,
                gap: 1,
                borderRadius: 1,
                "&:hover": { backgroundColor: "#FFF" },
                cursor: "pointer",
                transition: "background-color 0.2s ease-in-out",
              }}
            >
              <Typography>{title}</Typography>
              <ChevronRightIcon
                className="hover-chevron"
                sx={{
                  opacity: 0,
                  transition: "opacity 0.2s ease-in-out",
                  rotate: "90deg",
                  fontSize: "1.2rem",
                  color: "#666",
                }}
              />
            </Box>
          </Box>
          <IconButton>
            <AddIcon sx={{ color: "#000000" }} />
          </IconButton>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}
