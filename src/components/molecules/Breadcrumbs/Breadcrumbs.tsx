import * as React from "react";
import { Breadcrumbs as MuiBreadcrumbs, Box, IconButton } from "@mui/material";
import Link from "@mui/material/Link";

interface BreadcrumbsProps {
  levels?: 1 | 2 | 3;
  leftIcon?: React.ReactNode[];
  rightIcon?: React.ReactNode[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  levels = 3,
  leftIcon = [],
  rightIcon = [],
}) => {
  const breadcrumbLevels = {
    1: [{ label: "Current Page", href: "/current", active: true }],
    2: [
      { label: "Home", href: "/", active: false },
      { label: "Current Page", href: "/current", active: true },
    ],
    3: [
      { label: "Home", href: "/", active: false },
      { label: "Products", href: "/products", active: false },
      { label: "Current Page", href: "/current", active: true },
    ],
  };

  const items = breadcrumbLevels[levels];

  // Limit to maximum 2 icons
  const limitedLeftIcons = leftIcon.slice(0, 2);
  const limitedRightIcons = rightIcon.slice(0, 2);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
      <Box display="flex" alignItems="center" gap={1}>
        <MuiBreadcrumbs aria-label="breadcrumb">
          {items.map((item, index) => (
            <Link
              key={index}
              underline="hover"
              color={item.active ? "black" : "grey"}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </MuiBreadcrumbs>
        {limitedLeftIcons.length > 0 && (
          <Box display="flex" alignItems="center">
            {limitedLeftIcons.map((icon: React.ReactNode, index: number) => (
              <IconButton
                key={index}
                size="small"
                onClick={() => console.log(`Icon ${index + 1} clicked`)}
              >
                {icon}
              </IconButton>
            ))}
          </Box>
        )}
      </Box>

      {limitedRightIcons.length > 0 && (
        <Box display="flex" alignItems="center" gap={1}>
          {limitedRightIcons.map((icon: React.ReactNode, index: number) => (
            <IconButton
              key={index}
              size="small"
              onClick={() => console.log(`Icon ${index + 1} clicked`)}
            >
              {icon}
            </IconButton>
          ))}
        </Box>
      )}
    </Box>
  );
};
