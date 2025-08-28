import type { Meta, StoryObj } from '@storybook/react'
import {
    AddedToJourneySectionItem,
    ChatResolvedSectionItem,
    ContentSectionItem,
    DeviceOrderSectionItem,
    EncounterSectionItem,
    EventCancelledSectionItem,
    EventScheduledSectionItem,
    EventSectionItem,
    FileSectionItem,
    FormSectionItem,
    MedicationSectionItem,
    PaymentSectionItem,
    PrescriptionSectionItem,
    RemovedFromJourneySectionItem,
    TicketassignedSectionItem,
    TicketcompletedSectionItem,
    TicketSectionItem,
} from './SectionItem'

const meta: Meta = {
    title: 'Molecules/SectionItem',
}

export default meta

export const Ticket: StoryObj<typeof TicketSectionItem> = {
    args: { snoozed: true, resolved: true, assigned: true, badge: true },
    argTypes: {
        snoozed: {
            control: 'boolean',
        },
        resolved: {
            control: 'boolean',
        },
        assigned: {
            control: 'boolean',
        },
        badge: {
            control: 'boolean',
        },
    },
    render: args => (
        <TicketSectionItem
            snoozed={args.snoozed}
            resolved={args.resolved}
            assigned={args.assigned}
            badge={args.badge}
        />
    ),
}

export const Event: StoryObj<typeof EventSectionItem> = {
    args: { resolved: true },
    argTypes: {
        resolved: {
            control: 'boolean',
        },
    },
    render: args => <EventSectionItem resolved={args.resolved} />,
}

export const Prescription: StoryObj<typeof PrescriptionSectionItem> = {
    args: { status: 'Approved' },
    argTypes: {
        status: {
            control: 'select',
            options: ['Pending', 'Approved', 'Denied'],
        },
    },
    render: args => <PrescriptionSectionItem status={args.status} />,
}

export const File: StoryObj<typeof FileSectionItem> = {
    render: () => <FileSectionItem />,
}

export const Medication: StoryObj<typeof MedicationSectionItem> = {
    render: () => <MedicationSectionItem />,
}

export const Payment: StoryObj<typeof PaymentSectionItem> = {
    render: () => <PaymentSectionItem />,
}

export const Content: StoryObj<typeof ContentSectionItem> = {
    render: () => <ContentSectionItem />,
}

export const Form: StoryObj<typeof FormSectionItem> = {
    render: () => <FormSectionItem />,
}

export const DeviceOrder: StoryObj<typeof DeviceOrderSectionItem> = {
    render: () => <DeviceOrderSectionItem />,
}

export const Encounter: StoryObj<typeof EncounterSectionItem> = {
    render: () => <EncounterSectionItem />,
}

export const TicketAssigned: StoryObj<typeof TicketassignedSectionItem> = {
    render: () => <TicketassignedSectionItem />,
}

export const TicketCompleted: StoryObj<typeof TicketcompletedSectionItem> = {
    render: () => <TicketcompletedSectionItem />,
}

export const EventScheduled: StoryObj<typeof EventScheduledSectionItem> = {
    render: () => <EventScheduledSectionItem />,
}

export const EventCancelled: StoryObj<typeof EventCancelledSectionItem> = {
    render: () => <EventCancelledSectionItem />,
}

export const ChatResolved: StoryObj<typeof ChatResolvedSectionItem> = {
    render: () => <ChatResolvedSectionItem />,
}

export const AddedToJourney: StoryObj<typeof AddedToJourneySectionItem> = {
    render: () => <AddedToJourneySectionItem />,
}

export const RemovedFromJourney: StoryObj<typeof RemovedFromJourneySectionItem> = {
    render: () => <RemovedFromJourneySectionItem />,
}
