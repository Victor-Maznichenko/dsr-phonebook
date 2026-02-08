import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from '.';

const meta = {
  title: 'shared/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
  },
  args: {
  }
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
  }
};
