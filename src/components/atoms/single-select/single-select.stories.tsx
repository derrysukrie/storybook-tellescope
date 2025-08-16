import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import SingleSelect from './single-select';

const meta = {
    title: 'ATOMS/Single Select',
    component: SingleSelect,
    parameters: {
        controls: {
            include: ["appearance", "disabled", "value", "selectedValue"],
        }
    },
    argTypes: {
        "appearance": {
            control: {
                type: 'select',
                options: ['enabled', 'hovered', 'selected'],
            },
        },
        "disabled": {
            control: {
                type: 'boolean',
            },
        },
        "value": {
            control: {
                type: 'text',
            },
        },
        "selectedValue": {
            control: {
                type: 'text',
            },
        },
        "onClick": {
            action: 'clicked',
        }
    }
} satisfies Meta<typeof SingleSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: 'This is a selectable question',
    },
}

export const Disabled: Story = {
    args: {
        value: 'This option is disabled',
        disabled: true,
        appearance: 'enabled',
    },
}

export const InteractiveExample: Story = {
    render: () => {
        const [selectedOption, setSelectedOption] = useState<string>('');
        
        const options = [
            'Option 1: This is a selectable question',
            'Option 2: This is another selectable question', 
            'Option 3: This is a third selectable question'
        ];
        
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {options.map((option, index) => (
                    <SingleSelect
                        key={index}
                        value={option}
                        selectedValue={selectedOption}
                        onClick={() => setSelectedOption(option)}
                    />
                ))}
                
                <div style={{ marginTop: '16px', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                    <strong>Selected:</strong> {selectedOption || 'None'}
                </div>
            </div>
        );
    }
}