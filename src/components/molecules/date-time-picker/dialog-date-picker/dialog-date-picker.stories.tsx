import type { Meta, StoryObj } from '@storybook/react-vite';
import DialogTimePicker from './dialog-date-picker';


const meta = {
    title: 'MOLECULES/Date And Time Elements/Dialog Date Picker',
    component: DialogTimePicker,
} satisfies Meta<typeof DialogTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
    },
};

