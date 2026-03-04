// import type { Meta, StoryObj } from '@storybook/react-vite';
// import { Select } from '.';

// const meta = {
//   title: 'shared/Select',
//   component: Select,
//   parameters: {
//     layout: 'centered'
//   }
// } satisfies Meta<typeof Select>;

// export default meta;

// type Story = StoryObj<typeof meta>;

// const items = [
//   { label: 'Голден', value: 'golden' },
//   { label: 'Гренни Смит', value: 'granny' },
//   { label: 'Фуджи', value: 'fuji' }
// ];

// export const Example: Story = {
//   args: {
//     sideOffset: 8
//   },

//   render: (args) => {
//     return (
//       <Select.Wrapper>
//         <Select.Label>Вспомогательный текст</Select.Label>
//         <Select style={{ width: 200 }} items={items} {...args}>
//           <Select.Trigger placeholder='Select apple' />
//           <Select.Popup>
//             {items.map(({ label, value }) => (
//               <Select.Item value={value} key={value}>{label}</Select.Item>
//             ))}
//           </Select.Popup>
//         </Select>
//       </Select.Wrapper>
//     );
//   }
// };
