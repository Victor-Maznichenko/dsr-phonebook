import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from '.';

const meta = {
  title: 'shared/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
  },
  args: {

  }
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    triggerContent: 'Tooltip Trigger',
    children: 'Контент тултипа...'
  }
};
