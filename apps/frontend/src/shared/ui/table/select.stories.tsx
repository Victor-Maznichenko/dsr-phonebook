import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from '.';

const meta = {
  title: 'shared/Table',
  component: Table.Root,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Table.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = [
  { id: 1, name: 'Виктор Мазниченко', age: 21, department: 'Разработка', grade: 'Junior', email: 'victor_maznichenko@mail.ru', phone: '+79204574579' },
  { id: 2, name: 'Даниил Степанов', age: 21, department: 'Разработка', grade: 'Junior', email: 'daniil-kolbasenko@mail.ru', phone: '+79613452342' }
];

export const Example: Story = {
  args: {},
  render: () => {
    return (
      <Table.Root>
        <Table.THead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Полное имя</Table.Th>
            <Table.Th>Возраст</Table.Th>
            <Table.Th>Подразделение</Table.Th>
            <Table.Th>Грейд</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Рабочий телефон</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.THead>
        <Table.TBody>
          {items.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>{item.id}</Table.Td>
              <Table.Td>{item.name}</Table.Td>
              <Table.Td>{item.age}</Table.Td>
              <Table.Td>{item.department}</Table.Td>
              <Table.Td>{item.grade}</Table.Td>
              <Table.Td>{item.email}</Table.Td>
              <Table.Td>{item.phone}</Table.Td>
              <Table.Td></Table.Td>
            </Table.Tr>
          ))}
        </Table.TBody>
      </Table.Root>
    );
  }
};
