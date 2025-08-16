import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { EmojiPicker } from './EmojiPicker';

const meta = {
    title: 'MOLECULES/EmojiPicker',
    component: EmojiPicker,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        onEmojiSelect: {
            description: 'The function to call when an emoji is selected',
            action: 'emoji selected'
        },
    },
    args: {
        onEmojiSelect: fn(),
    },
} satisfies Meta<typeof EmojiPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onEmojiSelect: fn(),
    },
};
