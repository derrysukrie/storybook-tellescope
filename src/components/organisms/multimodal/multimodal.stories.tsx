import type { Meta, StoryObj } from '@storybook/react'
import {
    ContentMultimodalComponent,
    DeviceOrdersMultimodalComponent,
    EligibilityMultimodalComponent,
    EncountersMultimodalComponent,
    EventMultimodalComponent,
    FilesMultimodalComponent,
    FormsMultimodalComponent,
    MedicationsMultimodalComponent,
    PaymentsMultimodalComponent,
    TicketMultimodalComponent,
} from './multimodal'

const meta: Meta = {
    title: 'Organisms/Multimodal',
}

export default meta

export const Tickets: StoryObj<typeof TicketMultimodalComponent> = {
    args: {
        snoozed: false,
        nameSorted: true,
    },
    argTypes: {
        snoozed: {
            control: 'boolean',
        },
        nameSorted: {
            control: 'boolean',
        },
    },
    render: args => (
        <TicketMultimodalComponent snoozed={args.snoozed} nameSorted={args.nameSorted} />
    ),
}

export const Events: StoryObj<typeof EventMultimodalComponent> = {
    args: {
        nameSorted: false,
    },
    argTypes: {
        nameSorted: {
            control: 'boolean',
        },
    },
    render: args => <EventMultimodalComponent nameSorted={args.nameSorted} />,
}

export const Eligibility: StoryObj<typeof EligibilityMultimodalComponent> = {
    args: {
        nameSorted: false,
    },
    argTypes: {
        nameSorted: {
            control: 'boolean',
        },
    },
    render: args => <EligibilityMultimodalComponent nameSorted={args.nameSorted} />,
}

export const DeviceOrders: StoryObj<typeof DeviceOrdersMultimodalComponent> = {
    args: {
        nameSorted: false,
    },
    argTypes: {
        nameSorted: {
            control: 'boolean',
        },
    },
    render: args => <DeviceOrdersMultimodalComponent nameSorted={args.nameSorted} />,
}

export const Encounters: StoryObj<typeof EncountersMultimodalComponent> = {
    args: {
        nameSorted: false,
    },
    argTypes: {
        nameSorted: {
            control: 'boolean',
        },
    },
    render: args => <EncountersMultimodalComponent nameSorted={args.nameSorted} />,
}

export const Files: StoryObj<typeof FilesMultimodalComponent> = {
    args: {
        nameSorted: false,
    },
    argTypes: {
        nameSorted: {
            control: 'boolean',
        },
    },
    render: args => <FilesMultimodalComponent nameSorted={args.nameSorted} />,
}

export const Forms: StoryObj<typeof FormsMultimodalComponent> = {
    args: {
        nameSorted: false,
    },
    argTypes: {
        nameSorted: {
            control: 'boolean',
        },
    },
    render: args => <FormsMultimodalComponent nameSorted={args.nameSorted} />,
}

export const Content: StoryObj<typeof ContentMultimodalComponent> = {
    args: {
        nameSorted: false,
    },
    argTypes: {
        nameSorted: {
            control: 'boolean',
        },
    },
    render: args => <ContentMultimodalComponent nameSorted={args.nameSorted} />,
}

export const Medications: StoryObj<typeof MedicationsMultimodalComponent> = {
    args: {
        nameSorted: false,
    },
    argTypes: {
        nameSorted: {
            control: 'boolean',
        },
    },
    render: args => <MedicationsMultimodalComponent nameSorted={args.nameSorted} />,
}

export const Payment: StoryObj<typeof PaymentsMultimodalComponent> = {
    args: {
        nameSorted: false,
    },
    argTypes: {
        nameSorted: {
            control: 'boolean',
        },
    },
    render: args => <PaymentsMultimodalComponent nameSorted={args.nameSorted} />,
}
