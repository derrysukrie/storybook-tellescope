// create a story for the CareTeamInfo component

import { Box } from "@mui/material";
import { CareTeamInfo } from "./care-team-info";
import type { CareTeamInfoProps } from "./care-team-info";

export default {
  title: "Molecules/PatientPortal/CareTeamInfo",
  component: CareTeamInfo,
  parameters: {
    docs: {
      description: {
        component: "CareTeamInfo component with configurable action buttons (chat, call, email)."
      }
    }
  },
  argTypes: {
    actions: {
      control: { type: 'select' },
      options: [1, 2, 3],
      description: 'Number of action buttons to display'
    }
  }
};

export const Default = {
  args: { 
    actions: 1
  },
  render: (args: CareTeamInfoProps) => (
    <Box px={10} display="flex" alignItems="center" justifyContent="center" bgcolor="#f0f0f0" height="100vh">
      <CareTeamInfo {...args} />
    </Box>
  )
};

export const TwoActions = {
  args: {
    actions: 2
  },
  render: (args: CareTeamInfoProps) => (
    <Box px={10} display="flex" alignItems="center" justifyContent="center" bgcolor="#f0f0f0" height="100vh">
      <CareTeamInfo {...args} />
    </Box>
  )
};

export const ThreeActions = {
  args: {
    actions: 3
  },
  render: (args: CareTeamInfoProps) => (
    <Box px={10} display="flex" alignItems="center" justifyContent="center" bgcolor="#f0f0f0" height="100vh">
      <CareTeamInfo {...args} />
    </Box>
  )
};