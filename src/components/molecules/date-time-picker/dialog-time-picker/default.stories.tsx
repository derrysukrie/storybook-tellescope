import type { Meta, StoryObj } from '@storybook/react-vite';
import DateTimePicker from './dialog-time-picker';


const meta = {
    title: 'MOLECULES/Date And Time Elements/Dialog Time Picker',
    component: DateTimePicker,
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
    },
};

