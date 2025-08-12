import type { Meta, StoryObj } from '@storybook/react-vite';
import DialogDatePicker from './dialog-date-picker';
import { useState } from 'react';

const meta = {
    title: 'MOLECULES/Date And Time Elements/Dialog Date Picker',
    component: DialogDatePicker,
    parameters: {
        docs: {
            description: {
                component: 'A dialog date picker component that allows users to select dates from a calendar interface.'
            }
        }
    }
} satisfies Meta<typeof DialogDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component for the story
const InteractiveDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        console.log('Selected date:', date);
    };

    const handleCancel = () => {
        console.log('Cancel clicked');
    };

    const handleNext = () => {
        console.log('Next clicked');
    };

    const handleClear = () => {
        console.log('Clear clicked');
    };

    return (
        <div style={{ padding: '20px' }}>
            <DialogDatePicker
                value={selectedDate}
                onChange={handleDateChange}
                onCancel={handleCancel}
                onNext={handleNext}
                onClear={handleClear}
            />
            {selectedDate && (
                <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                    <strong>Selected Date:</strong> {selectedDate.toLocaleDateString()}
                </div>
            )}
        </div>
    );
};

export const Default: Story = {
    render: () => <InteractiveDatePicker />
};

export const Disabled: Story = {
    render: () => {
        const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

        return (
            <div style={{ padding: '20px' }}>
                <DialogDatePicker
                    value={selectedDate}
                    onChange={setSelectedDate}
                    disabled={true}
                    onCancel={() => console.log('Cancel clicked')}
                    onNext={() => console.log('Next clicked')}
                    onClear={() => console.log('Clear clicked')}
                />
            </div>
        );
    }
};

