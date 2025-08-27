import {
  Assignment,
  ChatBubbleOutline,
  ChevronRight,
  ErrorOutline,
  Event,
  Link,
} from "@mui/icons-material";
import { Avatar, Box, Stack, Typography, type SxProps, type Theme } from "@mui/material";
import type { ReactNode } from "react";

// Type definitions
export type PortalType = "form" | "link" | "appointment" | "message";

export interface PortalTypeConfig {
  icon: ReactNode;
  showStatus?: boolean;
  showDateTime?: boolean;
  showAvatar?: boolean;
  statusText?: (completed?: boolean) => string;
}

export interface ItemPortalProps {
  type: PortalType;
  completed?: boolean;
  title: string;
  badge?: boolean;
  badgeCount?: number;
  dateTime?: string;
  doctorName?: string;
  avatarSrc?: string;
  hasNewMessage?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

// Type-specific configurations
const PORTAL_TYPE_CONFIG: Record<PortalType, PortalTypeConfig> = {
  form: {
    icon: <Assignment />,
    showStatus: true,
    statusText: (completed) => completed ? "Completed" : "Not started",
  },
  link: {
    icon: <Link />,
  },
  appointment: {
    icon: <Event />,
  },
  message: {
    icon: <ChatBubbleOutline />,
    showDateTime: true,
    showAvatar: true,
  },
};

// Sub-components for better organization
const ItemIcon = ({ type, hasNewMessage }: { type: PortalType; hasNewMessage?: boolean }) => {
  const config = PORTAL_TYPE_CONFIG[type];
  
  return (
    <Box position="relative" display="inline-flex" alignItems="center">
      {config.icon}
      {type === "message" && hasNewMessage && (
        <Box
          position="absolute"
          top={-2}
          right={-2}
          width={8}
          height={8}
          borderRadius="50%"
          bgcolor="error.main"
          sx={{
            border: '1px solid white',
            pointerEvents: 'none',
          }}
        />
      )}
    </Box>
  );
};

const PortalStatus = ({ 
  type, 
  completed, 
  dateTime, 
  doctorName 
}: { 
  type: PortalType; 
  completed?: boolean; 
  dateTime?: string; 
  doctorName?: string; 
}) => {
  const config = PORTAL_TYPE_CONFIG[type];
  
  if (!config.showStatus && !config.showDateTime) return null;

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {config.showStatus && !completed && (
        <ErrorOutline color="error" fontSize="inherit" />
      )}
      
      {config.showStatus && config.statusText && (
        <Typography
          variant="caption"
          fontWeight={600}
          color="text.secondary"
        >
          {config.statusText(completed)}
        </Typography>
      )}
      
      {config.showDateTime && (dateTime || doctorName) && (
        <Box display="flex" gap={1}>
          {dateTime && (
            <Typography
              variant="caption"
              fontWeight={500}
              color="text.secondary"
            >
              {dateTime}
            </Typography>
          )}
          {doctorName && (
            <Typography
              variant="caption"
              fontWeight={500}
              color="text.secondary"
            >
              {doctorName}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

const PortalBadge = ({ count }: { count?: number }) => {
  if (!count) return null;
  
  return (
    <Typography
      variant="caption"
      fontWeight={600}
      sx={{ marginRight: 1.2 }}
      color="text.secondary"
    >
      {count}
    </Typography>
  );
};

const PortalAvatar = ({ src, show }: { src?: string; show?: boolean }) => {
  if (!show || !src) return null;
  
  return (
    <Avatar
      sx={{ width: 24, height: 24 }}
      src={src}
    />
  );
};

export const ItemPortal = ({
  type,
  completed = false,
  title,
  badge = false,
  badgeCount = 8,
  dateTime,
  doctorName,
  avatarSrc,
  hasNewMessage = false,
  onClick,
  sx,
}: ItemPortalProps) => {
  const config = PORTAL_TYPE_CONFIG[type];
  const hasStatusOrDateTime = config.showStatus || config.showDateTime;

  return (
    <Box
      bgcolor="white"
      px={2}
      borderRadius="6px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="60px"
      width="100%"
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          bgcolor: 'grey.50',
        } : {},
        ...sx,
      }}
    >
      <Stack direction="row" alignItems="center" gap={2}>
        <ItemIcon type={type} hasNewMessage={hasNewMessage} />
        
        <Box
          display="flex"
          flexDirection="column"
          gap={hasStatusOrDateTime ? 0.4 : 0}
        >
          <Typography variant="body2" fontWeight={600}>
            {title}
          </Typography>
          
          <PortalStatus
            type={type}
            completed={completed}
            dateTime={dateTime}
            doctorName={doctorName}
          />
        </Box>
      </Stack>

      <Stack direction="row" alignItems="center" gap={1}>
        <PortalBadge count={badge ? badgeCount : undefined} />
        <PortalAvatar 
          src={avatarSrc} 
          show={config.showAvatar} 
        />
        <ChevronRight />
      </Stack>
    </Box>
  );
};
