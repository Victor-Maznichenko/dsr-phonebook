import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './ui';

const meta = {
  title: 'shared/Toast',
  component: Toast,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    id: '1',
    title: 'Example Toast',
    message: 'This is an example toast message.',
    variant: 'info'
  }
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
