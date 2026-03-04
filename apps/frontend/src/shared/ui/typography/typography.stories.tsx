import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from './index';

const meta = {
  title: 'shared/Typography',
  component: Typography,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'heading_1',
        'heading_2',
        'heading_3',
        'heading_4',
        'text_L',
        'text_M',
        'text_S'
      ],
      description: 'Стиль типографики'
    },
    as: {
      control: 'text',
      description: 'HTML-тег для рендера (например, h1, p, span)'
    },
    children: {
      control: 'text',
      description: 'Содержимое компонента'
    }
  }
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

// Демонстрация всех доступных вариантов
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography variant='heading_1'>Heading 1 (60px)</Typography>
      <Typography variant='heading_2'>Heading 2 (40px)</Typography>
      <Typography variant='heading_3'>Heading 3 (30px)</Typography>
      <Typography variant='heading_4'>Heading 4 (24px)</Typography>
      <Typography variant='text_L'>Text L (18px) — крупный текст</Typography>
      <Typography variant='text_M'>Text M (15px) — основной текст</Typography>
      <Typography variant='text_S'>Text S (12px) — мелкий текст</Typography>
    </div>
  )
};

// История с возможностью менять параметры через Controls
export const Playground: Story = {
  args: {
    children: 'Этот заголовок отрендерен как <h1>',
    variant: 'heading_1',
    as: 'h1'
  }
};
