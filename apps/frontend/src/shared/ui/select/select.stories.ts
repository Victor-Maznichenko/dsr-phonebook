import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from '.';

const meta = {
  title: 'shared/Select',
  component: Select,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    variant: 'circle',
  }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    text: 'Select'
  }
};
