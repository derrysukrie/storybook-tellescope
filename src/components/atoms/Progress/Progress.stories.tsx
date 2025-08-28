import { styled } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'
import LinearProgress from './Progress'

const meta: Meta<typeof LinearProgress> = {
    title: 'Atoms/ProgressBar',
    component: LinearProgress,
    tags: ['autodocs'],
    args: {
        color: 'primary',
        variant: 'determinate',
        value: 20,
        valueBuffer: 0,
    },
    argTypes: {
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'inherit'],
        },
        variant: {
            control: 'select',
            options: ['determinate', 'indeterminate', 'buffer'],
        },
        value: {
            control: { type: 'number', min: 0 },
        },
        valueBuffer: {
            control: { type: 'number', min: 0 },
            if: { arg: 'variant', eq: 'buffer' },
        },
    },
}

export default meta

type Story = StoryObj<typeof LinearProgress>

// export const Progress: Story = {
//   args: {
//     variant: "determinate",
//     color: "primary",
//     value: 5,
//   },
//    render: (args) => (
//     <LinearProgress {...args} aria-label="Progress bar" />
//   ),
// };

// export const ProgressWithLabel: Story = {
//   args: {
//     variant: "determinate",
//     color: "primary",
//     value: 50,
//   },
//   render: (args) => (
//     <Box sx={{ display: "flex", alignItems: "center" }}>
//       <Box sx={{ width: "100%", mr: 1 }}>
//         <LinearProgress {...args} aria-label="Progress-label" />
//       </Box>
//       <Box sx={{ minWidth: 35 }}>
//         <Typography
//           variant="body2"
//           sx={{ color: "text.secondary" }}
//         >{`${Math.round(args?.value || 0)}%`}</Typography>
//       </Box>
//     </Box>
//   ),
// };

// export const ProgressBuffer: Story = {
//   args: {
//     variant: "buffer",
//     color: "primary",
//     valueBuffer: 50,
//   },
//    render: (args) => (
//     <LinearProgress {...args} aria-label="Progress-buffer" />
//   ),
// };

// export const ProgressBufferWithLabel: Story = {
//   args: {
//     variant: "buffer",
//     color: "primary",
//     valueBuffer: 50,
//   },
//   render: (args) => (
//     <Box sx={{ display: "flex", alignItems: "center" }}>
//       <Box sx={{ width: "100%", mr: 1 }}>
//         <LinearProgress {...args}  aria-label="Progress-buffer-label"/>
//       </Box>
//       <Box sx={{ minWidth: 35 }}>
//         <Typography
//           variant="body2"
//           sx={{ color: "text.secondary" }}
//         >{`${Math.round(args?.value || 0)}%`}</Typography>
//       </Box>
//     </Box>
//   ),
// };

export const SentForms: Story = {
    argTypes: {
        color: {
            table: {
                disable: true,
            },
        },
        valueBuffer: {
            table: {
                disable: true,
            },
        },
        variant: {
            control: 'radio',
            options: ['determinate', 'indeterminate'],
        },
    },
    render: args => {
        const BorderLinearProgress = styled(LinearProgress)(() => ({
            height: 16,
            borderRadius: 20,
            background: '#b7bed3',
            '& .MuiLinearProgress-bar': {
                background: '#798ed0',
            },
        }))

        return (
            <BorderLinearProgress
                variant={args.variant}
                value={args.value}
                aria-label="progress-border"
            />
        )
    },
}
