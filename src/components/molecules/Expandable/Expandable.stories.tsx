import { DragIndicator, ExpandMore, SettingsOutlined } from '@mui/icons-material'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    IconButton,
    Link,
    Typography,
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'
import { useId, useState } from 'react'
import { AddFieldButton, DisplayFields } from './Expandable'

// ✅ Storybook Meta Configuration
const meta: Meta = {
    title: 'Molecules/Expandable',
    component: Accordion,
}

export default meta

type Story = StoryObj

export const Default: Story = {
    render: () => {
        const fields = [
            {
                label: 'Email',
                value: 'johndoe@example.com',
                hidden: false,
                pinned: true,
            },
            {
                label: 'Phone number',
                value: '123 456 7890',
                hidden: false,
                pinned: true,
            },
            {
                label: 'Primary Insurance',
                value: 'Aetna Gold',
                hidden: false,
                pinned: false,
            },
            {
                label: 'Secondary Insurance',
                value: 'BlueCross',
                hidden: false,
                pinned: false,
            },
            { label: 'ID', value: 'ABC123456', hidden: false, pinned: false },
            { label: 'Gender', value: 'Male', hidden: false, pinned: false },
            {
                label: 'Date of Birth',
                value: '1990-01-01 (years old)',
                hidden: false,
                pinned: false,
            },
            { label: 'Height', value: '175 Inches', hidden: false, pinned: false },
            {
                label: 'Weight',
                value: '100 Pounds (20.30 BMI)',
                hidden: false,
                pinned: false,
            },
            { label: 'State', value: 'California', hidden: false, pinned: false },
        ]

        const [expanded, setExpanded] = useState(false)
        const [customFields, setCustomFields] = useState(fields)
        const [editValues, setEditValues] = useState(customFields)
        const [isEdit, setEdit] = useState(false)

        const toggleEdit = () => {
            setCustomFields(editValues)
            setEdit(!isEdit)
        }

        const togglePin = (field: {
            label: string
            value: string
            hidden: boolean
            pinned: boolean
        }) => {
            const formattedField = { ...field }
            formattedField.pinned = !formattedField.pinned
            const index = editValues?.findIndex(f => field.label === f.label)
            const newFields = [...editValues]
            newFields[index] = formattedField
            setEditValues([...newFields])
        }

        const toggleHidden = (field: {
            label: string
            value: string
            hidden: boolean
            pinned: boolean
        }) => {
            const formattedField = { ...field }
            formattedField.hidden = !formattedField.hidden
            const index = editValues?.findIndex(f => field.label === f.label)
            const newFields = [...editValues]
            newFields[index] = formattedField
            setEditValues([...newFields])
        }

        const visibleFields = isEdit
            ? expanded
                ? editValues
                : editValues?.filter(field => field.pinned && !field.hidden)
            : expanded
              ? customFields?.filter(field => !field.hidden)
              : customFields?.filter(field => field.pinned && !field.hidden)

        return (
            <Accordion
                expanded={expanded}
                onChange={(_, isExpanded) => setExpanded(isExpanded)}
                sx={{
                    width: '500px!important',
                    margin: 'auto!important',
                    '.css-kc1jhg-MuiAccordionDetails-root': {
                        paddingTop: '0px!important',
                        marginTop: '-17px!important',
                        paddingRight: '21px!important',
                    },
                    border: 'solid 1px #E2E8F0',
                    borderRadius: '16px !important',
                    boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.05)',
                    '.MuiCollapse-hidden': {
                        height: visibleFields?.length > 0 ? 'auto !important' : '0px',
                        visibility: visibleFields?.length > 0 ? 'visible !important' : 'hidden',
                    },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1-content"
                    id={useId()}
                >
                    <Box display="flex" alignItems="center" width="100%">
                        <DragIndicator
                            sx={{
                                width: '24px',
                                height: '24px',
                                color: '#CAC4D0',
                                mr: 1,
                            }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography fontWeight="bold" fontSize="medium" sx={{ flexGrow: 1 }}>
                                Patient information
                            </Typography>
                            <SettingsOutlined
                                sx={{
                                    fontSize: '16px',
                                    color: isEdit ? '#CAC4D0' : 'rgba(0, 0, 0, 1)',
                                }}
                            />
                            {isEdit && (
                                <Link
                                    component="button"
                                    variant="body2"
                                    fontSize="small"
                                    fontWeight="500"
                                    onClick={ev => {
                                        toggleEdit()
                                        ev.stopPropagation()
                                    }}
                                    sx={{
                                        color: 'rgba(28, 122, 224, 1)',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Save
                                </Link>
                            )}
                        </Box>
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingLeft: '46px' }}>
                    {visibleFields.length > 0 &&
                        visibleFields?.map(field => (
                            <Box key={field.label} sx={{ mt: 2 }}>
                                <DisplayFields
                                    state={isEdit ? 'edit' : 'view'}
                                    label={field.label}
                                    value={field.value}
                                    isPinned={field.pinned}
                                    hidden={field.hidden}
                                    onTogglePin={() => togglePin(field)}
                                    onToggleHidden={() => toggleHidden(field)}
                                />
                            </Box>
                        ))}
                </AccordionDetails>
                {/* <Box sx={{ padding: "0px  20px  25px 20px" }}>
          {expanded && <AddFieldButton />}
        </Box> */}
            </Accordion>
        )
    },
}

export const Expanded: Story = {
    render: () => {
        const fields = [
            {
                label: 'Email',
                value: 'johndoe@example.com',
                hidden: false,
                pinned: false,
            },
            {
                label: 'Phone number',
                value: '123 456 7890',
                hidden: false,
                pinned: false,
            },
            {
                label: 'Primary Insurance',
                value: 'Aetna Gold',
                hidden: false,
                pinned: false,
            },
            {
                label: 'Secondary Insurance',
                value: 'BlueCross',
                hidden: false,
                pinned: false,
            },
            { label: 'ID', value: 'ABC123456', hidden: false, pinned: false },
            { label: 'Gender', value: 'Male', hidden: false, pinned: false },
            {
                label: 'Date of Birth',
                value: '1990-01-01',
                hidden: false,
                pinned: false,
            },
            { label: 'Height', value: '175 cm', hidden: false, pinned: false },
            { label: 'Weight', value: '70 kg', hidden: false, pinned: false },
            { label: 'State', value: 'California', hidden: false, pinned: false },
        ]

        const [expanded, setExpanded] = useState(true)
        const [customFields, setCustomFields] = useState(fields)
        const [editValues, setEditValues] = useState(customFields)
        const [isEdit, setEdit] = useState(false)

        const toggleEdit = () => {
            setCustomFields(editValues)
            setEdit(!isEdit)
        }

        const togglePin = (field: {
            label: string
            value: string
            hidden: boolean
            pinned: boolean
        }) => {
            const formattedField = { ...field }
            formattedField.pinned = !formattedField.pinned
            const index = editValues?.findIndex(f => field.label === f.label)
            const newFields = [...editValues]
            newFields[index] = formattedField
            setEditValues([...newFields])
        }

        const toggleHidden = (field: {
            label: string
            value: string
            hidden: boolean
            pinned: boolean
        }) => {
            const formattedField = { ...field }
            formattedField.hidden = !formattedField.hidden
            const index = editValues?.findIndex(f => field.label === f.label)
            const newFields = [...editValues]
            newFields[index] = formattedField
            setEditValues([...newFields])
        }

        const visibleFields = isEdit
            ? expanded
                ? editValues
                : editValues?.filter(field => field.pinned && !field.hidden)
            : expanded
              ? customFields?.filter(field => !field.hidden)
              : customFields?.filter(field => field.pinned && !field.hidden)

        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Accordion
                    expanded={expanded}
                    onChange={(_, isExpanded) => setExpanded(isExpanded)}
                    sx={{
                        width: '500px!important',
                        border: 'solid 1px #E2E8F0',
                        borderRadius: '16px !important',
                        boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.05)',
                        '.MuiCollapse-hidden': {
                            height: visibleFields?.length > 0 ? 'auto !important' : '0px',
                            visibility: visibleFields?.length > 0 ? 'visible !important' : 'hidden',
                        },
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1-content"
                        id={useId()}
                    >
                        <Box display="flex" alignItems="center" width="100%">
                            <DragIndicator
                                sx={{
                                    width: '24px',
                                    height: '24px',
                                    color: '#CAC4D0',
                                    mr: 1,
                                }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography fontWeight="bold" fontSize="medium" sx={{ lexGrow: 1 }}>
                                    Patient information
                                </Typography>
                                <SettingsOutlined
                                    sx={{
                                        fontSize: '16px',
                                        color: isEdit ? '#CAC4D0' : 'rgba(0, 0, 0, 1)',
                                    }}
                                />
                                {isEdit && (
                                    <Link
                                        component="button"
                                        variant="body2"
                                        fontSize="small"
                                        fontWeight="500"
                                        onClick={ev => {
                                            toggleEdit()
                                            ev.stopPropagation()
                                        }}
                                        sx={{
                                            color: 'rgba(28, 122, 224, 1)',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Save
                                    </Link>
                                )}
                            </Box>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ paddingLeft: '46px' }}>
                        {visibleFields.length > 0 &&
                            visibleFields?.map(field => (
                                <Box key={field.label} sx={{ mt: 2 }}>
                                    <DisplayFields
                                        state={isEdit ? 'edit' : 'view'}
                                        label={field.label}
                                        value={field.value}
                                        isPinned={field.pinned}
                                        hidden={field.hidden}
                                        onTogglePin={() => togglePin(field)}
                                        onToggleHidden={() => toggleHidden(field)}
                                    />
                                </Box>
                            ))}
                    </AccordionDetails>
                    <Box sx={{ padding: '0px  20px  25px 20px' }}>
                        {expanded && <AddFieldButton />}
                    </Box>
                </Accordion>
            </Box>
        )
    },
}

// ✅ Main Storybook Story
export const Editing: Story = {
    render: () => {
        const fields = [
            {
                label: 'Email',
                value: 'johndoe@example.com',
                hidden: false,
                pinned: true,
            },
            {
                label: 'Phone number',
                value: '123 456 7890',
                hidden: false,
                pinned: true,
            },
            {
                label: 'Primary Insurance',
                value: 'Aetna Gold',
                hidden: false,
                pinned: false,
            },
            {
                label: 'Secondary Insurance',
                value: 'BlueCross',
                hidden: false,
                pinned: false,
            },
            { label: 'ID', value: 'ABC123456', hidden: false, pinned: false },
            { label: 'Gender', value: 'Male', hidden: false, pinned: false },
            {
                label: 'Date of Birth',
                value: '1990-01-01',
                hidden: true,
                pinned: true,
            },
            { label: 'Height', value: '175 cm', hidden: false, pinned: false },
            { label: 'Weight', value: '70 kg', hidden: false, pinned: false },
            { label: 'State', value: 'California', hidden: false, pinned: false },
        ]

        const [expanded, setExpanded] = useState(true)
        const [customFields, setCustomFields] = useState(fields)
        const [editValues, setEditValues] = useState(customFields)
        const [isEdit, setEdit] = useState(true)

        const toggleEdit = () => {
            setCustomFields(editValues)
            setEdit(!isEdit)
        }

        const togglePin = (field: {
            label: string
            value: string
            hidden: boolean
            pinned: boolean
        }) => {
            const formattedField = { ...field }
            formattedField.pinned = !formattedField.pinned
            const index = editValues?.findIndex(f => field.label === f.label)
            const newFields = [...editValues]
            newFields[index] = formattedField
            setEditValues([...newFields])
        }

        const toggleHidden = (field: {
            label: string
            value: string
            hidden: boolean
            pinned: boolean
        }) => {
            const formattedField = { ...field }
            formattedField.hidden = !formattedField.hidden
            const index = editValues?.findIndex(f => field.label === f.label)
            const newFields = [...editValues]
            newFields[index] = formattedField
            setEditValues([...newFields])
        }

        const visibleFields = isEdit
            ? expanded
                ? editValues
                : editValues?.filter(field => field.pinned && !field.hidden)
            : expanded
              ? customFields?.filter(field => !field.hidden)
              : customFields?.filter(field => field.pinned && !field.hidden)

        return (
            <Accordion
                expanded={expanded}
                onChange={(_, isExpanded) => setExpanded(isExpanded)}
                sx={{
                    width: '500px!important',
                    margin: 'auto!important',
                    '.css-kc1jhg-MuiAccordionDetails-root': {
                        paddingTop: '0px!important',
                        marginTop: '-17px!important',
                    },
                    border: 'solid 1px #E2E8F0',
                    borderRadius: '16px !important',
                    boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.05)',
                    '.MuiCollapse-hidden': {
                        height: visibleFields?.length > 0 ? 'auto !important' : '0px',
                        visibility: visibleFields?.length > 0 ? 'visible !important' : 'hidden',
                    },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1-content"
                    id={useId()}
                >
                    <Box display="flex" alignItems="center" width="100%">
                        <DragIndicator
                            sx={{
                                width: '24px',
                                height: '24px',
                                color: '#CAC4D0',
                                mr: 1,
                            }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography fontWeight="bold" fontSize="medium" sx={{ flexGrow: 1 }}>
                                Patient information
                            </Typography>
                            <IconButton
                                onClick={!isEdit ? toggleEdit : undefined}
                                size="small"
                                sx={{ pointerEvents: isEdit ? 'none' : 'inherit' }}
                            >
                                <SettingsOutlined
                                    onClick={ev => {
                                        ev.stopPropagation()
                                        toggleEdit()
                                    }}
                                    sx={{
                                        fontSize: '16px',
                                        color: isEdit ? '#CAC4D0' : 'rgba(0, 0, 0, 1)',
                                    }}
                                />
                            </IconButton>

                            {isEdit && (
                                <Link
                                    component="button"
                                    variant="body2"
                                    fontSize="small"
                                    fontWeight="500"
                                    onClick={ev => {
                                        toggleEdit()
                                        ev.stopPropagation()
                                    }}
                                    sx={{
                                        color: 'rgba(28, 122, 224, 1)',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Save
                                </Link>
                            )}
                        </Box>
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingLeft: '46px' }}>
                    {visibleFields.length > 0 &&
                        visibleFields?.map(field => (
                            <Box key={field.label} sx={{ mt: 2 }}>
                                <DisplayFields
                                    state={isEdit ? 'edit' : 'view'}
                                    label={field.label}
                                    value={field.value}
                                    isPinned={field.pinned}
                                    hidden={field.hidden}
                                    onTogglePin={() => togglePin(field)}
                                    onToggleHidden={() => toggleHidden(field)}
                                />
                            </Box>
                        ))}
                </AccordionDetails>
                <Box sx={{ padding: '0px  20px  25px 20px' }}>{expanded && <AddFieldButton />}</Box>
            </Accordion>
        )
    },
}
