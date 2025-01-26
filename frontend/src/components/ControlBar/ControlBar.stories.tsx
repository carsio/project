
import type { Meta, StoryObj } from '@storybook/react';


import ControlBar from './index';


const meta = {
    title: 'Example/ControlBar',
    component: ControlBar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ControlBar>;
    
export default meta;

type Story = StoryObj<typeof meta>;

export const Off: Story = {
    args: {},
};
