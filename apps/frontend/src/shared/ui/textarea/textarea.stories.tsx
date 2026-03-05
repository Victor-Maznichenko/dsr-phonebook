import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/internal/preview-api';
import { Textarea } from '.';

const meta = {
  title: 'shared/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    onChange: { control: false },
    defaultValue: { control: false }
  }
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    value: '',
    disabled: false,
    placeholder: 'Введите текст'
  },

  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [{ value }, updateArgs] = useArgs();

    return (
      <Textarea
        {...args}
        onChange={(e) => updateArgs({ value: e.target.value })}
        value={value}
      />
    );
  }
};
