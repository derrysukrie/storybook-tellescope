import { Box, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import CustomAccordion from './SectionCategory'

const meta = {
    title: 'ATOMS/SectionCategory',
    component: CustomAccordion,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A customizable accordion component with built-in dropdown selection and add button functionality.',
            },
        },
    },
    argTypes: {
        title: {
            control: 'text',
            description: 'The title displayed in the accordion header',
            defaultValue: 'Inbox',
        },
        expanded: {
            control: 'boolean',
            description: 'Controls whether the accordion is initially expanded',
            defaultValue: false,
        },
        selected: {
            control: 'boolean',
            description: 'Controls whether the accordion appears in a selected state',
            defaultValue: false,
        },
    },
    args: {
        title: 'Tagged as',
    },
} satisfies Meta<typeof CustomAccordion>

export default meta
type Story = StoryObj<typeof meta>

// Sample content for the accordion details
const AccordionContent = React.createElement(
    Box,
    { sx: { p: 1 } },
    React.createElement(
        Typography,
        { variant: 'body2' },
        'This is the expanded content of the accordion. You can place any components or content here.'
    )
)

export const Expanded: Story = {
    args: {
        title: 'Inbox',
        expanded: true,
        children: AccordionContent,
    },
}

export const Selected: Story = {
    args: {
        title: 'Inbox',
        selected: true,
        children: AccordionContent,
    },
}
