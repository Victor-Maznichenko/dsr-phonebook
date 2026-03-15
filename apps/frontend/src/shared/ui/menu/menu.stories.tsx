import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from '.';

const meta = {
  title: 'shared/Menu',
  component: Menu.Root,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Menu.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = ['Голден-1', 'Голден-2', 'Голден-3'];

export const Example: Story = {
  args: { sideOffset: 8 },

  render: (args) => {
    return (
      <Menu.Root style={{ width: 200 }} {...args}>
        <Menu.Trigger>Menu.Trigger</Menu.Trigger>
        <Menu.Popup>
          {items.map((text) => (
            <Menu.Item key={text}>{text}</Menu.Item>
          ))}
        </Menu.Popup>
      </Menu.Root>
    );
  }
};
