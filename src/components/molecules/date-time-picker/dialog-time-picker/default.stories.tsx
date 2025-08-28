import type { Meta, StoryObj } from '@storybook/react-vite'
import DateTimePicker from './dialog-time-picker'

const meta = {
    title: 'MOLECULES/Date And Time Elements/Dialog Time Picker',
    component: DateTimePicker,
    argTypes: {
        // onChange: { action: 'changed' },
        // onAccept: { action: 'accepted' },
        // onCancel: { action: 'cancelled' },
    },
} satisfies Meta<typeof DateTimePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        // value: new Date(2024, 0, 1, 13, 0, 0, 0),
        // ampm: true,
        // timeStep: 30,
    },
    render: args => {
        // const [value, setValue] = useState<Date>(args.value as Date ?? new Date());

        return (
            <DateTimePicker
                {...args}
                // onHoursChange={(hours) => {
                //   args.onHoursChange?.(hours);
                // }}
                // onMinutesChange={(minutes) => {
                //   args.onMinutesChange?.(minutes);
                // }}
                // onAmPmChange={(amPm) => {
                //   args.onAmPmChange?.(amPm);
                // }}
                // onCancel={() => {
                //   args.onCancel?.();
                // }}
                onOk={time => {
                    console.log(time)
                }}
            />
        )
    },
}
